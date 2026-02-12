/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { onErrorToast, onSuccessToast } from "../../util";
import { addNewAttendance, AttendanceRequest, fetchAllAttendancesByStream, fetchAllStudentsByStream } from "../../service";
import { StudentObject } from "../Students";
import { SubjectObject } from "../Academics/Subjects";
import { AssessmentGroupObject } from "./AssessmentGroups";
import { TimeTableObject } from "../TimeTabling/TimeTableCalendarView";
import TeacherAttendancesManageCard from "../../components/UserProfile/TeacherAttendancesManageCard";
import { StreamObject } from "../Academics/Streams";

export interface AttendancesObject {
    id?: number,
    lesson_data?: TimeTableObject,
    term: string,
    term_year?: string,
    student_data?: StudentObject,
    subject_data?: SubjectObject,
    assessment_group_data?: AssessmentGroupObject,
    is_in: string,
    created_at?: string,
    updated_at?: string,
}

export default function TeacherAttendances() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const grid2Ref = useRef(undefined);
    const [selectedData, setSelectedData] = useState<StudentObject[]>([]);
    const [activeTab, setActiveTab] = useState<string>('mark');
    const [lesson, setLesson] = useState<string>('');
    const [sending, setSend] = useState<boolean>(false);
    const [students, setStudents] = useState<any[]>([]);
    const [attendancies, setAttendanceData] = useState<any[]>([]);

    const [colDefs] = useState<ColDef<StudentObject>[]>([
        { 
            flex:1, field: "admission", filter: true, headerName: 'Adm No',
            valueFormatter: (p: any) => p.value.admission,
        },
        { 
            flex:1, field: "flabel", filter: true, headerName: 'Form',
            valueFormatter: (p: any) => p.value.flabel,
        },
        { 
            width:200, field: "fname", filter: true, headerName: 'First name',
            valueFormatter: (p: any) => p.value.fname
        },
        { 
            width:200, field: "lname", filter: true, headerName: 'Last name',
            valueFormatter: (p: any) => p.value.lname
        },
        { 
            flex:1, field: "slabel", headerName: 'Stream', filter: true,
            valueFormatter: (p: any) => p.value.slabel,
        },
    ]);

    const [col2Defs] = useState<ColDef<AttendancesObject>[]>([
        { 
            width:100, field: "student_data", filter: true, headerName: 'Adm No',
            valueFormatter: (p: any) => p.value.admission,
        },
        { 
            flex:1, field: "lesson_data", filter: true, headerName: 'Lesson',
            valueFormatter: (p: any) => p.value.lesson_name,
        },
        { 
            flex:1, field: "lesson_data", headerName: 'Date', filter: true,
            valueFormatter: (p: any) => `${p.value.date} at ${p.value.time}`,
        },
        { 
            width:150, field: "student_data", filter: true, headerName: 'First name',
            valueFormatter: (p: any) => p.value.fname
        },
        { 
            width:150, field: "student_data", filter: true, headerName: 'Last name',
            valueFormatter: (p: any) => p.value.lname
        },
        { 
            width:100, field: "is_in", headerName: 'Status', filter: true,
            cellRenderer: (p: any) => {
                if(p.value === 1){
                    return 'Present';
                }
                return 'Absent';
            },
        },
    ]);

    const onBtnExport = () => {
        if(grid2Ref.current){
            const grid = grid2Ref.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLessonChanged = async (lesson: TimeTableObject) => {
        const { id, stream } = lesson;
        setLesson(String(id));
        const resp = await fetchAllStudentsByStream(bearerToken, stream);
        if(resp.success){
            setStudents(resp.data?.data);
        }else{
         onErrorToast(resp.message);
        }
    }

    const onStreamChanged = async (stream: StreamObject) => {
        const { id } = stream;
        const resp = await fetchAllAttendancesByStream(bearerToken, String(id));
        if(resp.success){
            setAttendanceData(resp.data?.data);
        }else{
         onErrorToast(resp.message);
        }
    }

    const handleSelection = (params: any) => {
        const selection: any[] = params.api.getSelectedRows();
        if(selection.length > 0){
            setSelectedData(selection);
        }else{
            setSelectedData([]);
        }
    }

    const onSubmitAttendance = async (present: boolean) => {
        setSend(true);
        const formData: AttendanceRequest[] = [];
        selectedData.forEach(element => {
            formData.push({ 
                is_in: present ? "1" : "0",
                lesson,
                student: String(element.id)
            });
        });
        const { success, message } = await addNewAttendance(bearerToken, formData);
        if(success){
            setSelectedData([]);
            if(gridRef.current){
                const grid = gridRef.current as any;
                grid.api.deselectAll();
            }
            onSuccessToast('Attendance info saved successfully!');
        }else{
            onErrorToast(message);
        }
        setSend(false);
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
            {/* Tabs */}
            <div className="w-full mx-auto p-6">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px space-x-8">
                    <button onClick={() => setActiveTab('mark')} className={`inline-flex items-center px-1 py-4 text-sm font-medium ${activeTab === 'mark' ? 'text-indigo-600 border-indigo-600 border-b-2' : 'text-gray-500'} whitespace-nowrap`}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Mark attendance
                    </button>
                    <button onClick={() => setActiveTab('report')} className={`inline-flex items-center px-1 py-4 text-sm font-medium ${activeTab === 'report' ? 'text-indigo-600 border-indigo-600 border-b-2' : 'text-gray-500'} whitespace-nowrap`}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Attendance report
                    </button>
                    </nav>
                </div>
                
                <div className="mt-6">
                    {/* Tab 1 */}
                    <div className={`${activeTab === 'mark' ? '' : 'hidden'} p-1 bg-white rounded-lg`}>
                        <TeacherAttendancesManageCard 
                            onLessonChange={onLessonChanged} 
                            onExport={() => undefined}
                            isLesson={true}
                            onStreamChange={() => undefined}
                        />
                        { selectedData.length > 0 && (
                            <div className="inline-flex items-center gap-6 bg-white px-4 py-2 rounded-lg">
                                <span className="text-sm text-gray-700">
                                    <span className="font-semibold text-gray-900">{selectedData.length}</span> learners selected
                                </span>
                                <div className="inline-flex items-center gap-3">
                                    <button disabled={sending} onClick={() => onSubmitAttendance(true)} type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        { sending ? 'Submitting ...' : 'Mark as present'}
                                    </button>
                                    
                                    <button disabled={sending} onClick={() => onSubmitAttendance(false)} type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        { sending ? 'Submitting ...' : 'Mark as absent'}
                                    </button>
                                </div>
                            </div>
                        )}
                        <div style={{ height: '500px', width: '100%',overflowX: 'auto' }}>
                            <AgGridReact
                                ref={gridRef as any}
                                containerStyle={{ width: '100%', height: '100%' }}
                                rowData={students}
                                columnDefs={colDefs}
                                pagination={true}
                                paginationPageSize={10}
                                suppressHorizontalScroll={false} 
                                ensureDomOrder={true}
                                rowSelection={{mode: 'multiRow'}}
                                onSelectionChanged={handleSelection}
                            />
                        </div>
                    </div>
                    
                    <div className={`${activeTab === 'report' ? '' : 'hidden'} p-1 bg-white rounded-lg`}>
                        <TeacherAttendancesManageCard 
                            onLessonChange={() => undefined} 
                            onExport={onBtnExport}
                            isLesson={false}
                            onStreamChange={onStreamChanged}
                        />
                        <div style={{ height: '500px', width: '100%',overflowX: 'auto' }}>
                            <AgGridReact
                                ref={grid2Ref as any}
                                containerStyle={{ width: '100%', height: '100%' }}
                                rowData={attendancies}
                                columnDefs={col2Defs}
                                pagination={true}
                                paginationPageSize={10}
                                suppressHorizontalScroll={false} 
                                ensureDomOrder={true}
                                rowSelection={{mode: 'multiRow'}}
                                onSelectionChanged={() => undefined}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* End */}
        </div>
        </>
    );
}
