/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchAllEnrollments } from "../../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { onErrorToast } from "../../util";
import { StudentObject } from "../Students";
import { FormObject } from "./Forms";
import EnrollmentManageCard from "../../components/UserProfile/EnrollmentManageCard";

export interface EnrollmentObject {
    id?: number,
    year: string,
    subject: string,
    student: string,
    status: string,
    created_at?: string,
    updated_at?: string,
    student_label?: StudentObject,
    enrollment_date_label?: string,
    subject_label?: any,
    form_label?: FormObject
}


export default function Enrollment() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<EnrollmentObject[]>();
    const [selectedData, setSelectedData] = useState<EnrollmentObject | undefined>();
    const [colDefs] = useState<ColDef<EnrollmentObject>[]>([
        { width:200, field: "id", headerName: '#Enrollment ID', filter: true },
        { width:100, field: "year", filter: true },
        { width:100, field: "status", filter: true },
        { 
            width:150, field: "created_at", headerName: 'Enrolled On', filter: true,
            valueGetter: (value: ValueGetterParams) => new Date(value.data.created_at).toLocaleDateString()
        },
        { 
            width:300, field: "subject_label", headerName: 'Subject', filter: true,
            valueGetter: (value: ValueGetterParams) => {
                if(value.data.subject_label){
                    return value.data.subject_label.name
                }
                return '-'
            }
        },
        { 
            width:300, field: "student_label", headerName: 'Student', filter: true,
            valueGetter: (value: ValueGetterParams) => {
                const { fname, lname } = value.data.student_label;
                if(value.data.student_label){
                    return `${fname} ${lname}`;
                }
                return '-'
            }
         },
        { 
            width:100, field: "form_label", headerName: 'Class', filter: true,
            valueGetter: (value: ValueGetterParams) => {
                const { name } = value.data.form_label;
                if(value.data.form_label){
                    return name
                }
                return '-'
            }
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadStudentsData = async () => {
        const resp = await fetchAllEnrollments(bearerToken);
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
            description="School LMS - SELMS - Enrollments module"
        />
        <PageBreadcrumb pageTitle="Student Enrollments" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <EnrollmentManageCard selection={selectedData as any} onExport={onBtnExport} onRefresh={onLoadStudentsData} />
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
