import './App.css'
import Container from './extension/document/container'
import { store } from './extension/redux/store'
import Facebook from './Facebook'
import Text from './Text'
import React from 'react'
import { Provider } from 'react-redux'

const App: React.FC = () => (
  <Provider store={store}>
    <Container />
    {/* <Text /> */}
    <Facebook />
  </Provider>
)

export default App
