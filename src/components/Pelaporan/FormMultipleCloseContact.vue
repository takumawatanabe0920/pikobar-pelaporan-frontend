<template>
  <v-container fluid>
    <div v-for="(data, index) in formPasien.close_contact_patient" :key="index">
      <v-container fluid>
        <v-card outlined>
          <v-row align="center" justify="space-between">
            <v-col cols="12" md="6" sm="12">
              <div class="title ml-4">
                {{ `${$t('label.form_contact_data_title')} ${index+1}` }}
              </div>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-btn class="ma-2 float-right" tile outlined small color="red" @click="handleDeleteFormCloseContact(index)">
                <v-icon left>mdi-delete</v-icon> {{ $t('label.delete') }}
              </v-btn>
            </v-col>
          </v-row>
          <hr class="table-divider">
          <v-container fluid>
            <v-form ref="form" lazy-validation>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label class="required">{{ $t('label.name') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      v-model="data.name"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.phone_number') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }" rules="isPhoneNumber">
                    <v-text-field v-model="data.phone_number" :error-messages="errors" placeholder="08xxxxxxxxx" solo-inverted type="number" />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.gender') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-radio-group v-model="data.gender" row>
                      <v-radio :label="$t('label.male')" value="L" />
                      <v-radio :label="$t('label.female')" value="P" />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.age') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <v-row align="center" class="ma-0">
                    <v-col cols="12" sm="6" class="pa-1">
                      <ValidationProvider>
                        <v-text-field v-model="data.age" type="number" min="0" max="120" solo-inverted oninput="if(Number(this.value) > Number(this.max)) this.value = this.max" class="input-append-btn">
                          <template v-slot:append>
                            <v-btn depressed tile min-width="20">
                              {{ $t('label.year') }}
                            </v-btn>
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" class="pa-1">
                      <ValidationProvider>
                        <v-text-field v-model="data.month" type="number" min="0" max="11" solo-inverted oninput="if(Number(this.value) > Number(this.max)) this.value = this.max" class="input-append-btn">
                          <template v-slot:append>
                            <v-btn depressed tile min-width="20">
                              {{ $t('label.month') }}
                            </v-btn>
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row align="start" class="pb-6">
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                  :class="{'py-0': $vuetify.breakpoint. smAndDown}"
                >
                  {{ $t('label.same_house_as_patient') }}
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                  sm="12"
                  :class="{'py-0': $vuetify.breakpoint. smAndDown}"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="isHtml"
                  >
                    <v-checkbox
                      v-model="data.is_patient_address_same"
                      class="mt-0 pt-0"
                      :error-messages="errors"
                      @change="handleChangeSameHouse($event, index)"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label class="required">{{ $t('label.address_home') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <address-region
                    :district-code="data.address_district_code"
                    :district-name="data.address_district_name"
                    :code-district.sync="data.address_district_code"
                    :name-district.sync="data.address_district_name"
                    :sub-district-code="data.address_subdistrict_code"
                    :sub-district-name="data.address_subdistrict_name"
                    :code-sub-district.sync="data.address_subdistrict_code"
                    :name-sub-district.sync="data.address_subdistrict_name"
                    :village-code="data.address_village_code"
                    :village-name="data.address_village_name"
                    :code-village.sync="data.address_village_code"
                    :name-village.sync="data.address_village_name"
                    :disabled-address="false"
                    :required-address="true"
                  />
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <v-row align="center" class="ma-0">
                    <v-col cols="12" sm="6" class="pa-1">
                      <ValidationProvider>
                        <v-text-field v-model="data.address_rt" class="input-append-btn" type="number" min="0" max="120" solo-inverted>
                          <template v-slot:append>
                            <v-btn depressed tile min-width="20">
                              {{ $t('label.rt') }}
                            </v-btn>
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" class="pa-1">
                      <ValidationProvider>
                        <v-text-field v-model="data.address_rw" class="input-append-btn" type="number" min="0" max="120" solo-inverted>
                          <template v-slot:append>
                            <v-btn depressed tile min-width="20">
                              {{ $t('label.rw') }}
                            </v-btn>
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-textarea v-model="data.address_street" solo :placeholder="$t('label.complete_address')" />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.relationship_with_primary_cases') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field v-model="data.relationship" type="text" solo-inverted />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.activities_carried_out') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field v-model="data.activity" type="text" solo-inverted />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.contact_date') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :label="$t('label.contact_date')"
                      :date-value="data.contact_date"
                      :value-date.sync="data.contact_date"
                      @changeDate="handleChangeContactDate($event, index)"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-container>
    </div>
    <v-container fluid>
      <v-card outlined class="text-center" color="#F5F5F5" @click="handleAddFormCloseContact">
        <v-btn class="ma-2 mt-5" outlined small fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <p>{{ $t('label.add_contact_data') }}</p>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'FormMultipleCloseContact',
  components: {
    ValidationProvider
  },
  props: {
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isAddCloseContactForm: false,
      totalCloseContact: 0,
      idCloseContactForm: 0,
      isValid: false,
      showAlert: false,
      formatDate: 'YYYY/MM/DD'
    }
  },
  mounted() {
    this.handleAddFormCloseContact()
  },
  methods: {
    handleAddFormCloseContact() {
      this.isValid = true
      this.showAlert = false
      this.idCloseContactForm = this.idCloseContactForm + 1
      this.formPasien.close_contact_patient.push({
        id: this.idCloseContactForm,
        name: '',
        phone_number: '',
        gender: '',
        age: '',
        month: '',
        address: '',
        related: '',
        activity: '',
        is_patient_address_same: false,
        address_district_code: '',
        address_district_name: '',
        address_subdistrict_code: '',
        address_subdistrict_name: '',
        address_village_code: '',
        address_village_name: '',
        address_rt: '',
        address_rw: '',
        address_street: '',
        contact_date: ''
      })
    },
    handleDeleteFormCloseContact(index) {
      this.formPasien.close_contact_patient.splice(index, 1)
      this.isValid = this.formPasien.close_contact_patient.length !== 0
    },
    handleChangeContactDate(value, index) {
      this.formPasien.close_contact_patient[index].contact_date = value
    },
    handleChangeSameHouse(value, index) {
      if (value) {
        this.formPasien.close_contact_patient[index].address_district_code = this.formPasien.address_district_code
        this.formPasien.close_contact_patient[index].address_district_name = this.formPasien.address_district_name
        this.formPasien.close_contact_patient[index].address_subdistrict_code = this.formPasien.address_subdistrict_code
        this.formPasien.close_contact_patient[index].address_subdistrict_name = this.formPasien.address_subdistrict_name
        this.formPasien.close_contact_patient[index].address_village_code = this.formPasien.address_village_code
        this.formPasien.close_contact_patient[index].address_village_name = this.formPasien.address_village_name
        this.formPasien.close_contact_patient[index].address_rt = this.formPasien.rt
        this.formPasien.close_contact_patient[index].address_rw = this.formPasien.rw
        this.formPasien.close_contact_patient[index].address_street = this.formPasien.address_street
      } else {
        this.formPasien.close_contact_patient[index].address_district_code = ''
        this.formPasien.close_contact_patient[index].address_district_name = ''
        this.formPasien.close_contact_patient[index].address_subdistrict_code = ''
        this.formPasien.close_contact_patient[index].address_subdistrict_name = ''
        this.formPasien.close_contact_patient[index].address_village_code = ''
        this.formPasien.close_contact_patient[index].address_village_name = ''
        this.formPasien.close_contact_patient[index].address_rt = ''
        this.formPasien.close_contact_patient[index].address_rw = ''
        this.formPasien.close_contact_patient[index].address_street = ''
      }
    }
  }
}
</script>
