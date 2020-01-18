# Examples 2 - Responsive values

**TLDR:** [https://svelte.dev/repl/4601e261b1ec446ebe6f3a595f86fb12?version=3.17.1](https://svelte.dev/repl/4601e261b1ec446ebe6f3a595f86fb12?version=3.17.1)

we want our `Box` to change its padding based on the current viewport.

All we got to change is our static shorthand property `p`:

```jsx
p = "space.l";
```

…to:

```jsx
p={["space.s", "space.m", "space.l"]}
```

**That's it.** Resize your viewport to see the different paddings applied.

**Note:** you can use the responsive array notation with every available prop.

### Background:

According to our theme definition these values get mapped to the breakpoints array by their index:

| index | value   | breakpoint |
| ----- | ------- | ---------- |
| 0     | space.s | 20rem      |
| 1     | space.m | 48rem      |
| 2     | space.l | 64rem      |

```jsx
// theme.js
import { writable } from "svelte/store";
export default writable({
  // ...
  space: {
    s: "0.5rem",
    m: "1rem",
    l: "2rem"
  },
  // ...
  breakpoints: ["20rem", "48rem", "64rem"]
});
```
