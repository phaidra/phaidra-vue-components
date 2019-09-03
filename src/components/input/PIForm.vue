<template>
  <v-container  v-if="form && form.sections">
    <v-tabs v-model="activetab" align-with-title>
      <v-tab class="title font-weight-light text-capitalize">{{ $t('Metadata') }}<template v-if="targetpid">&nbsp;-&nbsp;<span class="text-lowercase">{{ targetpid }}</span></template></v-tab>
      <v-tab v-if="templating" @click="loadTemplates()" class="title font-weight-light text-capitalize">{{ $t('Templates') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activetab">
      <v-tab-item class="pa-3" v-if="form">

        <v-row v-for="(s) in this.form.sections" :key="s.id" class="ma-3">

          <v-card v-if="s.type === 'resourcelink'" width="100%">
            <v-card-title class="title font-weight-light grey white--text">
              <span>{{s.title}}</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="mt-4">
              <v-text-field v-model="s.resourcelink"
                :label="$t('Resource link')"
                :required="true"
                :placeholder="$t('e.g.: https://phaidra.org')"
                :rules="[ v => !!v || 'Required']"
                filled
              ></v-text-field>
            </v-card-text>
          </v-card>

          <v-card v-else-if="(s.type !== 'accessrights')" width="100%">
            <v-card-title class="title font-weight-light grey white--text">
              <span v-t="s.title"></span>
              <v-spacer></v-spacer>
              <v-checkbox dark color="white" v-if="s.type === 'member'" v-model="previewMember" :label="$t('Container thumbnail')" :value="s.id"></v-checkbox>
              <v-spacer></v-spacer>
              <v-menu open-on-hover bottom offset-y v-if="!s.disablemenu">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon dark>
                    <v-icon dark>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-if="s.multiplicable && (s.type === 'member') || (s.type === 'phaidra:Subject')" @click="addSection(s)">
                    <v-list-item-title><span v-t="'Duplicate'"></span></v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="s.removable && (s.type != 'digitalobject')" @click="removeSection(s)">
                    <v-list-item-title><span v-t="'Remove'"></span></v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="s.type === 'member'" @click="sortMemberUp(s)">
                    <v-list-item-title><span v-t="'Move up'"></span></v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="s.type === 'member'" @click="sortMemberDown(s)">
                    <v-list-item-title><span v-t="'Move down'"></span></v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="s.type === 'digitalobject'" @click="$emit('add-phaidrasubject-section', s)">
                    <v-list-item-title><span v-t="'Add subject metadata section'"></span></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="mt-4">

              <template v-for="(f) in s.fields">
                <v-row no-gutters :key="f.id">
                  <v-col v-if="f.component === 'p-text-field'">
                    <p-i-text-field
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-text-field>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-text-field-suggest'">
                    <p-i-text-field-suggest
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-text-field-suggest>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-keyword'">
                    <p-i-keyword
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-keyword>
                  </v-col>

                  <v-col v-if="f.component === 'p-title'">
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
                  </v-col>

                  <v-col v-else-if="f.component === 'p-select'">
                    <p-i-select
                      v-bind.sync="f"
                      v-on:input="selectInput(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-select>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-select-text'">
                    <p-i-select-text
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-select="f.selectvalue=$event"
                      v-on:input-text="f.textvalue=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-select-text>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-date-edtf'">
                    <p-i-date-edtf
                      v-bind.sync="f"
                      v-on:input-date="f.value=$event"
                      v-on:input-date-type="setSelected(f, 'type', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-date-edtf>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-duration'">
                    <p-i-duration
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-duration>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-series'">
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
                  </v-col>

                  <v-col v-else-if="f.component === 'p-citation'">
                    <p-i-citation
                      v-bind.sync="f"
                      v-on:input-citation-type="setSelected(f, 'type', $event)"
                      v-on:input-citation="f.citation=$event"
                      v-on:input-citation-language="setSelected(f, 'citationLanguage', $event)"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-citation>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-bf-publication'">
                    <p-i-bf-publication
                      v-bind.sync="f"
                      v-on:input-publisher-name="f.publisherName=$event"
                      v-on:input-publishing-place="f.publishingPlace=$event"
                      v-on:input-publishing-date="f.publishingDate=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-bf-publication>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-adaptation'">
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
                  </v-col>

                  <v-col v-else-if="f.component === 'p-entity'">
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
                  </v-col>

                  <v-col v-else-if="f.component === 'p-subject-gnd'">
                    <p-i-subject-gnd
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:resolve="updateSubject(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-subject-gnd>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-spatial-getty'">
                    <p-i-spatial-getty
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-place-type="setSelected(f, 'type', $event)"
                      v-on:resolve="updatePlace(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-getty>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-spatial-text'">
                    <p-i-spatial-text
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-place-type="setSelected(f, 'type', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-text>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-dimension'">
                    <p-i-dimension
                      v-bind.sync="f"
                      v-on:input-value="f.value=$event"
                      v-on:input-unit="setSelected(f, 'unitCode', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-dimension>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-literal'">
                    <p-i-literal
                      v-bind.sync="f"
                      v-on:input-value="f.value=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-literal>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-study-plan'">
                    <p-i-study-plan
                      v-bind.sync="f"
                      v-on:input-name="f.name=$event"
                      v-on:input-name-language="setSelected(f, 'nameLanguage', $event)"
                      v-on:input-notation="f.notation=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-study-plan>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-project'">
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
                  </v-col>

                  <v-col v-else-if="f.component === 'p-funder'">
                    <p-i-funder
                      v-bind.sync="f"
                      v-on:input-name="f.name=$event"
                      v-on:input-name-language="setSelected(f, 'nameLanguage', $event)"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-funder>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-association'">
                    <p-i-association
                      v-bind.sync="f"
                      v-on:input="selectInput(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-association>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-filename-readonly'">
                    <p-i-filename-readonly v-bind.sync="f"></p-i-filename-readonly>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-unknown-readonly'">
                    <p-i-unknown-readonly v-bind.sync="f"></p-i-unknown-readonly>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-vocab-ext-readonly'">
                    <p-i-vocab-ext-readonly
                      v-bind.sync="f"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-vocab-ext-readonly>
                  </v-col>

                  <v-col v-else-if="f.component === 'p-spatial-getty-readonly'">
                    <p-i-spatial-getty-readonly
                      v-bind.sync="f"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-getty-readonly>
                  </v-col>

                  <v-col v-else-if="f.component === 'input-file'">
                    <p-i-file
                      v-bind.sync="f"
                      v-on:input-file="setFilename(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-file>
                  </v-col>

                </v-row>
              </template>

              <v-row>
                <v-col>
                  <v-dialog v-if="addbutton" class="pb-4" v-model="s['adddialogue']" scrollable width="700px">
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" fab depressed small color="grey lighten-3">
                        <v-icon color="grey darken-1">mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="grey white--text"><span v-t="'Add metadata fields'"></span></v-card-title>
                      <v-card-text>
                        <v-list three-line >
                          <v-text-field clearable label="Search..." append-icon="mdi-magnify" v-model="searchfieldsinput"></v-text-field>
                          <template v-for="field in filteredMetadatafields">
                            <v-list-item :key="field.id" @click="addfieldselection.push(field)">
                              <v-list-item-content>
                                <v-list-item-title>{{field.fieldname}}</v-list-item-title>
                                <v-list-item-subtitle>{{field.definition}}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider :key="'divi'+field.id"></v-divider>
                          </template>
                        </v-list>
                      </v-card-text>
                      <v-divider :key="'divi'+s.id"></v-divider>
                      <v-card-actions>
                        <v-container>
                          <v-row>
                            <v-col v-if="addfieldselection.length > 0">
                              <span v-t="'Selected fields:'" class="mr-2"></span> <v-chip :key="index" v-for="(ch, index) in addfieldselection" close @click:close="removeField(addfieldselection, ch)">{{ ch.fieldname }}</v-chip>
                            </v-col>
                            <v-col v-else><span v-t="'Please select metadata fields from the list'"></span></v-col>
                          </v-row>
                          <v-row justify="end">
                            <v-btn color="grey" dark @click="addfieldselection = []; s['adddialogue'] = false"><span v-t="'Cancel'"></span></v-btn>
                            <v-btn color="primary" @click="addFields(s)"><span v-t="'Add'"></span></v-btn>
                          </v-row>
                        </v-container>
                      </v-card-actions>
                    </v-card>

                  </v-dialog>
                </v-col>
              </v-row>
            </v-card-text>

          </v-card>
        </v-row>

        <v-row align="center" justify="end"  class="ma-3">
          <v-dialog v-if="templating" v-model="templatedialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn class="mr-3" v-on="on" dark raised :loading="loading" :disabled="loading" color="grey"><span v-t="'Save as template'"></span></v-btn>
            </template>
            <v-card>
              <v-card-title class="title font-weight-light grey lighten-2" primary-title><span v-t="'Save as template'"></span></v-card-title>
              <v-card-text>
                <v-text-field class="mt-4" hide-details filled single-line v-model="templatename" :label="$t('Template name')" ></v-text-field>
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
        </v-row>

      </v-tab-item>
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
import PTemplates from '../templates/PTemplates'

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
    PTemplates
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
    submittype: function () {
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
    filteredMetadatafields () {
      let list = fields.getEditableFields()
      if (this.searchfieldsinput) {
        return list.filter(f => (f.fieldname.toLowerCase().includes(this.searchfieldsinput.toLowerCase()) || (f.definition.toLowerCase().includes(this.searchfieldsinput.toLowerCase()))))
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
      let colorder = []
      let i = 0
      for (let s of this.form.sections) {
        if (s.type === 'member') {
          i++
          colorder.push({ member: 'member_' + s.id, pos: i })
        }
        if (s.type === 'accessrights') {
          md['metadata']['rights'] = s.rights
        }
        if (s.type === 'resourcelink') {
          md['metadata']['resourcelink'] = s.resourcelink
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
      if (this.$refs.templates) {
        this.$refs.templates.loadTemplates()
      }
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
    getObjectType: function (contentmodel) {
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
        case 'https://pid.phaidra.org/vocabulary/T8GH-F4V8':
          return 'resource'
        case 'https://pid.phaidra.org/vocabulary/GXS7-ENXJ':
          return 'collection'
        default:
          return 'unknown'
      }
    },
    submit: function () {
      var self = this
      this.loading = true
      var httpFormData = new FormData()
      
      switch (this.submittype) {
        case 'container':
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
          break
        case 'resource':
            for (var i = 0; i < this.form.sections.length; i++) {
            var s = this.form.sections[i]
            if (s.type === 'resourcelink') {

            }
          }
          break
      
        default:
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
          break;
      }

      httpFormData.append('metadata', JSON.stringify(self.getMetadata()))

      fetch(self.$store.state.instanceconfig.api + '/' + this.submittype + '/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          // 'Authorization': 'Basic ' + base64.encode(self.$store.state.instanceconfig.adminuser + ':' + self.$store.state.instanceconfig.adminpass),
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
          if (json.status === 200) {
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
          if (json.status === 200) {
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
        if (event['@type']) {
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
      f.value = event.name
      f.file = event
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
