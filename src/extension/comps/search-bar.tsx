import btnClearDefault from '../assets/btns/Btn_clear_default.png'
import btnClearActive from '../assets/btns/Btn_clear_hover.png'
import btnHistoryActive from '../assets/btns/Btn_history_active.png'
import btnHistoryDefault from '../assets/btns/Btn_history_default.png'
import btnSearchActive from '../assets/btns/Btn_search_active.png'
import btnSearchDefault from '../assets/btns/Btn_search_default.png'
import iconHistoryItem from '../assets/icons/time-history.png'
import { Dispatch, RootState } from '../redux/store'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  display: flex !important;
  position: relative !important;
  justify-content: space-evenly !important;
  align-items: center !important;
  background: white !important;
  border-radius: 8px !important;
  border: 4px solid #fee6d4 !important;
  margin: 10px 0 0px 0 !important;
  padding: 3px 10px !important;
  box-shadow: 0px 4px 6px #ffc59c !important;
`

const ListHeader = styled.h3`
  color: #35b9dd !important;
  font-weight: lighter !important;
  margin: 16px 15px 6px 18px;
`

const RecentSearches = styled.ul<{ open: boolean }>`
  z-index: 100 !important;
  position: fixed !important;
  width: 460px !important;
  margin: 8px 0 0 0 !important;
  padding: 0 !important;
  display: ${({ open }) => (open ? "flex" : "none")} !important;
  flex-flow: column nowrap !important;
  background-color: white !important;
  box-shadow: 0px 3px 15px #e7e7e7 !important;
  border: none !important;
  border-radius: 15px !important;
`

const SearchSuggest = styled.ul<{ open: boolean }>`
  z-index: 100 !important;
  position: fixed !important;
  width: 460px !important;
  margin: 8px 0 0 0 !important;
  padding: 0 !important;
  display: ${({ open }) => (open ? "flex" : "none")} !important;
  flex-flow: column nowrap !important;
  background-color: white !important;
  box-shadow: 0px 3px 15px #e7e7e7 !important;
  border: none !important;
  border-radius: 15px !important;
`

const SuggestItem = styled.li<{
  onClick?: (e?: React.MouseEvent) => void
  key: any
}>`
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  list-style: none !important;
  font-size: 1rem !important;
  font-size: 16px !important;
  color: black !important;
  padding: 12px 20px !important;
  border-bottom: 1px solid #e7e7e7 !important;
  :last-of-type {
    border-bottom: none !important;
  }
`

const RecentSearchesItem = styled.li<{
  onClick?: (e?: React.MouseEvent) => void
  key: any
}>`
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  list-style: none !important;
  font-size: 16px !important;
  color: black !important;
  padding: 12px 10px !important;
  border-bottom: 1px solid #e7e7e7 !important;
  :last-of-type {
    border-bottom: none !important;
  }
`

const SearchIcon = styled.div<{ active: boolean }>`
  background: ${({ active }) =>
      active ? `url(${btnSearchActive})` : `url(${btnSearchDefault})`}
    no-repeat;
  background-size: 32px !important;
  width: 32px !important;
  height: 32px !important;
  :hover {
    background: url(${btnSearchActive}) !important;
    background-size: 32px !important;
    cursor: pointer !important;
  }
`

const HistoryIcon = styled.div<{ open: boolean }>`
  background: ${({ open }) =>
    open ? `url(${btnHistoryActive})` : `url(${btnHistoryDefault})`};
  background-repeat: no-repeat !important;
  background-size: 32px !important;
  width: 32px !important;
  height: 32px !important;
  :hover {
    background: url(${btnHistoryActive});
    background-size: 32px !important;
    cursor: pointer !important;
  }
`

const HistoryItemIcon = styled.div`
  background: url(${iconHistoryItem}) no-repeat center center !important;
  background-size: 15px !important;
  width: 15px !important;
  height: 15px !important;
  margin: 0 12px 0 10px !important;
`

const ClearIcon = styled.div`
  background: url(${btnClearDefault}) no-repeat !important;
  background-size: 32px !important;
  width: 32px !important;
  height: 32px !important;
  margin-left: 10px !important;
  :hover {
    background: url(${btnClearActive});
    background-size: 32px !important;
    cursor: pointer !important;
  }
`

const SearchBar: React.FC = () => {
  const dictionary = useSelector((state: RootState) => state.dictionary.words)
  const searchWord = useSelector((state: RootState) => state.modal.searchWord)
  const foundWord = useSelector((state: RootState) => state.modal.foundWord)
  const recentSearches = useSelector(
    (state: RootState) => state.modal.recentSearches
  )
  const recentSearchesViewOpen = useSelector(
    (state: RootState) => state.modal.recentSearchesViewOpen
  )
  const suggestedWords = useSelector(
    (state: RootState) => state.modal.suggestedWords
  )
  const dispatch = useDispatch<Dispatch>()

  const handleKeyUp = (
    e: React.KeyboardEvent & { target: { value: string } }
  ) => {
    let { value } = e.target
    value = value.trim()
    if (e.key === "Enter" || e.target.value.length < 1) {
      dispatch.modal.clearSuggestedWords()
    } else {
      const typedWord = e.target.value
      const foundWords = dictionary.filter((word) =>
        word.word.includes(typedWord)
      )
      if (foundWords.length)
        dispatch.modal.setSuggestedWords(foundWords.slice(0, 5))
    }
  }

  const handleBlur = (
    e: React.KeyboardEvent & { target: { value: string } }
  ) => {
    setTimeout(() => {
      dispatch.modal.clearSuggestedWords()
    }, 100)
  }

  return (
    <>
      <Formik
        initialValues={{ searchWord }}
        onSubmit={(values, { setSubmitting }) => {
          if (values.searchWord) {
            const hasFoundWord = dictionary.find(
              (dictWord) => dictWord.word === values.searchWord
            )
            if (hasFoundWord) {
              dispatch.modal.setSearchWord(values.searchWord)
              dispatch.modal.setFoundWord(hasFoundWord)
            }
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          // handleBlur,
          handleSubmit,
          handleChange,
          isSubmitting,
          resetForm,
          setValues,
          submitForm,
        }) => (
          <Form>
            {/* {errors.email && touched.email && errors.email} */}
            <Container>
              <SearchIcon active={!!foundWord} />
              <Field
                type="input"
                autoComplete="off"
                name="searchWord"
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
                placeholder="Start typing to search"
                style={{
                  flex: 1,
                  background: "white 0px center",
                  border: "1px #bda2a2",
                  boxShadow: "none",
                  boxSizing: "content-box",
                  color: "inherit",
                  fontSize: "inherit",
                  opacity: 1,
                  outline: "0px",
                  padding: "12px",
                  textAlign: "center",
                  visibility: "visible",
                }}
              />
              <HistoryIcon
                open={recentSearchesViewOpen}
                onClick={dispatch.modal.toggleRecentSearches}
              />
              <ClearIcon
                onClick={() => {
                  resetForm({ values: { searchWord: "" } })
                  dispatch.modal.closeRecentSearches()
                  dispatch.modal.clearFoundWord()
                  dispatch.modal.clearSuggestedWords()
                }}
              />
            </Container>
            <SearchSuggest open={!!suggestedWords?.length}>
              <ListHeader>Suggested words</ListHeader>
              {suggestedWords?.map((word) => {
                return (
                  <SuggestItem
                    key={word.id}
                    onClick={() => {
                      setValues({ searchWord: word.word })
                      submitForm()
                      dispatch.modal.clearSuggestedWords()
                    }}
                  >
                    {word.word}
                  </SuggestItem>
                )
              })}
            </SearchSuggest>
            <RecentSearches open={recentSearchesViewOpen}>
              <ListHeader>Recent searches</ListHeader>
              {recentSearches.map((word) => (
                <RecentSearchesItem
                  key={word}
                  onClick={() => {
                    setValues({ searchWord: word })
                    submitForm()
                    dispatch.modal.toggleRecentSearches()
                  }}
                >
                  <HistoryItemIcon />
                  {word}
                </RecentSearchesItem>
              ))}
            </RecentSearches>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SearchBar
