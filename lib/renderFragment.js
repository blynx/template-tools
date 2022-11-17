import { getElement, clone } from "./lib"

/**
 * renderFragment
 * 
 * Render a cloned DOM element/fragment or contents of a template tag.
 * Provide simple values to be rendered via a values object in the form of:
 *  {
 *      <selector>: <value>,
 *      ".some-element > h2": "A Title",
 *      ".something-else p:last-child": element => element.style.color = "red",
 *  }
 * The selector will query relative to the selected fragment.
 *  
 * @param {Object} po Parameter object
 * @param {string | Element} po.fragment Element reference or selector for dom element or <template> to render
 * @param {string | Element} po.parent Element reference or selector for dom element or <template> to append/prepend to
 * @param {Record<string, ?>} [po.values={}] Values object
 * @param {boolean} [po.prepend=false] Insert element by...
 * @returns {undefined}
 */
export default function renderFragment({fragment, parent, values = {}, prepend = false}) {
    let element = clone(getElement(fragment))
    for (const [select, value] of Object.entries(values)) {
        let target = element.querySelector(select)
        if (!target) continue
        if (typeof value === "function") {
            value.call(null, target); continue
        }
        if (target.localName === "input" && target.type === "checkbox") {
            target.checked = !!value; continue
        }
        if (target.localName === "input" || target.localName === "textarea") {
            target.value = value; continue
        }
        target.textContent = value
    }
    if (prepend) return getElement(parent).prepend(element)
    return getElement(parent).append(element)
}
