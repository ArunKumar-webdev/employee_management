import { useState } from "react";
import { DataGrid, GridToolbar, GridRenderCellParams } from '@mui/x-data-grid';
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import Loading from "./loading";
import React from "react";
import { useTranslation, } from 'react-i18next';

export default function Table({ isError, isLoading, employees, handleEdit, handleDelete, action }) {

    const { t } = useTranslation();
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    });

    const pagesVisited = paginationModel.page * paginationModel.pageSize;
    const displayUsers = employees.slice(pagesVisited, pagesVisited + paginationModel.pageSize);
    const pageCount = employees.length;

    const columns = [
        { field: 'id', headerName: t('EmployeeId'), },
        {
            field: 'employee_name', headerName: t('EmployeeName'), sortable: false, width: 200,
            renderCell: (params: GridRenderCellParams) => {
                return <>
                    <img className="rounded-full w-[28px] h-[28px]" src={params.row.avatar == "" ? '/assets/icons/avatar.png' : params.row.avatar} alt="" />
                    <label title={params.formattedValue} className={`mx-2 ${params?.formattedValue?.length > 24 ? 'truncate' : ''}`}>{params.formattedValue}</label>
                </>
            }
        },
        {
            field: 'employee_salary', headerName: t('EmployeeSalary'), width: 200,
            renderCell: (params: GridRenderCellParams) =>
                <p>{'$ ' + params.formattedValue}</p>
        },
        { field: 'employee_age', headerName: t('EmployeeAge'), width: 200 },
        {
            field: 'Edit', headerName: t('Edit'), sortable: false,
            renderCell: (params: GridRenderCellParams) =>
                <button onClick={() => handleEdit(params.row.id)} className="cursor"><BiEdit size={25} color={"#1976d2"}></BiEdit></button>
        },
        {
            field: 'Delete', headerName: t('Delete'), sortable: false,
            renderCell: (params: GridRenderCellParams) =>
                <button onClick={() => handleDelete(params.row.id)} className="cursor"><BiTrashAlt size={25} color={"black"}></BiTrashAlt></button>

        },
    ];

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={displayUsers ? displayUsers : []}
                columns={columns}
                density='standard'
                getEstimatedRowHeight={() => 100}
                getRowHeight={() => 'auto'}
                slots={action === 0 ? { toolbar: GridToolbar } : {}}
                columnVisibilityModel={{
                    Delete: action === 0
                }}
                initialState={{
                    pagination: { paginationModel: { pageSize: paginationModel.pageSize } },
                }}
                rowCount={pageCount}
                pageSizeOptions={[5, 10, 25, 50]}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
                sx={{
                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                        py: 1,
                    },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                        py: '15px',
                    },
                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                        py: '22px',
                    },
                }}
            />
        </div>
    )
}
