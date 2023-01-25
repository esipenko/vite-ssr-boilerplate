import { createStore } from 'vuex'
import MainState from '../../types/store'
import { counterModule } from './modules/counter'

export { createVuexStore }

function createVuexStore() {
  const store = createStore<MainState>({
    modules: {
        counter: counterModule,
    }
  })

  return store
}
