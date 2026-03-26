import PageBreadcrumb from "../components/common/PageBreadCrumb";
import TeacherManageCard from "../components/UserProfile/TeacherManageCard";
import { AgGridReact } from "ag-grid-react";
import PageMeta from "../components/common/PageMeta";
import { useEffect, useRef, useState, useMemo } from "react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchAllTeachers } from "../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../stores/user";
import { selectWordTranslation } from "../stores/translation";
import { onErrorToast } from "../util";

export interface TeacherObject {
  id?: number;
  fname: string;
  lname: string;
  address: string;
  city: string;
  county: string;
  zip: string;
  email: string;
  phone: string;
  email_verified_at?: string;
  is_teacher?: number;
  is_active: number;
  pic?: string;
  staff_no?: string;
  created_at?: string;
  updated_at?: string;
  password?: string;
  c_password?: string;
}

export default function Teachers() {
  const bearerToken = useSelector(selectAccessToken) as string;

  // ✅ TRANSLATIONS
  const teachersText = useSelector(selectWordTranslation("Teachers"));
  const nameText = useSelector(selectWordTranslation("Name"));
  const addressText = useSelector(selectWordTranslation("Address"));
  const cityText = useSelector(selectWordTranslation("City"));
  const countyText = useSelector(selectWordTranslation("County"));
  const emailText = useSelector(selectWordTranslation("Email"));
  const phoneText = useSelector(selectWordTranslation("Phone"));
  const activeText = useSelector(selectWordTranslation("Active"));
  const joinedOnText = useSelector(selectWordTranslation("Joined on"));
  const staffNoText = useSelector(selectWordTranslation("Staff No"));
  const addteacherText = useSelector(selectWordTranslation("Add Teacher"));
  const refreshText = useSelector(selectWordTranslation("Refresh"));
  const gridRef = useRef<any>(null);
  const [data, setData] = useState<TeacherObject[]>();
  const [selectedData, setSelectedData] = useState<TeacherObject | undefined>();

  // ✅ FIX: useMemo for live translation updates
  const colDefs = useMemo<ColDef<TeacherObject>[]>(() => [
    { width: 100, field: "id", headerName: "#Staff No", filter: true },
    {
      width: 200,
      headerName: nameText as string,
      filter: true,
      valueGetter: (value: ValueGetterParams) =>
        `${value.data.fname} ${value.data.lname}`,
    },
    { width: 200, field: "address", headerName: addressText as string, filter: true },
    { width: 100, field: "city", headerName: cityText as string, filter: true },
    { width: 100, field: "county", headerName: countyText as string, filter: true },
    { width: 200, field: "email", headerName: emailText as string, filter: true },
    { width: 150, field: "phone", headerName: phoneText as string, filter: true },
    { width: 100, field: "staff_no", headerName: staffNoText as string, filter: true },
    {width: 100, headerName: addteacherText as string, filter: true },
    {width: 100, headerName: refreshText as string, filter: true },
    {width: 100, field: "is_teacher", headerName: "Is Teacher", filter: true, valueGetter: (value: ValueGetterParams) => value.data.is_teacher === 1 ? "Yes" : "No"},
    {
      width: 100,
      field: "is_active",
      headerName: activeText as string,
      filter: true,
      valueGetter: (value: ValueGetterParams) =>
        value.data.is_active === 1 ? true : false,
    },
    {
      width: 150,
      field: "created_at",
      headerName: joinedOnText as string,
      filter: true,
      valueGetter: (value: ValueGetterParams) =>
        value.data.created_at
          ? new Date(value.data.created_at).toLocaleDateString()
          : "",
    },
  ], [
    nameText,
    addressText,
    cityText,
    countyText,
    emailText,
    phoneText,
    activeText,
    joinedOnText,
    staffNoText,
    addteacherText,
  ]);

  const onBtnExport = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  };

  const onLoadStudentsData = async () => {
    const resp = await fetchAllTeachers(bearerToken);
    if (resp.success) {
      setData(resp.data?.data);
    } else {
      onErrorToast(resp.message);
    }
  };

  useEffect(() => {
    onLoadStudentsData();
  }, []);

  const handleSelection = (params: any) => {
    const selection: any[] = params.api.getSelectedRows();
    if (selection.length > 0) {
      setSelectedData(selection[0]);
    } else {
      setSelectedData(undefined);
    }
  };

  return (
    <>
      <PageMeta
        title="School LMS - SELMS"
        description="School LMS - SELMS - Teachers module"
      />

      {/* ✅ TRANSLATED TITLE */}
      <PageBreadcrumb pageTitle={teachersText as string} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TeacherManageCard
            selection={selectedData as TeacherObject}
            onExport={onBtnExport}
            onRefresh={onLoadStudentsData}
          />

          <div
            style={{
              height: "500px",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <AgGridReact
              ref={gridRef}
              containerStyle={{ width: "100%", height: "100%" }}
              rowData={data}
              columnDefs={colDefs}
              pagination={true}
              paginationPageSize={10}
              suppressHorizontalScroll={false}
              ensureDomOrder={true}
              rowSelection={{ mode: "singleRow" }}
              onSelectionChanged={handleSelection}
            />
          </div>
        </div>
      </div>
    </>
  );
}