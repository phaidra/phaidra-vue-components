<template>

  <v-card>
    <v-card-title>
      {{ $t('Manage bookmark lists') }}
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="search"
        :label="$t('Search...')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="lists"
      :search="search"
    >
      <template v-slot:item.name="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ item.name }}</span>
          </template>
          <span>{{ item.id }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text color="primary" @click="">{{ $t('Select') }}</v-btn>
      </template>
    </v-data-table>
  </v-card>

</template>

<script>
export default {
  name: 'p-lists',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Actions', align: 'right', value: 'actions', sortable: false }
      ],
      templates: [],
      deletetempconfirm: false,
      loading: false
    }
  }
}
</script>
