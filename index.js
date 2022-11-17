import BoundFragment from "./lib/BoundFragment";
import renderFragment from "./lib/renderFragment";

let listItemBindings = [{
    name: "text",
    select: "li > b"
}, {
    name: "info",
    select: "li > i"
}, {
    name: "right",
    select: "li > :last-child",
    setFn: (element, value) => element.textContent = value
}]

let listItem = new BoundFragment(document.querySelector("#list-item-template"), listItemBindings)

listItem.set({
    text: "Clone a <template>",
    info: "Initially."
})

document.querySelector("#list").appendChild(listItem.element)

listItem.set({
    info: "Subsequent updates.",
    right: "ok, nice"
})

renderFragment({
    fragment: "#list-item-template",
    parent: "#list",
    values: {
        "li > b": "Hello from",
        "li > i": "renderFragment()",
        "li :last-child": "ok, cool"
    }
})

// 2

renderFragment({
    fragment: "#example-2",
    parent: "#place-2-be",
    values: {
        "[type='checkbox']": true,
        "[type='text']": "A new value",
        "textarea": "ok, cool",
        "p": element => element.style.color = "red"
    }
})
