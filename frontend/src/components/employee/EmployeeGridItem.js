import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const EmployeeGridItem = ({employee, handleDelete}) => {
    return (
        <div className="col-3 mb-3">
            <div className="card">
                <img src={process.env.REACT_APP_BASE_URL+"/"+ employee.photo} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <p className="card-text mb-0">{employee.first_name + " " + employee.last_name}</p>
                    <p className="card-text mb-0">{employee.email}</p>
                    <p className="card-text mb-0">{employee.number}</p>
                    <p className="card-text mb-0">{employee.gender === 1 ? "Female" : "Male"}</p>
                </div>
                <div className="mb-2 me-2">
                    <div className="float-end">
                        <button className="btn btn-danger rounded-circle me-1" onClick={(id) => handleDelete(employee.id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                        <Link className="btn btn-success rounded-circle" to={'../employee/edit/'+employee.id}>
                            <FontAwesomeIcon icon={faPenToSquare}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeGridItem;