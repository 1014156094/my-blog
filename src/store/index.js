import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './modules/user'

// function addAsync(num) {
//     return (dispatch, getState) => {
//         setTimeout(() => {
//             dispatch(add(num))
//         }, 1000)
//     }
// }

const allReducers = combineReducers({
    user: user.reducer
})

const store = createStore(allReducers, {
    user: user.initialState
}, composeWithDevTools(applyMiddleware(ReduxThunk)))

store.subscribe(() => {
    console.log('changeed', store.getState())
})

// store.dispatch(addAsync(5))

export default store