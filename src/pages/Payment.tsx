/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../components/common/PageMeta";
import { useEffect, useRef, useState } from "react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchAllPayments } from "../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../stores/user";
import { CurrentValueCellRender, onErrorToast } from "../util";
import PaymentsManageCard from "../components/UserProfile/PaymentsManageCard";

export interface PaymentsObject {
    id?: number;
    remarks: string;
    student: string;
    amount: string;
    created_at?: string;
    updated_at?: string;
    slabel?: string;
    admlabel?: string;
    posted?: string;
}

export default function Fee() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const gridRef = useRef(undefined);
    const [data, setData] = useState<PaymentsObject[]>();
    const [selectedData, setSelectedData] = useState<PaymentsObject | undefined>();
    const [colDefs] = useState<ColDef<PaymentsObject>[]>([
        { width:110, field: "id", headerName: '#Entry', filter: true },
        { 
            flex:1, field: "slabel", filter: true, headerName: 'Student',
            valueFormatter: (p: any) => p.value,
        },
        { 
            flex:1, field: "remarks", filter: true,
            valueFormatter: (p: any) => p.value,
        },
        { 
            width:150, field: "amount", filter: true, headerName: 'Amount',
            cellRenderer: (param: any) => CurrentValueCellRender.renderFee(param.value),
        },
        { 
            width:150, field: "posted", headerName: 'Posted on', filter: true,
            valueGetter: (value: ValueGetterParams) => value.data.posted
        },
    ]);

    const onBtnExport = () => {
        if(gridRef.current){
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadPageData = async () => {
        const resp = await fetchAllPayments(bearerToken);
        if(resp.success){
            setData(resp.data?.data);
        }else{
         onErrorToast(resp.message);
        }
    }

    useEffect(() => {
        async function LoadDefaults(){
            await onLoadPageData();
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
            description="School LMS - SELMS - Payments module"
        />
        <PageBreadcrumb pageTitle="Payments" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="space-y-6">
                <PaymentsManageCard 
                    selection={selectedData as PaymentsObject} 
                    onExport={onBtnExport} 
                    onRefresh={onLoadPageData} 
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
