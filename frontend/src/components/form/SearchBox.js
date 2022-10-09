import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const SearchBox = ({onChange}) => {
    return (
        <div className="row justify-content-end">
            <div className="col-3">
                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faSearch}/>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBox