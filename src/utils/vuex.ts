import { ActionContext, CommitOptions, Store as OriginalStore } from "vuex";
import { Vue as OriginalVue } from "vue-property-decorator";

/**
 * Class for typesafe Vue components.
 *   R is the type of the root state
 *   A is the type of the actions object
 */
class Vue<
  R,
  A extends ActionMap,
  G extends GetterDefinitions
> extends OriginalVue {
  $store!: Store<R, A, G>;
}

declare class Store<
  R,
  A extends ActionMap,
  G extends GetterDefinitions
> extends OriginalStore<R> {
  dispatch: Dispatch<A>;
  getters: GetterTypes<G>;
}

interface Dispatch<A extends ActionMap> {
  <K extends keyof A>(type: K, payload: Arg2<A[K]>): Promise<any>;
  <P extends PayloadWithType<A>>(payloadWithType: P): Promise<any>;
}

type Arg2<F> = F extends (arg1: any, arg2: infer A, ...args: any[]) => any
  ? A
  : never;

export interface PayloadWithType<M extends MethodMap> {
  type: [keyof M];
}

type MethodMap = {
  [key: string]: (...args: any[]) => any;
};

type ActionMap = MethodMap;

type MutationMap = MethodMap;

type GetterDefinitions = { [key: string]: (...args: any) => any };

export type GetterTypes<T extends GetterDefinitions> = {
  [P in keyof T]: ReturnType<T[P]>
};

export interface Context<R, M extends MutationMap> extends ActionContext<R, R> {
  commit: Commit<M>;
}

export interface Commit<M extends MutationMap> {
  <P extends PayloadWithType<M>>(
    payloadWithType: P,
    options?: CommitOptions
  ): void;
  <K extends keyof M>(
    type: K,
    payload?: Arg2<M[K]>,
    options?: CommitOptions
  ): void;
}

/**
 * Returns a Vuex action to map to a component's property.
 *
 * @param component
 * @param action
 */
function mapAction<
  T extends Vue<any, A, any>,
  A extends ActionMap,
  K extends keyof A
>(component: T, action: K): (a: Arg2<A[K]>) => Promise<any> {
  return (payload: Arg2<A[K]>) => component.$store.dispatch(action, payload);
}

export { Vue, mapAction };
