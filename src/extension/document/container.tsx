import Modal from '../comps/modal'
import { useTranslatable } from '../hooks'
import React from 'react'

const Container: React.FC = () => {
  useTranslatable()
  return <Modal />
}

export default Container
