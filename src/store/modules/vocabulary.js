import languages from '../../utils/lang'
import lang3to2map from '../../utils/lang3to2map'
import orgunits from '../../utils/orgunits'
import axios from 'axios'

const lang2to3map = Object.keys(lang3to2map).reduce((ret, key) => {
  ret[lang3to2map[key]] = key;
  return ret;
}, {})

const ns = 'https://pid.phaidra.org/vocabulary/'

const ot4rt = {
  // image
  'https://pid.phaidra.org/vocabulary/44TN-P1S0': [
    // drawing
    ns + '85QM-7TZ3',
    // painting
    ns + 'WWS3-0ACP',
    // print
    ns + '7WYH-AZ8C',
    // wall chart
    ns + 'QM0R-ZTAA',
    // score
    ns + 'XTVH-3MG3',
    // arrangement (music)
    ns + '2WRQ-GSE9',
    // musical notation
    ns + '8A6X-FKB1',
    // cartographic material
    ns + '62RJ-SFV2',
    // atlas
    ns + '9J46-2X9E',
    // map
    ns + 'A52A-CWMM',
    // newspaper
    ns + 'DCHD-W3GM',
    // newspaper article
    ns + 'CJJG-VKRQ',
    // magazine
    ns + 'EHPQ-XYA3',
    // photograph
    ns + '7CAB-P987',
    // negative
    ns + '9W35-5Q94',
    // postcard
    ns + 'Q4Q5-3554',
    // poster
    ns + '6EFK-BRQD',
    // letter
    ns + 'GBWA-JJP8',
    // manuscript
    ns + 'KMRH-NFR9',
    // cultural artifact
    ns + 'CPVB-YXG6',
    // slide (Diapositiv)
    ns + '431H-5YSA',
    // learning object
    ns + 'YA8R-1M0D',
    // diary
    ns + 'A9K1-3WQA',
    // cover
    ns + 'CEET-8C4S',
    // album cover
    ns + '985A-GCQJ',
    // sculpture
    ns + '21HZ-XP29',
    // yearbook
    ns + 'HARH-6R3C',
    // other
    ns + 'PYRE-RAWJ'
  ],
  // text
  'https://pid.phaidra.org/vocabulary/69ZZ-2KGX': [
    // print
    ns + '7WYH-AZ8C',
    // interview
    ns + '8KGA-CH97',
    // score
    ns + 'XTVH-3MG3',
    // musical notation
    ns + '8A6X-FKB1',
    // periodical
    ns + 'GY3Z-50FT',
    // newspaper
    ns + 'DCHD-W3GM',
    // newspaper article
    ns + 'CJJG-VKRQ',
    // magazine
    ns + 'EHPQ-XYA3',
    // postcard
    ns + 'Q4Q5-3554',
    // poster
    ns + '6EFK-BRQD',
    // letter (correspondence)
    ns + 'GBWA-JJP8',
    // slide
    ns + '431H-5YSA',
    // report part
    ns + 'PHQ7-BGFA',
    // internal report
    ns + 'QXRQ-Z2PJ',
    // other type of report
    ns + '6QRG-9GN2',
    // policy report
    ns + 'XWWK-533P',
    // project deliverable
    ns + 'T8PK-GADB',
    // data management plan
    ns + 'W2Z3-3YA6',
    // report to funding agency
    ns + 'APV5-CJSF',
    // research report
    ns + '7J0J-HC61',
    // research software
    ns + 'VM3E-HXE6',
    // memorandum
    ns + 'MCN9-1NSA',
    // book review
    ns + 'VP4W-DQ1P',
    // lecture
    ns + 'F4JN-ZST0',
    // annual report
    ns + '8EBX-CA9X',
    // questionnaire
    ns + 'MZ2Q-R099',
    // learning object
    ns + 'YA8R-1M0D',
    // diary
    ns + 'A9K1-3WQA',
    // conference object
    ns + 'QKDF-E5HA',
    // yearbook
    ns + 'HARH-6R3C',
    // other
    ns + 'PYRE-RAWJ'
  ],
  // video
  'https://pid.phaidra.org/vocabulary/B0Y6-GYT8': [
    // interview
    ns + '8KGA-CH97',
    // lecture
    ns + 'F4JN-ZST0',
    // learning object
    ns + 'YA8R-1M0D',
    // podcast
    ns + 'JF85-NYRJ',
    // other
    ns + 'PYRE-RAWJ'
  ],
  // data
  'https://pid.phaidra.org/vocabulary/7AVS-Y482': [
    // questionnaire
    ns + 'MZ2Q-R099',
    // learning object
    ns + 'YA8R-1M0D',
    // other
    ns + 'PYRE-RAWJ'
  ],
  // sound
  'https://pid.phaidra.org/vocabulary/8YB5-1M0J': [
    // interview
    ns + '8KGA-CH97',
    // music album
    ns + 'M789-K5E0',
    // music album
    ns + 'EWZ9-3MPH',
    // lecture
    ns + 'F4JN-ZST0',
    // learning object
    ns + 'YA8R-1M0D',
    // podcast
    ns + 'JF85-NYRJ',
    // other
    ns + 'PYRE-RAWJ'
  ],
  // resource
  'https://pid.phaidra.org/vocabulary/T8GH-F4V8': [
    // learning object
    ns + 'YA8R-1M0D',
    // other
    ns + 'PYRE-RAWJ'
  ]
}

const state = {
  vocabularies: {
    'relations': {
      terms: [
        { '@id': 'http://purl.org/dc/terms/references', 'skos:prefLabel': { 'eng': 'References' }, 'skos:notation': [ 'references' ] },
        { '@id': 'http://phaidra.org/XML/V1.0/relations#isBackSideOf', 'skos:prefLabel': { 'eng': 'Is back side of' }, 'skos:notation': [ 'isBackSideOf' ] },
        { '@id': 'http://phaidra.org/XML/V1.0/relations#isThumbnailFor', 'skos:prefLabel': { 'eng': 'Is thumbnail for' }, 'skos:notation': [ 'isThumbnailFor' ] },
        { '@id': 'http://phaidra.univie.ac.at/XML/V1.0/relations#hasSuccessor', 'skos:prefLabel': { 'eng': 'Is older version of' }, 'skos:notation': [ 'hasSuccessor' ] },
        { '@id': 'http://phaidra.org/XML/V1.0/relations#isAlternativeFormatOf', 'skos:prefLabel': { 'eng': 'Is alternative format of' }, 'skos:notation': [ 'isAlternativeFormatOf' ] },
        { '@id': 'http://phaidra.org/XML/V1.0/relations#isAlternativeVersionOf', 'skos:prefLabel': { 'eng': 'Is alternative version of' }, 'skos:notation': [ 'isAlternativeVersionOf' ] },
        { '@id': 'info:fedora/fedora-system:def/relations-external#hasCollectionMember', 'skos:prefLabel': { 'eng': 'Has part' }, 'skos:notation': [ 'hasCollectionMember' ] },
        { '@id': 'http://pcdm.org/models#hasMember', 'skos:prefLabel': { 'eng': 'Has member' }, 'skos:notation': [ 'hasMember' ] }
      ],
      loaded: true
    },
    'pool': {
      terms: [
        { '@id': 'Bibliothek', 'skos:prefLabel': { 'eng': 'Bibliothek' } },
        { '@id': 'Institut für Romanistik', 'skos:prefLabel': { 'eng': 'Institut für Romanistik' } },
        { '@id': 'privat', 'skos:prefLabel': { 'eng': 'privat' } }
      ],
      loaded: true
    },
    'datepredicate': {
      terms: [
        { '@id': 'dcterms:date', 'skos:prefLabel': { 'eng': 'Date', 'deu': 'Datum' } },
        { '@id': 'dcterms:created', 'skos:prefLabel': { 'eng': 'Date created', 'deu': 'Date created' } },
        { '@id': 'dcterms:modified', 'skos:prefLabel': { 'eng': 'Date modified', 'deu': 'Date modified' } },
        { '@id': 'dcterms:available', 'skos:prefLabel': { 'eng': 'Date available', 'deu': 'Date available' } },
        { '@id': 'dcterms:issued', 'skos:prefLabel': { 'eng': 'Date issued', 'deu': 'Date issued' } },
        { '@id': 'dcterms:valid', 'skos:prefLabel': { 'eng': 'Date valid', 'deu': 'Date valid' } },
        { '@id': 'dcterms:dateAccepted', 'skos:prefLabel': { 'eng': 'Date accepted', 'deu': 'Date accepted' } },
        { '@id': 'dcterms:dateCopyrighted', 'skos:prefLabel': { 'eng': 'Date copyrighted', 'deu': 'Date copyrighted' } },
        { '@id': 'dcterms:dateSubmitted', 'skos:prefLabel': { 'eng': 'Date submitted', 'deu': 'Date submitted' } },
        { '@id': 'rdau:P60071', 'skos:prefLabel': { 'eng': 'Date of production', 'deu': 'Produktionsdatum' } },
        { '@id': 'phaidra:dateAccessioned', 'skos:prefLabel': { 'eng': 'Date accessioned', 'deu': 'Eingangsdatum' } },
        { '@id': 'dcterms:temporal', 'skos:prefLabel': { 'eng': 'Temporal coverage', 'deu': 'Zeitliche Abdeckung' } }
      ],
      loaded: true
    },
    'placetype': {
      terms: [
        { '@id': 'schema:Place', 'skos:prefLabel': { 'eng': 'Place' } },
        { '@id': 'schema:AdministrativeArea', 'skos:prefLabel': { 'eng': 'AdministrativeArea' } }
      ],
      loaded: true
    },
    'objectidentifiertype': {
      terms: [
        { '@id': 'ids:doi', 'skos:prefLabel': { 'eng': 'DOI' }, 'skos:example': '10.1629/uksg.419' },
        { '@id': 'ids:hdl', 'skos:prefLabel': { 'eng': 'Handle' }, 'skos:example': '11353/10.761200' },
        { '@id': 'ids:urn', 'skos:prefLabel': { 'eng': 'URN' }, 'skos:example': 'urn:nbn:at:at-ubw-21405.98566.193074-2' },
        { '@id': 'ids:uri', 'skos:prefLabel': { 'eng': 'URI' }, 'skos:example': 'https://example.com/path/resource.txt' },
        { '@id': 'ids:isbn', 'skos:prefLabel': { 'eng': 'ISBN' }, 'skos:example': '978-3-16-148410-0' },
        { '@id': 'phaidra:acnumber', 'skos:prefLabel': { 'eng': 'AC number' }, 'skos:example': 'AC13399179' }
      ],
      loaded: true
    },
    'irobjectidentifiertype': {
      terms: [
        { '@id': 'ids:doi', 'skos:prefLabel': { 'eng': 'DOI' }, 'skos:example': '10.1629/uksg.419' },
        { '@id': 'ids:hdl', 'skos:prefLabel': { 'eng': 'Handle' }, 'skos:example': '11353/10.761200' },
        { '@id': 'ids:urn', 'skos:prefLabel': { 'eng': 'URN' }, 'skos:example': 'urn:nbn:at:at-ubw-21405.98566.193074-2' },
        { '@id': 'ids:isbn', 'skos:prefLabel': { 'eng': 'ISBN' }, 'skos:example': '978-3-16-148410-0' },
        { '@id': 'ids:uri', 'skos:prefLabel': { 'eng': 'URI/URL' }, 'skos:example': 'https://example.com/path/resource.txt' }
      ],
      loaded: true
    },
    'irobjectidentifiertypenoisbn': {
      terms: [
        { '@id': 'ids:doi', 'skos:prefLabel': { 'eng': 'DOI' }, 'skos:example': '10.1629/uksg.419' },
        { '@id': 'ids:hdl', 'skos:prefLabel': { 'eng': 'Handle' }, 'skos:example': '11353/10.761200' },
        { '@id': 'ids:urn', 'skos:prefLabel': { 'eng': 'URN' }, 'skos:example': 'urn:nbn:at:at-ubw-21405.98566.193074-2' },
        { '@id': 'ids:uri', 'skos:prefLabel': { 'eng': 'URI/URL' }, 'skos:example': 'https://example.com/path/resource.txt' }
      ],
      loaded: true
    },
    'entityidentifiertype': {
      terms: [
        { '@id': 'ids:orcid', 'skos:prefLabel': { 'eng': 'ORCID' }, 'skos:example': '0000-0002-1825-0097' },
        { '@id': 'ids:gnd', 'skos:prefLabel': { 'eng': 'GND' }, 'skos:example': '118635808' },
        { '@id': 'ids:viaf', 'skos:prefLabel': { 'eng': 'VIAF' }, 'skos:example': '89597697' },
        { '@id': 'ids:wikidata', 'skos:prefLabel': { 'eng': 'Wikidata ID' }, 'skos:example': 'Q129772' },
        { '@id': 'ids:lcnaf', 'skos:prefLabel': { 'eng': 'LCNAF' }, 'skos:example': 'n79021164' },
        { '@id': 'ids:isni', 'skos:prefLabel': { 'eng': 'ISNI' }, 'skos:example': '0000000121174585' }
      ],
      loaded: true
    },
    'citationpredicate': {
      terms: [
        { '@id': 'cito:cites', 'skos:prefLabel': { 'eng': 'Cites' } },
        { '@id': 'cito:isCitedBy', 'skos:prefLabel': { 'eng': 'Is cited by' } }
      ],
      loaded: true
    },
    'rolepredicate': {
      terms: [
        { '@id': 'role:abr', 'skos:prefLabel': { 'eng': 'Abridger', 'deu': 'Abridger', 'ita': 'Abridger' } },
        { '@id': 'role:act', 'skos:prefLabel': { 'eng': 'Actor', 'deu': 'Schauspieler*in', 'ita': 'Attore' } },
        { '@id': 'role:adp', 'skos:prefLabel': { 'eng': 'Adapter', 'deu': 'Bearbeiter*in', 'ita': 'Adattatore' } },
        { '@id': 'role:rcp', 'skos:prefLabel': { 'eng': 'Addressee', 'deu': 'Adressat*in', 'ita': 'Destinatario' } },
        { '@id': 'role:advisor', 'skos:prefLabel': { 'eng': 'Adviser', 'deu': 'Betreuer*in', 'ita': 'Consigliere' } },
        { '@id': 'role:anl', 'skos:prefLabel': { 'eng': 'Analyst', 'deu': 'Dateninterpret*in', 'ita': 'Analista' } },
        { '@id': 'role:anm', 'skos:prefLabel': { 'eng': 'Animator', 'deu': 'Animator*in', 'ita': 'Animator' } },
        { '@id': 'role:ann', 'skos:prefLabel': { 'eng': 'Annotator', 'deu': 'Autor*in von Anmerkungen', 'ita': 'Annotatore' } },
        { '@id': 'role:apl', 'skos:prefLabel': { 'eng': 'Appelant', 'deu': 'Kläger*in', 'ita': 'Appelant' } },
        { '@id': 'role:ape', 'skos:prefLabel': { 'eng': 'Appellee', 'deu': 'Beklagte', 'ita': 'Appellee' } },
        { '@id': 'role:app', 'skos:prefLabel': { 'eng': 'Applicant', 'deu': 'Antragsteller*in', 'ita': 'Applicant' } },
        { '@id': 'role:arc', 'skos:prefLabel': { 'eng': 'Architect', 'deu': 'Architekt*in', 'ita': 'Architetto' } },
        { '@id': 'role:arr', 'skos:prefLabel': { 'eng': 'Arranger', 'deu': 'Arrangeur*in', 'ita': 'Arrangiatore' } },
        { '@id': 'role:acp', 'skos:prefLabel': { 'eng': 'Art copyist', 'deu': 'Kunstkopist*in', 'ita': 'Art copyist' } },
        { '@id': 'role:adi', 'skos:prefLabel': { 'eng': 'Art director', 'deu': 'Szenenbildner*in', 'ita': 'Art director' } },
        { '@id': 'role:art', 'skos:prefLabel': { 'eng': 'Artist', 'deu': 'Künstler*in', 'ita': 'Artista' } },
        { '@id': 'role:ard', 'skos:prefLabel': { 'eng': 'Artistic director', 'deu': 'künstlerische/r Leiter*in', 'ita': 'Direttore artistico' } },
        { '@id': 'role:assessor', 'skos:prefLabel': { 'eng': 'Assessor', 'deu': 'Beurteiler*in', 'ita': 'Assessor' } },
        { '@id': 'role:asg', 'skos:prefLabel': { 'eng': 'Assignee', 'deu': 'Rechtsnachfolger*in', 'ita': 'Assignee' } },
        { '@id': 'role:asn', 'skos:prefLabel': { 'eng': 'Associated name', 'deu': 'Assoziierter Name', 'ita': 'Associated name' } },
        { '@id': 'role:att', 'skos:prefLabel': { 'eng': 'Attributed name', 'deu': 'zugeschriebene/r Autor*in', 'ita': 'Nome attribuito' } },
        { '@id': 'role:auc', 'skos:prefLabel': { 'eng': 'Auctioneer', 'deu': 'Auktionator*in', 'ita': 'Auctioneer' } },
        { '@id': 'role:aut', 'skos:prefLabel': { 'eng': 'Author', 'deu': 'Autor*in', 'ita': 'Author' } },
        { '@id': 'role:aqt', 'skos:prefLabel': { 'eng': 'Author in quotations or text abstracts', 'deu': 'Autor*in in Zitaten oder Zusammenfassungen', 'ita': 'Author in quotations or text abstracts' } },
        { '@id': 'role:aft', 'skos:prefLabel': { 'eng': 'Author of afterword, colophon, etc.', 'deu': 'Autor*in des Nachworts, Kolophon…', 'ita': 'Author of afterword, colophon, etc.' } },
        { '@id': 'role:aud', 'skos:prefLabel': { 'eng': 'Author of dialog', 'deu': 'Kommentator*in', 'ita': 'Autore del dialogo' } },
        { '@id': 'role:aui', 'skos:prefLabel': { 'eng': 'Author of introduction', 'deu': 'Autor*in der Einleitung', 'ita': 'Autore dell\'introduzione' } },
        { '@id': 'role:authorofsubtitles', 'skos:prefLabel': { 'eng': 'Author of subtitles', 'deu': 'Autor*in der Untertitel', 'ita': 'Autore dei sottotitoli' } },
        { '@id': 'role:ato', 'skos:prefLabel': { 'eng': 'Autographer', 'deu': 'Unterzeichnende/r', 'ita': 'Autographer' } },
        { '@id': 'role:ant', 'skos:prefLabel': { 'eng': 'Bibliographic antecedent', 'deu': 'Verfasser*in der literarischen Vorlage', 'ita': 'Antecedente bibliografico' } },
        { '@id': 'role:bnd', 'skos:prefLabel': { 'eng': 'Binder', 'deu': 'Buchbinder*in', 'ita': 'Legatore' } },
        { '@id': 'role:bdd', 'skos:prefLabel': { 'eng': 'Binding designer', 'deu': 'Binde-Designer*in', 'ita': 'Binding designer' } },
        { '@id': 'role:blw', 'skos:prefLabel': { 'eng': 'Blurb writer (missing space)', 'deu': 'Autor*in des Klappentextes', 'ita': 'Blurbwriter' } },
        { '@id': 'role:bkd', 'skos:prefLabel': { 'eng': 'Book designer', 'deu': 'Designer*in des analogen Buches', 'ita': 'Designer del libro' } },
        { '@id': 'role:bkp', 'skos:prefLabel': { 'eng': 'Book producer', 'deu': 'Buchproduzent*in', 'ita': 'Book producer' } },
        { '@id': 'role:bjd', 'skos:prefLabel': { 'eng': 'Bookjacket designer', 'deu': 'Designer*in des Buchumschlages / Schutzumschlages', 'ita': 'Bookjacket designer' } },
        { '@id': 'role:bpd', 'skos:prefLabel': { 'eng': 'Bookplate designer', 'deu': 'Designer*in des Exlibris', 'ita': 'Creatore dell\'ex-libris' } },
        { '@id': 'role:bsl', 'skos:prefLabel': { 'eng': 'Bookseller', 'deu': 'Buchhändler*in', 'ita': 'Bookseller' } },
        { '@id': 'role:brl', 'skos:prefLabel': { 'eng': 'Braille embosser', 'deu': 'Brailledrucker*in', 'ita': 'Braille embosser' } },
        { '@id': 'role:brd', 'skos:prefLabel': { 'eng': 'Broadcaster', 'deu': 'Rundfunksprecher*in', 'ita': 'Broadcaster' } },
        { '@id': 'role:cll', 'skos:prefLabel': { 'eng': 'Calligrapher', 'deu': 'Kalligraph*in', 'ita': 'Calligrapher' } },
        { '@id': 'role:ctg', 'skos:prefLabel': { 'eng': 'Cartographer', 'deu': 'Kartograf*in', 'ita': 'Cartografo' } },
        { '@id': 'role:cas', 'skos:prefLabel': { 'eng': 'Caster', 'deu': 'Gießer*in', 'ita': 'Caster' } },
        { '@id': 'role:cns', 'skos:prefLabel': { 'eng': 'Censor', 'deu': 'Zensor*in', 'ita': 'Censor' } },
        { '@id': 'role:chr', 'skos:prefLabel': { 'eng': 'Choreographer', 'deu': 'Choreograph*in', 'ita': 'Coreografo' } },
        { '@id': 'role:cng', 'skos:prefLabel': { 'eng': 'Cinematographer', 'deu': 'Kameramann/frau', 'ita': 'Direttore della fotografia' } },
        { '@id': 'role:cli', 'skos:prefLabel': { 'eng': 'Client', 'deu': 'Client', 'ita': 'Client' } },
        { '@id': 'role:coadvisor', 'skos:prefLabel': { 'eng': 'Co-Advisor', 'deu': 'Mitbetreuer*in', 'ita': 'Co-Advisor' } },
        { '@id': 'role:cor', 'skos:prefLabel': { 'eng': 'Collection registrar', 'deu': 'Registrator*in', 'ita': 'Collection registrar' } },
        { '@id': 'role:col', 'skos:prefLabel': { 'eng': 'Collector', 'deu': 'Sammler*in', 'ita': 'Collezionista' } },
        { '@id': 'role:clt', 'skos:prefLabel': { 'eng': 'Collotyper', 'deu': 'Lichtdrucker*in', 'ita': 'Collotyper' } },
        { '@id': 'role:clr', 'skos:prefLabel': { 'eng': 'Colorist', 'deu': 'Kolorist*in', 'ita': 'Colorist' } },
        { '@id': 'role:cmm', 'skos:prefLabel': { 'eng': 'Commentator', 'deu': 'Kommentator*in / Berichterstatter*in', 'ita': 'Commentator' } },
        { '@id': 'role:cwt', 'skos:prefLabel': { 'eng': 'Commentator for written text', 'deu': 'Autorin des Kommentars', 'ita': 'Commentator for written text' } },
        { '@id': 'role:com', 'skos:prefLabel': { 'eng': 'Compiler', 'deu': 'Herausgeber*in einer Sammlung', 'ita': 'Compilatore' } },
        { '@id': 'role:cpl', 'skos:prefLabel': { 'eng': 'Complainant', 'deu': 'Complainant', 'ita': 'Complainant' } },
        { '@id': 'role:cpt', 'skos:prefLabel': { 'eng': 'Complainant-appellant', 'deu': 'Complainant-appellant', 'ita': 'Complainant-appellant' } },
        { '@id': 'role:cpe', 'skos:prefLabel': { 'eng': 'Complainant-appellee', 'deu': 'Complainant-appellee', 'ita': 'Complainant-appellee' } },
        { '@id': 'role:cmp', 'skos:prefLabel': { 'eng': 'Composer', 'deu': 'Komponist*in', 'ita': 'Compositore' } },
        { '@id': 'role:cmt', 'skos:prefLabel': { 'eng': 'Compositor', 'deu': 'Schriftsetzer*in', 'ita': 'Compositor' } },
        { '@id': 'role:ccp', 'skos:prefLabel': { 'eng': 'Conceptor', 'deu': 'Konzepter*in / Konzeptionstexter*in', 'ita': 'Conceptor' } },
        { '@id': 'role:cnd', 'skos:prefLabel': { 'eng': 'Conductor', 'deu': 'Kapellmeister*in', 'ita': 'Direttore d’orchestra' } },
        { '@id': 'role:con', 'skos:prefLabel': { 'eng': 'Conservator', 'deu': 'Konservator*in', 'ita': 'Conservator' } },
        { '@id': 'role:csl', 'skos:prefLabel': { 'eng': 'Consultant', 'deu': 'Fachliche Beratung / Fachberater*in', 'ita': 'Consultant' } },
        { '@id': 'role:csp', 'skos:prefLabel': { 'eng': 'Consultant to a project', 'deu': 'Projektberater*in', 'ita': 'Consultant to a project' } },
        { '@id': 'role:cos', 'skos:prefLabel': { 'eng': 'Contestant', 'deu': 'Contestant', 'ita': 'Contestant' } },
        { '@id': 'role:cot', 'skos:prefLabel': { 'eng': 'Contestant-appellant', 'deu': 'Contestant-appellant', 'ita': 'Contestant-appellant' } },
        { '@id': 'role:coe', 'skos:prefLabel': { 'eng': 'Contestant-appellee', 'deu': 'Contestant-appellee', 'ita': 'Contestant-appellee' } },
        { '@id': 'role:cts', 'skos:prefLabel': { 'eng': 'Contestee', 'deu': 'Contestee', 'ita': 'Contestee' } },
        { '@id': 'role:ctt', 'skos:prefLabel': { 'eng': 'Contestee-appellant', 'deu': 'Contestee-appellant', 'ita': 'Contestee-appellant' } },
        { '@id': 'role:cte', 'skos:prefLabel': { 'eng': 'Contestee-appellee', 'deu': 'Contestee-appellee', 'ita': 'Contestee-appellee' } },
        { '@id': 'role:ctr', 'skos:prefLabel': { 'eng': 'Contractor', 'deu': 'Auftragnehmer*in', 'ita': 'Contractor' } },
        { '@id': 'role:ctb', 'skos:prefLabel': { 'eng': 'Contributor', 'deu': 'Beitragende/r', 'ita': 'Contributor' } },
        { '@id': 'role:copista', 'skos:prefLabel': { 'eng': 'Copista', 'deu': 'Copista', 'ita': 'Copista' } },
        { '@id': 'role:cpc', 'skos:prefLabel': { 'eng': 'Copyright claimant', 'deu': 'Antragesteller*in auf Copyright', 'ita': 'Copyright claimant' } },
        { '@id': 'role:cph', 'skos:prefLabel': { 'eng': 'Copyright holder', 'deu': 'Inhaber*in des Copyright', 'ita': 'Copyright holder' } },
        { '@id': 'role:crr', 'skos:prefLabel': { 'eng': 'Corrector', 'deu': 'Korrektor*in', 'ita': 'Corrector' } },
        { '@id': 'role:crp', 'skos:prefLabel': { 'eng': 'Correspondent', 'deu': 'Korrespondent*in', 'ita': 'Correspondent' } },
        { '@id': 'role:cst', 'skos:prefLabel': { 'eng': 'Costume designer', 'deu': 'Kostümbildner*in', 'ita': 'Costume designer' } },
        { '@id': 'role:cou', 'skos:prefLabel': { 'eng': 'Court governed', 'deu': 'Court governed', 'ita': 'Court governed' } },
        { '@id': 'role:crt', 'skos:prefLabel': { 'eng': 'Court reporter', 'deu': 'Gerichtsberichterstatter*in', 'ita': 'Court reporter' } },
        { '@id': 'role:cov', 'skos:prefLabel': { 'eng': 'Cover designer', 'deu': 'Designer*in der Hüller / Verpackung', 'ita': 'Cover designer' } },
        { '@id': 'role:cur', 'skos:prefLabel': { 'eng': 'Curator', 'deu': 'Kurator*in', 'ita': 'Curator' } },
        { '@id': 'role:dnc', 'skos:prefLabel': { 'eng': 'Dancer', 'deu': 'Tänzer*in', 'ita': 'Dancer' } },
        { '@id': 'role:dtc', 'skos:prefLabel': { 'eng': 'Data contributor', 'deu': 'Datenlieferant*in', 'ita': 'Data contributor' } },
        { '@id': 'role:dtm', 'skos:prefLabel': { 'eng': 'Data manager', 'deu': 'Datenmanager*in', 'ita': 'Gestore di dati' } },
        { '@id': 'role:datasupplier', 'skos:prefLabel': { 'eng': 'Data Supplier', 'deu': 'Datenlieferant*in', 'ita': 'Fornitore dei dati' } },
        { '@id': 'role:dte', 'skos:prefLabel': { 'eng': 'Dedicatee', 'deu': 'Widmungsträger*in', 'ita': 'Dedicatario' } },
        { '@id': 'role:dto', 'skos:prefLabel': { 'eng': 'Dedicator', 'deu': 'Widmende/r', 'ita': 'Dedicante' } },
        { '@id': 'role:dfd', 'skos:prefLabel': { 'eng': 'Defendant', 'deu': 'Defendant', 'ita': 'Defendant' } },
        { '@id': 'role:dft', 'skos:prefLabel': { 'eng': 'Defendant-appellant', 'deu': 'Defendant-appellant', 'ita': 'Defendant-appellant' } },
        { '@id': 'role:dfe', 'skos:prefLabel': { 'eng': 'Defendant-appellee', 'deu': 'Defendant-appellee', 'ita': 'Defendant-appellee' } },
        { '@id': 'role:dgg', 'skos:prefLabel': { 'eng': 'Degree granting institution', 'deu': 'Verleihende Institution', 'ita': 'Istituzione che rilascia il titolo accademico' } },
        { '@id': 'role:dgs', 'skos:prefLabel': { 'eng': 'Degree supervisor', 'deu': 'Doktorvater / Betreuer*in einer Akademischen Abschlußarbeit', 'ita': 'Degree supervisor' } },
        { '@id': 'role:dln', 'skos:prefLabel': { 'eng': 'Delineator', 'deu': 'Zeichner*in', 'ita': 'Delineator' } },
        { '@id': 'role:dpc', 'skos:prefLabel': { 'eng': 'Depicted', 'deu': 'abgebildet / Beschrieben', 'ita': 'Depicted' } },
        { '@id': 'role:dpt', 'skos:prefLabel': { 'eng': 'Depositor', 'deu': 'Depositor', 'ita': 'Depositor' } },
        { '@id': 'role:dsr', 'skos:prefLabel': { 'eng': 'Designer', 'deu': 'Designer*in', 'ita': 'Designer' } },
        { '@id': 'role:digitiser', 'skos:prefLabel': { 'eng': 'Digitiser', 'deu': 'Digitalisierer*in', 'ita': 'Autore della digitalizzazione' } },
        { '@id': 'role:drt', 'skos:prefLabel': { 'eng': 'Director', 'deu': 'Regisseur*in', 'ita': 'Director' } },
        { '@id': 'role:dis', 'skos:prefLabel': { 'eng': 'Dissertant', 'deu': 'Dissertant*in', 'ita': 'Tesista' } },
        { '@id': 'role:dbp', 'skos:prefLabel': { 'eng': 'Distribution place', 'deu': 'Vertriebsort', 'ita': 'Distribution place' } },
        { '@id': 'role:dst', 'skos:prefLabel': { 'eng': 'Distributor', 'deu': 'Distributor*in', 'ita': 'Distributore' } },
        { '@id': 'role:domainexpert', 'skos:prefLabel': { 'eng': 'Domain Expert', 'deu': 'Fachexpert*in', 'ita': 'Esperto del settore' } },
        { '@id': 'role:dnr', 'skos:prefLabel': { 'eng': 'Donor', 'deu': 'Stifter*in', 'ita': 'Donatore' } },
        { '@id': 'role:drm', 'skos:prefLabel': { 'eng': 'Draftsman', 'deu': 'Bauzeichner*in / Konstruktionszeichner*in / technische/r Zeichner*in', 'ita': 'Draftsman' } },
        { '@id': 'role:dub', 'skos:prefLabel': { 'eng': 'Dubious author', 'deu': 'zweifelhafte Autor*in', 'ita': 'Autore incerto' } },
        { '@id': 'role:edt', 'skos:prefLabel': { 'eng': 'Editor', 'deu': 'Herausgeber*in', 'ita': 'Curatore' } },
        { '@id': 'role:edc', 'skos:prefLabel': { 'eng': 'Editor of compilation', 'deu': 'Editor*in der Zusammenstellung / des Sammelwerks', 'ita': 'Editor of compilation' } },
        { '@id': 'role:edm', 'skos:prefLabel': { 'eng': 'Editor of moving image work', 'deu': 'Film-Editor*in', 'ita': 'Editor of moving image work' } },
        { '@id': 'role:elg', 'skos:prefLabel': { 'eng': 'Electrician', 'deu': 'Elektriker*in', 'ita': 'Electrician' } },
        { '@id': 'role:elt', 'skos:prefLabel': { 'eng': 'Electrotyper', 'deu': 'Electrotyper', 'ita': 'Electrotyper' } },
        { '@id': 'role:enj', 'skos:prefLabel': { 'eng': 'Enacting jurisdiction', 'deu': 'Verfügende / verordnende Jurisdiktion', 'ita': 'Enacting jurisdiction' } },
        { '@id': 'role:eng', 'skos:prefLabel': { 'eng': 'Engineer', 'deu': 'Ingenieur*in', 'ita': 'Ingegnere' } },
        { '@id': 'role:egr', 'skos:prefLabel': { 'eng': 'Engraver', 'deu': 'Graveur*in', 'ita': 'Incisore' } },
        { '@id': 'role:etr', 'skos:prefLabel': { 'eng': 'Etcher', 'deu': 'Radierer*in', 'ita': 'Acquafortista' } },
        { '@id': 'role:evaluator', 'skos:prefLabel': { 'eng': 'Evaluator', 'deu': 'Evaluator*in', 'ita': 'Valutatore' } },
        { '@id': 'role:exp', 'skos:prefLabel': { 'eng': 'Expert', 'deu': 'Expert*in / Sachverständige/r', 'ita': 'Expert' } },
        { '@id': 'role:fac', 'skos:prefLabel': { 'eng': 'Facsimilist', 'deu': 'Bearbeiter*in des Faksimile', 'ita': 'Responsabile del facsimile' } },
        { '@id': 'role:fld', 'skos:prefLabel': { 'eng': 'Field director', 'deu': 'Leiter*in von Feldforschung', 'ita': 'Field director' } },
        { '@id': 'role:fmd', 'skos:prefLabel': { 'eng': 'Film director', 'deu': 'Filmregisseur*in', 'ita': 'Film director' } },
        { '@id': 'role:fds', 'skos:prefLabel': { 'eng': 'Film distributor', 'deu': 'Filmverleih', 'ita': 'Film distributor' } },
        { '@id': 'role:flm', 'skos:prefLabel': { 'eng': 'Film editor', 'deu': 'Film-Editor*in', 'ita': 'Responsabile del montaggio' } },
        { '@id': 'role:fmp', 'skos:prefLabel': { 'eng': 'Film producer', 'deu': 'Filmproduzent*in', 'ita': 'Film producer' } },
        { '@id': 'role:fmk', 'skos:prefLabel': { 'eng': 'Filmmaker', 'deu': 'Filmemacher*in', 'ita': 'Filmmaker' } },
        { '@id': 'role:fpy', 'skos:prefLabel': { 'eng': 'First party', 'deu': 'erste Vertragspartei', 'ita': 'First party' } },
        { '@id': 'role:frg', 'skos:prefLabel': { 'eng': 'Forger', 'deu': 'Kopist*in / Fälscher*in', 'ita': 'Forger' } },
        { '@id': 'role:fmo', 'skos:prefLabel': { 'eng': 'Former owner', 'deu': 'Vorbesitzer*in', 'ita': 'Precedente proprietario' } },
        { '@id': 'role:founder', 'skos:prefLabel': { 'eng': 'Founder', 'deu': 'Gründer*in', 'ita': 'Founder' } },
        { '@id': 'role:fnd', 'skos:prefLabel': { 'eng': 'Funder', 'deu': 'Funder', 'ita': 'Funder' } },
        { '@id': 'role:gis', 'skos:prefLabel': { 'eng': 'Geographic information specialist', 'deu': 'Geographic information specialist', 'ita': 'Field director' } },
        { '@id': 'role:graphicdesigner', 'skos:prefLabel': { 'eng': 'Graphic Designer', 'deu': 'Grafikdesigner*in', 'ita': 'Grafico' } },
        { '@id': 'role:hnr', 'skos:prefLabel': { 'eng': 'Honoree', 'deu': 'Geehrte/r', 'ita': 'Onorato' } },
        { '@id': 'role:hst', 'skos:prefLabel': { 'eng': 'Host', 'deu': 'Gastgeber*in', 'ita': 'Host' } },
        { '@id': 'role:his', 'skos:prefLabel': { 'eng': 'Host institution', 'deu': 'Gastgebende Institution', 'ita': 'Host institution' } },
        { '@id': 'role:ilu', 'skos:prefLabel': { 'eng': 'Illuminator', 'deu': 'Illuminator*in', 'ita': 'Miniatore' } },
        { '@id': 'role:ill', 'skos:prefLabel': { 'eng': 'Illustrator', 'deu': 'Illustrator*in', 'ita': 'Illustratore' } },
        { '@id': 'role:initiator', 'skos:prefLabel': { 'eng': 'Initiator', 'deu': 'Initiator*in', 'ita': 'Iniziatore' } },
        { '@id': 'role:ins', 'skos:prefLabel': { 'eng': 'Inscriber', 'deu': 'Widmende/r', 'ita': 'Inscriber' } },
        { '@id': 'role:itr', 'skos:prefLabel': { 'eng': 'Instrumentalist', 'deu': 'Instrumentalist*in', 'ita': 'Instrumentalist' } },
        { '@id': 'role:interpreter', 'skos:prefLabel': { 'eng': 'Interpreter', 'deu': 'Interpret*in', 'ita': 'Interprete' } },
        { '@id': 'role:ive', 'skos:prefLabel': { 'eng': 'Interviewee', 'deu': 'Interviewpartner*in', 'ita': 'Intervistato' } },
        { '@id': 'role:ivr', 'skos:prefLabel': { 'eng': 'Interviewer', 'deu': 'Interviewer*in', 'ita': 'Intervistatore' } },
        { '@id': 'role:inv', 'skos:prefLabel': { 'eng': 'Inventor', 'deu': 'Erfinder*in', 'ita': 'Inventor' } },
        { '@id': 'role:isb', 'skos:prefLabel': { 'eng': 'Issuing body', 'deu': 'Issuing body', 'ita': 'Issuing body' } },
        { '@id': 'role:jud', 'skos:prefLabel': { 'eng': 'Judge', 'deu': 'Judge', 'ita': 'Judge' } },
        { '@id': 'role:jug', 'skos:prefLabel': { 'eng': 'Jurisdiction governed', 'deu': 'Jurisdiction governed', 'ita': 'Jurisdiction governed' } },
        { '@id': 'role:keeperoftheoriginal', 'skos:prefLabel': { 'eng': 'Keeper of the original', 'deu': 'Aufbewahrer*in des Originals', 'ita': 'Affidatario dell\'originale' } },
        { '@id': 'role:lbr', 'skos:prefLabel': { 'eng': 'Laboratory', 'deu': 'Labor', 'ita': 'Laboratory' } },
        { '@id': 'role:ldr', 'skos:prefLabel': { 'eng': 'Laboratory director', 'deu': 'Laborleiter*in', 'ita': 'Laboratory director' } },
        { '@id': 'role:lsa', 'skos:prefLabel': { 'eng': 'Landscape architect', 'deu': 'Landschaftsarchitekt*in', 'ita': 'Landscape architect' } },
        { '@id': 'role:led', 'skos:prefLabel': { 'eng': 'Lead', 'deu': 'Leit- / LeiterIn-', 'ita': 'Lead' } },
        { '@id': 'role:len', 'skos:prefLabel': { 'eng': 'Lender', 'deu': 'Leihgeber', 'ita': 'Lender' } },
        { '@id': 'role:lil', 'skos:prefLabel': { 'eng': 'Libelant', 'deu': 'Libelant', 'ita': 'Libelant' } },
        { '@id': 'role:lit', 'skos:prefLabel': { 'eng': 'Libelant-appellant', 'deu': 'Libelant-appellant', 'ita': 'Libelant-appellant' } },
        { '@id': 'role:lie', 'skos:prefLabel': { 'eng': 'Libelant-appellee', 'deu': 'Libelant-appellee', 'ita': 'Libelant-appellee' } },
        { '@id': 'role:lel', 'skos:prefLabel': { 'eng': 'Libelee', 'deu': 'Libelee', 'ita': 'Libelee' } },
        { '@id': 'role:let', 'skos:prefLabel': { 'eng': 'Libelee-appellant', 'deu': 'Libelee-appellant', 'ita': 'Libelee-appellant' } },
        { '@id': 'role:lee', 'skos:prefLabel': { 'eng': 'Libelee-appellee', 'deu': 'Libelee-appellee', 'ita': 'Libelee-appellee' } },
        { '@id': 'role:lbt', 'skos:prefLabel': { 'eng': 'Librettist', 'deu': 'Librettist*in', 'ita': 'Librettista' } },
        { '@id': 'role:lse', 'skos:prefLabel': { 'eng': 'Licensee', 'deu': 'Lizenznehmer*in / Lizenzinhaber*in', 'ita': 'Licensee' } },
        { '@id': 'role:lso', 'skos:prefLabel': { 'eng': 'Licensor', 'deu': 'Lizenzgeber*in', 'ita': 'Licensor' } },
        { '@id': 'role:lgd', 'skos:prefLabel': { 'eng': 'Lighting designer', 'deu': 'Lichtgestalter*in', 'ita': 'Lighting designer' } },
        { '@id': 'role:ltg', 'skos:prefLabel': { 'eng': 'Lithographer', 'deu': 'Lithograph*in', 'ita': 'Litografo' } },
        { '@id': 'role:lyr', 'skos:prefLabel': { 'eng': 'Lyricist', 'deu': 'Songwriter*in', 'ita': 'Paroliere' } },
        { '@id': 'role:mfp', 'skos:prefLabel': { 'eng': 'Manufacture place', 'deu': 'Herstellungsort', 'ita': 'Manufacture place' } },
        { '@id': 'role:mfr', 'skos:prefLabel': { 'eng': 'Manufacturer', 'deu': 'Hersteller*in', 'ita': 'Manufacturer' } },
        { '@id': 'role:mrb', 'skos:prefLabel': { 'eng': 'Marbler', 'deu': 'Marmorier*in', 'ita': 'Marbler' } },
        { '@id': 'role:mrk', 'skos:prefLabel': { 'eng': 'Markup editor', 'deu': 'Markup editor', 'ita': 'Markup editor' } },
        { '@id': 'role:med', 'skos:prefLabel': { 'eng': 'Medium', 'deu': 'Medium', 'ita': 'Medium' } },
        { '@id': 'role:mdc', 'skos:prefLabel': { 'eng': 'Metadata contact', 'deu': 'Metadata contact', 'ita': 'Metadata contact' } },
        { '@id': 'role:emt', 'skos:prefLabel': { 'eng': 'Metal-engraver', 'deu': 'Metallstecher*in', 'ita': 'Calcografo' } },
        { '@id': 'role:mtk', 'skos:prefLabel': { 'eng': 'Minute taker', 'deu': 'Protokollführer*in', 'ita': 'Minute taker' } },
        { '@id': 'role:mod', 'skos:prefLabel': { 'eng': 'Moderator', 'deu': 'Moderator*in / Diskussionsleiter*in', 'ita': 'Moderator' } },
        { '@id': 'role:mon', 'skos:prefLabel': { 'eng': 'Monitor', 'deu': 'Monitor', 'ita': 'Monitor' } },
        { '@id': 'role:mcp', 'skos:prefLabel': { 'eng': 'Music copyist', 'deu': 'Musikkopist*in / Kopist*in', 'ita': 'Music copyist' } },
        { '@id': 'role:msd', 'skos:prefLabel': { 'eng': 'Musical director', 'deu': 'musikalische/r Leiter*in', 'ita': 'Direttore musicale' } },
        { '@id': 'role:mus', 'skos:prefLabel': { 'eng': 'Musician', 'deu': 'Musiker*in', 'ita': 'Musicista' } },
        { '@id': 'role:nrt', 'skos:prefLabel': { 'eng': 'Narrator', 'deu': 'Erzähler*in', 'ita': 'Narrator' } },
        { '@id': 'role:osp', 'skos:prefLabel': { 'eng': 'Onscreen presenter', 'deu': 'Fernseh- / TV-Moderator*in', 'ita': 'Onscreen presenter' } },
        { '@id': 'role:opn', 'skos:prefLabel': { 'eng': 'Opponent', 'deu': 'Widersacher*in', 'ita': 'Controrelatore' } },
        { '@id': 'role:orm', 'skos:prefLabel': { 'eng': 'Organizer', 'deu': 'Veranstalter*in', 'ita': 'Organizer' } },
        { '@id': 'role:org', 'skos:prefLabel': { 'eng': 'Originator', 'deu': 'Erzeuger*in', 'ita': 'Originator' } },
        { '@id': 'role:oth', 'skos:prefLabel': { 'eng': 'Other', 'deu': 'Andere', 'ita': 'Altro' } },
        { '@id': 'role:own', 'skos:prefLabel': { 'eng': 'Owner', 'deu': 'Eigentümer*in', 'ita': 'Proprietario' } },
        { '@id': 'role:pan', 'skos:prefLabel': { 'eng': 'Panelist', 'deu': 'Diskussionsteilnehmer*in', 'ita': 'Panelist' } },
        { '@id': 'role:ppm', 'skos:prefLabel': { 'eng': 'Papermaker', 'deu': 'Papiermacher*in / Papierhersteller*in', 'ita': 'Papermaker' } },
        { '@id': 'role:pta', 'skos:prefLabel': { 'eng': 'Patent applicant', 'deu': 'Patentanmelder*in', 'ita': 'Patent applicant' } },
        { '@id': 'role:pth', 'skos:prefLabel': { 'eng': 'Patent holder', 'deu': 'Patentinhaber*in', 'ita': 'Patent holder' } },
        { '@id': 'role:pat', 'skos:prefLabel': { 'eng': 'Patron', 'deu': 'Schirmherr*in / Förderer*in', 'ita': 'Patron' } },
        { '@id': 'role:pedagogicexpert', 'skos:prefLabel': { 'eng': 'Pedagogic Expert', 'deu': 'Pädagogische/r Expert*in', 'ita': 'Esperto pedagogico' } },
        { '@id': 'role:prf', 'skos:prefLabel': { 'eng': 'Performer', 'deu': 'Performer', 'ita': 'Performer' } },
        { '@id': 'role:pma', 'skos:prefLabel': { 'eng': 'Permitting agency', 'deu': 'Genehmigungsbehörde', 'ita': 'Permitting agency' } },
        { '@id': 'role:pht', 'skos:prefLabel': { 'eng': 'Photographer', 'deu': 'Fotograf*in', 'ita': 'Fotografo' } },
        { '@id': 'role:ptf', 'skos:prefLabel': { 'eng': 'Plaintiff', 'deu': 'Kläger*in', 'ita': 'Plaintiff' } },
        { '@id': 'role:ptt', 'skos:prefLabel': { 'eng': 'Plaintiff-appellant', 'deu': 'Plaintiff-appellant', 'ita': 'Plaintiff-appellant' } },
        { '@id': 'role:pte', 'skos:prefLabel': { 'eng': 'Plaintiff-appellee', 'deu': 'Plaintiff-appellee', 'ita': 'Plaintiff-appellee' } },
        { '@id': 'role:plt', 'skos:prefLabel': { 'eng': 'Platemaker', 'deu': 'Platemaker', 'ita': 'Platemaker' } },
        { '@id': 'role:pra', 'skos:prefLabel': { 'eng': 'Praeses', 'deu': 'Präses', 'ita': 'Praeses' } },
        { '@id': 'role:pre', 'skos:prefLabel': { 'eng': 'Presenter', 'deu': 'Presenter', 'ita': 'Presenter' } },
        { '@id': 'role:prt', 'skos:prefLabel': { 'eng': 'Printer', 'deu': 'Drucker*in', 'ita': 'Stampatore' } },
        { '@id': 'role:pop', 'skos:prefLabel': { 'eng': 'Printer of plates', 'deu': 'Plattendrucker*in', 'ita': 'Printer of plates' } },
        { '@id': 'role:prm', 'skos:prefLabel': { 'eng': 'Printmaker', 'deu': 'Drucker*in / Grafikkünstler*in', 'ita': 'Printmaker' } },
        { '@id': 'role:prc', 'skos:prefLabel': { 'eng': 'Process contact', 'deu': 'Ansprechpartner*in', 'ita': 'Process contact' } },
        { '@id': 'role:pro', 'skos:prefLabel': { 'eng': 'Producer', 'deu': 'Produzent*in', 'ita': 'Produttore' } },
        { '@id': 'role:prn', 'skos:prefLabel': { 'eng': 'Production company', 'deu': 'Produktionsfirma', 'ita': 'Production company' } },
        { '@id': 'role:prp', 'skos:prefLabel': { 'eng': 'Production place', 'deu': 'Produktionsort', 'ita': 'Production place' } },
        { '@id': 'role:prs', 'skos:prefLabel': { 'eng': 'Production designer', 'deu': 'Ausstatter*in', 'ita': 'Production designer' } },
        { '@id': 'role:pmn', 'skos:prefLabel': { 'eng': 'Production manager', 'deu': 'Produktionsmanager*in', 'ita': 'Production manager' } },
        { '@id': 'role:prd', 'skos:prefLabel': { 'eng': 'Production personnel', 'deu': 'Produktionspersonal', 'ita': 'Production personnel' } },
        { '@id': 'role:prg', 'skos:prefLabel': { 'eng': 'Programmer', 'deu': 'Programmierer*in', 'ita': 'Programmer' } },
        { '@id': 'role:pdr', 'skos:prefLabel': { 'eng': 'Project director', 'deu': 'Projektleiter*in', 'ita': 'Project director' } },
        { '@id': 'role:pfr', 'skos:prefLabel': { 'eng': 'Proofreader', 'deu': 'Lektor*in', 'ita': 'Correttore' } },
        { '@id': 'role:prv', 'skos:prefLabel': { 'eng': 'Provider', 'deu': 'Anbieter*in / Lieferant*in', 'ita': 'Provider' } },
        { '@id': 'role:pbl', 'skos:prefLabel': { 'eng': 'Publisher', 'deu': 'Verleger*in', 'ita': 'Editore' } },
        { '@id': 'role:pbd', 'skos:prefLabel': { 'eng': 'Publishing director', 'deu': 'Verlagsleiter*in', 'ita': 'Publishing director' } },
        { '@id': 'role:ppt', 'skos:prefLabel': { 'eng': 'Puppeteer', 'deu': 'Puppenspieler*in', 'ita': 'Puppeteer' } },
        { '@id': 'role:rdd', 'skos:prefLabel': { 'eng': 'Radio director', 'deu': 'Rund/Hörfunkdirektorin / Rundfunkintendant*in', 'ita': 'Radio director' } },
        { '@id': 'role:rpc', 'skos:prefLabel': { 'eng': 'Radio producer', 'deu': 'Radioproduzent*in', 'ita': 'Radio producer' } },
        { '@id': 'role:rce', 'skos:prefLabel': { 'eng': 'Recording engineer', 'deu': 'Tonmeister*in', 'ita': 'Tecnico della registrazione' } },
        { '@id': 'role:rcd', 'skos:prefLabel': { 'eng': 'Recordist', 'deu': 'Tontechniker*in', 'ita': 'Recordist' } },
        { '@id': 'role:red', 'skos:prefLabel': { 'eng': 'Redaktor', 'deu': 'Redakteur*in', 'ita': 'Redaktor' } },
        { '@id': 'role:ren', 'skos:prefLabel': { 'eng': 'Renderer', 'deu': 'Reinzeichner*in', 'ita': 'Renderer' } },
        { '@id': 'role:rpt', 'skos:prefLabel': { 'eng': 'Reporter', 'deu': 'Reporter*in / Berichterstatter*in', 'ita': 'Reporter' } },
        { '@id': 'role:rth', 'skos:prefLabel': { 'eng': 'Research team head', 'deu': 'Projektverantwortliche/r', 'ita': 'Direttore della ricerca' } },
        { '@id': 'role:rtm', 'skos:prefLabel': { 'eng': 'Research team member', 'deu': 'Projektmitarbeiter*in', 'ita': 'Membro di un gruppo di ricerca' } },
        { '@id': 'role:res', 'skos:prefLabel': { 'eng': 'Researcher', 'deu': 'Forscher*in', 'ita': 'Ricercatore' } },
        { '@id': 'role:rsp', 'skos:prefLabel': { 'eng': 'Respondent', 'deu': 'Respondent', 'ita': 'Respondent' } },
        { '@id': 'role:rst', 'skos:prefLabel': { 'eng': 'Respondent-appellant', 'deu': 'Respondent-appellant', 'ita': 'Respondent-appellant' } },
        { '@id': 'role:rse', 'skos:prefLabel': { 'eng': 'Respondent-appellee', 'deu': 'Respondent-appellee', 'ita': 'Respondent-appellee' } },
        { '@id': 'role:rpy', 'skos:prefLabel': { 'eng': 'Responsible party', 'deu': 'Responsible party', 'ita': 'Responsible party' } },
        { '@id': 'role:rsg', 'skos:prefLabel': { 'eng': 'Restager', 'deu': 'Wiederaufführuner*in', 'ita': 'Restager' } },
        { '@id': 'role:rsr', 'skos:prefLabel': { 'eng': 'Restorationist', 'deu': 'Restaurator*in', 'ita': 'Restorationist' } },
        { '@id': 'role:rev', 'skos:prefLabel': { 'eng': 'Reviewer', 'deu': 'Kritiker*in', 'ita': 'Recensore' } },
        { '@id': 'role:rbr', 'skos:prefLabel': { 'eng': 'Rubricator', 'deu': 'Rubricator', 'ita': 'Rubricator' } },
        { '@id': 'role:sce', 'skos:prefLabel': { 'eng': 'Scenarist', 'deu': 'Szenentexter*in', 'ita': 'Scenografo' } },
        { '@id': 'role:sad', 'skos:prefLabel': { 'eng': 'Scientific advisor', 'deu': 'wissenschaftliche Berater*in', 'ita': 'Consulente scientifico' } },
        { '@id': 'role:aus', 'skos:prefLabel': { 'eng': 'Screenwriter', 'deu': 'Drehbuchautor*in', 'ita': 'Sceneggiatore' } },
        { '@id': 'role:scr', 'skos:prefLabel': { 'eng': 'Scribe', 'deu': 'Schreiber*in', 'ita': 'Scribe' } },
        { '@id': 'role:scl', 'skos:prefLabel': { 'eng': 'Sculptor', 'deu': 'Bildhauer*in', 'ita': 'Scultore' } },
        { '@id': 'role:spy', 'skos:prefLabel': { 'eng': 'Second party', 'deu': 'Second party', 'ita': 'Second party' } },
        { '@id': 'role:sec', 'skos:prefLabel': { 'eng': 'Secretary', 'deu': 'Sekretär*in', 'ita': 'Secretary' } },
        { '@id': 'role:sll', 'skos:prefLabel': { 'eng': 'Seller', 'deu': 'Verkäufer*in', 'ita': 'Seller' } },
        { '@id': 'role:std', 'skos:prefLabel': { 'eng': 'Set designer', 'deu': 'Ausstatter*in', 'ita': 'Set designer' } },
        { '@id': 'role:stg', 'skos:prefLabel': { 'eng': 'Setting', 'deu': 'Schauplatz', 'ita': 'Setting' } },
        { '@id': 'role:sgn', 'skos:prefLabel': { 'eng': 'Signer', 'deu': 'Unterzeichner*in', 'ita': 'Signer' } },
        { '@id': 'role:sng', 'skos:prefLabel': { 'eng': 'Singer', 'deu': 'Sänger*in', 'ita': 'Cantante' } },
        { '@id': 'role:sds', 'skos:prefLabel': { 'eng': 'Sound designer', 'deu': 'Sounddesigner*in', 'ita': 'Progettista del suono' } },
        { '@id': 'role:spk', 'skos:prefLabel': { 'eng': 'Speaker', 'deu': 'Sprecher*in', 'ita': 'Speaker' } },
        { '@id': 'role:spn', 'skos:prefLabel': { 'eng': 'Sponsor', 'deu': 'Förderer*in', 'ita': 'Sponsor' } },
        { '@id': 'role:sgd', 'skos:prefLabel': { 'eng': 'Stage director', 'deu': '(Theater)Regisseur*in', 'ita': 'Stage director' } },
        { '@id': 'role:stm', 'skos:prefLabel': { 'eng': 'Stage manager', 'deu': 'Inspizient*in / Bühnenmeister*in', 'ita': 'Stage manager' } },
        { '@id': 'role:stn', 'skos:prefLabel': { 'eng': 'Standards body', 'deu': 'Normkomitee', 'ita': 'Standards body' } },
        { '@id': 'role:str', 'skos:prefLabel': { 'eng': 'Stereotyper', 'deu': 'Stereotyper', 'ita': 'Stereotyper' } },
        { '@id': 'role:stl', 'skos:prefLabel': { 'eng': 'Storyteller', 'deu': 'Erzähler*in', 'ita': 'Storyteller' } },
        { '@id': 'role:sht', 'skos:prefLabel': { 'eng': 'Supporting host', 'deu': 'Unterstützer*in', 'ita': 'Supporting host' } },
        { '@id': 'role:srv', 'skos:prefLabel': { 'eng': 'Surveyor', 'deu': 'Vermesser*in', 'ita': 'Surveyor' } },
        { '@id': 'role:tch', 'skos:prefLabel': { 'eng': 'Teacher', 'deu': 'Lehrer*in', 'ita': 'Teacher' } },
        { '@id': 'role:tcd', 'skos:prefLabel': { 'eng': 'Technical director', 'deu': 'Technische/r Direktor*in', 'ita': 'Technical director' } },
        { '@id': 'role:technicalinspector', 'skos:prefLabel': { 'eng': 'Technical Inspector', 'deu': 'Technische/r Prüfer*in', 'ita': 'Ispettore tecnico' } },
        { '@id': 'role:technicaltranslator', 'skos:prefLabel': { 'eng': 'Technical Translator', 'deu': 'Technische/r Umsetzer*in', 'ita': 'Traduttore Tecnico' } },
        { '@id': 'role:tld', 'skos:prefLabel': { 'eng': 'Television director', 'deu': 'Fernsehintendant*in', 'ita': 'Television director' } },
        { '@id': 'role:tlp', 'skos:prefLabel': { 'eng': 'Television producer', 'deu': 'Fernsehproduzent*in', 'ita': 'Television producer' } },
        { '@id': 'role:textprocessor', 'skos:prefLabel': { 'eng': 'Text Processor', 'deu': 'Textbearbeiter*in', 'ita': 'Estensore del testo' } },
        { '@id': 'role:ths', 'skos:prefLabel': { 'eng': 'Thesis advisor', 'deu': 'Dissertationsbetreuer*in', 'ita': 'Relatore' } },
        { '@id': 'role:trc', 'skos:prefLabel': { 'eng': 'Transcriber', 'deu': 'Transcriber', 'ita': 'Transcriber' } },
        { '@id': 'role:trl', 'skos:prefLabel': { 'eng': 'Translator', 'deu': 'Übersetzer*in', 'ita': 'Traduttore' } },
        { '@id': 'role:tyd', 'skos:prefLabel': { 'eng': 'Type designer', 'deu': 'Schriftdesigner*in / Schriftentwerfer*in', 'ita': 'Type designer' } },
        { '@id': 'role:tyg', 'skos:prefLabel': { 'eng': 'Typographer', 'deu': 'Typograph*in', 'ita': 'Tipografo' } },
        { '@id': 'role:uploader', 'skos:prefLabel': { 'eng': 'Uploader', 'deu': 'Uploader', 'ita': 'Uploader' } },
        { '@id': 'role:vdg', 'skos:prefLabel': { 'eng': 'Videographer', 'deu': 'Videoanbieter*in', 'ita': 'Videografo' } },
        { '@id': 'role:vac', 'skos:prefLabel': { 'eng': 'Voice actor', 'deu': 'Synchronsprecher*in', 'ita': 'Voice actor' } },
        { '@id': 'role:wit', 'skos:prefLabel': { 'eng': 'Witness', 'deu': 'Zeug*in', 'ita': 'Witness' } },
        { '@id': 'role:wde', 'skos:prefLabel': { 'eng': 'Wood-engraver', 'deu': 'Holzstecher*in', 'ita': 'Xilografo' } },
        { '@id': 'role:wdc', 'skos:prefLabel': { 'eng': 'Woodcutter', 'deu': 'Holzschneider*in', 'ita': 'Woodcutter' } },
        { '@id': 'role:wam', 'skos:prefLabel': { 'eng': 'Writer of accompanying material', 'deu': 'Autor*in von Begleitmaterial', 'ita': 'Autore del materiale allegato' } },
        { '@id': 'role:wac', 'skos:prefLabel': { 'eng': 'Writer of added commentary', 'deu': 'Writer of added commentary', 'ita': 'Writer of added commentary' } },
        { '@id': 'role:wal', 'skos:prefLabel': { 'eng': 'Writer of added lyrics', 'deu': 'Writer of added lyrics', 'ita': 'Writer of added lyrics' } },
        { '@id': 'role:wat', 'skos:prefLabel': { 'eng': 'Writer of added text', 'deu': 'Writer of added text', 'ita': 'Writer of added text' } },
        { '@id': 'role:win', 'skos:prefLabel': { 'eng': 'Writer of introduction', 'deu': 'Writer of introduction', 'ita': 'Writer of introduction' } },
        { '@id': 'role:wpr', 'skos:prefLabel': { 'eng': 'Writer of preface', 'deu': 'Writer of preface', 'ita': 'Writer of preface' } },
        { '@id': 'role:wst', 'skos:prefLabel': { 'eng': 'Writer of supplementary textual content', 'deu': 'Writer of supplementary textual content', 'ita': 'Writer of supplementary textual content' } }
      ],
      loaded: true
    },
    'irrolepredicate': {
      terms: [
        { '@id': 'role:aut', 'skos:prefLabel': { 'eng': 'Author', 'deu': 'Autor*in', 'ita': 'Author' } },
        { '@id': 'role:edt', 'skos:prefLabel': { 'eng': 'Editor', 'deu': 'Herausgeber*in', 'ita': 'Curatore' } }
      ],
      loaded: true
    },
    'mimetypes': {
      terms: [
        { '@id': 'image/jpeg', 'skos:notation': ['jpeg', 'jpg'], 'skos:prefLabel': { 'eng': 'JPG/JPEG' } },
        { '@id': 'image/tiff', 'skos:notation': ['tiff', 'tif'], 'skos:prefLabel': { 'eng': 'TIFF' } },
        { '@id': 'image/gif', 'skos:notation': ['gif'], 'skos:prefLabel': { 'eng': 'GIF' } },
        { '@id': 'image/png', 'skos:notation': ['png'], 'skos:prefLabel': { 'eng': 'PNG' } },
        { '@id': 'image/x-ms-bmp', 'skos:notation': ['bmp'], 'skos:prefLabel': { 'eng': 'BMP' } },
        { '@id': 'audio/wav', 'skos:notation': ['wav'], 'skos:prefLabel': { 'eng': 'WAVE' } },
        { '@id': 'audio/mpeg', 'skos:notation': ['mp3'], 'skos:prefLabel': { 'eng': 'MP3' } },
        { '@id': 'audio/flac', 'skos:notation': ['flac'], 'skos:prefLabel': { 'eng': 'FLAC' } },
        { '@id': 'audio/ogg', 'skos:notation': ['ogg'], 'skos:prefLabel': { 'eng': 'Ogg' } },
        { '@id': 'video/mpeg', 'skos:notation': ['mpg'], 'skos:prefLabel': { 'eng': 'MPEG' } },
        { '@id': 'video/avi', 'skos:notation': ['avi'], 'skos:prefLabel': { 'eng': 'AVI' } },
        { '@id': 'video/mp4', 'skos:notation': ['mp4'], 'skos:prefLabel': { 'eng': 'MPEG-4' } },
        { '@id': 'video/quicktime', 'skos:notation': ['qt', 'mov'], 'skos:prefLabel': { 'eng': 'Quicktime' } },
        { '@id': 'video/x-matroska', 'skos:notation': ['mkv'], 'skos:prefLabel': { 'eng': 'MKV' } },
        { '@id': 'application/x-iso9660-image', 'skos:notation': ['iso'], 'skos:prefLabel': { 'eng': 'ISO' } },
        { '@id': 'application/octet-stream', 'skos:notation': [], 'skos:prefLabel': { 'eng': 'Data' } },
        { '@id': 'application/pdf', 'skos:notation': ['pdf'], 'skos:prefLabel': { 'eng': 'PDF' } },
        { '@id': 'text/plain', 'skos:notation': ['txt'], 'skos:prefLabel': { 'eng': '.txt' } },
        { '@id': 'application/msword', 'skos:notation': ['doc'], 'skos:prefLabel': { 'eng': '.doc' } },
        { '@id': 'application/vnd.ms-excel', 'skos:notation': ['xls'], 'skos:prefLabel': { 'eng': '.xls' } },
        { '@id': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'skos:notation': ['docx'], 'skos:prefLabel': { 'eng': '.docx' } },
        { '@id': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template', 'skos:notation': ['dotx'], 'skos:prefLabel': { 'eng': '.dotx' } },
        { '@id': 'application/vnd.ms-word.document.macroEnabled.12', 'skos:notation': ['docm'], 'skos:prefLabel': { 'eng': '.docm' } },
        { '@id': 'application/vnd.ms-word.template.macroEnabled.12', 'skos:notation': ['dotm'], 'skos:prefLabel': { 'eng': '.dotm' } },
        { '@id': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'skos:notation': ['xlsx'], 'skos:prefLabel': { 'eng': '.xlsx' } },
        { '@id': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template', 'skos:notation': ['xltx'], 'skos:prefLabel': { 'eng': '.xltx' } },
        { '@id': 'application/vnd.ms-excel.sheet.macroEnabled.12', 'skos:notation': ['xlsm'], 'skos:prefLabel': { 'eng': '.xlsm' } },
        { '@id': 'application/vnd.ms-excel.template.macroEnabled.12', 'skos:notation': ['xltm'], 'skos:prefLabel': { 'eng': '.xltm' } },
        { '@id': 'application/vnd.ms-excel.addin.macroEnabled.12', 'skos:notation': ['xlam'], 'skos:prefLabel': { 'eng': '.xlam' } },
        { '@id': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12', 'skos:notation': ['xlsb'], 'skos:prefLabel': { 'eng': '.xlsb' } },
        { '@id': 'application/vnd.ms-powerpoint', 'skos:notation': ['ppt'], 'skos:prefLabel': { 'eng': '.ppt' } },
        { '@id': 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'skos:notation': ['pptx'], 'skos:prefLabel': { 'eng': '.pptx' } },
        { '@id': 'application/vnd.openxmlformats-officedocument.presentationml.template', 'skos:notation': ['potx'], 'skos:prefLabel': { 'eng': '.potx' } },
        { '@id': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow', 'skos:notation': ['ppsx'], 'skos:prefLabel': { 'eng': '.ppsx' } },
        { '@id': 'application/vnd.ms-powerpoint.addin.macroEnabled.12', 'skos:notation': ['ppam'], 'skos:prefLabel': { 'eng': '.ppam' } },
        { '@id': 'application/vnd.ms-powerpoint.presentation.macroEnabled.12', 'skos:notation': ['pptm'], 'skos:prefLabel': { 'eng': '.pptm' } },
        { '@id': 'application/vnd.ms-powerpoint.presentation.macroEnabled.12', 'skos:notation': ['potm'], 'skos:prefLabel': { 'eng': '.potm' } },
        { '@id': 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12', 'skos:notation': ['ppsm'], 'skos:prefLabel': { 'eng': '.ppsm' } },
        { '@id': 'application/vnd.oasis.opendocument.text', 'skos:notation': ['odt'], 'skos:prefLabel': { 'eng': '.odt' } },
        { '@id': 'application/vnd.oasis.opendocument.text-template', 'skos:notation': ['ott'], 'skos:prefLabel': { 'eng': '.ott' } },
        { '@id': 'application/vnd.oasis.opendocument.text-web', 'skos:notation': ['oth'], 'skos:prefLabel': { 'eng': '.oth' } },
        { '@id': 'application/vnd.oasis.opendocument.text-master', 'skos:notation': ['odm'], 'skos:prefLabel': { 'eng': '.odm' } },
        { '@id': 'application/vnd.oasis.opendocument.graphics', 'skos:notation': ['odg'], 'skos:prefLabel': { 'eng': '.odg' } },
        { '@id': 'application/vnd.oasis.opendocument.graphics-template', 'skos:notation': ['otg'], 'skos:prefLabel': { 'eng': '.otg' } },
        { '@id': 'application/vnd.oasis.opendocument.presentation', 'skos:notation': ['odp'], 'skos:prefLabel': { 'eng': '.odp' } },
        { '@id': 'application/vnd.oasis.opendocument.presentation-template', 'skos:notation': ['otp'], 'skos:prefLabel': { 'eng': '.otp' } },
        { '@id': 'application/vnd.oasis.opendocument.spreadsheet', 'skos:notation': ['ods'], 'skos:prefLabel': { 'eng': '.ods' } },
        { '@id': 'application/vnd.oasis.opendocument.spreadsheet-template', 'skos:notation': ['ots'], 'skos:prefLabel': { 'eng': '.ots' } },
        { '@id': 'application/vnd.oasis.opendocument.chart', 'skos:notation': ['odc'], 'skos:prefLabel': { 'eng': '.odc' } },
        { '@id': 'application/vnd.oasis.opendocument.formula', 'skos:notation': ['odf'], 'skos:prefLabel': { 'eng': '.odf' } },
        { '@id': 'application/vnd.oasis.opendocument.database', 'skos:notation': ['odb'], 'skos:prefLabel': { 'eng': '.odb' } },
        { '@id': 'application/vnd.oasis.opendocument.image', 'skos:notation': ['odi'], 'skos:prefLabel': { 'eng': '.odi' } }
      ],
      loaded: true
    },
    'licenses': {
      terms: [
        { '@id': 'http://rightsstatements.org/vocab/InC/1.0/', 'skos:prefLabel': { 'eng': '© All rights reserved' }, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by/4.0/', 'skos:prefLabel': { 'eng': 'CC BY 4.0 International' }, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC 4.0 International' }, 'img': 'cc-by-nc.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-nd/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC-ND 4.0 International' }, 'img': 'cc-by-nc-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-sa/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC-SA 4.0 International' }, 'img': 'cc-by-nc-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nd/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-ND 4.0 International' }, 'img': 'cc-by-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-sa/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-SA 4.0 International' }, 'img': 'cc-by-sa.png' }
      ],
      loaded: true
    },
    'alllicenses': {
      terms: [
        { '@id': 'http://rightsstatements.org/vocab/InC/1.0/', 'skos:prefLabel': { 'eng': '© All rights reserved' }, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by/4.0/', 'skos:prefLabel': { 'eng': 'CC BY 4.0 International' }, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC 4.0 International' }, 'img': 'cc-by-nc.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-nd/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC-ND 4.0 International' }, 'img': 'cc-by-nc-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-sa/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC-SA 4.0 International' }, 'img': 'cc-by-nc-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nd/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-ND 4.0 International' }, 'img': 'cc-by-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-sa/4.0/', 'skos:prefLabel': { 'eng': 'CC BY-SA 4.0 International' }, 'img': 'cc-by-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by/3.0/', 'skos:prefLabel': { 'eng': 'CC BY 3.0 Unported' }, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc/3.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC 3.0 Unported' }, 'img': 'cc-by-nc.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-nd/3.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC-ND 3.0 Unported' }, 'img': 'cc-by-nc-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-sa/3.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC-SA 3.0 Unported' }, 'img': 'cc-by-nc-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nd/3.0/', 'skos:prefLabel': { 'eng': 'CC BY-ND 3.0 Unported' }, 'img': 'cc-by-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-sa/3.0/', 'skos:prefLabel': { 'eng': 'CC BY-SA 3.0 Unported' }, 'img': 'cc-by-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by/3.0/at/', 'skos:prefLabel': { 'eng': 'CC BY 3.0 Austria' }, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc/3.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-NC 3.0 Austria' }, 'img': 'cc-by-nc.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-nd/3.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-NC-ND 3.0 Austria' }, 'img': 'cc-by-nc-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-sa/3.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-NC-SA 3.0 Austria' }, 'img': 'cc-by-nc-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nd/3.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-ND 3.0 Austria' }, 'img': 'cc-by-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-sa/3.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-SA 3.0 Austria' }, 'img': 'cc-by-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by/2.0/', 'skos:prefLabel': { 'eng': 'CC BY 2.0 Generic' }, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc/2.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC 2.0 Generic' }, 'img': 'cc-by-nc.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-nd/2.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC-ND 2.0 Generic' }, 'img': 'cc-by-nc-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-sa/2.0/', 'skos:prefLabel': { 'eng': 'CC BY-NC-SA 2.0 Generic' }, 'img': 'cc-by-nc-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nd/2.0/', 'skos:prefLabel': { 'eng': 'CC BY-ND 2.0 Generic' }, 'img': 'cc-by-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-sa/2.0/', 'skos:prefLabel': { 'eng': 'CC BY-SA 2.0 Generic' }, 'img': 'cc-by-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by/2.0/at/', 'skos:prefLabel': { 'eng': 'CC BY 2.0 Austria' }, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc/2.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-NC 2.0 Austria' }, 'img': 'cc-by-nc.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-nd/2.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-NC-ND 2.0 Austria' }, 'img': 'cc-by-nc-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-sa/2.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-NC-SA 2.0 Austria' }, 'img': 'cc-by-nc-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nd/2.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-ND 2.0 Austria' }, 'img': 'cc-by-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-sa/2.0/at/', 'skos:prefLabel': { 'eng': 'CC BY-SA 2.0 Austria' }, 'img': 'cc-by-sa.png' }
      ],
      loaded: true
    },
    'uncefact': {
      terms: [
        { '@id': 'MTR', 'skos:prefLabel': { 'eng': 'm' } },
        { '@id': 'CMT', 'skos:prefLabel': { 'eng': 'cm' } },
        { '@id': 'MMT', 'skos:prefLabel': { 'eng': 'mm' } },
        { '@id': 'GRM', 'skos:prefLabel': { 'eng': 'g' } },
        { '@id': 'KGM', 'skos:prefLabel': { 'eng': 'kg' } }
      ],
      loaded: true
    },
    'uncefactsize': {
      terms: [
        { '@id': 'MTR', 'skos:prefLabel': { 'eng': 'm' } },
        { '@id': 'CMT', 'skos:prefLabel': { 'eng': 'cm' } },
        { '@id': 'MMT', 'skos:prefLabel': { 'eng': 'mm' } }
      ],
      loaded: true
    },
    'uncefactweight': {
      terms: [
        { '@id': 'GRM', 'skos:prefLabel': { 'eng': 'g' } },
        { '@id': 'KGM', 'skos:prefLabel': { 'eng': 'kg' } }
      ],
      loaded: true
    },
    'carriertype': {
      terms: [
        { '@id': ns + '2FTX-ZPZV', 'skos:prefLabel': { 'eng': 'ADAT' } },
        { '@id': ns + 'A3BG-65F5', 'skos:prefLabel': { 'eng': 'CD' } },
        { '@id': ns + '4CQF-7HHF', 'skos:prefLabel': { 'eng': 'DAT' } },
        { '@id': ns + 'HXSS-NBZ4', 'skos:prefLabel': { 'eng': 'audiocassette' } },
        { '@id': ns + 'X627-FCV9', 'skos:prefLabel': { 'eng': 'tape' } }
      ],
      loaded: true
    },
    'resourcetype': {
      terms: [
        { '@id': ns + '44TN-P1S0', 'skos:prefLabel': { 'eng': 'image' } },
        { '@id': ns + '69ZZ-2KGX', 'skos:prefLabel': { 'eng': 'text' } },
        { '@id': ns + 'GXS7-ENXJ', 'skos:prefLabel': { 'eng': 'collection' } },
        { '@id': ns + 'B0Y6-GYT8', 'skos:prefLabel': { 'eng': 'video' } },
        { '@id': ns + '7AVS-Y482', 'skos:prefLabel': { 'eng': 'data' } },
        { '@id': ns + '8YB5-1M0J', 'skos:prefLabel': { 'eng': 'sound' } },
        { '@id': ns + '8MY0-BQDQ', 'skos:prefLabel': { 'eng': 'container' } },
        { '@id': ns + 'T8GH-F4V8', 'skos:prefLabel': { 'eng': 'resource' } }
      ],
      loaded: true
    },
    'resourcetypenocontainer': {
      terms: [
        { '@id': ns + '44TN-P1S0', 'skos:prefLabel': { 'eng': 'image' } },
        { '@id': ns + '69ZZ-2KGX', 'skos:prefLabel': { 'eng': 'text' } },
        { '@id': ns + 'GXS7-ENXJ', 'skos:prefLabel': { 'eng': 'collection' } },
        { '@id': ns + 'B0Y6-GYT8', 'skos:prefLabel': { 'eng': 'video' } },
        { '@id': ns + '7AVS-Y482', 'skos:prefLabel': { 'eng': 'data' } },
        { '@id': ns + '8YB5-1M0J', 'skos:prefLabel': { 'eng': 'sound' } },
        { '@id': ns + 'T8GH-F4V8', 'skos:prefLabel': { 'eng': 'resource' } }
      ],
      loaded: true
    },
    'genre': {
      terms: [
        { '@id': ns + '9E94-E3F8', 'skos:prefLabel': { 'eng': 'Diplomarbeit' } },
        { '@id': ns + 'P2YP-BMND', 'skos:prefLabel': { 'eng': 'Masterarbeit' } },
        { '@id': ns + '1PHE-7VMS', 'skos:prefLabel': { 'eng': 'Dissertation' } },
        { '@id': ns + 'ST05-F6SP', 'skos:prefLabel': { 'eng': 'Magisterarbeit' } },
        { '@id': ns + '9ZSV-CVJH', 'skos:prefLabel': { 'eng': 'Habilitation' } },
        { '@id': ns + 'H1TF-SDX1', 'skos:prefLabel': { 'eng': 'Master-Thesis (ULG)' } },
        { '@id': ns + 'QNV1-N1EC', 'skos:prefLabel': { 'eng': 'action' } },
        { '@id': ns + '31DA-295K', 'skos:prefLabel': { 'eng': 'anime' } },
        { '@id': ns + 'DB5C-1Y4H', 'skos:prefLabel': { 'eng': 'biopic' } },
        { '@id': ns + 'MKKZ-BH2Q', 'skos:prefLabel': { 'eng': 'discussion' } },
        { '@id': ns + 'WVGH-KT47', 'skos:prefLabel': { 'eng': 'documentary film' } },
        { '@id': ns + 'XFDY-E13E', 'skos:prefLabel': { 'eng': 'drama' } },
        { '@id': ns + 'GZQE-YK3K', 'skos:prefLabel': { 'eng': 'fantasy' } },
        { '@id': ns + 'KM7A-FYPP', 'skos:prefLabel': { 'eng': 'television film' } },
        { '@id': ns + 'MN1Y-YFCF', 'skos:prefLabel': { 'eng': 'historical film' } },
        { '@id': ns + 'G2VQ-GEEK', 'skos:prefLabel': { 'eng': 'horror' } },
        { '@id': ns + 'GFM4-2J48', 'skos:prefLabel': { 'eng': 'comedy' } },
        { '@id': ns + 'NQVM-6B2Y', 'skos:prefLabel': { 'eng': 'crime' } },
        { '@id': ns + 'BPAJ-NQ8N', 'skos:prefLabel': { 'eng': 'short film' } },
        { '@id': ns + 'AHWA-YKFH', 'skos:prefLabel': { 'eng': 'romance film' } },
        { '@id': ns + '7RZF-5216', 'skos:prefLabel': { 'eng': 'musical' } },
        { '@id': ns + 'A1B4-K5MK', 'skos:prefLabel': { 'eng': 'newscast' } },
        { '@id': ns + 'B4R8-Z419', 'skos:prefLabel': { 'eng': 'romance' } },
        { '@id': ns + 'XZ5S-JEJ5', 'skos:prefLabel': { 'eng': 'satire' } },
        { '@id': ns + 'YV6T-SWAF', 'skos:prefLabel': { 'eng': 'science fiction' } },
        { '@id': ns + 'A8HT-N1QB', 'skos:prefLabel': { 'eng': 'series' } },
        { '@id': ns + '1VZT-KE1S', 'skos:prefLabel': { 'eng': 'thriller' } },
        { '@id': ns + 'PCK6-NYPG', 'skos:prefLabel': { 'eng': 'tragicomedy' } },
        { '@id': ns + '2PV5-5V2H', 'skos:prefLabel': { 'eng': 'entertainment' } },
        { '@id': ns + 'G7EY-YXQR', 'skos:prefLabel': { 'eng': 'adventure' } },
        { '@id': ns + 'W2SK-Q08A', 'skos:prefLabel': { 'eng': 'animation' } },
        { '@id': ns + 'QHJ1-PVEB', 'skos:prefLabel': { 'eng': 'family' } },
        { '@id': ns + 'D8B5-D0YT', 'skos:prefLabel': { 'eng': 'mystery' } },
        { '@id': ns + 'R8VJ-TMTB', 'skos:prefLabel': { 'eng': 'war' } },
        { '@id': ns + 'WZMQ-2NG6', 'skos:prefLabel': { 'eng': 'western' } }
      ],
      loaded: true
    },
    'thesisgenre': {
      terms: [
        { '@id': ns + '9E94-E3F8', 'skos:prefLabel': { 'eng': 'Diplomarbeit' } },
        { '@id': ns + 'P2YP-BMND', 'skos:prefLabel': { 'eng': 'Masterarbeit' } },
        { '@id': ns + '1PHE-7VMS', 'skos:prefLabel': { 'eng': 'Dissertation' } },
        { '@id': ns + 'ST05-F6SP', 'skos:prefLabel': { 'eng': 'Magisterarbeit' } },
        { '@id': ns + '9ZSV-CVJH', 'skos:prefLabel': { 'eng': 'Habilitation' } },
        { '@id': ns + 'H1TF-SDX1', 'skos:prefLabel': { 'eng': 'Master-Thesis (ULG)' } }
      ],
      loaded: true
    },
    'moviegenre': {
      terms: [
        { '@id': ns + 'QNV1-N1EC', 'skos:prefLabel': { 'eng': 'action' } },
        { '@id': ns + '31DA-295K', 'skos:prefLabel': { 'eng': 'anime' } },
        { '@id': ns + 'DB5C-1Y4H', 'skos:prefLabel': { 'eng': 'biopic' } },
        { '@id': ns + 'MKKZ-BH2Q', 'skos:prefLabel': { 'eng': 'discussion' } },
        { '@id': ns + 'WVGH-KT47', 'skos:prefLabel': { 'eng': 'documentary film' } },
        { '@id': ns + 'XFDY-E13E', 'skos:prefLabel': { 'eng': 'drama' } },
        { '@id': ns + 'GZQE-YK3K', 'skos:prefLabel': { 'eng': 'fantasy' } },
        { '@id': ns + 'KM7A-FYPP', 'skos:prefLabel': { 'eng': 'television film' } },
        { '@id': ns + 'MN1Y-YFCF', 'skos:prefLabel': { 'eng': 'historical film' } },
        { '@id': ns + 'G2VQ-GEEK', 'skos:prefLabel': { 'eng': 'horror' } },
        { '@id': ns + 'GFM4-2J48', 'skos:prefLabel': { 'eng': 'comedy' } },
        { '@id': ns + 'NQVM-6B2Y', 'skos:prefLabel': { 'eng': 'crime' } },
        { '@id': ns + 'BPAJ-NQ8N', 'skos:prefLabel': { 'eng': 'short film' } },
        { '@id': ns + 'AHWA-YKFH', 'skos:prefLabel': { 'eng': 'romance film' } },
        { '@id': ns + '7RZF-5216', 'skos:prefLabel': { 'eng': 'musical' } },
        { '@id': ns + 'A1B4-K5MK', 'skos:prefLabel': { 'eng': 'newscast' } },
        { '@id': ns + 'B4R8-Z419', 'skos:prefLabel': { 'eng': 'romance' } },
        { '@id': ns + 'XZ5S-JEJ5', 'skos:prefLabel': { 'eng': 'satire' } },
        { '@id': ns + 'YV6T-SWAF', 'skos:prefLabel': { 'eng': 'science fiction' } },
        { '@id': ns + 'A8HT-N1QB', 'skos:prefLabel': { 'eng': 'series' } },
        { '@id': ns + '1VZT-KE1S', 'skos:prefLabel': { 'eng': 'thriller' } },
        { '@id': ns + 'PCK6-NYPG', 'skos:prefLabel': { 'eng': 'tragicomedy' } },
        { '@id': ns + '2PV5-5V2H', 'skos:prefLabel': { 'eng': 'entertainment' } },
        { '@id': ns + 'G7EY-YXQR', 'skos:prefLabel': { 'eng': 'adventure' } },
        { '@id': ns + 'W2SK-Q08A', 'skos:prefLabel': { 'eng': 'animation' } },
        { '@id': ns + 'QHJ1-PVEB', 'skos:prefLabel': { 'eng': 'family' } },
        { '@id': ns + 'D8B5-D0YT', 'skos:prefLabel': { 'eng': 'mystery' } },
        { '@id': ns + 'R8VJ-TMTB', 'skos:prefLabel': { 'eng': 'war' } },
        { '@id': ns + 'WZMQ-2NG6', 'skos:prefLabel': { 'eng': 'western' } }
        
      ],
      loaded: true
    },
    'objecttype': {
      terms: [
        { '@id': ns + '985A-GCQJ', 'skos:prefLabel': { 'eng': 'album cover', 'deu': 'Albumcover' } },
        { '@id': ns + 'N35H-PDEE', 'skos:prefLabel': { 'eng': 'annotation', 'deu': 'Anmerkung' } },
        { '@id': ns + '8EBX-CA9X', 'skos:prefLabel': { 'eng': 'annual report', 'deu': 'Jahresbericht' } },
        { '@id': ns + '2WRQ-GSE9', 'skos:prefLabel': { 'eng': 'arrangement (music)', 'deu': 'Arrangement (Musik)' } },
        { '@id': ns + '9J46-2X9E', 'skos:prefLabel': { 'eng': 'atlas', 'deu': 'Atlas' } },
        { '@id': ns + '47QB-8QF1', 'skos:prefLabel': { 'eng': 'book', 'deu': 'Buch' } },
        { '@id': ns + 'XA52-09WA', 'skos:prefLabel': { 'eng': 'book part', 'deu': 'Buchkapitel' } },
        { '@id': ns + 'VP4W-DQ1P', 'skos:prefLabel': { 'eng': 'book review', 'deu': 'Buchrezension' } },
        { '@id': ns + '62RJ-SFV2', 'skos:prefLabel': { 'eng': 'cartographic material', 'deu': 'kartographisches Material' } },
        { '@id': ns + 'QKDF-E5HA', 'skos:prefLabel': { 'eng': 'conference object', 'deu': 'Konferenzveröffentlichung' } },
        { '@id': ns + 'MF25-FDGW', 'skos:prefLabel': { 'eng': 'contribution to journal', 'deu': 'Zeitschriftenbeitrag' } },
        { '@id': ns + 'CEET-8C4S', 'skos:prefLabel': { 'eng': 'cover', 'deu': 'Abdeckung' } },
        { '@id': ns + 'CPVB-YXG6', 'skos:prefLabel': { 'eng': 'cultural artifact', 'deu': 'Kulturartefakt' } },
        { '@id': ns + 'W2Z3-3YA6', 'skos:prefLabel': { 'eng': 'data management plan', 'deu': 'Datenmanagementplan' } },
        { '@id': ns + 'KW6N-2VTP', 'skos:prefLabel': { 'eng': 'dataset', 'deu': 'Dataset' } },
        { '@id': ns + 'A9K1-3WQA', 'skos:prefLabel': { 'eng': 'diary', 'deu': 'Tagebuch' } },
        { '@id': ns + '85QM-7TZ3', 'skos:prefLabel': { 'eng': 'drawing', 'deu': 'Zeichnung' } },
        { '@id': ns + 'QXRQ-Z2PJ', 'skos:prefLabel': { 'eng': 'internal report', 'deu': 'interner Bericht' } },
        { '@id': ns + '8KGA-CH97', 'skos:prefLabel': { 'eng': 'interview', 'deu': 'Interview' } },
        { '@id': ns + 'VKA6-9XTY', 'skos:prefLabel': { 'eng': 'journal article', 'deu': 'Wissenschaftlicher Artikel' } },
        { '@id': ns + 'YA8R-1M0D', 'skos:prefLabel': { 'eng': 'learning object', 'deu': 'Lernobjekt' } },
        { '@id': ns + 'F4JN-ZST0', 'skos:prefLabel': { 'eng': 'lecture', 'deu': 'Vortrag' } },
        { '@id': ns + 'GBWA-JJP8', 'skos:prefLabel': { 'eng': 'letter (correspondence)', 'deu': 'Brief' } },
        { '@id': ns + 'EHPQ-XYA3', 'skos:prefLabel': { 'eng': 'magazine', 'deu': 'Informationszeitschrift' } },
        { '@id': ns + 'KMRH-NFR9', 'skos:prefLabel': { 'eng': 'manuscript', 'deu': 'Manuskript' } },
        { '@id': ns + 'A52A-CWMM', 'skos:prefLabel': { 'eng': 'map', 'deu': 'Karte' } },
        { '@id': ns + 'MCN9-1NSA', 'skos:prefLabel': { 'eng': 'memorandum', 'deu': 'Memorandum' } },
        { '@id': ns + 'M789-K5E0', 'skos:prefLabel': { 'eng': 'music album', 'deu': 'Musikalbum' } },
        { '@id': ns + 'EWZ9-3MPH', 'skos:prefLabel': { 'eng': 'musical composition', 'deu': 'musikalische Komposition' } },
        { '@id': ns + '8A6X-FKB1', 'skos:prefLabel': { 'eng': 'musical notation', 'deu': 'Musiknotation' } },
        { '@id': ns + '9W35-5Q94', 'skos:prefLabel': { 'eng': 'negative', 'deu': 'Negativ' } },
        { '@id': ns + 'DCHD-W3GM', 'skos:prefLabel': { 'eng': 'newspaper', 'deu': 'Zeitung' } },
        { '@id': ns + 'CJJG-VKRQ', 'skos:prefLabel': { 'eng': 'newspaper article', 'deu': 'Zeitungsartikel' } },
        { '@id': ns + 'PYRE-RAWJ', 'skos:prefLabel': { 'eng': 'other', 'deu': 'sonstige' } },
        { '@id': ns + '6QRG-9GN2', 'skos:prefLabel': { 'eng': 'other type of report', 'deu': 'Sonstiger Bericht' } },
        { '@id': ns + 'WWS3-0ACP', 'skos:prefLabel': { 'eng': 'painting', 'deu': 'Malerei' } },
        { '@id': ns + 'GY3Z-50FT', 'skos:prefLabel': { 'eng': 'periodical', 'deu': 'Periodikum' } },
        { '@id': ns + '7CAB-P987', 'skos:prefLabel': { 'eng': 'photograph', 'deu': 'Fotografie' } },
        { '@id': ns + 'R4W3-ZQ76', 'skos:prefLabel': { 'eng': 'picture', 'deu': 'Bild' } },
        { '@id': ns + 'JF85-NYRJ', 'skos:prefLabel': { 'eng': 'podcast', 'deu': 'Podcast' } },
        { '@id': ns + 'XWWK-533P', 'skos:prefLabel': { 'eng': 'policy report', 'deu': 'politischer Bericht' } },
        { '@id': ns + 'Q4Q5-3554', 'skos:prefLabel': { 'eng': 'postcard', 'deu': 'Postkarte' } },
        { '@id': ns + '6EFK-BRQD', 'skos:prefLabel': { 'eng': 'poster', 'deu': 'Plakat' } },
        { '@id': ns + 'T023-BGTD', 'skos:prefLabel': { 'eng': 'preprint', 'deu': 'Preprint' } },
        { '@id': ns + '7WYH-AZ8C', 'skos:prefLabel': { 'eng': 'print', 'deu': 'druckgraphisches Blatt' } },
        { '@id': ns + 'T8PK-GADB', 'skos:prefLabel': { 'eng': 'project deliverable', 'deu': 'Projektergebnis' } },
        { '@id': ns + 'MZ2Q-R099', 'skos:prefLabel': { 'eng': 'questionnaire', 'deu': 'Fragebogen' } },
        { '@id': ns + 'JMAV-7F3R', 'skos:prefLabel': { 'eng': 'report', 'deu': 'Bericht' } },
        { '@id': ns + 'PHQ7-BGFA', 'skos:prefLabel': { 'eng': 'report part', 'deu': 'Teilbericht' } },
        { '@id': ns + 'APV5-CJSF', 'skos:prefLabel': { 'eng': 'report to funding agency', 'deu': 'Bericht an Förderorganisation' } },
        { '@id': ns + '7J0J-HC61', 'skos:prefLabel': { 'eng': 'research report', 'deu': 'Forschungsbericht' } },
        { '@id': ns + 'VM3E-HXE6', 'skos:prefLabel': { 'eng': 'research software', 'deu': 'Forschungssoftware' } },
        { '@id': ns + 'JJKV-B1CG', 'skos:prefLabel': { 'eng': 'review', 'deu': 'Rezension' } },
        { '@id': ns + 'XTVH-3MG3', 'skos:prefLabel': { 'eng': 'score', 'deu': 'Partitur' } },
        { '@id': ns + '21HZ-XP29', 'skos:prefLabel': { 'eng': 'sculpture', 'deu': 'Skulptur' } },
        { '@id': ns + '431H-5YSA', 'skos:prefLabel': { 'eng': 'slide', 'deu': 'Diapositiv' } },
        { '@id': ns + '622D-CM27', 'skos:prefLabel': { 'eng': 'software', 'deu': 'Software' } },
        { '@id': ns + 'DF69-TVE8', 'skos:prefLabel': { 'eng': 'technical report', 'deu': 'technischer Bericht' } },
        { '@id': ns + '6FG3-514E', 'skos:prefLabel': { 'eng': 'transcript', 'deu': 'Transkript' } },
        { '@id': ns + 'QM0R-ZTAA', 'skos:prefLabel': { 'eng': 'wall chart', 'deu': 'Wandtafel' } },
        { '@id': ns + 'R1WF-V45Y', 'skos:prefLabel': { 'eng': 'website', 'deu': 'Website' } },
        { '@id': ns + '489N-Y6VX', 'skos:prefLabel': { 'eng': 'working paper', 'deu': 'Arbeitspapier' } },
        { '@id': ns + 'HARH-6R3C', 'skos:prefLabel': { 'eng': 'yearbook', 'deu': 'Jahrbuch' } },
      ],
      loaded: true
    },
    'irobjecttype': {
      terms: [
        { '@id': ns + 'VKA6-9XTY', 'skos:prefLabel': { 'eng': 'journal article' }, 'skos:definition': { 'eng': 'An article on a particular topic and published in a journal issue.' } },
        { '@id': ns + 'T023-BGTD', 'skos:prefLabel': { 'eng': 'preprint' }, 'skos:definition': { 'eng': 'Pre-print describes the first draft of the article - before peer-review, even before any contact with a publisher. This use is common amongst academics for whom the key modification of an article is the peer-review process. Another use of the term pre-print is for the finished article, reviewed and amended, ready and accepted for publication - but separate from the version that is type-set or formatted by the publisher. This use is more common amongst publishers, for whom the final and significant stage of modification to an article is the arrangement of the material for putting to print.' } },
        { '@id': ns + '489N-Y6VX', 'skos:prefLabel': { 'eng': 'working paper' }, 'skos:definition': { 'eng': 'An unpublished paper, usually circulated privately among a small group of peers, to provide information or with a request for comments or editorial improvement.' } },
        { '@id': ns + 'JMAV-7F3R', 'skos:prefLabel': { 'eng': 'report' }, 'skos:definition': { 'eng': 'A report is a separately published record of research findings, research still in progress, or other technical findings, usually bearing a report number and sometimes a grant number assigned by the funding agency. Also, an official record of the activities of a committee or corporate entity, the proceedings of a government body, or an investigation by an agency, whether published or private, usually archived or submitted to a higher authority, voluntarily or under mandate. In a more general sense, any formal account of facts or information related to a specific event or phenomenon, sometimes given at regular intervals.' } },
        { '@id': ns + 'JJKV-B1CG', 'skos:prefLabel': { 'eng': 'review' }, 'skos:definition': { 'eng': 'A review of others\' published or performed works (e.g., books, films, sound recordings, theater, etc.).' } },
        { '@id': ns + 'MF25-FDGW', 'skos:prefLabel': { 'eng': 'contribution to journal' }, 'skos:definition': { 'eng': 'A contribution to a journal denotes a work published in a journal. If applicable sub-terms should be chosen.' } },
        { '@id': ns + '47QB-8QF1', 'skos:prefLabel': { 'eng': 'book' }, 'skos:definition': { 'eng': 'Items comprising a collection of leaves of paper, parchment, wood, stiffened textile, ivory, metal tablets, or other flat material, that are blank, written on, or printed, and are strung or bound together in a volume.' } },
        { '@id': ns + 'XA52-09WA', 'skos:prefLabel': { 'eng': 'book part' }, 'skos:definition': { 'eng': 'A defined chapter or section of a book, usually with a separate title or number.' } },
        { '@id': ns + '1PHE-7VMS', 'skos:prefLabel': { 'eng': 'dissertation' }, 'skos:definition': { 'eng': 'dissertation' } },
        { '@id': ns + 'QKDF-E5HA', 'skos:prefLabel': { 'eng': 'conference object' }, 'skos:definition': { 'eng': 'All kind of digital resources contributed to a conference, like conference presentation (slides), conference report, conference lecture, abstracts, demonstrations.' } },
        { '@id': ns + 'F4JN-ZST0', 'skos:prefLabel': { 'eng': 'lecture' }, 'skos:definition': { 'eng': 'Expositions of a given subject delivered before an audience or class, especially for the purposes of instruction.' } },
        { '@id': ns + 'KW6N-2VTP', 'skos:prefLabel': { 'eng': 'dataset' }, 'skos:definition': { 'eng': 'A collection of related facts and data encoded in a defined structure.' } },
        { '@id': ns + 'N35H-PDEE', 'skos:prefLabel': { 'eng': 'annotation' }, 'skos:definition': { 'eng': 'An annotation in the sense of a legal note is a legally explanatory comment on a decision handed down by a court or arbitral tribunal.' } },
        { '@id': ns + 'PYRE-RAWJ', 'skos:prefLabel': { 'eng': 'other' }, 'skos:definition': { 'eng': 'An object type not explicitly addressed in any concept in this vocabulary.' } }
      ],
      loaded: true
    },
    'irobjecttypearticle': {
      terms: [
        { '@id': ns + 'VKA6-9XTY', 'skos:prefLabel': { 'eng': 'journal article' }, 'skos:definition': { 'eng': 'An article on a particular topic and published in a journal issue.' } },
        { '@id': ns + 'JMAV-7F3R', 'skos:prefLabel': { 'eng': 'report' }, 'skos:definition': { 'eng': 'A report is a separately published record of research findings, research still in progress, or other technical findings, usually bearing a report number and sometimes a grant number assigned by the funding agency. Also, an official record of the activities of a committee or corporate entity, the proceedings of a government body, or an investigation by an agency, whether published or private, usually archived or submitted to a higher authority, voluntarily or under mandate. In a more general sense, any formal account of facts or information related to a specific event or phenomenon, sometimes given at regular intervals.' } },
        { '@id': ns + 'JJKV-B1CG', 'skos:prefLabel': { 'eng': 'review' }, 'skos:definition': { 'eng': 'A review of others\' published or performed works (e.g., books, films, sound recordings, theater, etc.).' } },
        { '@id': ns + 'PYRE-RAWJ', 'skos:prefLabel': { 'eng': 'other' }, 'skos:definition': { 'eng': 'An object type not explicitly addressed in any concept in this vocabulary.' } }
      ],
      loaded: true
    },
    'accessright': {
      terms: [
        { '@id': ns + 'QW5R-NG4J', 'skos:prefLabel': { 'eng': 'open access' }, 'skos:definition': { 'eng': 'Open access refers to a resource that is immediately and permanently online, and free for all on the Web, without financial and technical barriers.The resource is either stored in the repository or referenced to an external journal or trustworthy archive.' } },
        { '@id': ns + 'AVFC-ZZSZ', 'skos:prefLabel': { 'eng': 'embargoed access' }, 'skos:definition': { 'eng': 'Embargoed access refers to a resource that is metadata only access until released for open access on a certain date. Embargoes can be required by publishers and funders policies, or set by the author (e.g such as in the case of theses and dissertations).' } },
        { '@id': ns + 'KC3K-CCGM', 'skos:prefLabel': { 'eng': 'restricted access' }, 'skos:definition': { 'eng': 'Restricted access refers to a resource that is available in a system but with some type of restriction for full open access. This type of access can occur in a number of different situations. Some examples are described below: The user must log-in to the system in order to access the resource The user must send an email to the author or system administrator to access the resource Access to the resource is restricted to a specific community (e.g. limited to a university community).' } },
        { '@id': ns + 'QNGE-V02H', 'skos:prefLabel': { 'eng': 'metadata only access' }, 'skos:definition': { 'eng': 'Metadata only access refers to a resource in which access is limited to metadata only. The resource itself is described by the metadata, but neither is directly available through the system or platform nor can be referenced to an open access copy in an external journal or trustworthy archive.' } }
      ],
      loaded: true
    },
    'iraccessright': {
      terms: [
        { '@id': ns + 'QW5R-NG4J', 'skos:prefLabel': { 'eng': 'open access' }, 'skos:definition': { 'eng': 'Access to the resource is offered without any restrictions.' } },
        { '@id': ns + 'AVFC-ZZSZ', 'skos:prefLabel': { 'eng': 'embargoed access' }, 'skos:definition': { 'eng': 'The resource cannot be accessed until a given date on which it will be released for open access. A copy can be requested via e-mail.' } },
        { '@id': ns + 'KC3K-CCGM', 'skos:prefLabel': { 'eng': 'restricted access' }, 'skos:definition': { 'eng': 'Access to full texts and materials is restricted to persons or groups of persons affiliated with the University of Vienna that we can specify as per your instructions. Others may request a copy via e-mail.' } },
        { '@id': ns + 'QNGE-V02H', 'skos:prefLabel': { 'eng': 'metadata only access' }, 'skos:definition': { 'eng': 'Access to full texts and materials is restricted to you.' } }
      ],
      loaded: true
    },
    'versiontypes': {
      terms: [
        { '@id': ns + 'TV31-080M', 'skos:notation': ['AO'], 'skos:prefLabel': { 'eng': 'author\'s original' }, 'skos:definition': { 'eng': 'Any version of a resource that is considered by the author to be of sufficient quality to be submitted for formal peer review by a second party. The author accepts full responsibility for the resource . May have a version number or date stamp. Content and layout as set out by the author.' } },
        { '@id': ns + 'JTD4-R26P', 'skos:notation': ['SMUR'], 'skos:prefLabel': { 'eng': 'submitted manuscript under review' }, 'skos:definition': { 'eng': 'Any version of a resource that is under formal review managed by a socially recognized publishing entity. The entity recognizes its responsibility to provide objective expert review and feedback to the author, and, ultimately, to pass judgment on the fitness of the resource for publication with an “accept” or “reject” decision. May have a version number or date stamp. Content and layout follow publisher’s submission requirements.' } },
        { '@id': ns + 'PHXV-R6B3', 'skos:notation': ['AM'], 'skos:prefLabel': { 'eng': 'accepted version' }, 'skos:definition': { 'eng': 'The version of a resource that has been accepted for publication. A second party takes permanent responsibility for the resource. Content and layout follow publisher’s submission requirements.' } },
        { '@id': ns + '83ZP-CPP2', 'skos:notation': ['P'], 'skos:prefLabel': { 'eng': 'proof' }, 'skos:definition': { 'eng': 'A version of a resource that is created as part of the publication process. This includes the copy-edited manuscript, galley proofs (i.e., a typeset version that has not been made up into pages), page proofs, and revised proofs. Some of these versions may remain essentially internal process versions, but others are commonly released from the internal environment (e.g., proofs are sent to authors) and may thus become public, even though they are not authorized to be so. Content has been changed from Accepted Manuscript; layout is the publisher’s.' } },
        { '@id': ns + 'PMR8-3C8D', 'skos:notation': ['VoR'], 'skos:prefLabel': { 'eng': 'version of record (published version)' }, 'skos:definition': { 'eng': 'A fixed version of a resource that has been made available by any organization that acts as a publisher by formally and exclusively declaring the resource “published”. This includes any “early release” resource that is formally identified as being published even before the compilation of a volume issue and assignment of associated metadata, as long as it is citable via some permanent identifier(s). This does not include any “early release” resource that has not yet been “fixed” by processes that are still to be applied, such as copy-editing, proof corrections, layout, and typesetting.' } },
        { '@id': ns + 'MT1G-APSB', 'skos:notation': ['CVoR'], 'skos:prefLabel': { 'eng': 'corrected version of record' }, 'skos:definition': { 'eng': 'A version of the Version of Record of a resource in which errors in the VoR have been corrected. The errors may be author errors, publisher errors, or other processing errors.' } },
        { '@id': ns + 'SSQW-AP1S', 'skos:notation': ['EVoR'], 'skos:prefLabel': { 'eng': 'enhanced version of record' }, 'skos:definition': { 'eng': 'A version of the Version of Record of a resource that has been updated or enhanced by the provision of supplementary material.' } },
        { '@id': ns + 'KZB5-0F5G', 'skos:notation': ['NA'], 'skos:prefLabel': { 'eng': 'not applicable (or unknown)' }, 'skos:definition': { 'eng': 'Not Applicable (or Unknown).' } }
      ],
      loaded: true
    },
    'irfunders': {
      terms: [
        { '@id': ns + 'N3C4-ZVR0', 'skos:prefLabel': { 'eng': 'Austrian Science Fund (FWF)' } },
        { '@id': ns + 'EYN2-KEW2', 'skos:prefLabel': { 'eng': 'Bundesministerium für Bildung, Wissenschaft und Forschung (BMBWF)' } },
        { '@id': ns + '74ZM-RFR6', 'skos:prefLabel': { 'eng': 'European Science Foundation (ESF)' } },
        { '@id': ns + 'RDY6-W6C3', 'skos:prefLabel': { 'eng': 'European Union (all programmes)' } },
        { '@id': ns + 'APPY-SKP2', 'skos:prefLabel': { 'eng': 'Jubiläumsfonds der Österreichischen Nationalbank' } },
        { '@id': ns + 'TF8A-AS8X', 'skos:prefLabel': { 'eng': 'Österreichische Akademie der Wissenschaften (ÖAW)' } },
        { '@id': ns + 'RX5K-E2KX', 'skos:prefLabel': { 'eng': 'Österreichische Forschungsförderungsgesellschaft mbH (FFG)' } },
        { '@id': ns + 'RESE-5QGF', 'skos:prefLabel': { 'eng': 'Österreichische Forschungsgemeinschaft (ÖFG)' } },
        { '@id': ns + 'SN0W-4T4J', 'skos:prefLabel': { 'eng': 'Österreichischer Austauschdienst (OeAD)' } },
        { '@id': ns + 'S9R7-X1M2', 'skos:prefLabel': { 'eng': 'Österreichischer Nationalfonds für Opfer des Nationalsozialismus' } },
        { '@id': ns + 'X4EX-JK51', 'skos:prefLabel': { 'eng': 'University of Vienna' } },
        { '@id': ns + 'XMYF-893X', 'skos:prefLabel': { 'eng': 'Vienna Science and Technology Fund (WWTF)' } },
        { '@id': ns + '6HPQ-MTZV', 'skos:prefLabel': { 'eng': 'Zukunftsfonds der Republik Österreich' } },
        { '@id': 'other', 'skos:prefLabel': { 'eng': 'Other' } }
      ],
      loaded: true
    },
    'technique': {
      terms: [
        { '@id': ns + 'NZ42-TTZT', 'skos:prefLabel': { 'eng': 'black-and-white photography' } },
        { '@id': ns + 'DC1W-JWNP', 'skos:prefLabel': { 'eng': 'color photography' } },
        { '@id': ns + 'AH0S-F3BV', 'skos:prefLabel': { 'eng': 'black-and-white film' } },
        { '@id': ns + 'K818-FSM5', 'skos:prefLabel': { 'eng': 'color film' } },
        { '@id': ns + '748F-SQW9', 'skos:prefLabel': { 'eng': 'silent film' } },
        { '@id': ns + '1K09-VXQ4', 'skos:prefLabel': { 'eng': 'sound film' } }
      ],
      loaded: true
    },
    'material': {
      terms: [
        { '@id': ns + 'CRGV-097N', 'skos:prefLabel': { 'eng': 'black marble' } },
        { '@id': ns + 'EXRJ-GCYG', 'skos:prefLabel': { 'eng': 'shampoo' } }
      ],
      loaded: true
    },
    'reproduction': {
      terms: [
        { '@id': ns + 'AYRE-RQAS', 'skos:prefLabel': { 'eng': 'original' } },
        { '@id': ns + 'BD33-7WA2', 'skos:prefLabel': { 'eng': 'copy' } }
      ],
      loaded: true
    },
    'audience': {
      terms: [
        { '@id': ns + 'TEPR-J4EZ', 'skos:prefLabel': { 'eng': 'FSK ab 0 freigegeben' } },
        { '@id': ns + '7ANY-9744', 'skos:prefLabel': { 'eng': 'FSK ab 6 freigegeben' } },
        { '@id': ns + '4DQY-TNPT', 'skos:prefLabel': { 'eng': 'FSK ab 12 freigegeben' } },
        { '@id': ns + 'HSDH-MD0J', 'skos:prefLabel': { 'eng': 'FSK ab 16 freigegeben' } },
        { '@id': ns + 'F2VP-9Z07', 'skos:prefLabel': { 'eng': 'FSK ab 18 freigegeben' } },
        { '@id': ns + 'C2TK-3DTQ', 'skos:prefLabel': { 'eng': 'Freigegeben gemäß §14 JuSchG FSK' } }
      ],
      loaded: true
    },
    'regionalencoding': {
      terms: [
        { '@id': ns + 'AR9M-B9J4', 'skos:prefLabel': { 'eng': '1' } },
        { '@id': ns + '6Z5R-XEG2', 'skos:prefLabel': { 'eng': '2' } },
        { '@id': ns + '2YZZ-TX6M', 'skos:prefLabel': { 'eng': '3' } },
        { '@id': ns + '36BC-K989', 'skos:prefLabel': { 'eng': '4' } },
        { '@id': ns + 'ADS3-D2RC', 'skos:prefLabel': { 'eng': '5' } },
        { '@id': ns + '9NQT-YAJ4', 'skos:prefLabel': { 'eng': '6' } },
        { '@id': ns + 'QN10-XAKZ', 'skos:prefLabel': { 'eng': '7' } },
        { '@id': ns + 'KE1K-8NT7', 'skos:prefLabel': { 'eng': '8' } },
        { '@id': ns + 'GSVQ-6H7P', 'skos:prefLabel': { 'eng': 'A/1' } },
        { '@id': ns + '149W-4F0N', 'skos:prefLabel': { 'eng': 'B/2' } },
        { '@id': ns + 'VHCV-2WY3', 'skos:prefLabel': { 'eng': 'C/3' } },
        { '@id': ns + '3MQF-RDQQ', 'skos:prefLabel': { 'eng': 'region free' } }
      ],
      loaded: true
    },
    'dceformat': {
      terms: [
        { '@id': ns + 'J6JG-69V6', 'skos:prefLabel': { 'eng': '3gp' } },
        { '@id': ns + '3F67-KMTM', 'skos:prefLabel': { 'eng': 'AAC+' } },
        { '@id': ns + '7A81-FXCX', 'skos:prefLabel': { 'eng': 'Barco Auro' } },
        { '@id': ns + 'FRJJ-4376', 'skos:prefLabel': { 'eng': 'DTS' } },
        { '@id': ns + 'EHF7-FEAP', 'skos:prefLabel': { 'eng': 'DTS 96/24' } },
        { '@id': ns + 'T5SX-Z04Y', 'skos:prefLabel': { 'eng': 'DTS Discrete 5.1' } },
        { '@id': ns + '9FGJ-Z8DH', 'skos:prefLabel': { 'eng': 'DTS ES Discrete 6.1' } },
        { '@id': ns + 'ESQT-3YY5', 'skos:prefLabel': { 'eng': 'DTS ES Matrix 6.1' } },
        { '@id': ns + '348K-MZZ6', 'skos:prefLabel': { 'eng': 'DTS HD' } },
        { '@id': ns + 'EN75-Q4HC', 'skos:prefLabel': { 'eng': 'DTS NEO:6' } },
        { '@id': ns + 'T7Q0-M2FS', 'skos:prefLabel': { 'eng': 'DTS++' } },
        { '@id': ns + '28X4-0935', 'skos:prefLabel': { 'eng': 'DTS:X' } },
        { '@id': ns + '3W6M-5MP3', 'skos:prefLabel': { 'eng': 'Datasat' } },
        { '@id': ns + 'MCQ6-HPAH', 'skos:prefLabel': { 'eng': 'Digital Surround 7.1' } },
        { '@id': ns + '8T8J-936P', 'skos:prefLabel': { 'eng': 'Dolby Atmos' } },
        { '@id': ns + '9SHY-VVN6', 'skos:prefLabel': { 'eng': 'Dolby Digital' } },
        { '@id': ns + '61PF-1NEJ', 'skos:prefLabel': { 'eng': 'Dolby Digital 5.1' } },
        { '@id': ns + 'GHEV-3W1J', 'skos:prefLabel': { 'eng': 'Dolby Digital EX' } },
        { '@id': ns + 'VN51-WRAF', 'skos:prefLabel': { 'eng': 'Dolby Digital Plus' } },
        { '@id': ns + '8RFW-88Q3', 'skos:prefLabel': { 'eng': 'Dolby Pro Logic II' } },
        { '@id': ns + '55WB-XQ4P', 'skos:prefLabel': { 'eng': 'Dolby SR-D' } },
        { '@id': ns + '2JPY-C523', 'skos:prefLabel': { 'eng': 'Dolby SR-D-EX' } },
        { '@id': ns + 'XZNA-QKBP', 'skos:prefLabel': { 'eng': 'Dolby Stereo' } },
        { '@id': ns + 'W56N-VX1X', 'skos:prefLabel': { 'eng': 'Dolby Surround' } },
        { '@id': ns + 'DCZS-VZ7X', 'skos:prefLabel': { 'eng': 'Dolby TrueHD' } },
        { '@id': ns + 'SDE9-JMJJ', 'skos:prefLabel': { 'eng': 'Dolby-SR' } },
        { '@id': ns + '1DE8-XDG2', 'skos:prefLabel': { 'eng': 'MPEG-4 ALS' } },
        { '@id': ns + 'K9BD-K8GP', 'skos:prefLabel': { 'eng': 'Mono' } },
        { '@id': ns + '2BCB-S1B5', 'skos:prefLabel': { 'eng': 'SDDS' } },
        { '@id': ns + '7FMD-95WA', 'skos:prefLabel': { 'eng': 'Stereo' } },
        { '@id': ns + 'KCDR-Q08F', 'skos:prefLabel': { 'eng': 'Stereo 2.0' } },
        { '@id': ns + 'DBKT-3BQ3', 'skos:prefLabel': { 'eng': 'Surround 5.1' } },
        { '@id': ns + 'G1KV-MAFP', 'skos:prefLabel': { 'eng': 'VCD' } },
        { '@id': ns + 'RQK2-8156', 'skos:prefLabel': { 'eng': 'aif' } },
        { '@id': ns + '52G8-44YX', 'skos:prefLabel': { 'eng': 'ape' } },
        { '@id': ns + 'C5G1-JQQZ', 'skos:prefLabel': { 'eng': 'asf' } },
        { '@id': ns + 'AFZ7-4AY9', 'skos:prefLabel': { 'eng': 'au' } },
        { '@id': ns + 'KF60-K40F', 'skos:prefLabel': { 'eng': 'avi' } },
        { '@id': ns + '44YA-6HGK', 'skos:prefLabel': { 'eng': 'divx' } },
        { '@id': ns + 'GDTY-V9H4', 'skos:prefLabel': { 'eng': 'dv' } },
        { '@id': ns + 'GW3R-K19G', 'skos:prefLabel': { 'eng': 'evo' } },
        { '@id': ns + 'D3GB-MPSY', 'skos:prefLabel': { 'eng': 'fla' } },
        { '@id': ns + 'E2EJ-277K', 'skos:prefLabel': { 'eng': 'flac' } },
        { '@id': ns + '29PG-5AKN', 'skos:prefLabel': { 'eng': 'flv' } },
        { '@id': ns + '2CRY-PD3C', 'skos:prefLabel': { 'eng': 'ggf' } },
        { '@id': ns + 'KPT0-47XA', 'skos:prefLabel': { 'eng': 'm2ts' } },
        { '@id': ns + 'YK2W-SAFC', 'skos:prefLabel': { 'eng': 'm4a' } },
        { '@id': ns + 'S9PM-AGHF', 'skos:prefLabel': { 'eng': 'mac' } },
        { '@id': ns + '9594-QH49', 'skos:prefLabel': { 'eng': 'mka' } },
        { '@id': ns + 'RRWW-7W5N', 'skos:prefLabel': { 'eng': 'mkv' } },
        { '@id': ns + '15DS-TAGX', 'skos:prefLabel': { 'eng': 'mp3' } },
        { '@id': ns + 'F487-H20C', 'skos:prefLabel': { 'eng': 'mp3HD' } },
        { '@id': ns + 'AFA0-APVK', 'skos:prefLabel': { 'eng': 'mpeg' } },
        { '@id': ns + 'DT3X-PH6D', 'skos:prefLabel': { 'eng': 'mpeg-1' } },
        { '@id': ns + 'B008-MRZD', 'skos:prefLabel': { 'eng': 'mpeg-2' } },
        { '@id': ns + 'PQ4H-JT2Y', 'skos:prefLabel': { 'eng': 'mpeg-4' } },
        { '@id': ns + '26M9-M5MR', 'skos:prefLabel': { 'eng': 'mpg' } },
        { '@id': ns + 'NZKM-SH76', 'skos:prefLabel': { 'eng': 'mts' } },
        { '@id': ns + 'T59Z-PCFE', 'skos:prefLabel': { 'eng': 'mxf' } },
        { '@id': ns + 'TR4G-6P0B', 'skos:prefLabel': { 'eng': 'ogg' } },
        { '@id': ns + '7ZVE-WQQ2', 'skos:prefLabel': { 'eng': 'ra' } },
        { '@id': ns + 'J5QX-S86N', 'skos:prefLabel': { 'eng': 'ram' } },
        { '@id': ns + 'P66F-9ERB', 'skos:prefLabel': { 'eng': 'rm' } },
        { '@id': ns + 'BJDK-FC30', 'skos:prefLabel': { 'eng': 'snd' } },
        { '@id': ns + 'N0QE-B24V', 'skos:prefLabel': { 'eng': 'vob' } },
        { '@id': ns + 'X2ZR-7C1F', 'skos:prefLabel': { 'eng': 'voc' } },
        { '@id': ns + 'QYGZ-K8W4', 'skos:prefLabel': { 'eng': 'wav' } },
        { '@id': ns + '6S1H-S5GF', 'skos:prefLabel': { 'eng': 'webm' } },
        { '@id': ns + '783J-J5PD', 'skos:prefLabel': { 'eng': 'wma' } },
        { '@id': ns + '7B2N-07A7', 'skos:prefLabel': { 'eng': 'wmv' } },
        { '@id': ns + 'VTY6-58WQ', 'skos:prefLabel': { 'eng': 'xvid' } }
      ],
      loaded: true
    },
    'lang_vocab': {
      terms: [
        { '@id': ns + 'KJ67-VB82', 'skos:prefLabel': { 'eng': 'Castilian', 'deu': 'Kastilisch' } },
        { '@id': ns + 'MKXZ-SARM', 'skos:prefLabel': { 'eng': 'Lebanese', 'deu': 'Libanesisch-Arabisch' } }
      ],
      loaded: true
    },
    'lang': {
      terms: [],
      sorted: { deu: [], eng: [] },
      loaded: false
    },
    'orgunits': {
      terms: [],
      tree: [],
      loaded: false,
      linked: false,
      sorted: ''
    }
  }
}

const mutations = {
  sortOrgUnits (state, locale) {
    if (state.vocabularies['orgunits'].sorted !== locale) {
      state.vocabularies['orgunits']['terms'].sort(function (a, b) {
        return a['skos:prefLabel'][locale].localeCompare(b['skos:prefLabel'][locale], locale)
      })
      state.vocabularies['orgunits'].sorted = locale
    }
  },
  setOrgUnits (state, data) {
    if (state.vocabularies['orgunits']['loaded'] === false) {
      state.vocabularies['orgunits']['tree'] = data.tree
      state.vocabularies['orgunits']['terms'] = data.terms
      state.vocabularies['orgunits']['loaded'] = true
    }
  },
  sortRoles (state, locale) {
    state.vocabularies['rolepredicate']['terms'].sort(function (a, b) {
      return a['skos:prefLabel'][locale].localeCompare(b['skos:prefLabel'][locale], locale)
    })
  },
  setLangTerms (state, data) {
    if (state.vocabularies['lang']['loaded'] === false) {
      state.vocabularies['lang']['terms'] = data
      state.vocabularies['lang']['loaded'] = true
    }
  },
  disableVocabularyTerms (state, vocandterms) {
    if (state.vocabularies[vocandterms.vocabulary]) {
      for (let t of state.vocabularies[vocandterms.vocabulary].terms) {
        for (let termid of vocandterms.termids) {
          if (t['@id'] === termid) {
            t.disabled = true
          }
        }
      }
    }
  },
  enableAllVocabularyTerms (state, vocabulary) {
    if (state.vocabularies[vocabulary]) {
      for (let t of state.vocabularies[vocabulary].terms) {
        t.disabled = false
      }
    }
  },
  loadVocabulary (state, payload) {
    let id = payload.id
    let data = payload.data

    let terms = []

    let labHash
    for (let lab of data.results.bindings) {
      // TODO: remove replace once pid. is exported to triplestore instead of vocab.
      let id = lab.id.value.replace('vocab.phaidra.org', 'pid.phaidra.org')
      let lang = lang2to3map[lab.label['xml:lang']]
      let found = false
      for (let term of terms) {
        if (term['@id'] === id) {
          term['skos:prefLabel'][lang] = lab.label.value
          found = true
          break
        }
      }
      if (!found) {
        terms.push({
          '@id': id,
          'skos:prefLabel': {
            lang: lab.label.value
          }
        })
      }
    }
    state.vocabularies[id] = {
      terms: terms,
      loaded: true
    }
  }
}

const actions = {
  loadLanguages ({ commit }, locale) {
    let langterms = languages.get_lang()
    langterms.sort((a, b) => a['skos:prefLabel'][locale].localeCompare(b['skos:prefLabel'][locale], locale))
    commit('setLangTerms', langterms)
  },
  async loadOrgUnits ({ commit, rootState, state }, locale) {
    if (state.vocabularies['orgunits']['loaded'] === false) {
      try {
        let response = await axios.request({
          method: 'GET',
          url: rootState.instanceconfig.api + '/directory/org_get_units'
        })
        if (response.data.alerts && response.data.alerts.length > 0) {
          commit('setAlerts', response.data.alerts)
        }
        let terms = []
        orgunits.getOrgUnitsTerms(terms, response.data.units, null)
        commit('setOrgUnits', { tree: response.data.units, terms: terms, locale: locale })
        commit('sortOrgUnits', locale)
      } catch (error) {
        console.log(error)
        commit('setAlerts', [ { type: 'danger', msg: 'Failed to fetch org units: ' + error } ])
      }
    } else {
      if (state.vocabularies['orgunits']['locale'] !== locale) {
        commit('sortOrgUnits', locale)
      }
    }
  },
  async loadVocabulary ({ commit, state, rootState }, vocabId) {
    if (state.vocabularies[vocabId]) {
      if (state.vocabularies[vocabId].loaded) {
        return
      }
    }
    try {
      var raw = 'PREFIX v: <' + rootState.appconfig.apis.vocserver.ns + '>\
      PREFIX : <' + rootState.appconfig.apis.vocserver.ns + 'schema#>\
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
      SELECT ?id ?label ?exp\
      WHERE {\
        graph ?g {\
          ?id :memberOf  v:' + vocabId + ' .\
          ?id skos:prefLabel ?label .\
            OPTIONAL {\
              ?id :expires ?exp .\
            }\
        }\
      }'
      let response = await axios.request({
        method: 'POST',
        url: rootState.appconfig.apis.vocserver.url + rootState.appconfig.apis.vocserver.dataset + '/query',
        headers: {'Content-Type': 'application/sparql-query'},
        data: raw
      })
      if (response.data && response.data.results && response.data.results.bindings) {
        commit('loadVocabulary', { id: vocabId, data: response.data })
      } else {
        console.log('Failed to fetch vocabulary ' + vocabId)
        commit('setAlerts', [ { type: 'danger', msg: 'Failed to fetch vocabulary ' + vocabId + ': ' + error } ])
      }
    } catch (error) {
      console.log(error)
      commit('setAlerts', [ { type: 'danger', msg: 'Failed to fetch vocabulary ' + vocabId + ': ' + error } ])
    }
  }
}

const getters = {
  getLocalizedTermLabel: (state) => (voc, id, lang) => {
    let terms = state.vocabularies[voc].terms
    for (let i = 0; i < terms.length; i++) {
      if (terms[i]['@id'] === id) {
        return terms[i]['skos:prefLabel'][lang] ? terms[i]['skos:prefLabel'][lang] : terms[i]['skos:prefLabel']['eng']
      }
    }
  },
  getLocalizedTermLabelByNotation: (state) => (voc, notation, lang) => {
    let terms = state.vocabularies[voc].terms
    for (let i = 0; i < terms.length; i++) {
      if (terms[i]['skos:notation'] === notation) {
        return terms[i]['skos:prefLabel'][lang] ? terms[i]['skos:prefLabel'][lang] : terms[i]['skos:prefLabel']['eng']
      }
    }
  },
  getTerm: (state) => (voc, id) => {
    let terms = state.vocabularies[voc].terms
    for (let i = 0; i < terms.length; i++) {
      if (terms[i]['@id'] === id) {
        return terms[i]
      }
    }
  },
  getTermProperty: (state) => (voc, id, prop) => {
    let terms = state.vocabularies[voc].terms
    for (let i = 0; i < terms.length; i++) {
      if (terms[i]['@id'] === id) {
        return terms[i][prop]
      }
    }
  },
  getObjectTypeForResourceType: (state) => (rtId) => {
    let arr = []
    if (rtId !== ns + 'GXS7-ENXJ') {
      for (let otId of ot4rt[rtId]) {
        for (let term of state.vocabularies['objecttype'].terms) {
          if (term['@id'] === otId) {
            arr.push(term)
          }
        }
      }
    }
    return arr
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
