import PageBreadcrumb from "../components/common/PageBreadCrumb";
import TeacherManageCard from "../components/UserProfile/TeacherManageCard";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchAllTeachers } from "../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../stores/user";
import { onErrorToast } from "../util";

export interface TeacherObject {
    id?: number,
    fname: string,
    lname: string,
    address: string,
    city: string,
    county: string,
    zip: string,
    email: string,
    phone: string,
    email_verified_at?: string,
    is_teacher?: number,
    is_active: number,
    pic?: string,
    created_at?: string,
    updated_at?: string,
    password?: string,
    c_password?: string
}

export default function Teachers() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<TeacherObject[]>();
    const [selectedData, setSelectedData] = useState<TeacherObject | undefined>();
    const [colDefs] = useState<ColDef<TeacherObject>[]>([
        { width:100, field: "id", headerName: '#Staff No', filter: true },
        { 
            width:200, headerName: 'Name', filter: true, 
            valueGetter: (value: ValueGetterParams) => `${value.data.fname} ${value.data.lname}` 
        },
        { width:200, field: "address", filter: true },
        { width:100, field: "city", filter: true },
        { width:100, field: "county", filter: true },
        { width:200, field: "email", headerName: 'Email', filter: true },
        { width:150, field: "phone", headerName: 'Phone', filter: true},
        { 
            width:100, field: "is_active", headerName: 'Active', filter: true,
            valueGetter: (value: ValueGetterParams) => value.data.is_active === 1 ? true : false
        },
        { 
            width:150, field: "created_at", headerName: 'Joined on', filter: true,
            valueGetter: (value: ValueGetterParams) => new Date(value.data.created_at).toLocaleDateString()
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadStudentsData = async () => {
        const resp = await fetchAllTeachers(bearerToken);
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
            description="School LMS - SELMS - Teachers module"
        />
        <PageBreadcrumb pageTitle="Teachers" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <TeacherManageCard selection={selectedData as TeacherObject} onExport={onBtnExport} onRefresh={onLoadStudentsData} />
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
