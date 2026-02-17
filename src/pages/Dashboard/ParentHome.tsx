import { useEffect, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { StudentObject } from "../Students";
import { PerformancesObject } from "../Performance/TeacherPerformances";
import { ColDef } from "ag-grid-community";
import { CurrentValueCellRender, onErrorToast, onSuccessToast } from "../../util";
import { AgGridReact } from "ag-grid-react";
import { fetchAllByStudent, fetchAllStudentsByParent, fetchAllTerms, PerformanceByStudentRequest } from "../../service";
import { useSelector } from "react-redux";
import { selectAccessToken, selectLoggedInUser } from "../../stores/user";
import { TermObject } from "../Academics/Terms";

interface StudentWithFeesObject extends StudentObject {
  total_fee: any
  total_paid: any,
  balance: any
}

export const ParentHome: React.FC = () => {
  const bearerToken = useSelector(selectAccessToken) as string;
  const { id } = useSelector(selectLoggedInUser);
  const gridRef = useRef(undefined);
  const grid2Ref = useRef(undefined);
  const [students, setStudents] = useState<StudentWithFeesObject[]>([]);
  const [performance, setPerformance] = useState<PerformancesObject[]>([]);
  const [terms, setTermsData] = useState<TermObject[]>([]);
  const [formData, setFormData] = useState<PerformanceByStudentRequest>({ student: '', term: '' });
  const [sending, setSending] = useState<boolean>(false);


  const [colDefs] = useState<ColDef<StudentWithFeesObject>[]>([
    {
      flex: 1, field: "admission", filter: true, headerName: 'Adm No',
    },
    {
      flex: 1, field: "flabel", filter: true, headerName: 'Form',
    },
    {
      width: 200, field: "fname", filter: true, headerName: 'First name',
    },
    {
      width: 200, field: "lname", filter: true, headerName: 'Last name',
    },
    {
      flex: 1, field: "slabel", headerName: 'Stream', filter: true,
    },
    {
      flex: 1, field: "total_fee", headerName: 'Fees', filter: true,
      cellRenderer: (param: any) => CurrentValueCellRender.renderFee(param.value),
    },
    {
      flex: 1, field: "total_paid", headerName: 'Paid', filter: true,
      cellRenderer: (param: any) => CurrentValueCellRender.renderFee(param.value),
    },
    {
      flex: 1, field: "balance", headerName: 'Balance', filter: true,
      cellRenderer: (param: any) => CurrentValueCellRender.renderFee(param.value),
    },
  ]);

  const [col2Defs] = useState<ColDef<PerformancesObject>[]>([
    {
      width: 150, field: "student_data", filter: true, headerName: '#Adm No',
      valueFormatter: (p: any) => p.value.admission,
    },
    {
      width: 200, field: "student_data", filter: true, headerName: 'Name',
      valueFormatter: (p: any) => `${p.value.fname} ${p.value.lname}`,
    },
    {
      width: 150, field: "level_data", filter: true, headerName: 'Level/Form',
      valueFormatter: (p: any) => p.value.name,
    },
    {
      width: 150, field: "stream_data", filter: true, headerName: 'Stream',
      valueFormatter: (p: any) => p.value.label,
    },
    {
      width: 200, field: "subject_data", filter: true, headerName: 'Subject',
      valueFormatter: (p: any) => p.value.name,
    },
    {
      width: 200, field: "assessment_group_data", filter: true, headerName: 'Assessment category',
      valueFormatter: (p: any) => p.value.name,
    },
    {
      width: 100, field: "mark", filter: true, headerName: 'Score',
      cellRenderer: (param: any) => CurrentValueCellRender.renderPassMark(param.value),
    },
    { width: 100, field: "grade", filter: true },
    {
      width: 100, field: "created_at", headerName: 'Graded On', filter: true,
      cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value),
    },
    {
      width: 100, field: "updated_at", headerName: 'Last Modified On', filter: true,
      cellRenderer: (param: any) => CurrentValueCellRender.renderLocalDate(param.value),
    },
  ]);

  const onLoadPageData = async () => {
    const { success, data, message } = await fetchAllStudentsByParent(bearerToken, String(id));
    if (success) {
      setStudents(data.data);
    } else {
      onErrorToast(message);
    }

    const terms = await fetchAllTerms(bearerToken);
    if (terms.success) {
      setTermsData(terms.data.data);
    } else {
      onErrorToast(terms.message);
    }
  }

  useEffect(() => {
    async function LoadDefaults() {
      await onLoadPageData();
    }
    LoadDefaults();
  }, [])

  const onStudentChanged = (event: any) => {
    const value = event.target.value;
    if (value) {
      setFormData({ ...formData, student: value });
    }
  }

  const onTermChanged = (event: any) => {
    const value = event.target.value;
    if (value) {
      setFormData({ ...formData, term: value });
    }
  }

  const onSubmitSearch = async (form: PerformanceByStudentRequest) => {
    setSending(true);
    const { success, data, message } = await fetchAllByStudent(form, bearerToken);
    setSending(false);
    if (success) {
      setPerformance(data.data);
      if (data.data.length === 0)
        onSuccessToast(message + " No records found!");
    } else {
      onErrorToast(message);
    }
  }

  const onExportCSV = () => {
    if (grid2Ref.current) {
      const grid = grid2Ref.current as any;
      grid.api.exportDataAsCsv();
    }
  }

  return (
    <>
      <PageMeta
        title="School LMS - SELMS"
        description="School LMS - SELMS"
      />
      <div className="">

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Students</h2>

          <div style={{ height: '250px', width: '100%', overflowX: 'auto' }}>
            <AgGridReact
              ref={gridRef as any}
              containerStyle={{ width: '100%', height: '100%' }}
              rowData={students}
              columnDefs={colDefs}
              pagination={true}
              paginationPageSize={10}
              suppressHorizontalScroll={false}
              enableCellTextSelection={true}
              ensureDomOrder={true}
              rowSelection={{ mode: 'singleRow' }}
              onSelectionChanged={() => undefined}
            />
          </div>

        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance</h2>

          <div className="inline-flex items-center gap-3">
            <div className="mb-6">
              <select onChange={onStudentChanged} id="student-select" className="block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Choose a student...</option>
                {
                  students.map(student =>
                    (<option value={student.admission}>{student.fname} {student.lname} ({student.flabel})</option>))
                }
              </select>
            </div>

            <div className="mb-6">
              <select onChange={onTermChanged} id="student-select" className="block w-72 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Choose a term...</option>
                {
                  terms.map(term =>
                    (<option value={term.id}>{term.label}({term.year})</option>))
                }
              </select>
            </div>

            <div className="mb-6 w-32">
              <button disabled={!formData.student || !formData.term}
                onClick={() => onSubmitSearch(formData)}
                type="button"
                className={`btn btn-success btn-update-event flex w-32 justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white sm:w-auto
        ${!formData.student || !formData.term
                    ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'
                    : 'bg-brand-500 hover:bg-brand-600'
                  }`}
              >
                {sending ? 'Searching...' : 'Search Now'}
              </button>
            </div>

            <div className="mb-6">
              <button disabled={!performance.length}
                onClick={() => onExportCSV()}
                type="button"
                className={`btn btn-outline btn-update-event flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto
        ${!performance.length
                    ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-brand-500 text-brand-500 hover:bg-brand-50'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>

          <div style={{ height: '500px', width: '100%', overflowX: 'auto' }}>
            <AgGridReact
              ref={grid2Ref as any}
              containerStyle={{ width: '100%', height: '100%' }}
              rowData={performance}
              columnDefs={col2Defs}
              pagination={true}
              paginationPageSize={10}
              suppressHorizontalScroll={false}
              enableCellTextSelection={true}
              ensureDomOrder={true}
              rowSelection={{ mode: 'singleRow' }}
              onSelectionChanged={() => undefined}
            />
          </div>

        </div>
      </div>
    </>
  );
};