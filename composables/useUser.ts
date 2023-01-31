import { UserState } from '@/types/store/user';
import { ComputedRef, computed } from 'vue';
import { useStore } from 'vuex';

interface UseUser {
  name: ComputedRef<number>;
  surname: ComputedRef<number>;
  setUser: (user: UserState) => void;
}

export default function (): UseUser {
  const store = useStore();

  const name = computed(() => {
    return store.getters['user/name'];
  });

  const surname = computed(() => {
    return store.getters['user/surname'];
  });

  const setUser = ({ name, surname }: UserState) => {
    store.commit('user/setName', name);
    store.commit('user/setSurname', surname);
  };

  return {
    name,
    surname,
    setUser,
  };
}
