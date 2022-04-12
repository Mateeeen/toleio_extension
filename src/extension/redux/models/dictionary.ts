import dictFile from "../../dict.json"
import { Word } from "../../types"
import { RootModel } from "."
import { createModel } from "@rematch/core"

let words: Word[] = []

dictFile.signs.forEach(({ id, url, words: signs }) => {
  signs.forEach((word) => {
    words.push({ id, url, word })
  })
})

export type Dictionary = {
  words: Word[]
}

export const dictionary = createModel<RootModel>()({
  state: {
    words,
    wordToTranslate: undefined,
  } as Dictionary,
  reducers: {},
})
