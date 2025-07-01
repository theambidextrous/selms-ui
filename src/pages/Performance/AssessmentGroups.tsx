/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { fetchAllAssessmentGroups } from "../../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { CurrentValueCellRender, onErrorToast } from "../../util";
import AssessmentGroupManageCard from "../../components/UserProfile/AssessmentGroupManageCard";

export interface AssessmentGroupObject {
    id?: number,
    name: string,
    created_at?: string,
    updated_at?: string,
}

export default function AssessmentGroups() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<AssessmentGroupObject[]>();
    const [selectedData, setSelectedData] = useState<AssessmentGroupObject | undefined>();
    const [colDefs] = useState<ColDef<AssessmentGroupObject>[]>([
        { width:150, field: "id", headerName: '#Group ID', filter: true },
        { flex:1, field: "name", filter: true },
        { 
            flex:1, field: "created_at", headerName: 'Added On', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value),
        },
        { 
            flex:1, field: "updated_at", headerName: 'Last Modified On', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value),
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadStudentsData = async () => {
        const resp = await fetchAllAssessmentGroups(bearerToken);
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
            description="School LMS - SELMS - Assessment Groups module"
        />
        <PageBreadcrumb pageTitle="Assessment Grouping" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <AssessmentGroupManageCard 
                    selection={selectedData as AssessmentGroupObject} 
                    onExport={onBtnExport} 
                    onRefresh={onLoadStudentsData} 
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
