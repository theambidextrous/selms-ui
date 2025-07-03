/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchAllTeacherSubjects } from "../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../stores/user";
import { onErrorToast } from "../util";
import TeacherSubjectManageCard from "../components/UserProfile/TeacherSubjectManageCard";
import { TeacherObject } from "./Teachers";
import { SubjectObject } from "./Academics/Subjects";

export interface TeacherSubjectObject {
    id?: number,
    teacher: string,
    subject: string,
    teacher_data?: TeacherObject ,
    subject_data?: SubjectObject,
    created_at?: string,
    updated_at?: string,
}

export default function TeacherSubjects() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<TeacherSubjectObject[]>();
    const [selectedData, setSelectedData] = useState<TeacherSubjectObject | undefined>();
    const [colDefs] = useState<ColDef<TeacherSubjectObject>[]>([
        { width:150, field: "id", headerName: '#Entry No', filter: true },
        { 
            flex:1, field: "teacher_data", filter: true,
            valueFormatter: (p: any) => `${p.value.fname} ${p.value.lname}`,
        },
        { 
            flex:1, field: "subject_data", filter: true, headerName: 'Subject',
            valueFormatter: (p: any) => p.value.name,
        },
        { 
            flex:1, field: "created_at", headerName: 'Assigned on', filter: true,
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
        const resp = await fetchAllTeacherSubjects(bearerToken);
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
            description="School LMS - SELMS - Teacher Subjects module"
        />
        <PageBreadcrumb pageTitle="Teacher Subjects" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <TeacherSubjectManageCard selection={selectedData as TeacherSubjectObject} onExport={onBtnExport} onRefresh={onLoadStudentsData} />
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
