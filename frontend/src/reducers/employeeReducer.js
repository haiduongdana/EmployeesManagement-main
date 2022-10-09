import {
    GET_ALL_EMPLOYEES, TOGGLE_LIST, LIST_TYPE
} from "../constants";

const initialState = {
    employees: [],
    listType: LIST_TYPE.table,
    page: 1,
    size: 10,
    total: 0,
    isFetchingEmployees: true,
}

const employeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_EMPLOYEES:
            return {
                ...state,
                employees: action.payload.items,
                page: action.payload.page,
                size: action.payload.size,
                total: action.payload.total,
                isFetchingEmployees: false
            }
        case TOGGLE_LIST:
            return {
                ...state,
                listType: state.listType === LIST_TYPE.grid ? LIST_TYPE.table : LIST_TYPE.grid
            }
        default:
            return state
    }
}

export default employeeReducer