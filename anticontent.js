console.log("Reverse BoldPrefix mutation start.\n") // Remove when extension goes public

function reverseBold(node) {
    // takes a snapshot this node’s direct children into a static array.
    // node.childNodes is a live NodeList that updates as you modify the DOM,
    // so removing/unwrapping elements during traversal would shift its contents
    // and skip siblings. Converting to a plain Array ensures each child is visited exactly once.
    const children = Array.from(node.childNodes);

    // recurse into each branch of the tree
    children.forEach(child => reverseBold(child));

    if(node.nodeType !== Node.ELEMENT_NODE) return;

    switch (node.tagName) {
        case 'B' :
            // replaces the entire text contained with <b> ... </b> element with plain text node.
            node.replaceWith(document.createTextNode(node.textContent))
            break;

        case 'SPAN':
            // during the bolding phase we wrapped mixed <b>...</b> and text elements in a <span> ... </span>
            // so that document fragments stayed together. To revert that:
            // 1. move every child of the span up one level, inserting the child
            //    immediately before the span itself
            // 2. remove the now-empty <span> wrapper with removeChild()
            // 3. call normalize() on the parent to merge any adjacent text nodes
            //    back into a single contiguous string
            const parent = node.parentNode;
            while (node.firstChild) {
                parent.insertBefore(node.firstChild, node);
            }
            parent.removeChild(node);
            parent.normalize();
            break;
    }
}

reverseBold(document.body);