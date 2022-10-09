import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const EmployeeTable = ({
    data,
    page,
    sizePerPage,
    onTableChange,
    onSizePerPageChange,
    totalSize,
    handleDelete,
}) => {
    const columns = [{
        dataField: 'photo',
        text: 'Photo',
        formatter: photoFormatter
    }, {
        dataField: 'first_name',
        text: 'First Name',
    }, {
        dataField: 'last_name',
        text: 'Last Name',
    }, {
        dataField: 'email',
        text: 'Email',
    }, {
        dataField: 'number',
        text: 'Phone',
    }, {
        dataField: 'gender',
        text: 'Gender',
        formatter: genderFormatter,
    }, {
        dataField: 'id',
        text: 'Action',
        formatter: actionFormatter,
    }];
    
    function photoFormatter(cell, row) {
        return (
            <img src={process.env.REACT_APP_BASE_URL+"/"+cell} style={{width: "100px"}} className="mx-auto d-block" alt="..."/>
        )
    }

    function genderFormatter(cell, row) {
        return (
            <span>{cell === 1 ? "Female" : "Male"}</span>
        )
    }

    function actionFormatter(cell, row) {
        return (
            <>
                <button className="btn btn-danger me-2" onClick={(id) => handleDelete(cell)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
                <Link className="btn btn-success" to={'../employee/edit/'+cell}>
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </Link>
            </>
        )
    }

    return (
        <div>
            <BootstrapTable
                remote
                keyField="id"
                data={ data }
                columns={ columns }
                pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
                onTableChange={ onTableChange }
                onSizePerPageChange = { onSizePerPageChange }
            />
        </div>
    )
}

export default EmployeeTable