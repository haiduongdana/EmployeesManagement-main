import React, { useEffect, useState } from 'react';
import EmployeeList from "../components/employee/EmployeeList";
import EmployeeGrid from '../components/employee/EmployeeGrid';
import EmployeeGridItem from '../components/employee/EmployeeGridItem';
import CommonSprinner from '../components/sprinners/CommonSprinner';
import { getAllEmployees, toggleList } from "../actions/EmployeeActions";
import { connect } from "react-redux";
import EmployeeService from '../services/employee.service';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import EmployeeTable from '../components/employee/EmployeeTable';
import SearchBox from '../components/form/SearchBox';
import { LIST_TYPE } from '../constants';

const Home = ({
    employees,
    listType,
    pageNum,
    size,
    total,
    isFetchingEmployees,
    getAllEmployees,
    toggleList,
}) => {
    const isEmpty = employees.length === 0;
    const [search, setSearch] = useState();

    const handleDelete = (id) => {
        if (window.confirm("Delete the item?")) {
            EmployeeService.destroy(id).then(() => {
                window.location.reload();
            })
        }
    }

    const handleTableChange = (type, { page, sizePerPage }) => {
        setTimeout(() => {
            getAllEmployees({page: page, size: sizePerPage, search: search});
        }, 300);
    }

    const changeSearchHandler = event => {
        setSearch(event.target.value);
    };
    const debouncedChangeSearchHandler = useCallback(
        debounce(changeSearchHandler, 300)
    , []);

    useEffect(() => {
        getAllEmployees({page: pageNum, size: size, search: search});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        if(listType === LIST_TYPE.table)
            getAllEmployees({page: 1, size: 10});
        else 
            getAllEmployees();
    }, [listType])

    useEffect(() => {
        getAllEmployees({page: pageNum, size: size});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <EmployeeList toggleList={toggleList}>
                { listType === LIST_TYPE.table && <SearchBox onChange={debouncedChangeSearchHandler}/>}
                { isEmpty
                ? (isFetchingEmployees
                    ? <CommonSprinner/>
                    : <p className="mb-0 text-center fw-bold">Empty</p>)
                : (listType === LIST_TYPE.table
                    ? (
                        <EmployeeTable
                            data={employees}
                            page={pageNum}
                            sizePerPage={size}
                            totalSize={total}
                            onTableChange={handleTableChange}
                            handleDelete={handleDelete}
                        />
                    )
                    : (
                        <EmployeeGrid>
                            {employees.map(employee =>
                                <EmployeeGridItem key={employee.id} employee={employee} handleDelete={(id) => handleDelete(id)}/>)}
                        </EmployeeGrid>
                    ))
                }
            </EmployeeList>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employees: state.employee.employees,
        listType: state.employee.listType,
        pageNum: state.employee.page,
        size: state.employee.size,
        total: state.employee.total,
        isFetchingEmployees: state.employee.isFetchingEmployees,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllEmployees: (params) => dispatch(getAllEmployees(params)),
        toggleList: () => dispatch(toggleList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)