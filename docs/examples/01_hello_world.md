# Example 1 - Hello World

**TLDR:** [https://codesandbox.io/s/funny-gauss-gconn](https://codesandbox.io/s/funny-gauss-gconn)

Let's create our first Box!

A styled `Box` that uses variables from a theme definition.

First we start by defining some example values for our theme.

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
