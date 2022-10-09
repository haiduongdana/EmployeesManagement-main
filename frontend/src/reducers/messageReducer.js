import { SET_MESSAGE, CLEAR_MESSAGE } from "../constants"
const initState = {}
const messageReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_MESSAGE:
            return { message: action.payload }
        case CLEAR_MESSAGE:
            return { message: ""}
        default:
            return state
    }
}

export default messageReducer