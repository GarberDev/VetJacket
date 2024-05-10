import {create} from 'zustand';
import {produce} from 'immer';

const useNewClientOnboardingWizardStore = create((set) => ({
  currentStep: 0,
  numSteps: 0,
  loading: false,
  uuid: null,  
  formData: {
    user_id: '',
    first_name: '',
    last_name: '',
    primary_cell_number: '',
    secondary_number: '',
    secondary_name: '',
    address: '',
    email: '',
    dl: '',
    human_birthday: '',
    pets_name: '',
    pets_species: '',
    pets_breed: '',
    pet_color: '',
    pet_age: 0,
    pet_gender: '',
    date_created: new Date().toISOString(),
  },
  setUUID: (uuid) => set(produce((state) => {
    state.uuid = uuid;
    state.formData.user_id = uuid; 
  })),
  updateFormData: (newData) => set(produce((state) => {
    state.formData = { ...state.formData, ...newData };
  })),
  next: () => set(produce((state) => {
    if (state.currentStep + 1 < state.numSteps) {
      state.currentStep++;
    }
  })),
  prev: () => set(produce((state) => {
    if (state.currentStep > 0) {
      state.currentStep--;
    }
  })),
  setNumSteps: (numSteps) => set(produce((state) => {
    state.numSteps = numSteps;
  })),

  setLoading: (loading) => set(produce((state) => {
    state.loading = loading;
  })),
  setStep: (index) => set(produce((state) => {
    state.currentStep = index;
  })),
}));

export default useNewClientOnboardingWizardStore;
