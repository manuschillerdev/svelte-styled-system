# Example 06 - Separate styles to their own files

**TLDR:** [https://svelte.dev/repl/4ce1bf6b28314cc8ae5a4d8c39e3078e?version=3.17.1](https://svelte.dev/repl/4ce1bf6b28314cc8ae5a4d8c39e3078e?version=3.17.1)

In our example before, we created our dynamic styles right in the main `<script>` block of our component. As soon as there is some more logic going on the code can become messy very quickly. We can export the style creation to a separate file, if we want to.

We create a new file `Box.styles.js` and move our code there.

**Note:** you can only subscribe to stores via the `$` notation within components. Here we are in the context of a regular JS file, so we can not use reactive assignments `$:` or subscriptions like `$theme` as before. Instead we use the subscription syntax in our function call in the Box component (see below)
`$: styles = getStyles($theme)`.

```jsx
// Box.styles.js
import { themeGet, css } from "svelte-styled-system";
import theme from "./theme";

export default theme => css`
  position: relative;

  &::after {
    position: absolute;
    left: 0;
    bottom: 0;
    height: ${themeGet(theme, "borderWidth.s")};
    width: 100%;
    background-color: currentcolor;
  }

  &:hover {
    &::after {
      content: "";
    }
  }
`;
```

Now we simply import and use the styles in our `App.svelte` component:

```jsx
import getStyles from "./Box.styles";
// ...
$: styles = getStyles($theme);
```

**Note:** If I got that right, exporting styles to separate files is somewhat against the design principles of Svelte. One of the main goals was that it should be possible to look at a component file and see everything the component does at a first glance.

Coming from a react background it feels natural to me to have styles in separate files (css modules) and I personally find it cleaner to separate them.
