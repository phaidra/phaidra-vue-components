<template>
  <v-card >
    <v-card-title class="title font-weight-light grey white--text">{{ $t('Feedback') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="fn"
                :rules="nameRules"
                :label="$t('Firstname')"
                :value="firstname"
                required
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="ln"
                :rules="nameRules"
                :label="$t('Lastname')"
                required
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="mail"
                :rules="emailRules"
                :label="$t('E-mail')"
                required
                filled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="feedback"
                :rules="feedbackRules"
                :label="$t('Feedback')"
                required
                filled
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="primary" :loading="loading" :disabled="loading" @click="send()">{{ $t('Send') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'p-feedback',
  props: {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String
    }
  },
  data () {
    return {
      valid: false,
      fn: this.firstname,
      ln: this.lastname,
      nameRules: [
        v => !!v || this.$t('Name is required')
      ],
      mail: this.email,
      emailRules: [
        v => !!v || this.$t('E-mail is required'),
        v => /.+@.+/.test(v) || this.$t('E-mail must be valid'),
      ],
      feedback: '',
      feedbackRules: [
        v => !!v || this.$t('Name is required')
      ],
      loading: false
    }
  },
  methods: {
    send () {
      if(this.$refs.form.validate()) {
        alert('send')
      }
    }
  }
}
</script>

