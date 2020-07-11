import actions from './actions'
import getters from './getters'
const getDefaultState = () => {
  return {
    formCloseContact: {
      interviewer_name: '',
      contact_tracing_date: '',
      nik: '',
      name: '',
      phone_number: '',
      birth_date: '',
      age: '',
      month: '',
      gender: '',
      address_province_code: '',
      address_province_name: '',
      address_district_code: '',
      address_district_name: '',
      address_subdistrict_code: '',
      address_subdistrict_name: '',
      address_village_code: '',
      address_village_name: '',
      address_rw: '',
      address_rt: '',
      address_street: '',
      relationship: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      emergency_contact_relationship: '',
      travel_is_went_abroad: '',
      travel_visited_country: '',
      travel_country_depart_date: '',
      travel_country_return_date: '',
      travel_is_went_other_city: '',
      travel_visited_city: '',
      travel_city_depart_date: '',
      travel_city_return_date: '',
      travel_occupation: '',
      travel_address_office: '',
      travel_transportations: [],
      contact_type: '',
      contact_place: '',
      contact_date: '',
      contact_durations: '',
      home_contact_date: '',
      home_contact_days: '',
      home_contact_activities: [],
      officer_is_contact: true,
      officer_protection_tools: [],
      activity: '',
      latest_history: {
        symptoms: [],
        symptoms_date: '',
        symptoms_other: '',
        diseases: [],
        diseases_other: '',
        vaccination_influenza_vaccine: false,
        vaccination_influenza_vaccine_date: '',
        vaccination_pvc_vaccine: false,
        vaccination_pvc_vaccine_date: '',
        test_nasal_swab: false,
        test_nasal_swab_date: '',
        test_nasal_swab_result: '',
        test_throat_swab: false,
        test_throat_swab_date: '',
        test_throat_swab_result: '',
        test_nasopharyngeal_swab: false,
        test_nasopharyngeal_swab_date: '',
        test_nasopharyngeal_swab_result: '',
        test_orofaringeal_swab: false,
        test_orofaringeal_swab_date: '',
        test_orofaringeal_swab_result: '',
        test_serum: false
      }
    }
  }
}
const state = getDefaultState()

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
