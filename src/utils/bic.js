export default {
  getBicTerms (terms, tree, parent) {
    for (let t of tree) {
      let clone = JSON.parse(JSON.stringify(t))
      clone['children'] = null
      terms.push(clone)
      // can't do this with SSR
      // TypeError: Converting circular structure to JSON at JSON.stringify (<anonymous>)
      // u.parent = parent
      if (t['children']) {
        if (t.children.length > 0) {
          this.getBicTerms(terms, t.children, t)
        }
      }
    }
  },
  sortBicTree (tree, locale) {
    if (Array.isArray(tree)) {
      if (tree[0]) {
        tree.sort(function (a, b) {
          return a['skos:prefLabel'][locale].localeCompare(b['skos:prefLabel'][locale], locale)
        })
      }
    }
    for (let t of tree) {
      if (t['children']) {
        this.sortBicTree(t['children'], locale)
      }
    }
  }
}
