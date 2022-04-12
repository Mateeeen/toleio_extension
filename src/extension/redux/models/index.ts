import { dictionary } from "./dictionary"
import { modal } from "./modal"
import { Models } from "@rematch/core"

export interface RootModel extends Models<RootModel> {
  dictionary: typeof dictionary
  modal: typeof modal
}

export const models: RootModel = { dictionary, modal }
