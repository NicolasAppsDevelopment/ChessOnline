import { ref } from 'vue';

const visible = ref(false);
let resolvePromise: (value: string | null) => void;

// Function to show the modal and return a promise
export const useModal = (): {
  visible: typeof visible;
  show: () => Promise<string | null>;
  close: (result: (string | null)) => void
} => {
  const show = (): Promise<string | null> => {
    visible.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  const close = (result: string | null) => {
    visible.value = false;
    resolvePromise(result);
  };

  return { visible, show, close };
};
