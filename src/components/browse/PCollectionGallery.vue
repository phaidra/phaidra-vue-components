<template>
  <v-container>
    <v-row>
      <v-toolbar>
        <v-toolbar-title>Toolbar</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="mode = 'single'">
          <v-icon>mdi-image-outline</v-icon>
        </v-btn>
        <v-btn icon @click="mode = 'gallery'">
          <v-icon>mdi-grid</v-icon>
        </v-btn>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col md="auto">
        <v-treeview
          :items="collections"
          :load-children="getChildren"
          :active.sync="active"
          :open.sync="open"
          activatable
          transition
          color="primary"
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col v-if="mode === 'single'">
        <v-carousel hide-delimiters height="100%">
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039867/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039866/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039865/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039864/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039863/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039862/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039861/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039860/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
          <v-carousel-item :src="'https://phaidra.univie.ac.at/preview/o:1039859/ImageManipulator/boxImage/800/jpg'"></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col v-if="mode === 'gallery'">
        <v-container>
          <v-row>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039867/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039866/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039865/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039864/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039863/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039862/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039861/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039860/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img class="grey lighten-2" aspect-ratio="1" :src="'https://phaidra.univie.ac.at/preview/o:1039859/ImageManipulator/boxImage/800/jpg'">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import qs from 'qs'

export default {
  name: 'p-collection-gallery',
  props: {
    collection: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      active: [],
      open: [this.collection],
      collections: [
        {
          id: this.collection,
          name: 'Root',
          children: []
        }
      ],
      mode: 'gallery',
      selectedImage: {
        src: ''
      }
    }
  },
  methods: {
    getChildren: async function (item) {
      try {
        let params = {
          q: '*:*',
          defType: 'edismax',
          wt: 'json',
          fq: 'ispartof:"' + item.id + '"',
          start: 0,
          rows: 5000
        }
        let response = await this.$http.request({
          method: 'POST',
          url: this.$store.state.instanceconfig.solr + '/select',
          data: qs.stringify(params, { arrayFormat: 'repeat' }),
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        let docs = response.data.response.docs
        let total = response.data.response.numFound
        if (total < 1) {
          console.log(item.id + ' has ' + total + ' members')
          return
        }
        for (let member of docs) {
          let node = {
            id: member.pid,
            name: member.dc_title,
            children: []
          }
          item.children.push(node)
        }
      } catch (error) {
        console.log(error)
        this.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
      }
    }
  }

}
</script>
