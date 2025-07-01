/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { fetchAllSubjects } from "../../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { CurrentValueCellRender, onErrorToast } from "../../util";
import SubjectManageCard from "../../components/UserProfile/SubjectManageCard";

export interface SubjectObject {
    id?: number,
    form: string,
    name: string,
    label?: string,
    pass_mark: string,
    max_score?: string,
    created_at?: string,
    updated_at?: string,
    flabel?: string,
    tution_fee: any,
}

export default function Subjects() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<SubjectObject[]>();
    const [selectedData, setSelectedData] = useState<SubjectObject | undefined>();
    const [colDefs] = useState<ColDef<SubjectObject>[]>([
        { width:100, field: "id", headerName: '#Sub ID', filter: true },
        { width:150, field: "flabel", filter: true, headerName: 'Level taught' },
        { width:300, field: "name", filter: true },
        { 
            width:150, field: "pass_mark", headerName: 'Pass Mark', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderPassMark(param.value),
        },
        { 
            width:150, field: "max_score", headerName: 'Maximum Score', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderPassMark(param.value),
        },
        { 
            width:100, field: "tution_fee", headerName: 'Tution Fee', filter: true,
            cellRenderer: (param: any) => CurrentValueCellRender.renderFee(param.value),
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadStudentsData = async () => {
        const resp = await fetchAllSubjects(bearerToken);
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
            description="School LMS - SELMS - Subjects module"
        />
        <PageBreadcrumb pageTitle="Subjects" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <SubjectManageCard selection={selectedData as SubjectObject} onExport={onBtnExport} onRefresh={onLoadStudentsData} />
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
