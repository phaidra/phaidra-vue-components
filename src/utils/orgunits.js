export default {
  getOrgUnitsTerms (orgunits, units, parent) {
    for (let u of units) {
      orgunits.push(u)
      u.parent = parent
      if (u['subunits']) {
        if (u.subunits.length > 0) {
          this.getOrgUnitsTerms(orgunits, u.subunits, u)
        }
      }
    }
  }
}
