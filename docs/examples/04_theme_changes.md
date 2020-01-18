# Example 4 - theme changes

**TLDR:** [https://svelte.dev/repl/07480ccc08b841048202365140582074?version=3.17.1](https://svelte.dev/repl/07480ccc08b841048202365140582074?version=3.17.1)

Our component not only reacts to local variable changes, you can also change theme values during runtime and see all changes taking effect immediately.

Let's test that! For our demo we add two simple `<input>` elements and bind their values to our primary and secondary colors:

```jsx
<script>import theme from './theme.js' // ...</script>
```

```jsx
<input bind:value={$theme.color.primary}/>
<input bind:value={$theme.color.secondary}/>
```

Any valid CSS color codes will work!

Try `palevioletred` for primary and `pink` for secondary and see the box respond to your changes immediately.
