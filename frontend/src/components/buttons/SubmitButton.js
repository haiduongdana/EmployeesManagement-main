const SubmitButton = ({isLoading, onClick, disabled, children}) => {
    return (
        <button className="btn btn-outline-primary btn-lg px-4" type="submit" disabled={disabled} onClick={onClick}>
            { isLoading
            ?   <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            : children }
        </button>
    )
}

export default SubmitButton