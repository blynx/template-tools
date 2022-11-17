export function clone(element) {
    if (element.localName === "template" && element.content) {
        return element.content.cloneNode(true)
    } else {
        return element.cloneNode(true)
    }
}

export function getElement(select) {
    if (typeof select === "string") {
        return  document.querySelector(select)
    } else if (select instanceof HTMLElement) {
        return select
    }
    return null
}