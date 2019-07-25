<template lang="html">
  <v-container class="toolbar" grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-tooltip bottom>
          <icon @click.native="setSort('title asc')" name="fontello-sort-name-up" :color="sortIsActive('title asc') ? '#1A74B0' : '#777777'" slot="activator"></icon>
          <span>{{ $t('Title ascending')}}</span>
        </v-tooltip>
      </v-flex>
      <v-flex>
        <v-tooltip bottom>
          <icon @click.native="setSort('title desc')" name="fontello-sort-name-down" :color="sortIsActive('title desc') ? '#1A74B0' : '#777777'" slot="activator"></icon>
          <span>{{ $t('Title descending')}}</span>
        </v-tooltip>
      </v-flex>
      <v-flex>
        <v-tooltip bottom>
          <icon @click.native="setSort('created asc')" name="fontello-sort-number-up" :color="sortIsActive('created asc') ? '#1A74B0' : '#777777'" slot="activator"></icon>
          <span>{{ $t('Upload date ascending')}}</span>
        </v-tooltip>
      </v-flex>
      <v-flex>
        <v-tooltip bottom>
          <icon @click.native="setSort('created desc')" name="fontello-sort-number-down" :color="sortIsActive('created desc') ? '#1A74B0' : '#777777'" slot="activator"></icon>
          <span>{{ $t('Upload date descending')}}</span>
        </v-tooltip>
      </v-flex>
      <v-flex>
        <v-dialog v-model="linkdialog" max-width="800px">
          <v-card>
            <v-card-title>
              <h3 class="display-2">{{ $t('Link to search results') }}</h3>
            </v-card-title>
            <v-card-text>{{ link }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.stop="linkdialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-tooltip bottom>
          <icon @click.native="linkdialog=true" name="material-content-link" slot="activator"></icon>
          <span>{{ $t('Link to search results')}}</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default  {
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
  data() {
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
