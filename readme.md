# using styled-system with svelte in ~1kb

**Attention!** POC only!

POC for bringing the principles of [https://styled-system.com/](https://styled-system.com/) to svelte.

This is for demo purposes only and not meant to be used yet!
May change / be abondend any time.

Demo: [https://svelte.dev/repl/fd2a1151c14c4c2685ee55f661665204?version=3.17.1](https://svelte.dev/repl/fd2a1151c14c4c2685ee55f661665204?version=3.17.1)

### Examples (with REPLs):

- [Hello World](docs/examples/01_hello_world.md)
- [Responsive values](docs/examples/02_responsive.md)
- [Change styles based on current scope variables](docs/examples/03_reactivity.md)
- [Change styles based on theme changes](docs/examples/04_theme_changes.md)
- [Working with pseudo elements / pesudo classes](docs/examples/05_css_in_js.md)
- [Separate styles to their own files](docs/examples/06_separate_styles.md)

## Using styled-system with svelte

### Defining your theme:

The theme definition is nothing more than a plain JS-Object wrapped in a writable store, that should contain an attribute `breakpoints: string[]` at the top level as a minimum config if you want to use responsive attributes.

Besides that you can define all of your design variables just as you like.

**Example:**

```jsx
// theme.js
import { writable } from "svelte/store";

export const theme = writable({
  // demo: 560px, 768px, 1024px at base 16
  breakpoints: ["35rem", "48rem", "64rem"],
  color: {
    primary: "dodgerblue",
    secondary: "papayawhip",
    grey: "#eee"
  },
  space: {
    s: "0.5rem",
    m: "1rem",
    l: "2rem"
  }
});
```

### Using your theme

Using your theme is pretty straight forward, too. `styled` from `svelte-styled-system` is a regular [svelte action](https://svelte.dev/docs#use_action) so you can use it with `use:styled`. It expects an array in the form `[$$props, $theme]` note the `$` sign in front of your imported theme to ([automatically subscribe / unsubscribe to changes automatically!](https://svelte.dev/docs#4_Prefix_stores_with_$_to_access_their_values))

```jsx
// Box.svelte
<script>
	import { styled } from 'svelte-styled-system';
	import { theme } from './theme.js';
</script>

<div use:styled={[$$props, $theme]}>
	<slot></slot>
</div>
```

That's all! Your are ready to use all css property names + [shorthand](#currently-available-shorthand-properties) props as attribute on your component! See [https://styled-system.com/api](https://styled-system.com/api) for more documentation.

```jsx
// App.svelte
<script>
	import Box from './Box.svelte';
</script>

<Box
	p={["space.s", "space.m", "space.l"]}
	bg="color.primary" color="color.secondary"
	textAlign="center"
>
	<h3>Using styled-system in svelte!</h3>
	<p>Resize me to see my responsive padding in action</p>
</Box>
```

### How does the value resolution work?

1. The attribute name will get mapped to the css property name. You can specify it either in camelCase `(textAlign)` or kebab-case `(text-align)`.
   So, if you know css by heart, you already know 99% of your component's props.

2. if the value is a string, `svelte-styled-system` first assumes it might be a keypath to your theme object. It uses [(dlv)](https://github.com/developit/dlv) under the hood. If the path can not be resolved, the the resolution will fallback to the input value. (input: `textAlign="center"` => center can not be found in the theme so the output is just `text-align: center;`)

```jsx
{
	color: {
		primary: "dodgerblue", // path: color.primary
	},
	// path: scale.0 => 0
	// path: scale.1 => 0.5rem
	// path: scale.2 => 1rem
	scale: ["0", "0.5rem", "1rem"]
}
```

3. if the value is an array then `svelte-styled-system` will create a media query for each breakpoint and will resolve the separate values just as described before.
   `padding: [0, "space.m", "space.l"]`:

- will create `padding: 0;` (raw value) for `theme.breakpoints[0]`
- will create `padding: 1rem;` (`space.m`) for `theme.breakpoints[1]`
- will create `padding: 2rem;` (`space.l`) for `theme.breakpoints[2]`

## Currently available shorthand properties:

For commonly used css properties there are shortcuts to make your code _even less_ verbose.

**Example:**
`my="space.m"` => `margin-top: 1rem; margin-bottom: 1rem;`

As with all other properties you can use the responsive Array notation as well.

| name | properties                  |
| ---- | --------------------------- |
| bg   | background-color            |
| size | width, height               |
| m    | margin                      |
| my   | margin-top, margin-bottom   |
| mx   | margin-left, margin-right   |
| mt   | margin-top                  |
| mr   | margin-right                |
| mb   | margin-bottom               |
| ml   | margin-left                 |
| p    | padding                     |
| py   | padding-top, padding-bottom |
| px   | padding-left, padding-right |
| pt   | padding-top                 |
| pr   | padding-right               |
| pb   | padding-bottom              |
| pl   | padding-left                |
