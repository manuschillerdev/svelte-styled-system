# Examples 3 - change styles based on current scope variables

**TLDR:** [https://svelte.dev/repl/32e3b049aa884df68b286f9fc5a4873e?version=3.17.1](https://svelte.dev/repl/32e3b049aa884df68b286f9fc5a4873e?version=3.17.1)

What if we want our `Box` to change its styling based on variables in the current scope?

Let's introduce a local control variable `inverted`:

```jsx
<script>//... let inverted = false</script>
```

And use it in our `Box`:

```jsx
<Box
  bg={inverted ? "color.secondary" : "color.primary"}
  color={inverted ? "color.primary" : "color.secondary"}
>
  ...
</Box>
```

For our demo we finally add a simple, unstyled button to trigger the changes:

```jsx
<button on:click={() => (inverted = !inverted)}>
  click me to invert the box styling
</button>
```
