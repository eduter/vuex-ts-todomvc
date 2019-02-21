import { STORAGE_KEY } from "./mutations";
import { MutationPayload, Store } from "vuex";
import { RootState } from "@/store/types";

const localStoragePlugin = (store: Store<RootState>) => {
  store.subscribe((mutation: MutationPayload, state: RootState) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  });
};

export default [localStoragePlugin];
