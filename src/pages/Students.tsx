/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import StudentManageCard from "../components/UserProfile/StudentManageCard";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchAllStudents } from "../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../stores/user";
import { onErrorToast } from "../util";

export interface StudentObject {
    id?: number,
    admission?: string,
    date_of_admission?: string,
    fname: string,
    lname: string,
    address: string,
    city: string,
    county: string,
    zip: string,
    parent: string,
    form: string,
    stream: string,
    current_term?:string,
    expected_grad: string,
    gender: string,
    dob: string,
    birth_cert: string,
    nemis_no: string,
    huduma_no: string,
    is_active?: string,
    pic?: string,
    created_at?: string,
    updated_at?: string,
    kcpe: string,
    plabel?: string,
    flabel?: string,
    slabel?: string
}

export default function Students() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<StudentObject[]>();
    const [selectedData, setSelectedData] = useState<StudentObject | undefined>();
    const [colDefs] = useState<ColDef<StudentObject>[]>([
        { width:150, field: "admission", headerName: '#Adm No', filter: true },
        { width:150, field: "date_of_admission", headerName: 'Admitted On', filter: true },
        { 
            width:200, headerName: 'Name', filter: true, 
            valueGetter: (value: ValueGetterParams) => `${value.data.fname} ${value.data.lname}` 
        },
        { width:200, field: "address", filter: true },
        { width:100, field: "city", filter: true },
        { width:100, field: "county", filter: true },
        { width:100, field: "flabel", headerName: 'Level', filter: true },
        { width:100, field: "slabel", headerName: 'Stream', filter: true},
        { width:100, field: "gender", headerName: 'Gender', filter: true},
        { width:150, field: "dob", headerName: 'Dob', filter: true},
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadStudentsData = async () => {
        const resp = await fetchAllStudents(bearerToken);
        if(resp.success){
            setData(resp.data?.data);
        }else{
         onErrorToast(resp.message);
        }
    }

    useEffect(() => {
        async function LoadDefaults(){
            await onLoadStudentsData();
        }
        LoadDefaults();
    }, [])

    const handleSelection = (params: any) => {
        const selection: any[] = params.api.getSelectedRows();
        if(selection.length > 0){
            setSelectedData(selection[0]);
        }else{
            setSelectedData(undefined);
        }
    }

    return (
        <>
        <PageMeta
            title="School LMS - SELMS"
            description="School LMS - SELMS - Students module"
        />
        <PageBreadcrumb pageTitle="Students" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <StudentManageCard selection={selectedData as StudentObject} onExport={onBtnExport} onRefresh={onLoadStudentsData} />
                <div 
                    style={{ 
                        height: '500px', 
                        width: '100%',
                        overflowX: 'auto' 
                    }}>
                    <AgGridReact
                        ref={gridRef as any}
                        containerStyle={{ width: '100%', height: '100%' }}
                        rowData={data}
                        columnDefs={colDefs}
                        pagination={true}
                        paginationPageSize={10}
                        suppressHorizontalScroll={false} 
                        ensureDomOrder={true}
                        rowSelection={{mode: 'singleRow'}}
                        onSelectionChanged={handleSelection}
                    />
                </div>
            </div>
        </div>
        </>
    );
}
