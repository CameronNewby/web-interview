import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import 'normalize.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
