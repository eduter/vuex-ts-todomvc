import { Store as OriginalStore } from "vuex";
import { Vue as OriginalVue } from "vue-property-decorator";

/**
 * Class for typesafe Vue components.
 *   R is the type of the root state
 *   A is the type of the actions object
 */
class Vue<R, A extends ActionMap> extends OriginalVue {
  $store!: Store<R, A>;
}

declare class Store<R, A extends ActionMap> extends OriginalStore<R> {
  dispatch: Dispatch<A>;
}

interface Dispatch<A extends ActionMap> {
  <K extends keyof A>(type: K, payload: Arg2<A[K]>): Promise<any>;
  <P extends Payload<A>>(payloadWithType: P): Promise<any>;
}

type Arg2<F> = F extends (arg1: any, arg2: infer A, ...args: any[]) => any
  ? A
  : never;

export interface Payload<A extends ActionMap> {
  type: [keyof A];
}

type ActionMap = {
  [key: string]: (...args: any[]) => any;
};

/**
 * Returns a Vuex action to map to a component's property.
 *
 * @param component
 * @param action
 */
function mapAction<
  T extends Vue<any, A>,
  A extends ActionMap,
  K extends keyof A
>(component: T, action: K): (a: Arg2<A[K]>) => Promise<any> {
  return (payload: Arg2<A[K]>) => component.$store.dispatch(action, payload);
}

export { Vue, mapAction };
