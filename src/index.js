import 'core-js/stable'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import unregister from './registerServiceWorker'
import './index.scss'

ReactDOM.render(<App />, document.getElementById('root'))
unregister()
