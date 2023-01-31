import { GetterTree, Module, MutationTree } from 'vuex';
import { LoaderState } from '@/types/store/loader';
import MainState from '@/types/store';

const state: LoaderState = {
  isPageLoading: false,
};

const mutations: MutationTree<LoaderState> = {
  setIsPageLoading(state, payload) {
    state.isPageLoading = payload;
  },
};

const getters: GetterTree<LoaderState, MainState> = {
  isPageLoading: ({ isPageLoading }) => isPageLoading,
};

export const loaderModule: Module<LoaderState, MainState> = {
  namespaced: true,
  getters,
  mutations,
  state,
};
