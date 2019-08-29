<template lang="html">
  <v-container class="toolbar">
    <v-row>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="setSort('title asc')" :color="sortIsActive('title asc') ? 'primary' : 'grey darken-1'" v-on="on">
              <icon width="16px" height="16px" name="fontello-sort-name-up"></icon>
            </v-btn>
          </template>
          <span>{{ $t('Title ascending')}}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="setSort('title desc')" :color="sortIsActive('title desc') ? 'primary' : 'grey darken-1'" v-on="on">
              <icon width="16px" height="16px" name="fontello-sort-name-down"></icon>
            </v-btn>
          </template>
          <span>{{ $t('Title descending')}}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="setSort('created asc')" :color="sortIsActive('created asc') ? 'primary' : 'grey darken-1'" v-on="on">
              <icon width="16px" height="16px" name="fontello-sort-number-up"></icon>
            </v-btn>
          </template>
          <span>{{ $t('Upload date ascending')}}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="setSort('created desc')" :color="sortIsActive('created desc') ? 'primary' : 'grey darken-1'" v-on="on">
              <icon width="16px" height="16px" name="fontello-sort-number-down"></icon>
            </v-btn>
          </template>
          <span>{{ $t('Upload date descending')}}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-dialog v-model="linkdialog" max-width="800px">
          <v-card>
            <v-card-title>
              <h3 class="title font-weight-light primary--text">{{ $t('Link to search results') }}</h3>
            </v-card-title>
            <v-card-text>{{ link }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.stop="linkdialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="linkdialog=true" :color="'grey darken-1'" v-on="on">
              <icon width="18px" height="18px" name="material-content-link"></icon>
            </v-btn>
          </template>
          <span>{{ $t('Link to search results')}}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-checkbox hide-details class="shrink mr-2 mt-1" color="primary" @click.stop="toggleSelection()" v-model="selectioncheck" v-on="on"></v-checkbox>
          </template>
          <span>{{ $t('Select results')}}</span>
        </v-tooltip>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'search-toolbar',
  props: {
    setSort: {
      type: Function,
      required: true
    },
    sortIsActive: {
      type: Function,
      required: true
    },
    link: {
      type: String
    },
    toggleSelection: {
      type: Function,
      required: true
    },
    selectioncheck: Boolean
  },
  data () {
    return {
      linkdialog: false
    }
  }
}
</script>

<style scoped>
.container .toolbar {
  padding: 0px;
}
</style>
