import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const EmployeeList = ({toggleList, children}) => {
    return (
        <>
           <div className="row">
                <div>
                    <div className="float-end mb-2">
                        <Link className="btn btn-primary me-2" to={'/employee/add'}>ADD EMPLOYEE</Link>
                        <button className="btn btn-primary rounded-circle" onClick={toggleList}>
                            <FontAwesomeIcon icon={faList}/>
                        </button>
                    </div>
                </div>
           </div>
            <div className="d-block">
                {children}
            </div>
        </>
    )
}

export default EmployeeList