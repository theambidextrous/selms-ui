/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { CurrentValueCellRender, onErrorToast } from "../../util";
import { fetchAllPerformances } from "../../service";
import PerformancesManageCard from "../../components/UserProfile/PerformancesManageCard";
import { StudentObject } from "../Students";
import { FormObject } from "../Academics/Forms";
import { StreamObject } from "../Academics/Streams";
import { SubjectObject } from "../Academics/Subjects";
import { AssessmentGroupObject } from "./AssessmentGroups";

export interface PerformancesObject {
    id?: number,
    student: string,
    subject: string,
    group: string,
    mark: string,
    grade?: string,
    remark?: string,
    term: string,
    term_year?: string,
    student_data?: StudentObject,
    level_data?: FormObject,
    stream_data?: StreamObject,
    subject_data?: SubjectObject,
    assessment_group_data?: AssessmentGroupObject
    created_at?: string,
    updated_at?: string,
}

export default function Performances() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<PerformancesObject[]>();
    const [selectedData, setSelectedData] = useState<PerformancesObject | undefined>();
    const [colDefs] = useState<ColDef<PerformancesObject>[]>([
        { 
            width:150, field: "student_data", filter: true, headerName: '#Adm No',
            valueFormatter: (p: any) => p.value.admission,
        },
        { 
            width:200, field: "student_data", filter: true, headerName: 'Name',
            valueFormatter: (p: any) => `${p.value.fname} ${p.value.lname}`,
        },
        { 
            width:150, field: "level_data", filter: true, headerName: 'Level/Form',
            valueFormatter: (p: any) => p.value.name,
        },
        { 
            width:150, field: "stream_data", filter: true, headerName: 'Stream',
            valueFormatter: (p: any) => p.value.label,
        },
        { 
            width:200, field: "subject_data", filter: true, headerName: 'Subject',
            valueFormatter: (p: any) => p.value.name,
        },
        { 
            width:200, field: "assessment_group_data", filter: true, headerName: 'Assessment category',
            valueFormatter: (p: any) => p.value.name,
        },
        { 
            width:100, field: "mark", filter: true, headerName: 'Score',
            cellRenderer: (param: any) => CurrentValueCellRender.renderPassMark(param.value),
        },
        { width:100, field: "grade", filter: true },
        { 
            width:100, field: "created_at", headerName: 'Graded On', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value),
        },
        { 
            width:100, field: "updated_at", headerName: 'Last Modified On', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value),
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadScreenData = async () => {
        const resp = await fetchAllPerformances(bearerToken);
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
            pageTitle="Scores & Grading" 
            subTitle="Manage learners grades and scores in different assessments over time."
        />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <PerformancesManageCard 
                    selection={selectedData as PerformancesObject} 
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
