import { Formik } from "formik";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import * as Yup from 'yup';
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { useSelector } from "react-redux";
import { addNewTranslation, editTranslation, fetchAllTranslations } from "../../service";
import { selectAccessToken } from "../../stores/user";
import { useEffect, useRef, useState } from "react";
import { onErrorToast, onSuccessToast, textAlign } from "../../util";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import TextArea from "../../components/form/input/TextArea";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { langSelector, selectWordTranslation } from "../../stores/translation";

export interface TranslationObject {
  id?: number,
  en: string,
  ar: string,
}

export default function Translations() {
  const currentLang = useSelector(langSelector);
  const bearerToken = useSelector(selectAccessToken) as string;
  const editModal = useModal();
   const addModal = useModal();
  const [data, setData] = useState<TranslationObject[]>([]);
  const gridRef = useRef(undefined);
  const [selectedData, setSelectedData] = useState<TranslationObject | undefined>();
  const [colDefs] = useState<ColDef<TranslationObject>[]>([
    { 
        flex:1, field: "en", filter: true, headerName: 'English',
        valueFormatter: (p: any) => p.value,
    },
    { 
        flex:1, field: "ar", filter: true, headerName: 'Arabic',
        valueFormatter: (p: any) => p.value,
    },
  ]);

  const onBtnExport = () => {
    if(gridRef.current){
      const grid = gridRef.current as any;
      grid.api.exportDataAsCsv();
    }
  };

  const onAddNewTranslation = async (values: TranslationObject) => {
    const created = await addNewTranslation(bearerToken, { en: values.en.trim(), ar: values.ar.trim() });
    if(created.success) {
      onSuccessToast("Created successfully!");
      await loadTranslations();
      addModal.closeModal();
    }else {
      onErrorToast(created.message);
    }
  }

  const onEditTranslation = async (values: TranslationObject) => {
    const updated = await editTranslation(selectedData?.id, bearerToken, { en: values.en.trim(), ar: values.ar.trim() });
    if(updated.success) {
      onSuccessToast("Updated successfully!");
      await loadTranslations();
      editModal.closeModal();
    }else {
      onErrorToast(updated.message);
    }
  }

  const loadTranslations = async () => {
    const resp = await fetchAllTranslations();
    if(resp.success){
      setData(resp.data?.data);
    }else{
      onErrorToast(resp.message);
    }
  }

  const handleSelection = (params: any) => {
    const selection: any[] = params.api.getSelectedRows();
    if(selection.length > 0){
      setSelectedData(selection[0]);
    }else{
      setSelectedData(undefined);
    }
  }

  useEffect(() => {
      async function LoadDefaults(){
          await loadTranslations();
      }
      LoadDefaults();
  }, [])

  const enLabel =  useSelector(selectWordTranslation('English'));
  const arabicLabel =  useSelector(selectWordTranslation('Arabic'));
  const btnLabel =  useSelector(selectWordTranslation('Save Translation'));

  return (
    <div>
      <PageMeta
        title="School LMS - SELMS"
        description="School LMS - SELMS"
      />
      <PageBreadcrumb 
        pageTitle="System Translations" 
        subTitle="Use this page to translate system language words from english to arabic and vice versa." 
      />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* Grid data */}
        <div>
          <div className="flex items-center gap-3 px-2 lg:justify-end">
            <Button variant="outline"  size="sm" onClick={addModal.openModal}>
              { String(useSelector(selectWordTranslation('Translate words'))) }
            </Button>
            <Button variant="primary"  size="sm" onClick={onBtnExport}>
              { String(useSelector(selectWordTranslation('Export words'))) }
            </Button>
          </div>
        </div>
       <div className="mt-6" style={{ height: '500px', width: '100%', overflowX: 'auto' }}>
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
        {/* Modal */}
        <Modal isOpen={addModal.isOpen} onClose={addModal.closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className={`mb-2 ${textAlign(currentLang)} text-2xl font-semibold text-gray-800 dark:text-white/90`}>
                { String(useSelector(selectWordTranslation('Translate words & Sentences'))) }
              </h4>
            </div>
            <Formik
              initialValues={{ en: '', ar: ''}}
              validationSchema={TranslationSchema}
              onSubmit={onAddNewTranslation}
            >
              {({ handleChange, values, errors, handleSubmit}) => {
                return (
                  <div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                      <div className="col-span-2 lg:col-span-1">
                        <Label className={`${textAlign(currentLang)}`}>{ enLabel }</Label>
                        <TextArea
                          rows={3}
                          value={values.en}
                          onChange={handleChange('en')}
                          hint="Enter english word or sentence"
                        />
                        {errors.en ? (
                          <div className='text-error-400'>{errors.en}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label className={`${textAlign(currentLang)}`}>{ arabicLabel }</Label>
                        <TextArea
                          rows={3}
                          value={values.ar}
                          onChange={handleChange('ar')}
                          hint="Enter arabic word or sentence"
                        />
                        {errors.ar ? (
                          <div className='text-error-400'>{errors.ar}</div>
                        ) : null}
                      </div>

                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                      <Button size="sm" onClick={handleSubmit}>
                        { btnLabel }
                      </Button>
                    </div>
                  </div>
                )
              }}
            </Formik>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal isOpen={editModal.isOpen} onClose={editModal.closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Edit Word Translations
              </h4>
            </div>
            <Formik
              initialValues={selectedData as TranslationObject}
              validationSchema={TranslationSchema}
              onSubmit={onEditTranslation}
            >
              {({ handleChange, values, errors, handleSubmit}) => {
                return (
                  <div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                      <div className="col-span-2 lg:col-span-1">
                        <Label>English</Label>
                        <TextArea
                          rows={3}
                          value={values.en}
                          onChange={handleChange('en')}
                          hint="Enter english word or sentence"
                        />
                        {errors.en ? (
                          <div className='text-error-400'>{errors.en}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Arabic</Label>
                        <TextArea
                          rows={3}
                          value={values.ar}
                          onChange={handleChange('ar')}
                          hint="Enter arabic word or sentence"
                        />
                        {errors.ar ? (
                          <div className='text-error-400'>{errors.ar}</div>
                        ) : null}
                      </div>

                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                      <Button size="sm" onClick={handleSubmit}>
                        Save changes
                      </Button>
                    </div>
                  </div>
                )
              }}
            </Formik>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const TranslationSchema = Yup.object().shape({
  en: Yup.string().max(1024, 'Too Long!').required('Required field'),
  ar: Yup.string().max(1024, 'Too Long!').required('Required field'),
});
