export default {
  defaultinstance: 'phaidra-sandbox.univie.ac.at',
  global: {
    showinstanceswitch: 1,
    enablelogin: 1,
    suggesters: {
      getty: 'https://ws.gbv.de/suggest/getty/'
    }
  },  
  instances: {
    'phaidra.univie.ac.at': {
      baseurl: 'phaidra.univie.ac.at',
      api: 'https://services.phaidra.univie.ac.at/api',
      solr: 'https://app01.cc.univie.ac.at:8983/solr/phaidra',
      primary: '#1A74B0',
      address: 'Universität Wien | Universitätsring 1 | 1010 Wien',
      phone: '+43-1-4277-0',
      email: 'support.phaidra@univie.ac.at'
    },
    'phaidra-sandbox.univie.ac.at': {
      baseurl: 'phaidra-sandbox.univie.ac.at',
      api: 'https://services.phaidra-sandbox.univie.ac.at/api',
      solr: 'https://app01.cc.univie.ac.at:8983/solr/phaidra_sandbox',
      primary: '#DD4814',
      address: 'Universität Wien | Universitätsring 1 | 1010 Wien',
      phone: '+43-1-4277-0',
      email: 'support.phaidra@univie.ac.at',
      adminuser: 'PhaidraAdmin',
      adminpass: 'h0yOJ29X'
    },
    'volare.vorarlberg.at': {
      baseurl: 'volare.vorarlberg.at',
      api: 'https://services.volare.vorarlberg.at/api',
      solr: 'https://app01.cc.univie.ac.at:8983/solr/volare',
      primary: '#BC2327',
      address: 'Vorarlberger Landesbibliothek | Fluher Straße 4 | 6900 Bregenz',
      phone: '+43 5574 511 44005',
      email: 'landesbibliothek@vorarlberg.at'
    },
    'phaidra.kug.ac.at': {
      baseurl: 'phaidra.kug.ac.at',
      api: 'https://services.phaidra.kug.ac.at/api',
      solr: 'https://app01.cc.univie.ac.at:8983/solr/kug',
      primary: '#A98561',
      address: 'University of Music and Performing Arts Graz University Library | Brandhofgasse 17-19 | 8010 Graz - Austria',
      phone: '+43/316/389-2051',
      email: 'ub@kug.ac.at'
    },
    'phaidra.bibliothek.uni-ak.ac.at': {
      baseurl: 'phaidra.bibliothek.uni-ak.ac.at',
      api: 'https://services.phaidra.bibliothek.uni-ak.ac.at/api',
      solr: 'https://app01.cc.univie.ac.at:8983/solr/uniak',
      primary: '#B10303',
      address: 'A-1010 Wien, Oskar Kokoschka-Platz 2',
      phone: '+43 711 33-2268',
      email: 'ursula.gschlacht@uni-ak.ac.at'
    },
    'e-book.fwf.ac.at': {
      baseurl: 'e-book.fwf.ac.at',
      api: 'https://services.e-book.fwf.ac.at/api',
      solr: 'https://app01.cc.univie.ac.at:8983/solr/fwf',
      primary: '#003F90',
      address: 'Fonds zur Förderung der wissenschaftlichen Forschung (FWF) | Haus der Forschung, Sensengasse 1 | A-1090 Wien - Austria',
      phone: '+43-1-505 67 40',
      email: 'office@fwf.ac.at'
    },
    'phaidra.ufg.at': {
      baseurl: 'phaidra.ufg.at',
      api: 'https://services.phaidra.ufg.at/api',
      solr: 'https://app01.cc.univie.ac.at:8983/solr/ufg',
      primary: '#4E94CF',
      address: 'UNIVERSITÄT FÜR KÜNSTLERISCHE UND INDUSTRIELLE GESTALTUNG LINZ | Hauptplatz 6, Postfach 6, 4010 Linz, Austria',
      phone: '+43 732 7898',
      email: 'bibliothek.leitung@ufg.at'
    },
    'phaidra.fhstp.ac.at': {
      baseurl: 'phaidra.fhstp.ac.at',
      api: 'https://services.phaidra.fhstp.ac.at/api',
      solr: 'https://app01.cc.univie.ac.at:8983/solr/fhstp',
      primary: '#005096',
      address: 'Fachhochschule St. Pölten GmbH | Matthias Corvinus-Straße 15 | A-3100 St. Pölten',
      phone: '+43/2742/313 228 - 200',
      email: 'karl.rathmanner@fhstp.ac.at'
    }
  }
}
