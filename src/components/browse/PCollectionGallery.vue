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
        <v-treeview :items="collections"></v-treeview>
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
      mode: 'gallery',
      selectedImage: {
        src: ''
      },
      collections: [
        {
          id: 'o:1',
          name: 'Collection 1',
          children: [
            { 
              id: 'o:11', 
              name: 'Subcollection 1-1',
              children: [
                { 
                  id: 'o:111', 
                  name: 'Subcollection 1-1-1',
                  children: [
                    { 
                      id: 'o:1111', 
                      name: 'Subcollection 1-1-1-1',
                      children: [
                        { 
                          id: 'o:11111', 
                          name: 'Subcollection 1-1-1-1-1',
                          src: 'https://phaidra.univie.ac.at/preview/o:1039867/ImageManipulator/boxImage/800/jpg'
                        },
                        { 
                          id: 'o:11112', 
                          name: 'Subcollection 1-1-1-1-2',
                          src: 'https://phaidra.univie.ac.at/preview/o:1039866/ImageManipulator/boxImage/800/jpg'
                        },
                        { 
                          id: 'o:11113', 
                          name: 'Subcollection 1-1-1-1-3',
                          src: 'https://phaidra.univie.ac.at/preview/o:1039865/ImageManipulator/boxImage/800/jpg'
                        }
                      ]
                    },
                    { 
                      id: 'o:1112', 
                      name: 'Subcollection 1-1-1-2'
                    },
                    { 
                      id: 'o:1113', 
                      name: 'Subcollection 1-1-1-3'
                    }
                  ]
                },
                { 
                  id: 'o:112', 
                  name: 'Subcollection 1-1-2'
                },
                { 
                  id: 'o:113', 
                  name: 'Subcollection 1-1-3'
                }
              ]
            },
            { 
              id: 'o:12', 
              name: 'Subcollection 1-2'
            },
            { 
              id: 'o:13', 
              name: 'Subcollection 1-3'
            },
          ]
        },
        {
          id: 'o:2',
          name: 'Collection 2',
          children: [
            { 
              id: 'o:21', 
              name: 'Subcollection 2-1'
            },
            { 
              id: 'o:22', 
              name: 'Subcollection 2-2'
            },
            { 
              id: 'o:23', 
              name: 'Subcollection 2-3'
            },
          ]
        },
        {
          id: 'o:3',
          name: 'Collection 3',
          children: [
            { 
              id: 'o:31', 
              name: 'Subcollection 3-1'
            },
            { 
              id: 'o:32', 
              name: 'Subcollection 3-2'
            },
            { 
              id: 'o:33', 
              name: 'Subcollection 3-3'
            },
          ]
        },
        {
          id: 'o:4',
          name: 'Collection 4',
          children: [
            { 
              id: 'o:41', 
              name: 'Subcollection 4-1'
            },
            { 
              id: 'o:42', 
              name: 'Subcollection 4-2'
            },
            { 
              id: 'o:43', 
              name: 'Subcollection 4-3'
            },
          ]
        },
        {
          id: 'o:5',
          name: 'Collection 5',
          children: [
            { 
              id: 'o:51', 
              name: 'Subcollection 5-1'
            },
            { 
              id: 'o:52', 
              name: 'Subcollection 5-2'
            },
            { 
              id: 'o:53', 
              name: 'Subcollection 5-3'
            },
          ]
        }
      ]
    }
  },
  methods: {
    getChildren: function () {
      return false
    }
  }

}
</script>
