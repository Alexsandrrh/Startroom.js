import {combineReducers} from 'redux';
import User from './user';

console.log(User);

const combineStore = combineReducers({
    user : User
});

export default combineStore;
