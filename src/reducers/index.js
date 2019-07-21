import { combineReducers } from "redux"
import controls from './controls'
import playlist from './playlist'
import editor from './editor'

const rootReducer = combineReducers({
    controls,
    playlist,
    editor
})

export default rootReducer