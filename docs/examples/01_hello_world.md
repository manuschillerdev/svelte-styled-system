# Example 1 - Hello World

**TLDR:** [https://svelte.dev/repl/7301387b918c44b4b134f83c933988cb?version=3.17.1](https://svelte.dev/repl/7301387b918c44b4b134f83c933988cb?version=3.17.1)

Let's create our first `Box` that is completely styled based on our theme definition!

```jsx
// theme.js
import { writable } from "svelte/store";

export default writable({
  color: {
    primary: "dodgerblue",
    secondary: "papayawhip"
  },
  space: {
    s: "0.5rem",
    m: "1rem",
    l: "2rem"
  },
  font: {
    default: "sans-serif"
  },
  breakpoints: ["20rem", "48rem", "64rem"]
});
```

```jsx
// Box.svelte
<script>
  import { styled } from "svelte-styled-system";
  import theme from "./theme.js";
</script>

<div use:styled={[$$props, $theme]}>
  <slot></slot>
</div>
```

```jsx
// App.svelte
<script>
  import Box from "./Box.svelte";
</script>

<Box
  fontFamily="font.default"
  textAlign="center"
  bg="color.primary"
  color="color.secondary"
  p="space.l"
>
  hello world!
</Box>
```
