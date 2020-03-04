<template>
  <v-card >
    <v-card-title class="title font-weight-light grey white--text">{{ $t('Relationships') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-container>
        <v-row class="title font-weight-light">{{ $t('Here you can add or remove relationships to other objects inside this repository.') }}</v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              hide-default-footer
              :items="relationshipsArray"
              :headers="relationshipsHeaders"
              :loading="loading"
              :loading-text="$t('Loading...')"
              :items-per-page="1000"
            >
              <template v-slot:item.object="{ item }">
                <a target="_blank" :href="'https://' + instance.baseurl + '/' + item.object">{{ item.object }}</a>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon color="grey" class="mx-3" @click="removeRelationship(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import qs from 'qs'

export default {
  name: 'p-m-relationships',
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    }
  },
  data () {
    return {
      loading: false,
      map: {
        references: {
          uri: 'http://purl.org/dc/terms/references',
          label: this.$t('References')
        },
        isbacksideof: {
          uri: 'http://phaidra.org/XML/V1.0/relations#isBackSideOf',
          label: this.$t('Is back side of')
        },
        isthumbnailfor: {
          uri: 'http://phaidra.org/XML/V1.0/relations#isThumbnailFor',
          label: this.$t('Is thumbnail for')
        },
        hassuccessor: {
          uri: 'http://phaidra.univie.ac.at/XML/V1.0/relations#hasSuccessor',
          label: this.$t('Has successor')
        },
        isalternativeformatof: {
          uri: 'http://phaidra.org/XML/V1.0/relations#isAlternativeFormatOf',
          label: this.$t('Is alternative format of')
        },
        isalternativeversionof: {
          uri: 'http://phaidra.org/XML/V1.0/relations#isAlternativeVersionOf',
          label: this.$t('Is alternative version of')
        },
        isinadminset: {
          uri: 'http://phaidra.org/ontology/isInAdminSet',
          label: this.$t('Is in admin set')
        },
        haspart: {
          uri: 'info:fedora/fedora-system:def/relations-external#hasCollectionMember',
          label: this.$t('Has part')
        },
        hasmember: {
          uri: 'http://pcdm.org/models#hasMember',
          label: this.$t('Has member')
        }
      },
      relationships: {},
      relationshipsArray: [],
      relationshipsHeaders: [
        { text: this.$t('Relationship'), align: 'left', value: 'relationship' },
        { text: this.$t('Object'), align: 'left', value: 'object' },
        { text: this.$t('Title'), align: 'left', value: 'title' },
        { text: '', align: 'right', value: 'actions', sortable: false }
      ]
    }
  },
  methods: {
    loadRelationships: async function () {
      this.loading = true
      this.relationships = {}
      this.relationshipsArray = []
      try {
        let response = await this.$http.request({
          method: 'GET',
          url: this.instance.api + '/object/' + this.pid + '/relationships',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          }
        })
        if (response.status === 200) {
          this.relationships = response.data.relationships
          let pids = []
          Object.entries(this.map).forEach(([key, value]) => {
            if (this.relationships[key]) {
              for ( let o of this.relationships[key]) {
                pids.push(o)
              }
            }
          })
          let titles = await this.getTitlesHash(pids)
          Object.entries(this.map).forEach(([key, value]) => {
            if (this.relationships[key]) {
              for ( let o of this.relationships[key]) {
                this.relationshipsArray.push( { relationship: this.map[key].label, object: o, title: titles[o] } )
              }
            }
          })
        } else {
          if (response.data.alerts && response.data.alerts.length > 0) {
            this.$store.commit('setAlerts', response.data.alerts)
          }
        }
      } catch (error) {
        console.log(error)
        this.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
      } finally {
        this.loading = false
      }
    },
    getTitlesHash: async function (pids) {
      let titles = {}
      try {
        let params = {
          q: 'pid:"("' + pids.join('" OR "') + '")"',
          defType: 'edismax',
          wt: 'json',
          fl: 'pid,dc_title',
          start: 0,
          rows: 5000
        }
        let response = await this.$http.request({
          method: 'POST',
          url: this.instance.solr + '/select',
          data: qs.stringify(params, { arrayFormat: 'repeat' }),
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        let docs = response.data.response.docs
        for (let d of docs) {
          titles[d.pid] = d['dc_title']
        }
      } catch (error) {
        console.log(error)
        this.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
      }
      return titles
    },
    removeRelationship: async function (item) {
      this.loadRelationships()
    }
  },
  mounted: async function () {    
    this.$nextTick(function () {
      this.loadRelationships()
    })
  }
}
</script>
