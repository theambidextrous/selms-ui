/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchAllTerms } from "../../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { onErrorToast } from "../../util";
import TermManageCard from "../../components/UserProfile/TermManageCard";
import Badge from "../../components/ui/badge/Badge";

export interface TermObject {
    id?: number,
    year: string,
    label: string,
    start: string,
    end: string,
    is_current: number,
}

const CurrentValueFormatter = (value: boolean) => {
    if(value)
        return  <Badge color="success">Yes</Badge>;
    return  <Badge color="info">No</Badge>;
}

export default function Terms() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<TermObject[]>();
    const [selectedData, setSelectedData] = useState<TermObject | undefined>();
    const [colDefs] = useState<ColDef<TermObject>[]>([
        { width:150, field: "id", headerName: '#Term ID', filter: true },
        { width:200, field: "year", filter: true },
        { width:100, field: "label", filter: true },
        { 
            flex:1, field: "start", headerName: 'Starts on', filter: true,
            valueGetter: (value: ValueGetterParams) => new Date(value.data.start).toLocaleDateString()
        },
        { 
            flex:1, field: "end", headerName: 'Ends on', filter: true,
            valueGetter: (value: ValueGetterParams) => new Date(value.data.end).toLocaleDateString()
        },
        { 
            flex:1, field: "is_current", headerName: 'Is current', filter: true,
            valueGetter: (value: ValueGetterParams) => {
                if(value.data.is_current === 1)
                    return  true;
                return  false;
            },
            cellRenderer: (params: any) => CurrentValueFormatter(params.value),
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadStudentsData = async () => {
        const resp = await fetchAllTerms(bearerToken);
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
            description="School LMS - SELMS - Terms module"
        />
        <PageBreadcrumb pageTitle="Terms" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <TermManageCard selection={selectedData as TermObject} onExport={onBtnExport} onRefresh={onLoadStudentsData} />
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
