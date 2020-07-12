import { combineReducers } from 'redux';
import planetsReducer from './planets.js';
const rootReducer = combineReducers({
    planets : planetsReducer
})
export default rootReducer;