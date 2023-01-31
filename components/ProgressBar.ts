// Прогресс бар из nuxt
import { computed, defineComponent, h, onBeforeUnmount, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProgressBar',
  props: {
    throttle: {
      type: Number,
      default: 200,
    },
    duration: {
      type: Number,
      default: 2000,
    },
    height: {
      type: Number,
      default: 3,
    },
    color: {
      type: [String, Boolean],
      default:
        'repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)',
    },
  },
  setup(props, { slots }) {
    const indicator = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
    });

    const store = useStore();
    const isPageLoading = computed(() => {
      return store.getters['loader/isPageLoading'];
    });

    watch(isPageLoading, () => {
      if (isPageLoading.value) {
        indicator.start();
      } else {
        indicator.finish();
      }
    });

    // Hook to app lifecycle
    // TODO: Use unified loading API
    onBeforeUnmount(() => indicator.clear);

    return () =>
      h(
        'div',
        {
          class: 'nuxt-loading-indicator',
          style: {
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            pointerEvents: 'none',
            width: `${indicator.progress.value}%`,
            height: `${props.height}px`,
            opacity: indicator.isLoading.value ? 1 : 0,
            background: props.color || undefined,
            backgroundSize: `${(100 / indicator.progress.value) * 100}% auto`,
            transition: 'width 0.1s, height 0.4s, opacity 0.4s',
            zIndex: 999999,
          },
        },
        slots
      );
  },
});

function useLoadingIndicator(opts: { duration: number; throttle: number }) {
  const progress = ref(0);
  const isLoading = ref(false);
  const step = computed(() => 10000 / opts.duration);

  let _timer: NodeJS.Timer | null = null;
  let _throttle: NodeJS.Timeout | null = null;

  function start() {
    clear();
    progress.value = 0;
    if (opts.throttle) {
      _throttle = setTimeout(() => {
        isLoading.value = true;
        _startTimer();
      }, opts.throttle);
    } else {
      isLoading.value = true;
      _startTimer();
    }
  }
  function finish() {
    progress.value = 100;
    _hide();
  }

  function clear() {
    _timer !== null && clearInterval(_timer);
    _throttle !== null && clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }

  function _increase(num: number) {
    progress.value = Math.min(100, progress.value + num);
  }

  function _hide() {
    clear();
    setTimeout(() => {
      isLoading.value = false;
      setTimeout(() => {
        progress.value = 0;
      }, 400);
    });
  }

  function _startTimer() {
    _timer = setInterval(() => {
      _increase(step.value);
    }, 100);
  }

  return {
    progress,
    isLoading,
    start,
    finish,
    clear,
  };
}
