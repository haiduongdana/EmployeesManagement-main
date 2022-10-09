import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/form/EmployeeForm";
import EmployeeService from "../services/employee.service";
import { connect } from "react-redux";

const EditEmployee = () => {
    let { id } = useParams()
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage]= useState('')
    const submit = (values) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("email", values.email);
        formData.append("number", values.number);
        formData.append("gender", values.gender);
        if (typeof values.photo !== 'string') {
            formData.append("photo", values.photo);
        }
        console.log(formData)
        EmployeeService.update(formData, id).then(() => {
            navigate("/employee/list")
        }).catch((error) => {
            setMessage((
                error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString())
        })
        setIsLoading(false)
    }
    useEffect(() => {
        EmployeeService.getOne(id).then((data) => {
            setEmployee(data.data)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="d-block text-end mb-4">
                        <Link className="btn btn-primary mb-2 btn-lg rounded-pill" to='../employee/list'>LIST VIEW</Link>
                    </div>
                    <div className="p-3 border rounded">
                        <EmployeeForm
                            onSubmit={submit}
                            initialValues={employee}
                            isLoading={isLoading}
                            message={message}
                            isEdit={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        message: state.message.message
    }
}

export default connect(mapStateToProps, null)(EditEmployee)