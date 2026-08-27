function addPagefindWeight(html) {
  if (!html || html.includes('data-pagefind-weight=')) return html;
  return html.replace(/<(div|pre)(\s|>)/, '<$1 data-pagefind-weight="0.5"$2');
}

function wrapRenderer(md, ruleName) {
  const original = md.renderer.rules[ruleName];
  if (!original) return;

  md.renderer.rules[ruleName] = function (...args) {
    return addPagefindWeight(original.apply(this, args));
  };
}

module.exports = (md) => {
  wrapRenderer(md, 'fence');
  wrapRenderer(md, 'code_block');
};
