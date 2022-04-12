import { RootModel } from "."
import { createModel } from "@rematch/core"
import { Word } from "../../types"

export type Modal = {
  foundWord?: Word
  suggestedWords?: Word[]
  isPlaying: boolean
  mainViewOpen: boolean
  recentSearches: string[]
  recentSearchesViewOpen: boolean
  searchWord?: string
  slow: boolean
  videoOpen: boolean
}

export const modal = createModel<RootModel>()({
  state: {
    foundWord: undefined,
    suggestedWords: undefined,
    isPlaying: false,
    mainViewOpen: false,
    recentSearches: [],
    recentSearchesViewOpen: false,
    searchWord: undefined,
    slow: false,
    videoOpen: false,
  } as Modal,
  reducers: {
    setSearchWord: (state, payload: string) => {
      const recentSearchesCount = 5
      state.searchWord = payload
      if (!state.recentSearches.includes(payload))
        state.recentSearches.unshift(payload)
      if (state.recentSearches.length > recentSearchesCount)
        state.recentSearches.splice(recentSearchesCount)
      return state
    },
    setSuggestedWords: (state, payload: Word[]) => {
      state.suggestedWords = payload
      return state
    },
    clearSuggestedWords: (state) => {
      state.suggestedWords = undefined
      return state
    },
    clearSearchWord: (state) => {
      state.searchWord = undefined
      return state
    },
    openMainView: (state) => {
      state.mainViewOpen = true
      return state
    },
    closeMainView: (state) => {
      state.mainViewOpen = false
      return state
    },
    toggleMainView: (state) => {
      state.mainViewOpen = !!state.mainViewOpen
      return state
    },
    openVideo: (state) => {
      state.videoOpen = true
      return state
    },
    toggleRecentSearches: (state) => {
      state.recentSearchesViewOpen = !state.recentSearchesViewOpen
      return state
    },
    closeRecentSearches: (state) => {
      state.recentSearchesViewOpen = false
      return state
    },
    toggleSlow: (state) => {
      state.slow = !state.slow
      return state
    },
    setSlow: (state, payload: boolean) => {
      state.slow = payload
      return state
    },
    setIsPlaying: (state, payload: boolean) => {
      state.isPlaying = payload
      return state
    },
    setFoundWord: (state, payload: Word) => {
      state.foundWord = payload
      return state
    },
    clearFoundWord: (state) => {
      state.foundWord = undefined
      return state
    },
  },
})
