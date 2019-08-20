<template lang="html">
  <v-container class="toolbar">
    <v-row  >
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <icon @click.native="setSort('title asc')" name="fontello-sort-name-up" :color="sortIsActive('title asc') ? '#1A74B0' : '#777777'" v-on="on"></icon>
          </template>
          <span>{{ $t('Title ascending')}}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <icon @click.native="setSort('title desc')" name="fontello-sort-name-down" :color="sortIsActive('title desc') ? '#1A74B0' : '#777777'" v-on="on"></icon>
          </template>
          <span>{{ $t('Title descending')}}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <icon @click.native="setSort('created asc')" name="fontello-sort-number-up" :color="sortIsActive('created asc') ? '#1A74B0' : '#777777'" v-on="on"></icon>
          </template>
          <span>{{ $t('Upload date ascending')}}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <icon @click.native="setSort('created desc')" name="fontello-sort-number-down" :color="sortIsActive('created desc') ? '#1A74B0' : '#777777'" v-on="on"></icon>
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
            <icon @click.native="linkdialog=true" name="material-content-link" v-on="on"></icon>
          </template>
          <span>{{ $t('Link to search results')}}</span>
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
    }
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
