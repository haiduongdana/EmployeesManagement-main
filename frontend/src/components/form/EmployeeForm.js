import React, { useEffect, useState } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import SubmitButton from "../buttons/SubmitButton";
import { connect } from 'react-redux';

const validate = values => {
    const errors = {}
    if(!values.first_name) {
        errors.first_name = 'Required';
    } else if (!/^[a-z ,.'-]+$/i.test(values.first_name)) {
        errors.first_name = 'Contains invalid characters';
    } else if(values.first_name.length < 6) {
        errors.first_name = 'Must be more than 6 characters';
    } else if(values.first_name.length > 10) {
        errors.first_name = 'Must be less than 10 characters';
    }
    if(!values.last_name) {
        errors.last_name = 'Required';
    } else if (!/^[a-z ,.'-]+$/i.test(values.last_name)) {
        errors.last_name = 'Contains invalid characters';
    } else if(values.last_name.length < 6) {
        errors.last_name = 'Must be more than 6 characters';
    } else if(values.last_name.length > 10) {
        errors.last_name = 'Must be less than 10 characters';
    }
    if(values.email) {
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
    }
    if(values.number) {
        if(!/^(?:7|0|(?:\+94))[0-9]{9,10}$/i.test(values.number)) {
            errors.number = 'Invalid phone number';
        }
    }
    // if(!values.photo) {
    //     errors.photo = 'Required';
    // }
    return errors
}

const renderField = ({ type, label, input, meta: { touched, error } }) => (
    <div className="mb-3 row">
        <label className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
            { type === "select"
            ? (
                <select {...input} className={`form-select ${touched && error && ` is-invalid`}`}>
                    <option value={1}>Female</option>
                    <option value={0}>Male</option>
                </select>
            )
            : <input {...input} className={`form-control ${touched && error && ` is-invalid`}`} type={type}/>}
            {touched && error &&
            (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    </div>
)

const FileInput = ({ 
    input: { value: omitValue, onChange, onBlur, value, ...inputProps }, 
    meta: omitMeta,
    ...props
}) => {
    const [photo, setPhoto] = useState();
    const adaptFileEventToValue = delegate => e => {
        const file = e.target.files[0]
        if(file) setPhoto(URL.createObjectURL(file))
        return delegate(file);
    }
    useEffect(() => {
        if(!photo && value && typeof value !== 'object') {
            setPhoto(process.env.REACT_APP_BASE_URL+"/"+value)
        }
        // eslint-disable-next-line
    }, [value])
    return (
        <div className="mb-3 row">
            <div className="w-100">
                <img 
                    src={photo}
                    className="rounded-circle border align-middle mb-3 d-block mx-auto"
                    style={{width: "150px", height: "150px", objectFit: "cover"}} alt=""
                />
            </div>
            <label className="col-sm-3 col-form-label">Photo</label>
            <div className="col-sm-9">
                <input
                className={`form-control ${omitMeta.touched && omitMeta.error && ` is-invalid`}`}
                onChange={adaptFileEventToValue(onChange)}
                onBlur={adaptFileEventToValue(onBlur)}
                type="file"
                accept='.jpg, .png, .jpeg'
                {...props.input}
                {...props}
                />
                {omitMeta.touched && omitMeta.error &&
                (
                    <div className="invalid-feedback">
                        {omitMeta.error}
                    </div>
                )}
            </div>
        </div>
    );
};

const EmployeeFormFunc = ({handleSubmit, isLoading, message, isEdit}) => (
    <form onSubmit={handleSubmit} className="m-4">
        { message &&
            <div className="alert alert-danger" role="alert">
            {message}
            </div>
        }
        <Field name="photo" component={FileInput} type="file"/>
        <Field name="first_name" label="First Name" component={renderField} type="text"/>
        <Field name="last_name" label="Last Name" component={renderField} type="text"/>
        <Field name="email" label="Email" component={renderField} type="email"/>
        <Field name="number" label="Phone" component={renderField} type="text"/>
        <Field name="gender" label="Gender" component={renderField} type="select"/>
        <div className="text-end mt-5">
            <SubmitButton isLoading={isLoading}>
                {isEdit ? "Edit" : "Add"}
            </SubmitButton>
        </div>
    </form>
)

let EmployeeForm = reduxForm({
    form:'employee',
    validate,
    enableReinitialize: true
})(EmployeeFormFunc)

const selector = formValueSelector('employee')
EmployeeForm = connect(
    state => {
        const first_name = selector(state, 'first_name')
        const last_name = selector(state, 'last_name')
        const email = selector(state, 'email')
        const number = selector(state, 'number')
        const gender = selector(state, 'gender')
        const photo = selector(state, 'photo')
        return {
            first_name,
            last_name,
            email,
            number,
            gender,
            photo
        }
    }
)(EmployeeForm)

export default EmployeeForm