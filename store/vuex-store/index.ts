import { createStore } from 'vuex';
import MainState from '../../types/store';
import { counterModule } from './modules/counter';
import { loaderModule } from './modules/loader';
import { userModule } from './modules/user';

export { createVuexStore };

function createVuexStore() {
  const store = createStore<MainState>({
    modules: {
      counter: counterModule,
      loader: loaderModule,
      user: userModule,
    },
  });

  return store;
}
