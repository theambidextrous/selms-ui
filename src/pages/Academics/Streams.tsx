/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { fetchAllStreams } from "../../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { onErrorToast } from "../../util";
import StreamManageCard from "../../components/UserProfile/StreamManageCard";

export interface StreamObject {
    id?: number,
    form: string,
    name: string,
    class_teacher: string,
    label: string,
    created_at?: string,
    updated_at?: string,
    tlabel?: string,
    flabel?: string
}


export default function Streams() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<StreamObject[]>();
    const [selectedData, setSelectedData] = useState<StreamObject | undefined>();
    const [colDefs] = useState<ColDef<StreamObject>[]>([
        { width:100, field: "id", headerName: '#Level ID', filter: true },
        { width:200, field: "name", filter: true },
        { width:200, field: "label", headerName: 'Stream', filter: true },
        { flex:1, field: "flabel", headerName: 'Form/Level', filter: true },
        { flex:1, field: "tlabel", headerName: 'Class teacher', filter: true },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadStudentsData = async () => {
        const resp = await fetchAllStreams(bearerToken);
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
            description="School LMS - SELMS - Streams module"
        />
        <PageBreadcrumb pageTitle="Streams/Sections" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <StreamManageCard selection={selectedData as StreamObject} onExport={onBtnExport} onRefresh={onLoadStudentsData} />
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
