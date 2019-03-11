import languages from '../../utils/lang'

const state = {
  vocabularies: {
    'datepredicate': {
      terms: [
        { '@id': 'dcterms:date', 'skos:prefLabel': { 'eng': 'Date', 'deu': 'Date' } },
        { '@id': 'dcterms:created', 'skos:prefLabel': { 'eng': 'Date created', 'deu': 'Date created' } },
        { '@id': 'dcterms:modified', 'skos:prefLabel': { 'eng': 'Date modified', 'deu': 'Date modified' } },
        { '@id': 'dcterms:available', 'skos:prefLabel': { 'eng': 'Date available', 'deu': 'Date available' } },
        { '@id': 'dcterms:issued', 'skos:prefLabel': { 'eng': 'Date issued', 'deu': 'Date issued' } },
        { '@id': 'dcterms:valid', 'skos:prefLabel': { 'eng': 'Date valid', 'deu': 'Date valid' } },
        { '@id': 'dcterms:dateAccepted', 'skos:prefLabel': { 'eng': 'Date accepted', 'deu': 'Date accepted' } },
        { '@id': 'dcterms:dateCopyrighted', 'skos:prefLabel': { 'eng': 'Date copyrighted', 'deu': 'Date copyrighted' } },
        { '@id': 'dcterms:dateSubmitted', 'skos:prefLabel': { 'eng': 'Date submitted', 'deu': 'Date submitted' } },
        { '@id': 'phaidra:dateAccessioned', 'skos:prefLabel': { 'eng': 'Date accessioned', 'deu': 'Eingangsdatum' } }
      ],
      loaded: true
    },
    'placepredicate': {
      terms: [
        { '@id': 'dcterms:spatial', 'skos:prefLabel': { 'eng': 'Depicted/Represented place' } },
        { '@id': 'vra:placeOfCreation', 'skos:prefLabel': { 'eng': 'Place of creation' } },
        { '@id': 'vra:placeOfRepository', 'skos:prefLabel': { 'eng': 'Place of repository' } },
        { '@id': 'vra:placeOfSite', 'skos:prefLabel': { 'eng': 'Place of site' } }
      ],
      loaded: true
    },
    'rolepredicate': {
      terms: [
        { '@id': 'role:abr', 'skos:prefLabel': { 'eng': 'Abridger' } },
        { '@id': 'role:act', 'skos:prefLabel': { 'eng': 'Actor' } },
        { '@id': 'role:adp', 'skos:prefLabel': { 'eng': 'Adapter' } },
        { '@id': 'role:rcp', 'skos:prefLabel': { 'eng': 'Addressee' } },
        { '@id': 'role:advisor', 'skos:prefLabel': { 'eng': 'Advisor' } },
        { '@id': 'role:anl', 'skos:prefLabel': { 'eng': 'Analyst' } },
        { '@id': 'role:anm', 'skos:prefLabel': { 'eng': 'Animator' } },
        { '@id': 'role:ann', 'skos:prefLabel': { 'eng': 'Annotator' } },
        { '@id': 'role:apl', 'skos:prefLabel': { 'eng': 'Appelant' } },
        { '@id': 'role:ape', 'skos:prefLabel': { 'eng': 'Appellee' } },
        { '@id': 'role:app', 'skos:prefLabel': { 'eng': 'Applicant' } },
        { '@id': 'role:arc', 'skos:prefLabel': { 'eng': 'Architect' } },
        { '@id': 'role:arr', 'skos:prefLabel': { 'eng': 'Arranger' } },
        { '@id': 'role:acp', 'skos:prefLabel': { 'eng': 'Art copyist' } },
        { '@id': 'role:adi', 'skos:prefLabel': { 'eng': 'Art director' } },
        { '@id': 'role:art', 'skos:prefLabel': { 'eng': 'Artist' } },
        { '@id': 'role:ard', 'skos:prefLabel': { 'eng': 'Artistic director' } },
        { '@id': 'role:assessor', 'skos:prefLabel': { 'eng': 'Assessor' } },
        { '@id': 'role:asg', 'skos:prefLabel': { 'eng': 'Assignee' } },
        { '@id': 'role:asn', 'skos:prefLabel': { 'eng': 'Associated name' } },
        { '@id': 'role:att', 'skos:prefLabel': { 'eng': 'Attributed name' } },
        { '@id': 'role:auc', 'skos:prefLabel': { 'eng': 'Auctioneer' } },
        { '@id': 'role:aut', 'skos:prefLabel': { 'eng': 'Author' } },
        { '@id': 'role:aqt', 'skos:prefLabel': { 'eng': 'Author in quotations or text abstracts' } },
        { '@id': 'role:aft', 'skos:prefLabel': { 'eng': 'Author of afterword, colophon, etc.' } },
        { '@id': 'role:aud', 'skos:prefLabel': { 'eng': 'Author of dialog' } },
        { '@id': 'role:aui', 'skos:prefLabel': { 'eng': 'Author of introduction' } },
        { '@id': 'role:authorofsubtitles', 'skos:prefLabel': { 'eng': 'Author of subtitles' } },
        { '@id': 'role:ato', 'skos:prefLabel': { 'eng': 'Autographer' } },
        { '@id': 'role:ant', 'skos:prefLabel': { 'eng': 'Bibliographic antecedent' } },
        { '@id': 'role:bnd', 'skos:prefLabel': { 'eng': 'Binder' } },
        { '@id': 'role:bdd', 'skos:prefLabel': { 'eng': 'Binding designer' } },
        { '@id': 'role:blw', 'skos:prefLabel': { 'eng': 'Blurb writer (missing space)' } },
        { '@id': 'role:bkd', 'skos:prefLabel': { 'eng': 'Book designer' } },
        { '@id': 'role:bkp', 'skos:prefLabel': { 'eng': 'Book producer' } },
        { '@id': 'role:bjd', 'skos:prefLabel': { 'eng': 'Bookjacket designer' } },
        { '@id': 'role:bpd', 'skos:prefLabel': { 'eng': 'Bookplate designer' } },
        { '@id': 'role:bsl', 'skos:prefLabel': { 'eng': 'Bookseller' } },
        { '@id': 'role:brl', 'skos:prefLabel': { 'eng': 'Braille embosser' } },
        { '@id': 'role:brd', 'skos:prefLabel': { 'eng': 'Broadcaster' } },
        { '@id': 'role:cll', 'skos:prefLabel': { 'eng': 'Calligrapher' } },
        { '@id': 'role:ctg', 'skos:prefLabel': { 'eng': 'Cartographer' } },
        { '@id': 'role:cas', 'skos:prefLabel': { 'eng': 'Caster' } },
        { '@id': 'role:cns', 'skos:prefLabel': { 'eng': 'Censor' } },
        { '@id': 'role:chr', 'skos:prefLabel': { 'eng': 'Choreographer' } },
        { '@id': 'role:cng', 'skos:prefLabel': { 'eng': 'Cinematographer' } },
        { '@id': 'role:cli', 'skos:prefLabel': { 'eng': 'Client' } },
        { '@id': 'role:coadvisor', 'skos:prefLabel': { 'eng': 'Co-Advisor' } },
        { '@id': 'role:cor', 'skos:prefLabel': { 'eng': 'Collection registrar' } },
        { '@id': 'role:col', 'skos:prefLabel': { 'eng': 'Collector' } },
        { '@id': 'role:clt', 'skos:prefLabel': { 'eng': 'Collotyper' } },
        { '@id': 'role:clr', 'skos:prefLabel': { 'eng': 'Colorist' } },
        { '@id': 'role:cmm', 'skos:prefLabel': { 'eng': 'Commentator' } },
        { '@id': 'role:cwt', 'skos:prefLabel': { 'eng': 'Commentator for written text' } },
        { '@id': 'role:com', 'skos:prefLabel': { 'eng': 'Compiler' } },
        { '@id': 'role:cpl', 'skos:prefLabel': { 'eng': 'Complainant' } },
        { '@id': 'role:cpt', 'skos:prefLabel': { 'eng': 'Complainant-appellant' } },
        { '@id': 'role:cpe', 'skos:prefLabel': { 'eng': 'Complainant-appellee' } },
        { '@id': 'role:cmp', 'skos:prefLabel': { 'eng': 'Composer' } },
        { '@id': 'role:cmt', 'skos:prefLabel': { 'eng': 'Compositor' } },
        { '@id': 'role:ccp', 'skos:prefLabel': { 'eng': 'Conceptor' } },
        { '@id': 'role:cnd', 'skos:prefLabel': { 'eng': 'Conductor' } },
        { '@id': 'role:con', 'skos:prefLabel': { 'eng': 'Conservator' } },
        { '@id': 'role:csl', 'skos:prefLabel': { 'eng': 'Consultant' } },
        { '@id': 'role:csp', 'skos:prefLabel': { 'eng': 'Consultant to a project' } },
        { '@id': 'role:cos', 'skos:prefLabel': { 'eng': 'Contestant' } },
        { '@id': 'role:cot', 'skos:prefLabel': { 'eng': 'Contestant-appellant' } },
        { '@id': 'role:coe', 'skos:prefLabel': { 'eng': 'Contestant-appellee' } },
        { '@id': 'role:cts', 'skos:prefLabel': { 'eng': 'Contestee' } },
        { '@id': 'role:ctt', 'skos:prefLabel': { 'eng': 'Contestee-appellant' } },
        { '@id': 'role:cte', 'skos:prefLabel': { 'eng': 'Contestee-appellee' } },
        { '@id': 'role:ctr', 'skos:prefLabel': { 'eng': 'Contractor' } },
        { '@id': 'role:ctb', 'skos:prefLabel': { 'eng': 'Contributor' } },
        { '@id': 'role:copista', 'skos:prefLabel': { 'eng': 'Copista' } },
        { '@id': 'role:cpc', 'skos:prefLabel': { 'eng': 'Copyright claimant' } },
        { '@id': 'role:cph', 'skos:prefLabel': { 'eng': 'Copyright holder' } },
        { '@id': 'role:crr', 'skos:prefLabel': { 'eng': 'Corrector' } },
        { '@id': 'role:crp', 'skos:prefLabel': { 'eng': 'Correspondent' } },
        { '@id': 'role:cst', 'skos:prefLabel': { 'eng': 'Costume designer' } },
        { '@id': 'role:cou', 'skos:prefLabel': { 'eng': 'Court governed' } },
        { '@id': 'role:crt', 'skos:prefLabel': { 'eng': 'Court reporter' } },
        { '@id': 'role:cov', 'skos:prefLabel': { 'eng': 'Cover designer' } },
        { '@id': 'role:cur', 'skos:prefLabel': { 'eng': 'Curator' } },
        { '@id': 'role:dnc', 'skos:prefLabel': { 'eng': 'Dancer' } },
        { '@id': 'role:dtc', 'skos:prefLabel': { 'eng': 'Data contributor' } },
        { '@id': 'role:dtm', 'skos:prefLabel': { 'eng': 'Data manager' } },
        { '@id': 'role:datasupplier', 'skos:prefLabel': { 'eng': 'Data Supplier' } },
        { '@id': 'role:dte', 'skos:prefLabel': { 'eng': 'Dedicatee' } },
        { '@id': 'role:dto', 'skos:prefLabel': { 'eng': 'Dedicator' } },
        { '@id': 'role:dfd', 'skos:prefLabel': { 'eng': 'Defendant' } },
        { '@id': 'role:dft', 'skos:prefLabel': { 'eng': 'Defendant-appellant' } },
        { '@id': 'role:dfe', 'skos:prefLabel': { 'eng': 'Defendant-appellee' } },
        { '@id': 'role:dgg', 'skos:prefLabel': { 'eng': 'Degree granting institution' } },
        { '@id': 'role:dgs', 'skos:prefLabel': { 'eng': 'Degree supervisor' } },
        { '@id': 'role:dln', 'skos:prefLabel': { 'eng': 'Delineator' } },
        { '@id': 'role:dpc', 'skos:prefLabel': { 'eng': 'Depicted' } },
        { '@id': 'role:dpt', 'skos:prefLabel': { 'eng': 'Depositor' } },
        { '@id': 'role:dsr', 'skos:prefLabel': { 'eng': 'Designer' } },
        { '@id': 'role:digitiser', 'skos:prefLabel': { 'eng': 'Digitiser' } },
        { '@id': 'role:drt', 'skos:prefLabel': { 'eng': 'Director' } },
        { '@id': 'role:dis', 'skos:prefLabel': { 'eng': 'Dissertant' } },
        { '@id': 'role:dbp', 'skos:prefLabel': { 'eng': 'Distribution place' } },
        { '@id': 'role:dst', 'skos:prefLabel': { 'eng': 'Distributor' } },
        { '@id': 'role:domainexpert', 'skos:prefLabel': { 'eng': 'Domain Expert' } },
        { '@id': 'role:dnr', 'skos:prefLabel': { 'eng': 'Donor' } },
        { '@id': 'role:drm', 'skos:prefLabel': { 'eng': 'Draftsman' } },
        { '@id': 'role:dub', 'skos:prefLabel': { 'eng': 'Dubious author' } },
        { '@id': 'role:edt', 'skos:prefLabel': { 'eng': 'Editor' } },
        { '@id': 'role:edc', 'skos:prefLabel': { 'eng': 'Editor of compilation' } },
        { '@id': 'role:edm', 'skos:prefLabel': { 'eng': 'Editor of moving image work' } },
        { '@id': 'role:elg', 'skos:prefLabel': { 'eng': 'Electrician' } },
        { '@id': 'role:elt', 'skos:prefLabel': { 'eng': 'Electrotyper' } },
        { '@id': 'role:enj', 'skos:prefLabel': { 'eng': 'Enacting jurisdiction' } },
        { '@id': 'role:eng', 'skos:prefLabel': { 'eng': 'Engineer' } },
        { '@id': 'role:egr', 'skos:prefLabel': { 'eng': 'Engraver' } },
        { '@id': 'role:etr', 'skos:prefLabel': { 'eng': 'Etcher' } },
        { '@id': 'role:evaluator', 'skos:prefLabel': { 'eng': 'Evaluator' } },
        { '@id': 'role:exp', 'skos:prefLabel': { 'eng': 'Expert' } },
        { '@id': 'role:fac', 'skos:prefLabel': { 'eng': 'Facsimilist' } },
        { '@id': 'role:fld', 'skos:prefLabel': { 'eng': 'Field director' } },
        { '@id': 'role:fmd', 'skos:prefLabel': { 'eng': 'Film director' } },
        { '@id': 'role:fds', 'skos:prefLabel': { 'eng': 'Film distributor' } },
        { '@id': 'role:flm', 'skos:prefLabel': { 'eng': 'Film editor' } },
        { '@id': 'role:fmp', 'skos:prefLabel': { 'eng': 'Film producer' } },
        { '@id': 'role:fmk', 'skos:prefLabel': { 'eng': 'Filmmaker' } },
        { '@id': 'role:fpy', 'skos:prefLabel': { 'eng': 'First party' } },
        { '@id': 'role:frg', 'skos:prefLabel': { 'eng': 'Forger' } },
        { '@id': 'role:fmo', 'skos:prefLabel': { 'eng': 'Former owner' } },
        { '@id': 'role:founder', 'skos:prefLabel': { 'eng': 'Founder' } },
        { '@id': 'role:fnd', 'skos:prefLabel': { 'eng': 'Funder' } },
        { '@id': 'role:gis', 'skos:prefLabel': { 'eng': 'Geographic information specialist' } },
        { '@id': 'role:graphicdesigner', 'skos:prefLabel': { 'eng': 'Graphic Designer' } },
        { '@id': 'role:hnr', 'skos:prefLabel': { 'eng': 'Honoree' } },
        { '@id': 'role:hst', 'skos:prefLabel': { 'eng': 'Host' } },
        { '@id': 'role:his', 'skos:prefLabel': { 'eng': 'Host institution' } },
        { '@id': 'role:ilu', 'skos:prefLabel': { 'eng': 'Illuminator' } },
        { '@id': 'role:ill', 'skos:prefLabel': { 'eng': 'Illustrator' } },
        { '@id': 'role:initiator', 'skos:prefLabel': { 'eng': 'Initiator' } },
        { '@id': 'role:ins', 'skos:prefLabel': { 'eng': 'Inscriber' } },
        { '@id': 'role:itr', 'skos:prefLabel': { 'eng': 'Instrumentalist' } },
        { '@id': 'role:interpreter', 'skos:prefLabel': { 'eng': 'Interpreter' } },
        { '@id': 'role:ive', 'skos:prefLabel': { 'eng': 'Interviewee' } },
        { '@id': 'role:ivr', 'skos:prefLabel': { 'eng': 'Interviewer' } },
        { '@id': 'role:inv', 'skos:prefLabel': { 'eng': 'Inventor' } },
        { '@id': 'role:isb', 'skos:prefLabel': { 'eng': 'Issuing body' } },
        { '@id': 'role:jud', 'skos:prefLabel': { 'eng': 'Judge' } },
        { '@id': 'role:jug', 'skos:prefLabel': { 'eng': 'Jurisdiction governed' } },
        { '@id': 'role:keeperoftheoriginal', 'skos:prefLabel': { 'eng': 'Keeper of the original' } },
        { '@id': 'role:lbr', 'skos:prefLabel': { 'eng': 'Laboratory' } },
        { '@id': 'role:ldr', 'skos:prefLabel': { 'eng': 'Laboratory director' } },
        { '@id': 'role:lsa', 'skos:prefLabel': { 'eng': 'Landscape architect' } },
        { '@id': 'role:led', 'skos:prefLabel': { 'eng': 'Lead' } },
        { '@id': 'role:len', 'skos:prefLabel': { 'eng': 'Lender' } },
        { '@id': 'role:lil', 'skos:prefLabel': { 'eng': 'Libelant' } },
        { '@id': 'role:lit', 'skos:prefLabel': { 'eng': 'Libelant-appellant' } },
        { '@id': 'role:lie', 'skos:prefLabel': { 'eng': 'Libelant-appellee' } },
        { '@id': 'role:lel', 'skos:prefLabel': { 'eng': 'Libelee' } },
        { '@id': 'role:let', 'skos:prefLabel': { 'eng': 'Libelee-appellant' } },
        { '@id': 'role:lee', 'skos:prefLabel': { 'eng': 'Libelee-appellee' } },
        { '@id': 'role:lbt', 'skos:prefLabel': { 'eng': 'Librettist' } },
        { '@id': 'role:lse', 'skos:prefLabel': { 'eng': 'Licensee' } },
        { '@id': 'role:lso', 'skos:prefLabel': { 'eng': 'Licensor' } },
        { '@id': 'role:lgd', 'skos:prefLabel': { 'eng': 'Lighting designer' } },
        { '@id': 'role:ltg', 'skos:prefLabel': { 'eng': 'Lithographer' } },
        { '@id': 'role:lyr', 'skos:prefLabel': { 'eng': 'Lyricist' } },
        { '@id': 'role:mfp', 'skos:prefLabel': { 'eng': 'Manufacture place' } },
        { '@id': 'role:mfr', 'skos:prefLabel': { 'eng': 'Manufacturer' } },
        { '@id': 'role:mrb', 'skos:prefLabel': { 'eng': 'Marbler' } },
        { '@id': 'role:mrk', 'skos:prefLabel': { 'eng': 'Markup editor' } },
        { '@id': 'role:med', 'skos:prefLabel': { 'eng': 'Medium' } },
        { '@id': 'role:mdc', 'skos:prefLabel': { 'eng': 'Metadata contact' } },
        { '@id': 'role:emt', 'skos:prefLabel': { 'eng': 'Metal-engraver' } },
        { '@id': 'role:mtk', 'skos:prefLabel': { 'eng': 'Minute taker' } },
        { '@id': 'role:mod', 'skos:prefLabel': { 'eng': 'Moderator' } },
        { '@id': 'role:mon', 'skos:prefLabel': { 'eng': 'Monitor' } },
        { '@id': 'role:mcp', 'skos:prefLabel': { 'eng': 'Music copyist' } },
        { '@id': 'role:msd', 'skos:prefLabel': { 'eng': 'Musical director' } },
        { '@id': 'role:mus', 'skos:prefLabel': { 'eng': 'Musician' } },
        { '@id': 'role:nrt', 'skos:prefLabel': { 'eng': 'Narrator' } },
        { '@id': 'role:osp', 'skos:prefLabel': { 'eng': 'Onscreen presenter' } },
        { '@id': 'role:opn', 'skos:prefLabel': { 'eng': 'Opponent' } },
        { '@id': 'role:orm', 'skos:prefLabel': { 'eng': 'Organizer' } },
        { '@id': 'role:org', 'skos:prefLabel': { 'eng': 'Originator' } },
        { '@id': 'role:oth', 'skos:prefLabel': { 'eng': 'Other' } },
        { '@id': 'role:own', 'skos:prefLabel': { 'eng': 'Owner' } },
        { '@id': 'role:pan', 'skos:prefLabel': { 'eng': 'Panelist' } },
        { '@id': 'role:ppm', 'skos:prefLabel': { 'eng': 'Papermaker' } },
        { '@id': 'role:pta', 'skos:prefLabel': { 'eng': 'Patent applicant' } },
        { '@id': 'role:pth', 'skos:prefLabel': { 'eng': 'Patent holder' } },
        { '@id': 'role:pat', 'skos:prefLabel': { 'eng': 'Patron' } },
        { '@id': 'role:pedagogicexpert', 'skos:prefLabel': { 'eng': 'Pedagogic Expert' } },
        { '@id': 'role:prf', 'skos:prefLabel': { 'eng': 'Performer' } },
        { '@id': 'role:pma', 'skos:prefLabel': { 'eng': 'Permitting agency' } },
        { '@id': 'role:pht', 'skos:prefLabel': { 'eng': 'Photographer' } },
        { '@id': 'role:ptf', 'skos:prefLabel': { 'eng': 'Plaintiff' } },
        { '@id': 'role:ptt', 'skos:prefLabel': { 'eng': 'Plaintiff-appellant' } },
        { '@id': 'role:pte', 'skos:prefLabel': { 'eng': 'Plaintiff-appellee' } },
        { '@id': 'role:plt', 'skos:prefLabel': { 'eng': 'Platemaker' } },
        { '@id': 'role:pra', 'skos:prefLabel': { 'eng': 'Praeses' } },
        { '@id': 'role:pre', 'skos:prefLabel': { 'eng': 'Presenter' } },
        { '@id': 'role:prt', 'skos:prefLabel': { 'eng': 'Printer' } },
        { '@id': 'role:pop', 'skos:prefLabel': { 'eng': 'Printer of plates' } },
        { '@id': 'role:prm', 'skos:prefLabel': { 'eng': 'Printmaker' } },
        { '@id': 'role:prc', 'skos:prefLabel': { 'eng': 'Process contact' } },
        { '@id': 'role:pro', 'skos:prefLabel': { 'eng': 'Producer' } },
        { '@id': 'role:prn', 'skos:prefLabel': { 'eng': 'Production company' } },
        { '@id': 'role:prp', 'skos:prefLabel': { 'eng': 'Production country' } },
        { '@id': 'role:prs', 'skos:prefLabel': { 'eng': 'Production designer' } },
        { '@id': 'role:pmn', 'skos:prefLabel': { 'eng': 'Production manager' } },
        { '@id': 'role:prd', 'skos:prefLabel': { 'eng': 'Production personnel' } },
        { '@id': 'role:prg', 'skos:prefLabel': { 'eng': 'Programmer' } },
        { '@id': 'role:pdr', 'skos:prefLabel': { 'eng': 'Project director' } },
        { '@id': 'role:pfr', 'skos:prefLabel': { 'eng': 'Proofreader' } },
        { '@id': 'role:prv', 'skos:prefLabel': { 'eng': 'Provider' } },
        { '@id': 'role:pbl', 'skos:prefLabel': { 'eng': 'Publisher' } },
        { '@id': 'role:pbd', 'skos:prefLabel': { 'eng': 'Publishing director' } },
        { '@id': 'role:ppt', 'skos:prefLabel': { 'eng': 'Puppeteer' } },
        { '@id': 'role:rdd', 'skos:prefLabel': { 'eng': 'Radio director' } },
        { '@id': 'role:rpc', 'skos:prefLabel': { 'eng': 'Radio producer' } },
        { '@id': 'role:rce', 'skos:prefLabel': { 'eng': 'Recording engineer' } },
        { '@id': 'role:rcd', 'skos:prefLabel': { 'eng': 'Recordist' } },
        { '@id': 'role:red', 'skos:prefLabel': { 'eng': 'Redaktor' } },
        { '@id': 'role:ren', 'skos:prefLabel': { 'eng': 'Renderer' } },
        { '@id': 'role:rpt', 'skos:prefLabel': { 'eng': 'Reporter' } },
        { '@id': 'role:rth', 'skos:prefLabel': { 'eng': 'Research team head' } },
        { '@id': 'role:rtm', 'skos:prefLabel': { 'eng': 'Research team member' } },
        { '@id': 'role:res', 'skos:prefLabel': { 'eng': 'Researcher' } },
        { '@id': 'role:rsp', 'skos:prefLabel': { 'eng': 'Respondent' } },
        { '@id': 'role:rst', 'skos:prefLabel': { 'eng': 'Respondent-appellant' } },
        { '@id': 'role:rse', 'skos:prefLabel': { 'eng': 'Respondent-appellee' } },
        { '@id': 'role:rpy', 'skos:prefLabel': { 'eng': 'Responsible party' } },
        { '@id': 'role:rsg', 'skos:prefLabel': { 'eng': 'Restager' } },
        { '@id': 'role:rsr', 'skos:prefLabel': { 'eng': 'Restorationist' } },
        { '@id': 'role:rev', 'skos:prefLabel': { 'eng': 'Reviewer' } },
        { '@id': 'role:rbr', 'skos:prefLabel': { 'eng': 'Rubricator' } },
        { '@id': 'role:sce', 'skos:prefLabel': { 'eng': 'Scenarist' } },
        { '@id': 'role:sad', 'skos:prefLabel': { 'eng': 'Scientific advisor' } },
        { '@id': 'role:aus', 'skos:prefLabel': { 'eng': 'Screenwriter' } },
        { '@id': 'role:scr', 'skos:prefLabel': { 'eng': 'Scribe' } },
        { '@id': 'role:scl', 'skos:prefLabel': { 'eng': 'Sculptor' } },
        { '@id': 'role:spy', 'skos:prefLabel': { 'eng': 'Second party' } },
        { '@id': 'role:sec', 'skos:prefLabel': { 'eng': 'Secretary' } },
        { '@id': 'role:sll', 'skos:prefLabel': { 'eng': 'Seller' } },
        { '@id': 'role:std', 'skos:prefLabel': { 'eng': 'Set designer' } },
        { '@id': 'role:stg', 'skos:prefLabel': { 'eng': 'Setting' } },
        { '@id': 'role:sgn', 'skos:prefLabel': { 'eng': 'Signer' } },
        { '@id': 'role:sng', 'skos:prefLabel': { 'eng': 'Singer' } },
        { '@id': 'role:sds', 'skos:prefLabel': { 'eng': 'Sound designer' } },
        { '@id': 'role:spk', 'skos:prefLabel': { 'eng': 'Speaker' } },
        { '@id': 'role:spn', 'skos:prefLabel': { 'eng': 'Sponsor' } },
        { '@id': 'role:sgd', 'skos:prefLabel': { 'eng': 'Stage director' } },
        { '@id': 'role:stm', 'skos:prefLabel': { 'eng': 'Stage manager' } },
        { '@id': 'role:stn', 'skos:prefLabel': { 'eng': 'Standards body' } },
        { '@id': 'role:str', 'skos:prefLabel': { 'eng': 'Stereotyper' } },
        { '@id': 'role:stl', 'skos:prefLabel': { 'eng': 'Storyteller' } },
        { '@id': 'role:sht', 'skos:prefLabel': { 'eng': 'Supporting host' } },
        { '@id': 'role:srv', 'skos:prefLabel': { 'eng': 'Surveyor' } },
        { '@id': 'role:tch', 'skos:prefLabel': { 'eng': 'Teacher' } },
        { '@id': 'role:tcd', 'skos:prefLabel': { 'eng': 'Technical director' } },
        { '@id': 'role:technicalinspector', 'skos:prefLabel': { 'eng': 'Technical Inspector' } },
        { '@id': 'role:technicaltranslator', 'skos:prefLabel': { 'eng': 'Technical Translator' } },
        { '@id': 'role:tld', 'skos:prefLabel': { 'eng': 'Television director' } },
        { '@id': 'role:tlp', 'skos:prefLabel': { 'eng': 'Television producer' } },
        { '@id': 'role:textprocessor', 'skos:prefLabel': { 'eng': 'Text Processor' } },
        { '@id': 'role:ths', 'skos:prefLabel': { 'eng': 'Thesis advisor' } },
        { '@id': 'role:trc', 'skos:prefLabel': { 'eng': 'Transcriber' } },
        { '@id': 'role:trl', 'skos:prefLabel': { 'eng': 'Translator' } },
        { '@id': 'role:tyd', 'skos:prefLabel': { 'eng': 'Type designer' } },
        { '@id': 'role:tyg', 'skos:prefLabel': { 'eng': 'Typographer' } },
        { '@id': 'role:uploader', 'skos:prefLabel': { 'eng': 'Uploader' } },
        { '@id': 'role:vdg', 'skos:prefLabel': { 'eng': 'Videographer' } },
        { '@id': 'role:vac', 'skos:prefLabel': { 'eng': 'Voice actor' } },
        { '@id': 'role:wit', 'skos:prefLabel': { 'eng': 'Witness' } },
        { '@id': 'role:wde', 'skos:prefLabel': { 'eng': 'Wood-engraver' } },
        { '@id': 'role:wdc', 'skos:prefLabel': { 'eng': 'Woodcutter' } },
        { '@id': 'role:wam', 'skos:prefLabel': { 'eng': 'Writer of accompanying material' } },
        { '@id': 'role:wac', 'skos:prefLabel': { 'eng': 'Writer of added commentary' } },
        { '@id': 'role:wal', 'skos:prefLabel': { 'eng': 'Writer of added lyrics' } },
        { '@id': 'role:wat', 'skos:prefLabel': { 'eng': 'Writer of added text' } },
        { '@id': 'role:win', 'skos:prefLabel': { 'eng': 'Writer of introduction' } },
        { '@id': 'role:wpr', 'skos:prefLabel': { 'eng': 'Writer of preface' } },
        { '@id': 'role:wst', 'skos:prefLabel': { 'eng': 'Writer of supplementary textual content' } }        
      ],
      loaded: true
    },
    'lang': {
      terms: [],
      loaded: false
    },
    'mimetypes': {
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
        { '@id': 'http://rightsstatements.org/vocab/InC/1.0/', 'skos:prefLabel': {'eng': '© All rights reserved'}, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by/4.0/', 'skos:prefLabel': {'eng': 'CC BY 4.0 International'}, 'img': 'cc-by.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc/4.0/', 'skos:prefLabel': {'eng': 'CC BY-NC 4.0 International'}, 'img': 'cc-by-nc.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-nd/4.0/', 'skos:prefLabel': {'eng': 'CC BY-NC-ND 4.0 International'}, 'img': 'cc-by-nc-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nc-sa/4.0/', 'skos:prefLabel': {'eng': 'CC BY-NC-SA 4.0 International'}, 'img': 'cc-by-nc-sa.png' },
        { '@id': 'http://creativecommons.org/licenses/by-nd/4.0/', 'skos:prefLabel': {'eng': 'CC BY-ND 4.0 International'}, 'img': 'cc-by-nd.png' },
        { '@id': 'http://creativecommons.org/licenses/by-sa/4.0/', 'skos:prefLabel': {'eng': 'CC BY-SA 4.0 International'}, 'img': 'cc-by-sa.png' }
      ],
      loaded: true
    },
    'uncefact': {
      terms: [
        { '@id': 'MTR', 'skos:prefLabel': {'eng': 'm'} },
        { '@id': 'CMT', 'skos:prefLabel': {'eng': 'cm'} },
        { '@id': 'MMT', 'skos:prefLabel': {'eng': 'mm'} }
      ],
      loaded: true
    },
    'resourcetype': {
      terms: [
        { '@id': 'https://pid.phaidra.org/vocabulary/resourcetype/HMJ4-EW36', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_ecc8', 'skos:prefLabel': { 'eng': 'image' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/resourcetype/B4CB-FN5F', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_18cf', 'skos:prefLabel': { 'eng': 'text' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/resourcetype/TBSC-977W', 'skos:exactMatch': 'http://purl.org/dc/dcmitype/Collection', 'skos:prefLabel': { 'eng': 'collection' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/resourcetype/S7JC-WBBH', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_12ce', 'skos:prefLabel': { 'eng': 'video' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/resourcetype/VR5J-0CBC', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_1843', 'skos:prefLabel': { 'eng': 'data' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/resourcetype/MXND-R5ZY', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_18cc', 'skos:prefLabel': { 'eng': 'sound' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/resourcetype/HS9G-WDM9', 'skos:prefLabel': { 'eng': 'container' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/resourcetype/Y9P1-7A2H', 'skos:prefLabel': { 'eng': 'resource' } }
      ],
      loaded: true
    },
    'genre': {
      terms: [
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/JNCK-DCHZ', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_6501', 'skos:prefLabel': { 'eng': 'journal article' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/VAY0-9FDP', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_12cd', 'skos:prefLabel': { 'eng': 'map' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/Y4Q9-0FGP', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_2f33', 'skos:prefLabel': { 'eng': 'book' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/FWQN-VTB7', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_0857', 'skos:prefLabel': { 'eng': 'letter' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/Q5AM-N6KX', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_18cd', 'skos:prefLabel': { 'eng': 'musical composition' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/H8FH-S78J', 'skos:exactMatch': 'http://purl.org/coar/resource_type/c_18cw', 'skos:prefLabel': { 'eng': 'musical notation' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/E9W3-Y7DM', 'skos:exactMatch': 'http://d-nb.info/gnd/4012400-9', 'skos:prefLabel': { 'eng': 'Diplomarbeit' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/X3TK-PTTB', 'skos:exactMatch': 'http://d-nb.info/gnd/1105859770', 'skos:prefLabel': { 'eng': 'Masterarbeit' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/KQ9J-0R46', 'skos:exactMatch': 'http://d-nb.info/gnd/4012494-0', 'skos:prefLabel': { 'eng': 'Dissertation' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/K7V0-JT7D', 'skos:exactMatch': 'http://d-nb.info/gnd/4168514-3', 'skos:prefLabel': { 'eng': 'Magisterarbeit' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/2W1X-9H3K', 'skos:exactMatch': 'http://d-nb.info/gnd/4158652-9', 'skos:prefLabel': { 'eng': 'Habilitation' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/PK03-57AE', 'skos:prefLabel': { 'eng': 'Master-Thesis (ULG)' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/4SC8-045U', 'skos:prefLabel': { 'eng': 'Action' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/5J9J-YQH2', 'skos:prefLabel': { 'eng': 'Anime' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/DN11-JAH0', 'skos:prefLabel': { 'eng': 'Biopic' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/MWTM-PP5V', 'skos:prefLabel': { 'eng': 'Diskussion' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/500K-7JR9', 'skos:prefLabel': { 'eng': 'Dokumentarfilm' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/74P1-4CZF', 'skos:prefLabel': { 'eng': 'Drama' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/28PK-GK1Q', 'skos:prefLabel': { 'eng': 'Fantasy' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/216P-B9Y7', 'skos:prefLabel': { 'eng': 'Fernsehfilm' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/SW9K-YMCB', 'skos:prefLabel': { 'eng': 'Historienfilm' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/55CG-R4N3', 'skos:prefLabel': { 'eng': 'Horror' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/12MR-5G5J', 'skos:prefLabel': { 'eng': 'Komödie' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/2G8D-VDA8', 'skos:prefLabel': { 'eng': 'Krimi' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/DFNA-2RVW', 'skos:prefLabel': { 'eng': 'Kurzfilm' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/G7N9-E9VZ', 'skos:prefLabel': { 'eng': 'Liebesfilm' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/HSZ7-CP4Y', 'skos:prefLabel': { 'eng': 'Musical' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/D83C-PVS8', 'skos:prefLabel': { 'eng': 'Nachrichtensendung' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/96AQ-D4EW', 'skos:prefLabel': { 'eng': 'Romanze' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/WJKC-9561', 'skos:prefLabel': { 'eng': 'Satire' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/W5RX-YZS8', 'skos:prefLabel': { 'eng': 'Science Fiction' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/H2PP-433Y', 'skos:prefLabel': { 'eng': 'Serie' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/E9FX-5EB8', 'skos:prefLabel': { 'eng': 'Thriller' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/PFJR-VYF8', 'skos:prefLabel': { 'eng': 'Tragikkomödie' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/genre/CNVR-XCGC', 'skos:prefLabel': { 'eng': 'Unterhaltung' } }
      ],
      loaded: true
    },
    'objecttype': {
      terms: [
        { '@id': 'https://pid.phaidra.org/vocabulary/objecttype/H764-GVVN', 'skos:exactMatch': 'http://vocab.getty.edu/aat/300046300', 'skos:prefLabel': { 'eng': 'photographs' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/objecttype/TVCR-CFKM', 'skos:exactMatch': 'http://vocab.getty.edu/aat/300007893', 'skos:prefLabel': { 'eng': 'railroad bridges' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/objecttype/GQGX-25NV', 'skos:exactMatch': 'http://vocab.getty.edu/aat/300049946', 'skos:prefLabel': { 'eng': 'tribes (kinship groups)' } },
      ],
      loaded: true
    },
    'technique': {
      terms: [
        { '@id': 'https://pid.phaidra.org/vocabulary/technique/QAFG-DNM2', 'skos:exactMatch': 'http://vocab.getty.edu/aat/300162056', 'skos:prefLabel': { 'eng': 'black-and-white photography' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/technique/B930-7M0Z', 'skos:exactMatch': 'http://vocab.getty.edu/aat/300134530', 'skos:prefLabel': { 'eng': 'color photography' } }
      ],
      loaded: true
    },
    'material': {
      terms: [
        { '@id': 'https://pid.phaidra.org/vocabulary/material/A5QP-R8CC', 'skos:exactMatch': 'http://vocab.getty.edu/aat/300011484', 'skos:prefLabel': { 'eng': 'black marble' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/material/XN0R-JNFQ', 'skos:exactMatch': 'http://vocab.getty.edu/aat/300265588', 'skos:prefLabel': { 'eng': 'shampoo' } }
      ],
      loaded: true
    },
    'reproduction': {
      terms: [
        { '@id': 'https://pid.phaidra.org/vocabulary/reproduction/NM27-2EF2', 'skos:prefLabel': { 'eng': 'original' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/reproduction/2RTV-67M7', 'skos:prefLabel': { 'eng': 'copy' } }
      ],
      loaded: true
    },
    'basisklassifikation': {
      terms: [
        { '@id': 'https://pid.phaidra.org/vocabulary/basisklassifikation/GR90-276C', 'skos:notation': '31.01', 'skos:prefLabel': { 'eng': 'Geschichte der Mathematik' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/basisklassifikation/D03J-KDQG', 'skos:notation': '71.02', 'skos:prefLabel': { 'eng': 'Theorie der Soziologie' } }
      ],
      loaded: true
    },
    'regionalencoding': {
      terms: [
        { '@id': 'https://pid.phaidra.org/vocabulary/regionalencoding/XFMP-GT0M', 'skos:prefLabel': { 'eng': 'region free' } },
        { '@id': 'https://pid.phaidra.org/vocabulary/regionalencoding/W2RX-V175', 'skos:prefLabel': { 'eng': 'region 2' } }
      ],
      loaded: true
    }
  }
}

const mutations = {
  setLangTerms (state, data) {
    state.vocabularies['lang']['terms'] = data
    state.vocabularies['lang']['loaded'] = true
  }
}

const actions = {
  loadLanguages ({ commit }) {
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
  },
  getTermProperty: (state) => (voc, id, prop) => {
    var terms = state.vocabularies[voc].terms
    for (var i = 0; i < terms.length; i++) {
      if (terms[i]['@id'] === id) {
        return terms[i][prop]
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
