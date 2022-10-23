import { defineStore } from 'pinia';
import type { ActionState } from '../types/types';
import apiClient from '../utils/apiClient';
import { useNotificationStore } from './notifications';

interface Staff {
  id: string;
  name: string;
  createdAt: string;
}

interface State {
  staffs: Staff[];
  getListLoading: boolean;
  getLoading: boolean;
  insertState: ActionState;
  updateState: ActionState;
}

export const useStaffStore = defineStore('staffs', {
  state: (): State => ({
    staffs: [],
    getListLoading: false,
    getLoading: false,
    insertState: {
      loading: false,
      error: null
    },
    updateState: {
      loading: false,
      error: null
    }
  }),
  getters: {
    staffById: (state) => (id: string) => state.staffs.find((s) => s.id === id),
    insertLoading: (state) => state.insertState.loading,
    insertError: (state) => state.insertState.error
  },
  actions: {
    async getList(params?: any) {
      try {
        this.$patch({
          staffs: [],
          getListLoading: true
        });

        // Get staff list
        const { data: staffs } = await apiClient.get<Staff[]>('/staffs', {
          params
        });

        this.$patch({
          staffs,
          getListLoading: false
        });
      } catch (error: any) {
        const { enqueue } = useNotificationStore();

        enqueue({
          message: 'Failed to load staff list.',
          variant: 'danger'
        });
        this.getListLoading = false;
      }
    },
    async get(id: string) {
      try {
        this.getLoading = true;

        // Get staff
        const { data: staff } = await apiClient.get<Staff>(`/staffs/${id}`);

        this.$patch((state) => {
          const index = state.staffs.findIndex((s) => s.id === staff.id);

          state.staffs.splice(index, 1, staff);
          state.getLoading = false;
        });
      } catch (error: any) {
        const { enqueue } = useNotificationStore();

        enqueue({
          message: 'Failed to load staff.',
          variant: 'danger'
        });
        this.getLoading = false;
      }
    },
    async insert(data: Pick<Staff, 'name'>) {
      const { enqueue } = useNotificationStore();

      try {
        this.$patch({
          insertState: {
            loading: true,
            error: null
          }
        });

        // Insert staff
        const { data: staff } = await apiClient.post<Staff>('staffs', data);

        this.$patch((state) => {
          state.staffs.push(staff);
          state.insertState.loading = false;
        });

        enqueue({
          message: 'Added staff successfully.',
          variant: 'success'
        });

        return staff.id;
      } catch (error: any) {
        this.$patch({
          insertState: {
            loading: false,
            error
          }
        });

        enqueue({
          message: 'Failed to add staff.',
          variant: 'danger'
        });
      }
    }
  }
});
