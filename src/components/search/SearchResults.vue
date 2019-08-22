<template>
  <v-container>
    <template v-for="(doc) in this.docs">
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
        <v-col cols="2"></v-col>
        <v-col>
          <v-row no-gutters>
            <span>https://{{ instance.baseurl }}/{{ doc.pid }}</span>
            <v-spacer></v-spacer>
            <p-d-license v-if="doc.dc_license" :hideLabel="true" :o="doc.dc_license[0]"></p-d-license>
          </v-row>
        </v-col>
      </v-row>
      <v-divider :key="'div'+doc.pid" class="my-4 mr-2"></v-divider>
    </template>
  </v-container>
</template>

<script>
import PDLicense from '../display/PDLicense'
import PImg from '../utils/PImg'
import PExpandText from '../utils/PExpandText'

export default {
  name: 'search-results',
  components: {
    PDLicense,
    PImg,
    PExpandText
  },
  props: {
    docs: {
      type: Array
    }
  },
  computed: {
    instance () {
      return this.$store.state.instanceconfig
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
