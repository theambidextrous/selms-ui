/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { CurrentValueCellRender, onErrorToast } from "../../util";
import { fetchAllAttendances } from "../../service";
import { StudentObject } from "../Students";
import { SubjectObject } from "../Academics/Subjects";
import { AssessmentGroupObject } from "./AssessmentGroups";
import AttendancesManageCard from "../../components/UserProfile/AttendancesManageCard";
import { TimeTableObject } from "../TimeTabling/TimeTableCalendarView";

export interface AttendancesObject {
    id?: number,
    lesson_data?: TimeTableObject,
    term: string,
    term_year?: string,
    student_data?: StudentObject,
    subject_data?: SubjectObject,
    assessment_group_data?: AssessmentGroupObject
    created_at?: string,
    updated_at?: string,
}

export default function Attendances() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<AttendancesObject[]>();
    const [selectedData, setSelectedData] = useState<AttendancesObject | undefined>();
    const [colDefs] = useState<ColDef<AttendancesObject>[]>([
        { 
            flex:1, field: "lesson_data", filter: true, headerName: 'Lesson',
            valueFormatter: (p: any) => p.value.lesson_name,
        },
        { 
            width:200, field: "student_data", filter: true, headerName: 'Learner name',
            valueFormatter: (p: any) => `${p.value.fname} ${p.value.lname}`,
        },
        { 
            width:200, field: "subject_data", filter: true, headerName: 'Subject',
            valueFormatter: (p: any) => p.value.name,
        },
        { 
            width:100, field: "lesson_data", headerName: 'Start', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value.lesson_start),
        },
        { 
            width:100, field: "lesson_data", headerName: 'End', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value.lesson_end),
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadScreenData = async () => {
        const resp = await fetchAllAttendances(bearerToken);
        if(resp.success){
            setData(resp.data?.data);
        }else{
         onErrorToast(resp.message);
        }
    }

    useEffect(() => {
        async function LoadDefaults(){
            await onLoadScreenData();
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
            description="School LMS - SELMS - Performances module"
        />
        <PageBreadcrumb 
            pageTitle="Learner Class Attendace" 
            subTitle="Manage learners class attendace in different lessons over time."
        />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <AttendancesManageCard 
                    selection={selectedData as any } 
                    onExport={onBtnExport} 
                    onRefresh={onLoadScreenData} 
                />
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
