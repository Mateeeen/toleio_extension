import { getSelectorsBySite } from '../helpers'
import { Dispatch, RootState } from '../redux/store'
import { Word } from '../types'
import $ from 'jquery'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useTranslatable = () => {
  const lookup = useSelector((state: RootState) => state.dictionary.words)
  const [translated, setTranslated] = useState(false)
  const dispatch = useDispatch<Dispatch>()
  const translatableClassName = "toleio-translatable"
  const translatableTranslationId = "toleio-translation-id"
  const translatableTranslationUrl = "toleio-translation-url"
  const translatableTranslationWord = "toleio-translation-word"

  useEffect(() => {
    const elementsToSearch = getSelectorsBySite(window.location.hostname)

    // const elementsToSearch = [
    //   "h1",
    //   "h2",
    //   "h3",
    //   "h4",
    //   "h5",
    //   "h6",
    //   "p",
    //   "li",
    //   "div",
    // ]

    $(elementsToSearch.join())
      .contents()
      .filter((_, el) => el.nodeType === 3)
      .each((_, el) => {
        let text = $(el).text()
        text = text
          .split(" ")
          .map((textWord) => {
            const wordFound: Word | undefined = lookup.find(
              ({ word }) => word.toLowerCase() === textWord.toLowerCase()
            )
            if (wordFound)
              textWord = `<span class="${translatableClassName}" ${translatableTranslationId}="${
                wordFound.id
              }" ${translatableTranslationUrl}="${
                wordFound.url
              }" ${translatableTranslationWord}="${textWord.toLowerCase()}">${textWord}</span>`
            return textWord
          })
          .join(" ")
        $(el).replaceWith(text)
      })
    setTranslated(true)
  }, [])

  useEffect(() => {
    if (!translated) return
    const handleClickTranslatable = (word: Word) => {
      dispatch.modal.openMainView()
      dispatch.modal.setSearchWord(word.word)
      dispatch.modal.setFoundWord(word)
    }
    const clickableEls = document.getElementsByClassName(translatableClassName)
    Array.from(clickableEls).forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault()
        const target = ev.target as HTMLElement
        if (target) {
          const id = target.getAttribute(translatableTranslationId)
          const url = target.getAttribute(translatableTranslationUrl)
          const word = target.getAttribute(translatableTranslationWord)
          id && url && word && handleClickTranslatable({ id, url, word })
        }
      })
    })
  }, [translated, dispatch])
}
