/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import StudentManageCard from "../components/UserProfile/StudentManageCard";
import { AgGridReact } from 'ag-grid-react';
import PageMeta from "../components/common/PageMeta";
import { useEffect, useRef, useState, useMemo } from "react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchAllStudents } from "../service";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../stores/user";
import { langSelector, selectWordTranslation } from "../stores/translation";
import { onErrorToast } from "../util";

export interface StudentObject {
    id?: number,
    admission?: string,
    date_of_admission?: string,
    fname: string,
    lname: string,
    address: string,
    city: string,
    county: string,
    zip: string,
    parent: string,
    form: string,
    stream: string,
    current_term?: string,
    expected_grad: string,
    gender: string,
    dob: string,
    birth_cert: string,
    nemis_no: string,
    huduma_no: string,
    is_active?: string,
    pic?: string,
    created_at?: string,
    updated_at?: string,
    kcpe: string,
    plabel?: string,
    flabel?: string,
    slabel?: string
}

export default function Students() {
    const bearerToken = useSelector(selectAccessToken) as string;
    const currentLang = useSelector(langSelector);

    const gridRef = useRef(undefined);
    const [data, setData] = useState<StudentObject[]>();
    const [selectedData, setSelectedData] = useState<StudentObject | undefined>();

    // ✅ TRANSLATIONS (ALL HERE)
    const studentsText = useSelector(selectWordTranslation("Students"));
    const admittedOnText = useSelector(selectWordTranslation("Admitted On"));
    const nameText = useSelector(selectWordTranslation("Name"));
    const addressText = useSelector(selectWordTranslation("Address"));
    const cityText = useSelector(selectWordTranslation("City"));
    const countyText = useSelector(selectWordTranslation("County"));
    const levelText = useSelector(selectWordTranslation("Level"));
    const streamText = useSelector(selectWordTranslation("Stream"));
    const genderText = useSelector(selectWordTranslation("Gender"));
    const dobText = useSelector(selectWordTranslation("Dob"));

    // ✅ COLUMN DEFINITIONS (memoized with translations)
    const colDefs = useMemo<ColDef<StudentObject>[]>(() => [
        { width: 150, field: "admission", headerName: '#Adm No', filter: true },
        { width: 150, field: "date_of_admission", headerName: admittedOnText, filter: true },
        {
            width: 200,
            headerName: nameText,
            filter: true,
            valueGetter: (value: ValueGetterParams) =>
                `${value.data.fname} ${value.data.lname}`
        },
        { width: 200, field: "address", headerName: addressText, filter: true },
        { width: 100, field: "city", headerName: cityText, filter: true },
        { width: 100, field: "county", headerName: countyText, filter: true },
        { width: 100, field: "flabel", headerName: levelText, filter: true },
        { width: 100, field: "slabel", headerName: streamText, filter: true },
        { width: 100, field: "gender", headerName: genderText, filter: true },
        { width: 150, field: "dob", headerName: dobText, filter: true },
    ], [
        admittedOnText,
        nameText,
        addressText,
        cityText,
        countyText,
        levelText,
        streamText,
        genderText,
        dobText
    ]);

    const onBtnExport = () => {
        if (gridRef.current) {
            const grid = gridRef.current as any;
            grid.api.exportDataAsCsv();
        }
    };

    const onLoadStudentsData = async () => {
        const resp = await fetchAllStudents(bearerToken);
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
        setSelectedData(selection.length > 0 ? selection[0] : undefined);
    };

    return (
        <>
            <PageMeta
                title="School LMS - SELMS"
                description="School LMS - SELMS - Students module"
            />

            <PageBreadcrumb pageTitle={studentsText || "Students"} />

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">

                    <StudentManageCard
                        selection={selectedData as StudentObject}
                        onExport={onBtnExport}
                        onRefresh={onLoadStudentsData}
                    />

                    <div style={{ height: '500px', width: '100%', overflowX: 'auto' }}>
                        <AgGridReact
                            // className={textAlign(currentLang)}
                            ref={gridRef as any}
                            containerStyle={{ width: '100%', height: '100%' }}
                            rowData={data}
                            columnDefs={colDefs}
                            pagination={true}
                            paginationPageSize={10}
                            suppressHorizontalScroll={false}
                            ensureDomOrder={true}
                            rowSelection={{ mode: 'singleRow' }}
                            onSelectionChanged={handleSelection}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}