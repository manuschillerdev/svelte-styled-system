# Examples: Working with pseudo elements / pesudo classes

**TLDR:** [https://svelte.dev/repl/0390ad4f8bf84c2dbaed404362dba3ad?version=3.17.1](https://svelte.dev/repl/0390ad4f8bf84c2dbaed404362dba3ad?version=3.17.1)

We can do a lot with styling props, but they have their limits. For example: **pseudo elements** and **pseudo classes**.

Lets say our `Box` should show a colored `::after` element on the bottom on hover.

To stay in our system we first update our theme with available border widths:

```jsx
// theme.js
export default writable({
  borderWidth: {
    s: "0.25rem",
    m: "0.5rem",
    l: "0.75rem"
  }
  // ...color: {}
});
```

Back in our `Box` component we need to import `css` and `themeGet` from `svelte-styled-system`.
`css` is an 1:1 export of the `goober` version currently supported by `svelte-styled-system`. If you don't know `goober` yet, [please check it out immediately!](https://github.com/cristianbote/goober). It's a highly performant CSS-in-JSS solution that adds only ~1kb to your bundle in total.

Let's finally write some CSS!

```jsx
// Box.svelte
<script>
	import {css, themeGet} from 'svelte-styled-system';
	// ...
	$: styles = css`
    position: relative;

    &::after {
      position: absolute;
      left: 0;
      bottom: 0;
      height: ${themeGet($theme, "borderWidth.s")};
      width: 100%;
      background-color: currentcolor;
    }

    &:hover {
      &::after {
        content: "";
      }
    }
  `;
</script>
```

We define our styles as reactive declaration. By using `themeGet($theme, "path.to.definition")` we can easily grab values from our theme at any time. The styles will get updated automatically by svelte whenever the used theme values change.

The return value of ` css`` ` is the class name, that `goober` appended to the document. All we got left to do is apply it to our DOM element:

```jsx
	<div use:styled={[$$props, $theme]} class={styles}>
```

That's it! The border changes on hover and still uses our theme definition!
