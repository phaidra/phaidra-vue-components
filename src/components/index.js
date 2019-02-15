import Vue from 'vue'
import PDDimension from './display/PDDimension.vue'
import PDEntity from './display/PDEntity.vue'
import PDExactMatch from './display/PDExactMatch.vue'
import PDFunder from './display/PDFunder.vue'
import PDGeoreference from './display/PDGeoreference.vue'
import PDJsonld from './display/PDJsonld.vue'
import PDJsonldLayout from './display/PDJsonldLayout.vue'
import PDLangValue from './display/PDLangValue.vue'
import PDLicense from './display/PDLicense.vue'
import PDProject from './display/PDProject.vue'
import PDSkosPreflabel from './display/PDSkosPreflabel.vue'
import PDTitle from './display/PDTitle.vue'
import PDLabeledValue from './display/PDLabeledValue.vue'
import PDUwmetadata from './display/PDUwmetadata.vue'
import PDValue from './display/PDValue.vue'
import PIDimension from './input/PIDimension.vue'
import PIEntity from './input/PIEntity.vue'
import PIDateEdtf from './input/PIDateEdtf.vue'
import PIFilenameReadonly from './input/PIFilenameReadonly.vue'
import PIForm from './input/PIForm.vue'
import PIFunder from './input/PIFunder.vue'
import PISpatialGetty from './input/PISpatialGetty.vue'
import PISpatialText from './input/PISpatialText.vue'
import PIProject from './input/PIProject.vue'
import PISelect from './input/PISelect.vue'
import PITextField from './input/PITextField.vue'
import PITextFieldSuggest from './input/PITextFieldSuggest.vue'
import PITitle from './input/PITitle.vue'
import PIUnknownReadonly from './input/PIUnknownReadonly.vue'
import PIVocabExtReadonly from './input/PIVocabExtReadonly.vue'
import PISpatialGettyReadonly from './input/PISpatialGettyReadonly'
import PILiteral from './input/PILiteral'
import PIKeyword from './input/PIKeyword'

const Components = {
  PDDimension,
  PDEntity,
  PDExactMatch,
  PDFunder,
  PDGeoreference,
  PDJsonld,
  PDJsonldLayout,
  PDLangValue,
  PDLicense,
  PDProject,
  PDSkosPreflabel,
  PDTitle,
  PDLabeledValue,
  PDUwmetadata,
  PDValue,
  PIDimension,
  PIEntity,
  PIDateEdtf,
  PIFilenameReadonly,
  PIForm,
  PIFunder,
  PISpatialGetty,
  PISpatialText,
  PIProject,
  PISelect,
  PITextField,
  PITextFieldSuggest,
  PITitle,
  PIUnknownReadonly,
  PIVocabExtReadonly,
  PISpatialGettyReadonly,
  PILiteral,
  PIKeyword
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components