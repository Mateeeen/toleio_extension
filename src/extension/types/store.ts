import { Word } from '.'

export type Store = {
  dictionary: Word[]
  wordToTranslate?: Word
  ui: Ui
}

export type Ui = {
  dictionaryWindowOpen: boolean
}
