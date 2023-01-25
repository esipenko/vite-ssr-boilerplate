import { ComputedRef, computed } from "vue";
import { useStore } from "vuex";

interface UseCounter {
    doubledCounter: ComputedRef<number>;
    counter:  ComputedRef<number>;
    incrementCounter: () => void;
}

export default function(): UseCounter {
    const store = useStore();

    const counter = computed(() => {
        return store.getters['counter/counter'];
      })
      
    const doubledCounter = computed(() => {
      return store.getters['counter/doubledCounter'];
    })
    
    const incrementCounter = () => {
      store.dispatch('counter/incrementCounter');
    }

    return {
        counter, doubledCounter, incrementCounter
    }
}