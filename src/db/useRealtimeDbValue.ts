import { getDatabase, onDisconnect, onValue, ref, update } from "firebase/database";
import { reactive, toRefs } from "vue";
import { app } from "./firebase";

const rtDb = getDatabase(app);

export default <T>(path: string) => {
  const state: {
    loading: boolean;
    exists: boolean;
    val?: T;
  } = reactive({
    loading: true,
    exists: false,
    val: undefined,
  });

  const r = ref(rtDb, path);

  onValue(r, (s) => {
    const val = s.val();

    state.val = val;
    state.exists = Boolean(val);
    state.loading = false;
  });

  async function set(newVal: T | object) {
    await update(ref(rtDb), {
      [path]: newVal,
    });
  }

  async function setOnDisconnect(newVal: unknown) {
    onDisconnect(ref(rtDb, path)).set(newVal);
  }

  return {
    ...toRefs(state),
    set,
    setOnDisconnect,
  }
}
