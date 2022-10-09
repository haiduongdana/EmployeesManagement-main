import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import messageReducer from "./messageReducer";
import { reducer as formReducer } from "redux-form";

const reducer = combineReducers({
    form: formReducer,
    employee: employeeReducer,
    message: messageReducer,
})

export default reducer