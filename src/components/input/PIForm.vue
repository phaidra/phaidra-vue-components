<template>
  <v-container grid-list-lg v-if="form && form.sections">
    <v-tabs v-model="activetab" align-with-title>
      <v-tab ripple><span v-t="'Metadata editor'"></span><template v-if="targetpid">&nbsp;-&nbsp;<span class="text-lowercase">{{ targetpid }}</span></template></v-tab>
      <v-tab ripple @click="updatePrettyPrint()"><span v-t="'Metadata preview'"></span></v-tab>
      <v-tab v-if="templating" ripple @click="loadTemplates()"><span v-t="'Templates'"></span></v-tab>
    </v-tabs>
  
    <v-tabs-items v-model="activetab">
      <v-tab-item class="pa-3" v-if="form">

        <v-layout v-for="(s) in this.form.sections" :key="s.id" column wrap class="ma-3">
          <v-card v-if="s.type !== 'accessrights'">
            <v-card-title class="headline grey white--text">
              <span><span v-t="s.title"></span></span>
              <v-spacer></v-spacer>
              <v-checkbox dark color="white" v-if="s.type === 'member'" v-model="previewMember" :label="$t('Container thumbnail')" :value="s.id"></v-checkbox>
              <v-menu open-on-hover bottom offset-y v-if="!s.disablemenu">
                <v-btn slot="activator" icon dark>
                  <v-icon dark>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-if="s.multiplicable && (s.type === 'member') || (s.type === 'phaidra:Subject')" @click="addSection(s)">
                    <v-list-tile-title><span v-t="'Duplicate'"></span></v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile v-if="s.removable && (s.type != 'digitalobject')" @click="removeSection(s)">
                    <v-list-tile-title><span v-t="'Remove'"></span></v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile v-if="s.type === 'member'" @click="sortMemberUp(s)">
                    <v-list-tile-title><span v-t="'Move up'"></span></v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile v-if="s.type === 'member'" @click="sortMemberDown(s)">
                    <v-list-tile-title><span v-t="'Move down'"></span></v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile v-if="s.type === 'digitalobject'" @click="$emit('add-phaidrasubject-section', s)">
                    <v-list-tile-title><span v-t="'Add subject metadata section'"></span></v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="mt-4">

              <v-layout column wrap>
                <template v-for="(f) in s.fields">
                  <v-flex offset-xs1 v-if="f.component === 'p-text-field'" :key="f.id">
                    <p-i-text-field             
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-text-field>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-text-field-suggest'" :key="f.id">
                    <p-i-text-field-suggest
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-text-field-suggest>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-keyword'" :key="f.id">
                    <p-i-keyword
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-keyword>
                  </v-flex>

                  <v-flex offset-xs1 v-if="f.component === 'p-title'" :key="f.id">
                    <p-i-title
                      v-bind.sync="f"
                      v-on:input-title="f.title=$event"
                      v-on:input-subtitle="f.subtitle=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                      v-on:up="sortFieldUp(s.fields, f)"
                      v-on:down="sortFieldDown(s.fields, f)"
                    ></p-i-title>
                  </v-flex>

                  <v-flex offset-xs1 xs4 v-else-if="f.component === 'p-select'" :key="f.id">
                    <p-i-select
                      v-bind.sync="f"
                      v-on:input="selectInput(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-select>
                  </v-flex>

                  <v-flex offset-xs1 xs4 v-else-if="f.component === 'p-select-text'" :key="f.id">
                    <p-i-select-text
                      v-bind.sync="f" 
                      v-on:input="f.value=$event"
                      v-on:input-select="f.selectvalue=$event"
                      v-on:input-text="f.textvalue=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-select-text>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-date-edtf'" :key="f.id">
                    <p-i-date-edtf
                      v-bind.sync="f" 
                      v-on:input-date="f.value=$event"
                      v-on:input-date-type="setSelected(f, 'type', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-date-edtf>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-duration'" :key="f.id">
                    <p-i-duration
                      v-bind.sync="f" 
                      v-on:input="f.value=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-duration>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-series'" :key="f.id">
                    <p-i-series
                      v-bind.sync="f"
                      v-on:input-title="f.title=$event"
                      v-on:input-title-language="setSelected(f, 'titleLanguage', $event)"
                      v-on:input-volume="f.volume=$event"
                      v-on:input-issue="f.issue=$event"
                      v-on:input-issued="f.issued=$event"
                      v-on:input-issn="f.issn=$event"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-series>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-citation'" :key="f.id">
                    <p-i-citation
                      v-bind.sync="f"
                      v-on:input-citation-type="setSelected(f, 'type', $event)"
                      v-on:input-citation="f.citation=$event"
                      v-on:input-citation-language="setSelected(f, 'citationLanguage', $event)"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-citation>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-bf-publication'" :key="f.id">
                    <p-i-bf-publication
                      v-bind.sync="f"
                      v-on:input-publisher-name="f.publisherName=$event"
                      v-on:input-publishing-place="f.publishingPlace=$event"
                      v-on:input-publishing-date="f.publishingDate=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-bf-publication>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-adaptation'" :key="f.id">
                    <p-i-adaptation
                      v-bind.sync="f"
                      v-on:input-title="f.title=$event"
                      v-on:input-subtitle="f.subtitle=$event"
                      v-on:input-title-language="setSelected(f, 'titleLanguage', $event)"
                      v-on:input-firstname="f.firstname=$event"
                      v-on:input-lastname="f.lastname=$event"
                      v-on:input-name="f.name=$event"
                      v-on:input-role="roleInput(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-adaptation>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-entity'" :key="f.id">
                    <p-i-entity
                      v-bind.sync="f"
                      v-on:input-firstname="f.firstname=$event"
                      v-on:input-lastname="f.lastname=$event"
                      v-on:input-name="f.name=$event"
                      v-on:input-institution="f.institution=$event"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:input-role="roleInput(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                      v-on:up="sortFieldUp(s.fields, f)"
                      v-on:down="sortFieldDown(s.fields, f)"
                    ></p-i-entity>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-subject-gnd'" :key="f.id">
                    <p-i-subject-gnd
                      v-bind.sync="f" 
                      v-on:input="f.value=$event"
                      v-on:resolve="updateSubject(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-subject-gnd>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-spatial-getty'" :key="f.id">
                    <p-i-spatial-getty
                      v-bind.sync="f" 
                      v-on:input="f.value=$event"
                      v-on:input-place-type="setSelected(f, 'type', $event)"
                      v-on:resolve="updatePlace(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-getty>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-spatial-text'" :key="f.id">
                    <p-i-spatial-text
                      v-bind.sync="f" 
                      v-on:input="f.value=$event"
                      v-on:input-place-type="setSelected(f, 'type', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-text>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-dimension'" :key="f.id">
                    <p-i-dimension
                      v-bind.sync="f" 
                      v-on:input-value="f.value=$event"
                      v-on:input-unit="setSelected(f, 'unitCode', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-dimension>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-literal'" :key="f.id">
                    <p-i-literal
                      v-bind.sync="f" 
                      v-on:input-value="f.value=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-literal>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-study-plan'" :key="f.id">
                    <p-i-study-plan
                      v-bind.sync="f" 
                      v-on:input-name="f.name=$event"
                      v-on:input-name-language="setSelected(f, 'nameLanguage', $event)"
                      v-on:input-notation="f.notation=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-study-plan>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-project'" :key="f.id">
                    <p-i-project
                      v-bind.sync="f" 
                      v-on:input-name="f.name=$event"
                      v-on:input-name-language="setSelected(f, 'nameLanguage', $event)"
                      v-on:input-description="f.description=$event"
                      v-on:input-description-language="setSelected(f, 'descriptionLanguage', $event)"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:input-homepage="f.homepage=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-project>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-funder'" :key="f.id">
                    <p-i-funder
                      v-bind.sync="f" 
                      v-on:input-name="f.name=$event"
                      v-on:input-name-language="setSelected(f, 'nameLanguage', $event)"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-funder>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-association'" :key="f.id">
                    <p-i-association
                      v-bind.sync="f" 
                      v-on:input="selectInput(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-association>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-filename-readonly'" :key="f.id">
                    <p-i-filename-readonly v-bind.sync="f"></p-i-filename-readonly>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-unknown-readonly'" :key="f.id">
                    <p-i-unknown-readonly v-bind.sync="f"></p-i-unknown-readonly>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-vocab-ext-readonly'" :key="f.id">
                    <p-i-vocab-ext-readonly 
                      v-bind.sync="f"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-vocab-ext-readonly>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-spatial-getty-readonly'" :key="f.id">
                    <p-i-spatial-getty-readonly 
                      v-bind.sync="f"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-getty-readonly>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'input-file'" :key="f.id">
                    <p-i-file
                      v-bind.sync="f"
                      v-on:input-file="setFilename(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-file>
                  </v-flex>

                </template>

                <v-flex v-if="addbutton" offset-xs1 class="pb-4">
                  <v-dialog v-model="s['adddialogue']" scrollable width="700px">

                    <v-btn slot="activator" fab depressed small color="grey lighten-3">
                      <v-icon color="grey darken-1">add</v-icon>
                    </v-btn>

                    <v-card>
                      <v-card-title class="grey white--text"><span v-t="'Add metadata fields'"></span></v-card-title>
                      <v-card-text>
                        <v-list three-line >
                          <v-text-field clearable label="Search..." append-icon="search" v-model="searchfieldsinput"></v-text-field>
                          <template v-for="field in filteredMetadatafields">
                            <v-list-tile :key="field.id" @click="addfieldselection.push(field)">
                              <v-list-tile-content>
                                <v-list-tile-title>{{field.fieldname}}</v-list-tile-title>
                                <v-list-tile-sub-title>{{field.definition}}</v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                            <v-divider :key="'divi'+field.id"></v-divider>
                          </template>
                        </v-list>
                      </v-card-text>
                      <v-divider :key="'divi'+s.id"></v-divider>
                      <v-card-actions>
                        <v-layout row>
                          <v-flex>
                            <v-layout column>
                              <v-flex v-if="addfieldselection.length > 0">
                                <span v-t="'Selected fields:'"></span> <v-chip :key="index" v-for="(ch, index) in addfieldselection" close @input="removeField(addfieldselection, ch)">{{ ch.fieldname }}</v-chip>
                              </v-flex>
                              <v-flex v-else><span v-t="'Please select metadata fields from the list'"></span></v-flex>
                            </v-layout>
                          </v-flex>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" dark @click="addfieldselection = []; s['adddialogue'] = false"><span v-t="'Cancel'"></span></v-btn>
                          <v-btn color="primary" @click="addFields(s)"><span v-t="'Add'"></span></v-btn>
                        </v-layout>
                      </v-card-actions>
                    </v-card>

                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-card-text>

          </v-card>
        </v-layout>

        <v-layout align-center justify-end row class="ma-3">
          <v-dialog v-if="templating" v-model="templatedialog" width="500">
            <v-btn class="mr-3" slot="activator" dark raised :loading="loading" :disabled="loading" color="grey"><span v-t="'Save as template'"></span></v-btn>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title><span v-t="'Save as template'"></span></v-card-title>
              <v-card-text>
                <v-text-field v-model="templatename" :label="$t('Template name')" ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" :disabled="loading" color="grey" dark @click="templatedialog= false"><span v-t="'Cancel'"></span></v-btn>
                <v-btn :loading="loading" :disabled="loading" color="primary" @click="saveAsTemplate()"><span v-t="'Save'"></span></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn v-if="targetpid" raised :loading="loading" :disabled="loading" color="primary" @click="save()"><span v-t="'Save'"></span></v-btn>
          <v-btn v-else raised :loading="loading" :disabled="loading" color="primary" @click="submit()"><span v-t="'Submit'"></span></v-btn>
        </v-layout>
  
      </v-tab-item>
      <v-tab-item class="ma-4 prewrap">{{JSON.stringify(metadatapreview, null, 2)}}</v-tab-item>
      <v-tab-item class="ma-4">
        <p-t-list ref="templates" v-on:load-template="loadTemplate($event)"></p-t-list>
      </v-tab-item>
    </v-tabs-items>

  </v-container>
 
</template>

<script>
import arrays from '../../utils/arrays'
import jsonLd from '../../utils/json-ld'
import fields from '../../utils/fields'
import PITextField from './PITextField'
import PITextFieldSuggest from './PITextFieldSuggest'
import PITitle from './PITitle'
import PIEntity from './PIEntity'
import PIDateEdtf from './PIDateEdtf'
import PISelect from './PISelect'
import PISelectText from './PISelectText'
import PISubjectGnd from './PISubjectGnd'
import PISpatialGetty from './PISpatialGetty'
import PISpatialText from './PISpatialText'
import PIDimension from './PIDimension'
import PIDuration from './PIDuration'
import PIProject from './PIProject'
import PIFunder from './PIFunder'
import PIAssociation from './PIAssociation'
import PISeries from './PISeries'
import PICitation from './PICitation'
import PIBfPublication from './PIBfPublication'
import PIAdaptation from './PIAdaptation'
import PIFilenameReadonly from './PIFilenameReadonly'
import PIFile from './PIFile'
import PISpatialGettyReadonly from './PISpatialGettyReadonly'
import PIVocabExtReadonly from './PIVocabExtReadonly'
import PIUnknownReadonly from './PIUnknownReadonly'
import PILiteral from './PILiteral'
import PIStudyPlan from './PIStudyPlan'
import PIKeyword from './PIKeyword'
import PTList from '../templates/PTList'

export default {
  name: 'p-i-form',
  components: {
    PITextField,
    PITextFieldSuggest,
    PITitle,
    PIEntity,
    PIDateEdtf,
    PISelect,
    PISelectText,
    PISubjectGnd,
    PISpatialGetty,
    PISpatialText,
    PIDimension,
    PIDuration,
    PIStudyPlan,
    PIProject,
    PIFunder,
    PIAssociation,
    PISeries,
    PICitation,
    PIBfPublication,
    PIAdaptation,
    PILiteral,
    PIKeyword,
    PIFilenameReadonly,
    PIFile,
    PIVocabExtReadonly,
    PISpatialGettyReadonly,
    PIUnknownReadonly,
    PTList
  },
  props: {
    form: {
      type: Object
    },
    targetpid: {
      type: String
    },
    owner: {
      // if defined, phaidra will transfer ownership to this user
      // IIF the current user is authorized to do so in phaidra-api
      type: String
    },
    addbutton: {
      type: Boolean,
      default: true
    },
    templating: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    submittype: function() {
      for (let s of this.form.sections) {
        if (s.fields && (s.type !== 'member')) {
          for (let field of s.fields) {
            if (field.predicate === 'dcterms:type') {
              return this.getObjectType(field.value)
            }
          }
        }
      }
      return null
    },
    filteredMetadatafields() {
      let list = fields.getEditableFields()
      if (this.searchfieldsinput) {
        return list.filter(f => (f.fieldname.toLowerCase().includes(this.searchfieldsinput.toLowerCase()) ||  (f.definition.toLowerCase().includes(this.searchfieldsinput.toLowerCase()))))
      } else {
        return list
      }
    }
  },
  data () {
    return {
      activetab: null,
      loadedMetadata: [],
      loading: false,
      fab: false,
      addfieldselection: [],
      templatedialog: '',
      templatename: '',
      previewMember: '',
      searchfieldsinput: '',
      metadatapreview: {}
    }
  },
  methods: {
    getMetadata: function () {
      let jsonlds
      if (!this.targetpid && (this.submittype === 'container')) {
        jsonlds = jsonLd.containerForm2json(this.form)
      } else {
        jsonlds = jsonLd.form2json(this.form)
      }
      let md = { metadata: { 'json-ld': jsonlds } }
      for (let s of this.form.sections) {
        if (s.type === 'accessrights') {
          md['metadata']['rights'] = s.rights
        }
      }
      let colorder = []
      let i = 0
      for (let s of this.form.sections) {
        if (s.type === 'member') {
          i++
          colorder.push( { member: 'member_' + s.id, pos: i } )
        }
      }
      if (colorder.length > 0) {
        md['metadata']['membersorder'] = colorder
      }
      if (this.previewMember) {
        md['metadata']['relationships'] = [ { s: 'member_' + this.previewMember, p: 'http://phaidra.org/XML/V1.0/relations#isThumbnailFor', o: 'container' } ]
      }
      if (this.owner) {
        md['metadata']['ownerid'] = this.owner
      }
      return md
    },
    loadTemplates: function () {
      this.$refs.templates.loadTemplates()
    },
    loadTemplate: function (form) {
      this.$emit('load-form', form)
      this.activetab = 0
    },
    saveAsTemplate: function () {
      var self = this
      var httpFormData = new FormData()
      this.loading = true
      httpFormData.append('name', this.templatename)
      httpFormData.append('form', JSON.stringify(this.form))
      var url = self.$store.state.instanceconfig.api + '/jsonld/template/add'
      var promise = fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        },
        body: httpFormData
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        self.templatedialog = false
      })
      .catch(function (error) {
        console.log(error)
      })
      return promise
    },
    getObjectType: function(contentmodel) {
      switch (contentmodel) {
        case 'https://pid.phaidra.org/vocabulary/44TN-P1S0':
          return 'picture'
        case 'https://pid.phaidra.org/vocabulary/8YB5-1M0J':
          return 'audio'
        case 'https://pid.phaidra.org/vocabulary/B0Y6-GYT8':
          return 'video'
        case 'https://pid.phaidra.org/vocabulary/69ZZ-2KGX':
          return 'document'
        case 'https://pid.phaidra.org/vocabulary/8MY0-BQDQ':
          return 'container'
        default:
          return 'unknown'
      }
    },
    submit: function () {
      var self = this
      this.loading = true
      var httpFormData = new FormData()
      httpFormData.append('metadata', JSON.stringify(self.getMetadata()))
      if (this.submittype === 'container') {
        for (var i = 0; i < this.form.sections.length; i++) {
          var s = this.form.sections[i]
          if (s.type === 'member') {
            for (var j = 0; j < s.fields.length; j++) {
              if (s.fields[j].component === 'input-file') {
                if (s.fields[j].file !== '') {
                  httpFormData.append('member_' + s.id, s.fields[j].file)
                }
              }
            }
          }
        }
      } else {
         for (i = 0; i < this.form.sections.length; i++) {
          s = this.form.sections[i]
          if (s.fields) {
            for (j = 0; j < s.fields.length; j++) {
              if (s.fields[j].component === 'input-file') {
                if (s.fields[j].file !== '') {
                  httpFormData.append('file', s.fields[j].file)
                }
              }
            }
          }
        }
      }
      fetch(self.$store.state.instanceconfig.api + '/' + this.submittype + '/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          //'Authorization': 'Basic ' + base64.encode(self.$store.state.instanceconfig.adminuser + ':' + self.$store.state.instanceconfig.adminpass),
          'X-XSRF-TOKEN': this.$store.state.user.token
        },
        body: httpFormData
      })
      .then(response => response.json())
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        if (json.status === 200){
          if (json.pid) {
            self.$emit('object-created', json.pid)
          }
        }
        self.$vuetify.goTo(0)
      })
      .catch(function (error) {
        self.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
        self.loading = false
        self.$vuetify.goTo(0)
      })
    },
    save: function () {
      var self = this
      this.loading = true
      var httpFormData = new FormData()
      httpFormData.append('metadata', JSON.stringify(self.getMetadata()))
      fetch(self.$store.state.instanceconfig.api + '/object/' + self.targetpid + '/metadata', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': self.$store.state.user.token
        },
        body: httpFormData
      })
      .then(response => response.json())
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          if (json.status === 401) {
            json.alerts.push({ type: 'danger', msg: 'Please log in' })
          }
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        if (json.status === 200){
          self.$emit('object-saved', self.targetpid)
        }
        self.$vuetify.goTo(0)
      })
      .catch(function (error) {
        self.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
        self.loading = false
        self.$vuetify.goTo(0)
      })
    },
    updatePrettyPrint: function () {
      this.metadatapreview = this.getMetadata()
    },
    addField: function (arr, f) {
      var newField = arrays.duplicate(arr, f)
      if (newField) {
        newField.id = (new Date()).getTime()
        newField.removable = true
      }
    },
    removeField: function (arr, f) {
      arrays.remove(arr, f)
    },
    sortFieldUp: function (arr, f) {
      var i = arr.indexOf(f)
      if (arr[i - 1]) {
        if (arr[i - 1].ordergroup === f.ordergroup) {
          arrays.moveUp(arr, f)
        }
      }
    },
    sortFieldDown: function (arr, f) {
      var i = arr.indexOf(f)
      if (arr[i + 1]) {
        if (arr[i + 1].ordergroup === f.ordergroup) {
          arrays.moveDown(arr, f)
        }
      }
    },
    sortMemberUp: function (s) {
      var i = this.form.sections.indexOf(s)
      if (this.form.sections[i - 1]) {
        if (this.form.sections[i - 1].type === 'member') {
          arrays.moveUp(this.form.sections, s)
        }
      }
    },
    sortMemberDown: function (s) {
      var i = this.form.sections.indexOf(s)
      if (this.form.sections[i + 1]) {
        if (this.form.sections[i + 1].type === 'member') {
          arrays.moveDown(this.form.sections, s)
        }
      }
    },
    addSection: function (s) {
      var ns = arrays.duplicate(this.form.sections, s)
      ns.id = (new Date()).getTime()
      ns.removable = true
      for (var i = 0; i < ns.fields.length; i++) {
        var id = (new Date()).getTime()
        if (i > 0) {
          id = ns.fields[i - 1].id + 1
        }
        ns.fields[i].id = id
        ns.fields[i].value = ''
        ns.fields[i].language = ''
      }
    },
    removeSection: function (s) {
      arrays.remove(this.form.sections, s)
    },
    setSelected: function (f, property, event) {
      if (event) {
        f[property] = event['@id']
      }
      this.$emit('form-input-' + f.component, f)
    },
    updateSubject: function (f, event) {
      f['skos:prefLabel'] = event['skos:prefLabel']
      if (f['skos:prefLabel']) {
        if (f['skos:prefLabel'].length > 0) {
          // needed to init the search input if loading from template
          // will be synced with component's initquery prop
          f.initquery = f['skos:prefLabel'][0]['@value']
        }
      }
      f['rdfs:label'] = event['rdfs:label']
      this.$emit('form-input-' + f.component, f)
    },
    updatePlace: function (f, event) {
      f['skos:prefLabel'] = event['skos:prefLabel']
      if (f['skos:prefLabel']) {
        if (f['skos:prefLabel'].length > 0) {
          // needed to init the search input if loading from template
          // will be synced with component's initquery prop
          f.initquery = f['skos:prefLabel'][0]['@value']
        }
      }
      f['rdfs:label'] = event['rdfs:label']
      f.coordinates = event.coordinates
      this.$emit('form-input-' + f.component, f)
    },
    selectInput: function (f, event) {
      if (event) {
        f.value = event['@id']
        if (event['@type']){
          f.type = event['@type']
        }
        var preflabels = event['skos:prefLabel']
        f['skos:prefLabel'] = []
        Object.entries(preflabels).forEach(([key, value]) => {
          f['skos:prefLabel'].push({ '@value': value, '@language': key })
        })
        var rdfslabels = event['rdfs:label']
        if (rdfslabels) {
          f['rdfs:label'] = []
          Object.entries(rdfslabels).forEach(([key, value]) => {
            f['rdfs:label'].push({ '@value': value, '@language': key })
          })
        }
        f['skos:notation'] = event['skos:notation']
      } else {
        f.value = ''
        f['skos:prefLabel'] = []
      }
      this.$emit('form-input-' + f.component, f)
    },
    roleInput: function (f, event) {
      f.role = event['@id']
      f['skos:prefLabel'] = event['skos:prefLabel']
      this.$emit('form-input-' + f.component, f)
    },
    setFilename: function (f, event) {
      f.value = event.target.files[0].name
      f.file = event.target.files[0]
      this.$emit('form-input-' + f.component, f)
    },
    addFieldAutocompleteFilter: function (item, queryText) {
      const lab = this.$t(item['fieldname']).toLowerCase()
      const query = queryText.toLowerCase()
      return lab.indexOf(query) > -1
    },
    removeFieldChip (item) {
      const index = this.addfieldselection.indexOf(item)
      if (index >= 0) this.addfieldselection.splice(index, 1)
    },
    addFields (section) {
      for (var i = 0; i < this.addfieldselection.length; i++) {
        let f = fields.getField(this.addfieldselection[i].id)
        f.removable = true
        section.fields.push(f)
      }
      this.addfieldselection = []
      section['adddialogue'] = false
    }
  },
  mounted: function () {
    this.$store.dispatch('loadLanguages')
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}

.prewrap {
  white-space: pre-wrap;
}
</style>
