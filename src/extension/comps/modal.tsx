import { Dispatch, RootState } from "../redux/store"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "react-responsive-modal"
import classNames from "classnames"
import styled from "styled-components"
import iconClose from "../assets/icons/Icon_close.png"
import SearchBar from "./search-bar"
import Header from "./header"
import Video from "../comps/video"
import "react-responsive-modal/styles.css"
import "../css/main.scss"

const Container = styled.div`
  padding: 18px 20px;
`
const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 6px;
  margin-right: 4px;
`

const ModalWindow: React.FC = () => {
  const mainViewOpen = useSelector(
    (state: RootState) => state.modal.mainViewOpen
  )
  const foundWord = useSelector((state: RootState) => state.modal.foundWord)
  const dispatch = useDispatch<Dispatch>()

  const modalClasses = classNames("toleio-modal", {
    "toleio-modal--expanded": foundWord,
    "toleio-modal--collapsed": !foundWord,
  })

  return (
    <Modal
      blockScroll={false}
      closeOnOverlayClick={true}
      closeOnEsc={true}
      open={mainViewOpen}
      onClose={() => {
        dispatch.modal.closeMainView()
        dispatch.modal.closeRecentSearches()
        dispatch.modal.clearSuggestedWords()
      }}
      classNames={{ modal: modalClasses, overlay: "toleio-overlay" }}
      closeIcon={
        <CloseIcon
          src={iconClose}
          alt="Close icon"
          onClick={() => {
            dispatch.modal.closeRecentSearches()
            dispatch.modal.clearSuggestedWords()
          }}
        />
      }
    >
      <Container>
        <Header />
        <SearchBar />
        <Video />
      </Container>
    </Modal>
  )
}

export default ModalWindow
