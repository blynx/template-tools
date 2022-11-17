# Template Tools

Some experiments to handle and render template tags

```javascript
renderFragment({
    fragment: "#template-tag",
    parent: "#target",
    values: {
        "<selector relative to template>": "<value or function>",
        "[type='checkbox']": true,
        "[type='text']": "A new value",
        "textarea": "Set another value",
        "span": "Some textContent",
        "p": element => element.style.color = "red"
    }
})
```