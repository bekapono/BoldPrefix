console.log("BoldPrefix mutation start.\n") // Remove when extension goes public

// Future Enhancements: if a word only consists of two letters bold whole word.
function makeFrontHalfBold(text) {
  return text.replace(/\b\w+\b/g, (word) => {
    const half = Math.ceil(word.length / 2);
    return '<b>' + word.slice(0, half) + '</b>' + word.slice(half);
  });
}

// This functions goes through
function walk(node) {
  // Checks if node type is TEXT_NODE, and the text is empty
  if (node.nodeType === 3 && node.nodeValue.trim().length !== 0) {
    //console.log('Mutating: ', node)  // remove when program is public

    const wrapper = document.createElement('span');
    wrapper.innerHTML = makeFrontHalfBold(node.nodeValue);
    // .innerHTML flattens the div
    console.log('Post-Mutation: ', wrapper.innerHTML) // remove when program is public

    // .replaceChild removes the previous text with the mutated text.
    node.parentNode.replaceChild(wrapper, node);
  }
  else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {

    for (let i = 0; i < node.childNodes.length; i++) {
      //console.log("None TEXT_NODE", node, node.nodeValue) // remove when program is public
      walk(node.childNodes[i]);
    }
  }
}

walk(document.body);
