import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { CurrentValueCellRender } from "../../util";
import { StudentObject } from "../Students";
import { FormObject } from "../Academics/Forms";
import { StreamObject } from "../Academics/Streams";
import { SubjectObject } from "../Academics/Subjects";
import { AssessmentGroupObject } from "../Performance/AssessmentGroups";
import FormPerformanceManageCard from "../../components/UserProfile/FormPerformanceManageCard";

export interface PerformanceByFormObject  {
    id: 1,
    student: string,
    subject: string,
    group: string,
    mark: string,
    grade: string,
    remark: string,
    term: string,
    created_at: string,
    updated_at: string,
    term_year: string,
    student_data: StudentObject,
    level_data: FormObject,
    stream_data: StreamObject,
    subject_data: SubjectObject,
    assessment_group_data: AssessmentGroupObject,
    form?: string
}

export default function PerformanceByForm() {
    const gridRef = useRef(undefined);
    const [data, setData] = useState<PerformanceByFormObject[]>();
    const [colDefs] = useState<ColDef<PerformanceByFormObject>[]>([
        { width:150, field: "term_year", headerName: 'Term', filter: true },
        { 
            width:150, field: "student_data", headerName: 'Student', filter: true ,
            valueFormatter: (p: any) => `${p.value.fname} ${p.value.lname}`,
        },
        { 
            width:150, field: "student_data", headerName: 'Admission No', filter: true ,
            valueFormatter: (p: any) => p.value.admission,
        },
        {  
            width:150, field: "mark", filter: true, headerName: 'Score',
            cellRenderer: (param: any) => CurrentValueCellRender.renderPassMark(param.value),
         },
        {  width:150, field: "grade", filter: true },
        { 
            width:150, field: "level_data", headerName: 'Level', filter: true ,
            valueFormatter: (p: any) => p.value.name,
        },
        { 
            width:150, field: "stream_data", headerName: 'Stream', filter: true ,
            valueFormatter: (p: any) => p.value.name,
        },
        { 
            width:250, field: "subject_data", headerName: 'Subject', filter: true ,
            valueFormatter: (p: any) => p.value.name,
        },
        { 
            width:150, field: "created_at", headerName: 'Added On', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value),
        },
        { 
             width:150, field: "updated_at", headerName: 'Last Modified On', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value),
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    return (
        <>
        <PageMeta
            title="School LMS - SELMS"
            description="School LMS - SELMS - Report Generation module"
        />
        <PageBreadcrumb pageTitle="Level/Class Performance" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <FormPerformanceManageCard 
                    onGenerated={setData} 
                    onExport={onBtnExport} 
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
                        rowData={data && data?.length > 0 ? data : []}
                        columnDefs={colDefs}
                        pagination={true}
                        paginationPageSize={10}
                        suppressHorizontalScroll={false} 
                        ensureDomOrder={true}
                    />
                </div>
            </div>
        </div>
        </>
    );
}
