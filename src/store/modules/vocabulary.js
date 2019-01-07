import languages from '../../utils/lang'

const state = {
  vocabularies: {
    'lang': {
      terms: [
        { '@id': 'deu', 'skos:prefLabel': { 'eng': 'German', 'deu': 'Deutsch' } },
        { '@id': 'eng', 'skos:prefLabel': { 'eng': 'English', 'deu': 'English' } }
      ],
      loaded: true
    },
    'https://phaidra.org/vocabulary/role': {
      terms: [
        { '@id': 'initiator', 'skos:prefLabel': { 'eng': 'Initiator' } },
        { '@id': 'evaluator', 'skos:prefLabel': { 'eng': 'Evaluator' } },
        { '@id': 'technicalinspector', 'skos:prefLabel': { 'eng': 'Technical inspector' } },
        { '@id': 'textprocessor', 'skos:prefLabel': { 'eng': 'Textprocessor' } },
        { '@id': 'pedagogicexpert', 'skos:prefLabel': { 'eng': 'Pedagogic expert' } },
        { '@id': 'interpreter', 'skos:prefLabel': { 'eng': 'Interpreter' } },
        { '@id': 'digitiser', 'skos:prefLabel': { 'eng': 'Digitiser' } },
        { '@id': 'keeperoftheoriginal', 'skos:prefLabel': { 'eng': 'Keeper of the original' } },
        { '@id': 'adviser', 'skos:prefLabel': { 'eng': 'Adviser' } },
        { '@id': 'degreegrantor', 'skos:prefLabel': { 'eng': 'Degree grantor' } },
        { '@id': 'uploader', 'skos:prefLabel': { 'eng': 'Uploader' } },
        { '@id': 'dtc', 'skos:prefLabel': { 'eng': 'Data contributor' } },
        { '@id': 'aut', 'skos:prefLabel': { 'eng': 'Author' } },
        { '@id': 'pbl', 'skos:prefLabel': { 'eng': 'Publisher' } },
        { '@id': 'edt', 'skos:prefLabel': { 'eng': 'Editor' } },
        { '@id': 'dsr', 'skos:prefLabel': { 'eng': 'Designer' } },
        { '@id': 'trl', 'skos:prefLabel': { 'eng': 'Translator' } },
        { '@id': 'exp', 'skos:prefLabel': { 'eng': 'Expert' } },
        { '@id': 'oth', 'skos:prefLabel': { 'eng': 'Other' } },
        { '@id': 'art', 'skos:prefLabel': { 'eng': 'Artist' } },
        { '@id': 'dnr', 'skos:prefLabel': { 'eng': 'Donor' } },
        { '@id': 'pht', 'skos:prefLabel': { 'eng': 'Photographer' } },
        { '@id': 'jud', 'skos:prefLabel': { 'eng': 'Judge' } },
        { '@id': 'prf', 'skos:prefLabel': { 'eng': 'Performer' } },
        { '@id': 'wde', 'skos:prefLabel': { 'eng': 'Wood engraver' } },
        { '@id': 'rce', 'skos:prefLabel': { 'eng': 'Recording engineer' } },
        { '@id': 'sce', 'skos:prefLabel': { 'eng': 'Scenarist' } },
        { '@id': 'ths', 'skos:prefLabel': { 'eng': 'Thesis advisor' } },
        { '@id': 'sds', 'skos:prefLabel': { 'eng': 'Sound designer' } },
        { '@id': 'lyr', 'skos:prefLabel': { 'eng': 'Lyricist' } },
        { '@id': 'ilu', 'skos:prefLabel': { 'eng': 'Illuminator' } },
        { '@id': 'eng', 'skos:prefLabel': { 'eng': 'Engineer' } },
        { '@id': 'cnd', 'skos:prefLabel': { 'eng': 'Conductor' } },
        { '@id': 'dto', 'skos:prefLabel': { 'eng': 'Dedicator' } },
        { '@id': 'opn', 'skos:prefLabel': { 'eng': 'Opponent' } },
        { '@id': 'cmp', 'skos:prefLabel': { 'eng': 'Composer' } },
        { '@id': 'ctg', 'skos:prefLabel': { 'eng': 'Cartographer' } },
        { '@id': 'dub', 'skos:prefLabel': { 'eng': 'Dubious author' } },
        { '@id': 'wam', 'skos:prefLabel': { 'eng': 'Writer of accompanying material' } },
        { '@id': 'arc', 'skos:prefLabel': { 'eng': 'Architect' } },
        { '@id': 'vdg', 'skos:prefLabel': { 'eng': 'Videographer' } },
        { '@id': 'scl', 'skos:prefLabel': { 'eng': 'Sculptor' } },
        { '@id': 'aus', 'skos:prefLabel': { 'eng': 'Screenwriter' } },
        { '@id': 'own', 'skos:prefLabel': { 'eng': 'Owner' } },
        { '@id': 'fmo', 'skos:prefLabel': { 'eng': 'Former owner' } },
        { '@id': 'mus', 'skos:prefLabel': { 'eng': 'Musician' } },
        { '@id': 'ive', 'skos:prefLabel': { 'eng': 'Interviewee' } },
        { '@id': 'ill', 'skos:prefLabel': { 'eng': 'Illustrator' } },
        { '@id': 'cng', 'skos:prefLabel': { 'eng': 'Cinematographer' } },
        { '@id': 'dte', 'skos:prefLabel': { 'eng': 'Dedicatee' } },
        { '@id': 'sad', 'skos:prefLabel': { 'eng': 'Scientific advisor' } },
        { '@id': 'mte', 'skos:prefLabel': { 'eng': 'Metal-engraver' } },
        { '@id': 'arr', 'skos:prefLabel': { 'eng': 'Arranger' } },
        { '@id': 'etr', 'skos:prefLabel': { 'eng': 'Etcher' } },
        { '@id': 'dis', 'skos:prefLabel': { 'eng': 'Dissertant' } },
        { '@id': 'prt', 'skos:prefLabel': { 'eng': 'Printer' } },
        { '@id': 'flm', 'skos:prefLabel': { 'eng': 'Film editor' } },
        { '@id': 'rev', 'skos:prefLabel': { 'eng': 'Reviewer' } },
        { '@id': 'pro', 'skos:prefLabel': { 'eng': 'Producer' } },
        { '@id': 'att', 'skos:prefLabel': { 'eng': 'Attributed name' } },
        { '@id': 'lbt', 'skos:prefLabel': { 'eng': 'Librettist' } },
        { '@id': 'ivr', 'skos:prefLabel': { 'eng': 'Interviewer' } },
        { '@id': 'egr', 'skos:prefLabel': { 'eng': 'Engraver' } },
        { '@id': 'msd', 'skos:prefLabel': { 'eng': 'Musical director' } },
        { '@id': 'ard', 'skos:prefLabel': { 'eng': 'Artistic director' } },
        { '@id': 'chr', 'skos:prefLabel': { 'eng': 'Choreographer' } },
        { '@id': 'com', 'skos:prefLabel': { 'eng': 'Compiler' } },
        { '@id': 'sng', 'skos:prefLabel': { 'eng': 'Singer' } },
        { '@id': 'act', 'skos:prefLabel': { 'eng': 'Actor' } },
        { '@id': 'adp', 'skos:prefLabel': { 'eng': 'Adapter' } }
      ],
      loaded: true
    },
    'http://purl.org/coar/resource_type': {
      terms: [
        { '@id': 'http://purl.org/coar/resource_type/c_ecc8', 'skos:prefLabel': {'eng': 'still image'} },
        { '@id': 'http://purl.org/coar/resource_type/c_18cc', 'skos:prefLabel': {'eng': 'sound'} }
      ],
      loaded: true
    },
    'getty-aat-photo': {
      terms: [
        { '@id': 'http://vocab.getty.edu/aat/300162056', 'skos:prefLabel': {'eng': 'black-and-white photography'} },
        { '@id': 'http://vocab.getty.edu/aat/300134530', 'skos:prefLabel': {'eng': 'color photography'} }
      ],
      loaded: true
    },
    'un-cefact': {
      terms: [
        { '@id': 'MTR', 'skos:prefLabel': {'eng': 'm'} },
        { '@id': 'CMT', 'skos:prefLabel': {'eng': 'cm'} },
        { '@id': 'MMT', 'skos:prefLabel': {'eng': 'mm'} }
      ],
      loaded: true
    },
    'mime-types': {
      terms: [
        { '@id': 'image/jpeg', 'skos:prefLabel': {'eng': 'JPG/JPEG'} },
        { '@id': 'image/tiff', 'skos:prefLabel': {'eng': 'TIFF'} },
        { '@id': 'image/gif', 'skos:prefLabel': {'eng': 'GIF'} },
        { '@id': 'image/png', 'skos:prefLabel': {'eng': 'PNG'} },
        { '@id': 'image/x-ms-bmp', 'skos:prefLabel': {'eng': 'BMP'} },
        { '@id': 'audio/wav', 'skos:prefLabel': {'eng': 'WAVE'} },
        { '@id': 'audio/mpeg', 'skos:prefLabel': {'eng': 'MP3'} },
        { '@id': 'audio/flac', 'skos:prefLabel': {'eng': 'FLAC'} },
        { '@id': 'audio/ogg', 'skos:prefLabel': {'eng': 'Ogg'} },
        { '@id': 'application/pdf', 'skos:prefLabel': {'eng': 'PDF'} },
        { '@id': 'video/mpeg', 'skos:prefLabel': {'eng': 'MPEG'} },
        { '@id': 'video/avi', 'skos:prefLabel': {'eng': 'AVI'} },
        { '@id': 'video/mp4', 'skos:prefLabel': {'eng': 'MPEG-4'} },
        { '@id': 'video/quicktime', 'skos:prefLabel': {'eng': 'Quicktime'} },
        { '@id': 'video/x-matroska', 'skos:prefLabel': {'eng': 'MKV'} }
      ],
      loaded: true
    },
    'licenses': {
      terms: [
        { '@id': 'http://rightsstatements.org/vocab/InC/1.0/', 'skos:prefLabel': {'eng': 'All rights reserved', '@language': 'eng'} },
        { '@id': 'http://creativecommons.org/licenses/by/4.0/', 'skos:prefLabel': {'eng': 'CC BY 4.0 International', '@language': 'eng'} },
        { '@id': 'http://creativecommons.org/licenses/by-nc/4.0/', 'skos:prefLabel': {'eng': 'CC BY-NC 4.0 International', '@language': 'eng'} },
        { '@id': 'http://creativecommons.org/licenses/by-nc-nd/4.0/', 'skos:prefLabel': {'eng': 'CC BY-NC-ND 4.0 International', '@language': 'eng'} },
        { '@id': 'http://creativecommons.org/licenses/by-nc-sa/4.0/', 'skos:prefLabel': {'eng': 'CC BY-NC-SA 4.0 International', '@language': 'eng'} },
        { '@id': 'http://creativecommons.org/licenses/by-nd/4.0/', 'skos:prefLabel': {'eng': 'CC BY-ND 4.0 International', '@language': 'eng'} },
        { '@id': 'http://creativecommons.org/licenses/by-sa/4.0/', 'skos:prefLabel': {'eng': 'CC BY-SA 4.0 International', '@language': 'eng'} }
      ],
      loaded: true
    },
    'original-copy': {
      terms: [
        { '@id': 'original', 'skos:prefLabel': {'eng': 'original'} },
        { '@id': 'copy', 'skos:prefLabel': {'eng': 'copy'} }
      ],
      loaded: true
    }
  }
}

const mutations = {
  setLangTerms (state, data) {
    state.vocabularies['lang']['terms'] = data
  },
  setRolesTerms (state, marcRoles) {
    for (var role in marcRoles) {
      state.vocabularies['https://phaidra.org/vocabulary/role'].terms.push({ '@id': role, 'skos:prefLabel': {'eng': marcRoles[role]} })
    }
    state.vocabularies['https://phaidra.org/vocabulary/role'].loaded = true
  }
}

const actions = {
  loadIso6392 ({ commit }) {
    commit('setLangTerms', languages.get_lang())
  }
}

const getters = {
  getLocalizedTermLabel: (state) => (voc, id, lang) => {
    var terms = state.vocabularies[voc].terms
    for (var i = 0; i < terms.length; i++) {
      if (terms[i]['@id'] === id) {
        return terms[i]['skos:prefLabel'][lang] ? terms[i]['skos:prefLabel'][lang] : terms[i]['skos:prefLabel']['eng']
      }
    }
  },
  getTerm: (state) => (voc, id) => {
    var terms = state.vocabularies[voc].terms
    for (var i = 0; i < terms.length; i++) {
      if (terms[i]['@id'] === id) {
        return terms[i]
      }
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
