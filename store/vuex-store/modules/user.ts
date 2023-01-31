import { GetterTree, Module, MutationTree } from 'vuex';
import { UserState } from '@/types/store/user';
import MainState from '@/types/store';

const state: UserState = {
  name: '',
  surname: '',
};

const mutations: MutationTree<UserState> = {
  setName(state, name) {
    state.name = name;
  },
  setSurname(state, surname) {
    state.surname = surname;
  },
};

const getters: GetterTree<UserState, MainState> = {
  name: ({ name }) => name,
  surname: ({ surname }) => surname,
};

export const userModule: Module<UserState, MainState> = {
  namespaced: true,
  getters,
  mutations,
  state,
};
