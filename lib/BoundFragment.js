import { getElement, clone } from "./lib"

class Ref {
    name = null
    element = null
    setFn = null

    constructor({name, element, setFn}) {
        this.name = name
        this.element = element
        this.setFn = setFn || (element.localName === "input" ? this.setValue.bind(this) : this.setText.bind(this))
    }

    set(value) {
        this.setFn.call(null, this.element, value)
    }

    setValue(element, value) {
        element.value = value
    }

    setText(element, value) {
        element.textContent = value
    }
}

export default class BoundFragment {
    #source = null
    #element = null
    #refs = new Map()

    get element() {
        return this.#element
    }

    constructor(select, bindings) {
        if (select !== "string" && !(select instanceof HTMLElement)) {
            throw Error("First argument must be an Element or a selector string")
        }
        this.#source = getElement(select)
        this.#element = clone(this.#source)
        this.#buildBindings(bindings)
    }

    #buildBindings(bindings) {
        for (const binding of bindings) {
            let target = this.#element.querySelector(binding.select) || this.#element
            if (target instanceof DocumentFragment) continue
            let ref = new Ref({
                element: target,
                name: binding.name,
                setFn: binding.setFn,
            })
            this.#refs.set(binding.name, ref)
        }
    }

    set(data) {
        for (const [key, value] of Object.entries(data)) {
            this.#refs.get(key).set(value)
        }
        return this
    }
}

export function renderFragment({fragment, values, parent, prepend = false}) {
    let element = clone(getElement(fragment))
    for (const [select, value] of Object.entries(values)) {
        let target = element.querySelector(select)
        if (!target) continue
        if (target.localName === "input") {
            target.value = value
        } else {
            target.textContent = value
        }
    }
    if (prepend) return getElement(parent).prepend(element)
    return getElement(parent).append(element)
}
