import Container from './container'
import { store } from '../redux/store'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

const App: React.FC = () => (
  <Provider store={store}>
    <Container />
  </Provider>
)

setTimeout(() => {
  const app = document.createElement("toleio-extension-app") as HTMLElement
  ReactDOM.render(<App />, app)
  document.body.append(app)
}, 0)
