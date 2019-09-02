<template>
  <v-container>
    <v-divider v-if="selectioncheck"></v-divider>
    <v-slide-y-transition hide-on-leave>
      <v-row v-if="selectioncheck" no-gutters class="my-4">
        <span class="mt-2"><a @click="selectPage()">{{ $t('Select this page') }}</a><span class="mx-2">/</span><a @click="unselectPage()">{{ $t('Unselect this page') }}</a><span class="mx-2">/</span><a @click="selectAllResults()">{{ $t('Select all results') }}</a><span class="mx-2">/</span><a @click="selection = []">{{ $t('Clear selection') }}</a></span>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on: menu }">
            <v-btn v-on="{ ...menu }" text outlined color="primary" class="mx-4" :disabled="!selection.length">{{ $t('Selected results') }} ({{ selection.length }})</v-btn>
          </template>
          <v-list>
            <v-list-item @click="$refs.listdialog.open()">
              <v-list-item-title>{{ $t('Add to object list') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="">
              <v-list-item-title>{{ $t('Add to collection') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-slide-y-transition>
    <v-divider v-if="selectioncheck"></v-divider>
    <template v-for="(doc) in this.docs">
      <v-row>
        <v-slide-x-transition hide-on-leave>
          <v-col cols="1" v-if="selectioncheck" align-self="center">
            <v-checkbox color="primary" @change="selectDoc($event, doc)" :value="selectionIncludes(doc)"></v-checkbox>
          </v-col>
        </v-slide-x-transition>
        <v-divider inset vertical v-if="selectioncheck"></v-divider>
        <v-col :cols="selectioncheck ? 10 : 12">
          <v-row :key="'prev'+doc.pid">
            <v-col cols="2" class="preview-maxwidth">
              <p-img :src="'https://' + instance.baseurl + '/preview/' + doc.pid + '///120'" class="elevation-1 mt-2">
                <div class="fill-height ma-0" slot="placeholder" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </div>
              </p-img>
            </v-col>
            <v-col cols="10">
              <v-row no-gutters class="mb-4">
                <v-col cols="10">
                  <h3 class="title font-weight-light primary--text" @click.stop v-if="doc.dc_title">
                    <router-link :to="{ name: 'detail', params: { pid: doc.pid } }">{{ doc.dc_title[0] }}</router-link>
                  </h3>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" class="text-right"><span v-if="doc.created" class="grey--text">{{ doc.created | date }}</span></v-col>
              </v-row>
              <v-row no-gutters class="my-4 mr-2">
                <v-col>
                  <span class="grey--text text--darken-4">
                    <span v-for="(aut,i) in doc.bib_roles_pers_aut" :key="'pers'+i">
                      {{aut}}<span v-if="(i+1) < doc.bib_roles_pers_aut.length">; </span>
                    </span>
                    <span v-for="(aut,i) in doc.bib_roles_corp_aut" :key="'corp'+i">
                      {{aut}}<span v-if="(i+1) < doc.bib_roles_corp_aut.length">; </span>
                    </span>
                  </span>
                </v-col>
              </v-row>
              <v-row no-gutters class="my-4 mr-2" v-if="doc.dc_description">
                <v-col>
                  <span class="grey--text text--darken-4"><p-expand-text :text="doc.dc_description[0]" :moreStr="$t('read more')"/></span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters class="my-4 mr-2" :key="'lic'+doc.pid">
            <v-col cols="2" class="preview-maxwidth"></v-col>
            <v-col>
              <v-row no-gutters>
                <span>https://{{ instance.baseurl }}/{{ doc.pid }}</span>
                <v-spacer></v-spacer>
                <p-d-license v-if="doc.dc_license" :hideLabel="true" :o="doc.dc_license[0]"></p-d-license>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider :key="'div'+doc.pid" class="my-4 mr-2"></v-divider>
    </template>

    <list-dialog ref="listdialog" @list-selected="addToList($event)"></list-dialog>

  </v-container>
</template>

<script>
import PDLicense from '../display/PDLicense'
import PImg from '../utils/PImg'
import PExpandText from '../utils/PExpandText'
import ListDialog from '../select/ListDialog'

export default {
  name: 'search-results',
  components: {
    PDLicense,
    PImg,
    PExpandText,
    ListDialog
  },
  props: {
    docs: {
      type: Array
    },
    selectioncheck: Boolean,
    total: Number
  },
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    }
  },
  data () {
    return {
      selection: []
    }
  },
  methods: {
    selectionIncludes: function (doc) {
      for (let s of this.selection) {
        if(s.pid === doc.pid) {
          return true
        }
      }
      return false
    },
    addToList: async function (list) {
      try {
        var httpFormData = new FormData()
        httpFormData.append('members', JSON.stringify({ members: this.selection }))
        let response = await fetch(this.instance.api + '/list/' + list.listid + '/members/add', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          },
          body: httpFormData
        })
        if ( response.status === 200 ) {
          this.$store.commit('setAlerts', [ { msg: this.$t('Object list successfuly updated'), type: 'success' } ])
        } else {
          let json = await response.json()
          if (json.alerts && json.alerts.length > 0) {
            this.$store.commit('setAlerts', json.alerts)
          }
        }
        this.loading = false  
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    selectDoc: function (value, doc) {
      if (value) {
        let found = false
        for (let s of this.selection) {
          if(s.pid === doc.pid) {
            found = true
          }
        }
        if (!found){
          let t = ''
          if (doc.dc_title) {
            t = doc.dc_title[0]
          }
          this.selection.push({
            pid: doc.pid,
            title: t
          })
        }
      } else {
        let i = 0
        for (let s of this.selection) {
          if(s.pid === doc.pid) {
            this.selection.splice(i, 1)
            break
          }
          i++
        }
      }
    },
    selectPage: function () {
      for (let d of this.docs) {
        let found = false
        for (let s of this.selection) {
          if(s.pid === d.pid) {
            found = true
          }
        }
        if (!found){
          let t = ''
          if (d.dc_title) {
            t = d.dc_title[0]
          }
          this.selection.push({
            pid: d.pid,
            title: t
          })
        }
      }
    },
    unselectPage: function () {
      for (let d of this.docs) {
        let i = 0
        for (let s of this.selection) {
          if(s.pid === d.pid) {
            this.selection.splice(i, 1)
            break
          }
          i++
        }
      }
    },
    selectAllResults: function () {
      // todo: get all pid+title from current search
      // check for max selection size
      let docs = []
      for (let d of docs) {
        if (!this.selection.includes(d.pid)) {
          this.selection.push(d.pid)
        }
      }
    }
  }
}
</script>

<style scoped>
.preview-maxwidth {
  max-width: 120px;
}

.card__title--primary {
  padding-top: 10px;
}

.card__text {
  padding-top: 0px;
}

.container {
  padding: 0;
}

.v-application a {
  text-decoration: none;
}

</style>
