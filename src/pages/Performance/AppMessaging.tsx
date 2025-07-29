/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { selectAccessToken } from "../../stores/user";
import { CurrentValueCellRender, onErrorToast } from "../../util";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import AppMessagingManageCard from "../../components/UserProfile/AppMessagingManageCard";
import { fetchAllMessages } from "../../service/AppMessaingService";


export interface AppMessagingObject {
  id?: number,
  group: string,
  initiator: string,
  subject: string,
  recipient_phone: string,
  approved: number,
  send: number,
  created_at?: string,
  updated_at?: string,
}

export default function AppMessaging() {
  const bearerToken = useSelector(selectAccessToken) as string;
  const gridRef = useRef(undefined);
  const [data, setData] = useState<AppMessagingObject[]>();
  const [selectedData, setSelectedData] = useState<AppMessagingObject | undefined>();
  const [colDefs] = useState<ColDef<AppMessagingObject>[]>([
      { width:150, field: "group", headerName: 'Category', filter: true },
      { width:150, field: "initiator", filter: true },
      { width:250, field: "subject", filter: true },
      { width:150, field: "recipient_phone", filter: true },
      { 
        width:100, field: "approved", filter: true, headerName: 'Is Approved',
        valueGetter: (param: ValueGetterParams) => param.data.approved === 1 ? true : false
       },
      { 
        flex:1, field: "send", filter: true, headerName: 'Is Send',
        valueGetter: (param: ValueGetterParams) => param.data.send === 1 ? true : false
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

  const onLoadStudentsData = async () => {
      const resp = await fetchAllMessages(bearerToken);
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
    <div>
      <PageMeta
        title="School LMS - SELMS"
        description="School LMS - SELMS"
      />
      <PageBreadcrumb pageTitle="Text Messages" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
            <AppMessagingManageCard 
                selection={selectedData as AppMessagingObject} 
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
    </div>
  );
}
