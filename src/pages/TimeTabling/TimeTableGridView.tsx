/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { onErrorToast } from "../../util";
import { fetchAllTimeTables } from "../../service";
import { TimeTableObject } from "./TimeTableCalendarView";
import TimeTableManageCard from "../../components/UserProfile/TimeTableManageCard";



export default function TimeTableGridView() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<TimeTableObject[]>();
    const [selectedData, setSelectedData] = useState<TimeTableObject | undefined>();
    const [colDefs] = useState<ColDef<TimeTableObject>[]>([
        { 
            width:150, field: "date", filter: true, headerName: 'Date',
            valueFormatter: (p: any) => p.value,
        },
        { 
            width:100, field: "day", filter: true, headerName: 'Day',
            valueFormatter: (p: any) => p.value,
        },
        { 
            flex:1, field: "title", filter: true, headerName: 'Lesson',
            valueFormatter: (p: any) => p.value,
        },
        { 
            width:100, field: "start", filter: true,
            valueFormatter: (p: any) => {
                const timeStamp = String(p.value).split("T")[1];
                return timeStamp.slice(0, 5);
            },
        },
        { 
            width:100, field: "end", filter: true,
            valueFormatter: (p: any) => {
                const timeStamp = String(p.value).split("T")[1];
                return timeStamp.slice(0, 5)
            },
        },
        { 
            width:100, field: "teacher_meta", filter: true, headerName: 'Teacher',
            valueFormatter: (p: any) => p.value.fname,
        },
        { 
            width:100, field: "stream_name", filter: true, headerName: 'Class',
            valueFormatter: (p: any) => p.value,
        },
        { 
            width:100, field: "duration", filter: true,
            valueFormatter: (p: any) => `${p.value}min`,
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadScreenData = async () => {
        const resp = await fetchAllTimeTables(bearerToken);
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
                <TimeTableManageCard 
                    selection={selectedData as TimeTableObject} 
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
