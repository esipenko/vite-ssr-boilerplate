import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { CounterState } from '@/types/store/counter';
import MainState from '@/types/store';

const state: CounterState = {
  counter: 0,
};

const mutations: MutationTree<CounterState> = {
  setCounter(state, counter) {
    state.counter = counter;
  },
};

const actions: ActionTree<CounterState, MainState> = {
  incrementCounter({ commit, state }) {
    commit('setCounter', state.counter + 1);
  },
};

const getters: GetterTree<CounterState, MainState> = {
  doubledCounter: ({ counter }) => counter * 2,
  counter: ({ counter }) => counter,
};

export const counterModule: Module<CounterState, MainState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
