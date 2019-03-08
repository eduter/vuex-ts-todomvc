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
  <P extends PayloadWithType<A>>(payloadWithType: P): Promise<any>;
  <K extends keyof A>(type: K, payload: Arg2<A[K]>): Promise<any>;
}

// prettier-ignore
type Arg2<F> = F extends (arg1: any) => any ? undefined
  : F extends (arg1: any, arg2: infer A, ...args: any[]) => any ? A
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
>(component: T, action: K): MappedAction<T, A, K> {
  /*
    Because `(param: T | undefined) => any` is not the same as `(param?: T) => any` in TypeScript
    (https://github.com/Microsoft/TypeScript/issues/12400), I had to use a workaround. Instead of letting TS compiler
    infer the type of the expression below, I declare the return type in the function's signature and disable type
    checking for the return statement.
    From the point of view of the consumer of this function, everything seems to work as intended.
   */
  // @ts-ignore
  return (payload: Arg2<A[K]>) => component.$store.dispatch(action, payload);
}

type MappedAction<
  T extends Vue<any, A, any>,
  A extends ActionMap,
  K extends keyof A
> = Arg2<A[K]> extends undefined
  ? () => Promise<any>
  : (payload: Arg2<A[K]>) => Promise<any>;

export { Vue, mapAction };
