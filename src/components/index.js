import Vue from 'vue'
import PDDimension from './display/PDDimension.vue'
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
import PDBfPublication from './display/PDBfPublication.vue'
import PDAdaptation from './display/PDAdaptation.vue'
import PDSkosPreflabel from './display/PDSkosPreflabel.vue'
import PDKeyword from './display/PDKeyword.vue'
import PDTitle from './display/PDTitle.vue'
import PDLabeledValue from './display/PDLabeledValue.vue'
import PDUwmetadata from './display/PDUwmetadata.vue'
import PDValue from './display/PDValue.vue'
import PIDimension from './input/PIDimension.vue'
import PIDuration from './input/PIDuration.vue'
import PIEntity from './input/PIEntity.vue'
import PIDateEdtf from './input/PIDateEdtf.vue'
import PIFilenameReadonly from './input/PIFilenameReadonly.vue'
import PIForm from './input/PIForm.vue'
import PIFunder from './input/PIFunder.vue'
import PIAssociation from './input/PIAssociation.vue'
import PISeries from './input/PISeries.vue'
import PIBfPublication from './input/PIBfPublication.vue'
import PIAdaptation from './input/PIAdaptation.vue'
import PISubjectGnd from './input/PISubjectGnd.vue'
import PISpatialGetty from './input/PISpatialGetty.vue'
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
import PISpatialGettyReadonly from './input/PISpatialGettyReadonly'
import PILiteral from './input/PILiteral'
import PIKeyword from './input/PIKeyword'
import PSearch from './search/PSearch'
import PMDelete from './management/PMDelete'
import PMSort from './management/PMSort'
import PMRights from './management/PMRights'
import PMRelationships from './management/PMRelationships'
import PMFiles from './management/PMFiles'

const Components = {
  PDDuration,
  PDDimension,
  PDEntity,
  PDExactMatch,
  PDFunder,
  PDGeoreference,
  PDJsonld,
  PDJsonldLayout,
  PDLangValue,
  PDLicense,
  PDSeries,
  PDBfPublication,
  PDAdaptation,
  PDProject,
  PDSkosPreflabel,
  PDKeyword,
  PDTitle,
  PDLabeledValue,
  PDUwmetadata,
  PDValue,
  PIDimension,
  PIEntity,
  PIDateEdtf,
  PIFilenameReadonly,
  PIFile,
  PIForm,
  PIFunder,
  PIAssociation,
  PISeries,
  PIBfPublication,
  PIAdaptation,
  PISubjectGnd,
  PISpatialGetty,
  PISpatialText,
  PIProject,
  PISelect,
  PISelectText,
  PITextField,
  PITextFieldSuggest,
  PITitle,
  PIUnknownReadonly,
  PIVocabExtReadonly,
  PISpatialGettyReadonly,
  PILiteral,
  PIKeyword,
  PIDuration,
  PSearch,
  PMDelete,
  PMSort,
  PMRights,
  PMRelationships,
  PMFiles
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
