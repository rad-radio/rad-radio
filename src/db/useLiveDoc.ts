import { reactive, Ref, ref, toRefs } from 'vue';
import 'firebase/firestore';
import {
  doc,
  DocumentReference,
  onSnapshot,
  UpdateData,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export default <T>(path: string, id: string) => {
  const state: {
    loading: boolean;
    exists: boolean;
    doc?: T;
    id?: string;
  } = reactive({
    loading: true,
    exists: false,
    doc: undefined,
    id: undefined,
  });

  const changeListener: Ref<((doc: T, prevDoc?: T) => void) | undefined> = ref();

  onSnapshot(doc(db, path, id), (doc) => {
    state.loading = false;
    state.exists = doc.exists();

    if (doc.exists()) {
      changeListener.value?.(doc.data() as T, state.doc);
      state.doc = doc.data() as T;
      state.id = doc.id;
    } else {
      state.doc = undefined;
      state.id = undefined;
    }
  });

  async function update(data: UpdateData<T>) {
    if (!state.exists || !state.id) {
      return;
    }

    const result = await updateDoc<T>(
      doc(db, path, id) as DocumentReference<T>,
      data
    );

    return result;
  }

  function registerListener(listener: (doc: T, prevDoc?: T) => void) {
    changeListener.value = listener;
  }

  return {
    ...toRefs(state),
    update,
    registerListener,
  };
};
