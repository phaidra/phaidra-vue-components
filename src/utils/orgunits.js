export default {
  getOrgUnitsTerms (orgunits, units, parent) {
    for (let u of units) {
      orgunits.push(u)
      // can't do this with SSR
      // TypeError: Converting circular structure to JSON at JSON.stringify (<anonymous>)
      // u.parent = parent
      if (u['subunits']) {
        if (u.subunits.length > 0) {
          this.getOrgUnitsTerms(orgunits, u.subunits, u)
        }
      }
    }
  },
  sortOrgUnitsTree (u, locale) {
    if (u['subunits']) {
      u['subunits'].sort(function (a, b) {
        return a['skos:prefLabel'][locale].localeCompare(b['skos:prefLabel'][locale], locale)
      })
      for (let unit of u['subunits']) {
        this.sortOrgUnitsTree(unit, locale)
      }
    }
  }
}
