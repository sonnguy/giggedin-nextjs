import { combineReducers } from "redux";
import artist from './artistReducer';
import user from './userReducer';
import campaign from './campaignReducer';


export default combineReducers({
    artist,
    user,
    campaign
});