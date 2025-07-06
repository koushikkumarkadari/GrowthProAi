import { create } from 'zustand';

const useStore = create((set) => ({
  formData: { name: '', location: '' },
  businessData: null,
  loading: false,
  setFormData: (data) => set({ formData: data }),
  setBusinessData: (data) => set({ businessData: data }),
  setLoading: (value) => set({ loading: value }),
}));

export default useStore;