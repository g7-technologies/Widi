import {createStore,combineReducers} from 'redux'
import cartItem from '../reducers/cartItem'
const rootReducer=combineReducers({
    foods:cartItem
})
export default store=createStore(rootReducer)