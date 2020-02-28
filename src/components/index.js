import PImg from './utils/PImg'
import PDDimension from './display/PDDimension.vue'
import PDIdentifier from './display/PDIdentifier.vue'
import PDDuration from './display/PDDuration.vue'
import PDEntity from './display/PDEntity.vue'
import PDExactMatch from './display/PDExactMatch.vue'
import PDFunder from './display/PDFunder.vue'
import PDGeoreference from './display/PDGeoreference.vue'
import PDJsonld from './display/PDJsonld.vue'
import PDJsonldLayout from './display/PDJsonldLayout.vue'
import PDLangValue from './display/PDLangValue.vue'
import PDLicense from './display/PDLicense.vue'
import PDProject from './display/PDProject.vue'
import PDSeries from './display/PDSeries.vue'
import PDContainedIn from './display/PDContainedIn.vue'
import PDBfPublication from './display/PDBfPublication.vue'
import PDCitation from './display/PDCitation.vue'
import PDAdaptation from './display/PDAdaptation.vue'
import PDSkosPreflabel from './display/PDSkosPreflabel.vue'
import PDKeyword from './display/PDKeyword.vue'
import PDTitle from './display/PDTitle.vue'
import PDLabeledValue from './display/PDLabeledValue.vue'
import PDUwmetadata from './display/PDUwmetadata.vue'
import PDValue from './display/PDValue.vue'
import PIDimension from './input/PIDimension.vue'
import PIDuration from './input/PIDuration.vue'
import PIAlternateIdentifier from './input/PIAlternateIdentifier.vue'
import PIEntity from './input/PIEntity.vue'
import PIEntityExtended from './input/PIEntityExtended'
import PIDateEdtf from './input/PIDateEdtf.vue'
import PIFilenameReadonly from './input/PIFilenameReadonly.vue'
import PIFilename from './input/PIFilename.vue'
import PIForm from './input/PIForm.vue'
import PIFunder from './input/PIFunder.vue'
import PIAssociation from './input/PIAssociation.vue'
import PISeries from './input/PISeries.vue'
import PIContainedIn from './input/PIContainedIn.vue'
import PIBfPublication from './input/PIBfPublication.vue'
import PICitation from './input/PICitation.vue'
import PIAdaptation from './input/PIAdaptation.vue'
import PISubjectGnd from './input/PISubjectGnd.vue'
import PISpatialGetty from './input/PISpatialGetty.vue'
import PISpatialGeonames from './input/PISpatialGeonames.vue'
import PISpatialText from './input/PISpatialText.vue'
import PIProject from './input/PIProject.vue'
import PISelect from './input/PISelect.vue'
import PISelectText from './input/PISelectText.vue'
import PITextField from './input/PITextField.vue'
import PITextFieldSuggest from './input/PITextFieldSuggest.vue'
import PITitle from './input/PITitle.vue'
import PIFile from './input/PIFile'
import PIUnknownReadonly from './input/PIUnknownReadonly.vue'
import PIVocabExtReadonly from './input/PIVocabExtReadonly.vue'
import PISpatialReadonly from './input/PISpatialReadonly'
import PILiteral from './input/PILiteral'
import PIKeyword from './input/PIKeyword'
import PSearch from './search/PSearch'
import PMDelete from './management/PMDelete'
import PMSort from './management/PMSort'
import PMRights from './management/PMRights'
import PMRelationships from './management/PMRelationships'
import PMObjectMembers from './management/PMObjectMembers'
import PMCollectionMembers from './management/PMCollectionMembers'
import PTemplates from './templates/PTemplates'
import PLists from './lists/PLists'
import PUwmetadataEditor from './legacy/PUwmetadataEditor'

const Components = {
  PImg,
  PDDuration,
  PDDimension,
  PDIdentifier,
  PDEntity,
  PDExactMatch,
  PDFunder,
  PDGeoreference,
  PDJsonld,
  PDJsonldLayout,
  PDLangValue,
  PDLicense,
  PDSeries,
  PDContainedIn,
  PDBfPublication,
  PDCitation,
  PDAdaptation,
  PDProject,
  PDSkosPreflabel,
  PDKeyword,
  PDTitle,
  PDLabeledValue,
  PDUwmetadata,
  PDValue,
  PIDimension,
  PIAlternateIdentifier,
  PIEntity,
  PIEntityExtended,
  PIDateEdtf,
  PIFilenameReadonly,
  PIFilename,
  PIFile,
  PIForm,
  PIFunder,
  PIAssociation,
  PISeries,
  PIContainedIn,
  PIBfPublication,
  PICitation,
  PIAdaptation,
  PISubjectGnd,
  PISpatialGetty,
  PISpatialGeonames,
  PISpatialText,
  PIProject,
  PISelect,
  PISelectText,
  PITextField,
  PITextFieldSuggest,
  PITitle,
  PIUnknownReadonly,
  PIVocabExtReadonly,
  PISpatialReadonly,
  PILiteral,
  PIKeyword,
  PIDuration,
  PSearch,
  PMDelete,
  PMSort,
  PMRights,
  PMRelationships,
  PMObjectMembers,
  PMCollectionMembers,
  PTemplates,
  PLists,
  PUwmetadataEditor
}

export default {
  install (Vue) {
    Object.keys(Components).forEach(name => {
      Vue.component(name, Components[name])
    })
  },
  ...Components
}
