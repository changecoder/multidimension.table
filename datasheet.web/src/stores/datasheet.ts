import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStore = defineStore("datasheet", () => {
  const snapshot = ref(null);

  return {
    snapshot,
  };
});
