import { Actions } from "@/store/actions";
import { Getters } from "@/store/getters";
import { RootState } from "@/store/types";
import { mapAction as genericMapAction, Vue } from "@/utils/vuex";

/**
 * Base class for all Vue components, to make their declaration less verbose.
 */
class BaseComponent extends Vue<RootState, Actions, Getters> {}

/**
 * Returns a Vuex action to map to a component's property.
 *
 * @param component
 * @param action
 */
function mapAction<A extends keyof Actions>(
  component: BaseComponent,
  action: A
) {
  return genericMapAction<BaseComponent, Actions, A>(component, action);
}

export { BaseComponent, mapAction };
