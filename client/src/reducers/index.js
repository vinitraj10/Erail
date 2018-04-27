import {combineReducers} from "redux";
import authReducer from './reducer-auth';
import trainReducer from './reducer-train';
import seatReducer from './reducer-seats';
import classReducer from './reducer-class';
import submitReducer from './reducer-submit';
import ticketReducer from './reducer-ticket';
import dateReducer from './reducer-doj';
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  form:formReducer,
  auth:authReducer,
  trains:trainReducer,
  seats:seatReducer,
  class:classReducer,
  submit:submitReducer,
  ticket:ticketReducer,
  doj:dateReducer
})
export default rootReducer;
