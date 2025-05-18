function makeFrontHalfBold(text) {
  return text.replace(/\b\w+\b/g, (word) => {
    const half = Math.ceil(word.length / 2);
    return '<b>' + word.slice(0, half) + '</b>' + word.slice(half);
  });
}

function walk(node) {
  if (node.nodeType === 3) {
    const wrapper = document.createElement('span');
    wrapper.innerHTML = makeFrontHalfBold(node.nodeValue);
    node.parentNode.replaceChild(wrapper, node);
  } else if (
    node.nodeType === 1 &&
    node.nodeName !== 'SCRIPT' &&
    node.nodeName !== 'STYLE'
  ) {
    for (let i = 0; i < node.childNodes.length; i++) {
      walk(node.childNodes[i]);
    }
  }
}

walk(document.body);
