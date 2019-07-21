import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './components/AppRouter'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
)

store.subscribe(() => {
    //console.log('state changed, new state is:')
    //console.log(store.getState())
})