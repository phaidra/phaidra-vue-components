import vocabulary from '../store/modules/vocabulary'

var roles = {
  'role:aut': 1,
  'role:advisor': 2,
  'role:coadvisor': 3,
  'role:assessor': 4
}
let i = Object.keys(roles).length;
for (let r of vocabulary.state.vocabularies.rolepredicate.terms) {
  i++
  if (!roles[r['@id']]) {
    roles[r['@id']] = i
  }
}

export default {
  roles
}
