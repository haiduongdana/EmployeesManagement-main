import { GET_ALL_EMPLOYEES, TOGGLE_LIST } from '../constants';
import EmployeeService from '../services/employee.service';

export const getAllEmployees = (params) => async (dispatch) => {
    try {
        const res = await EmployeeService.getAll(params);

        dispatch({
            type: GET_ALL_EMPLOYEES,
            payload: res.data,
        })

    } catch (err) {
        console.log(err);
    }
}

export const toggleList = () => ({
    type: TOGGLE_LIST,
})