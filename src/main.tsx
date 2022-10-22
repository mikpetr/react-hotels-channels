import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import './index.scss'

import dbOrm from '@/dbOrm'

const bootstrapApp = async () => {
  try {
    await dbOrm.initData()

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.Fragment>
        <Provider store={store}>
          <App />
        </Provider>
      </React.Fragment>
    )
  } catch (e) {
    console.log(e)
  }
}

bootstrapApp()
