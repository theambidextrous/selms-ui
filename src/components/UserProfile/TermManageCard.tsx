/* eslint-disable react-hooks/exhaustive-deps */
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { addNewTerm, editTerm } from "../../service";
import { onErrorToast, onSuccessToast, TermYears } from "../../util";
import { TermObject } from "../../pages/Academics/Terms";
import { selectWordTranslation } from "../../stores/translation/translationSelector";
import Switch from "../form/switch/Switch";

export default function TermManageCard({
  selection,
  onExport,
  onRefresh
}: {
  selection: TermObject,
  onExport: any,
  onRefresh: any
}) {

  const bearerToken = useSelector(selectAccessToken) as string;
  const { isOpen, openModal, closeModal } = useModal();
  const editModal = useModal();

  // ✅ TRANSLATIONS
  const manageLabel = useSelector(selectWordTranslation("Manage Selected"));
  const addTermLabel = useSelector(selectWordTranslation("Add Term"));
  const refreshLabel = useSelector(selectWordTranslation("Refresh"));
  const exportLabel = useSelector(selectWordTranslation("Export"));

  const closeLabel = useSelector(selectWordTranslation("Close"));
  const submitLabel = useSelector(selectWordTranslation("Submit"));
  const saveChangesLabel = useSelector(selectWordTranslation("Save Changes"));

  const termInfoLabel = useSelector(selectWordTranslation("Term Information"));
  const addTermTitleLabel = useSelector(selectWordTranslation("Add New Term Information"));
  const addTermDescLabel = useSelector(selectWordTranslation("Add Term details so that subjects/programs can be linked to it"));

  const editTermTitleLabel = useSelector(selectWordTranslation("Editing term"));
  const editTermDescLabel = useSelector(selectWordTranslation("Update term details to keep the record up to date"));

  const termNameFieldLabel = useSelector(selectWordTranslation("Term Name"));
  const termYearFieldLabel = useSelector(selectWordTranslation("Term Year"));
  const startDateLabel = useSelector(selectWordTranslation("Starts On"));
  const endDateLabel = useSelector(selectWordTranslation("Ends On"));
  const currentTermLabel = useSelector(selectWordTranslation("Is Current Term?"));
  const selectYearLabel = useSelector(selectWordTranslation("Select year"));

  // ✅ ACTIONS
  const onCreateTerm = async (values: TermObject) => {
    const resp = await addNewTerm(bearerToken, values);
    if (resp.success) {
      closeModal();
      setTimeout(() => onSuccessToast('Term created successfully!'), 300);
    } else {
      onErrorToast(resp.message);
    }
  };

  const onEditTerm = async (values: any) => {
    const resp = await editTerm(selection.id as any, bearerToken, values);
    if (resp.success) {
      editModal.closeModal();
      setTimeout(() => onSuccessToast('Term updated successfully!'), 500);
    } else {
      onErrorToast(resp.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="p-5 lg:p-6">
        <div className="flex flex-col gap-1 xl:flex-row">

          {selection && (
            <button
              onClick={editModal.openModal}
              className="flex w-full items-center text-white bg-brand-500 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
            >
              {manageLabel}
            </button>
          )}

          <button
            onClick={openModal}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
          >
            {addTermLabel}
          </button>

          <button
            onClick={onRefresh}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
          >
            {refreshLabel}
          </button>

          <button
            onClick={onExport}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-64"
          >
            {exportLabel}
          </button>

        </div>
      </div>

      {/* ADD MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="bg-white p-6 rounded-3xl dark:bg-gray-900">

          <h4 className="text-2xl font-semibold mb-2">
            {addTermTitleLabel}
          </h4>
          <p className="text-sm mb-6 text-gray-500">
            {addTermDescLabel}
          </p>

          <Formik
            initialValues={{
              year: '',
              label: '',
              start: '',
              end: '',
              is_current: 0,
            }}
            validationSchema={CreateTermSchema}
            onSubmit={onCreateTerm}
          >
            {({ errors, touched, handleSubmit, handleChange, setFieldValue, values }) => (
              <form>

                <h5 className="mb-4 font-medium">{termInfoLabel}</h5>

                <Label>{termNameFieldLabel}</Label>
                <Input value={values.label} onChange={handleChange('label')} />
                {errors.label && touched.label && <div>{errors.label}</div>}

                <Label>{termYearFieldLabel}</Label>
                <select value={values.year} onChange={handleChange('year')}>
                  <option value="">{selectYearLabel}</option>
                  {TermYears.map((y: any) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <Label>{startDateLabel}</Label>
                <Input type="date" value={values.start} onChange={handleChange('start')} />

                <Label>{endDateLabel}</Label>
                <Input type="date" value={values.end} onChange={handleChange('end')} />

                <Switch
                  label={currentTermLabel}
                  defaultChecked={values.is_current === 1}
                  onChange={(v) => setFieldValue('is_current', v ? 1 : 0)}
                />

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={closeModal}>
                    {closeLabel}
                  </Button>
                  <Button onClick={handleSubmit}>
                    {submitLabel}
                  </Button>
                </div>

              </form>
            )}
          </Formik>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      {selection && (
        <Modal isOpen={editModal.isOpen} onClose={editModal.closeModal} className="max-w-[700px] m-4">
          <div className="bg-white p-6 rounded-3xl dark:bg-gray-900">

            <h4 className="text-2xl font-semibold mb-2">
              {editTermTitleLabel}
            </h4>
            <p className="text-sm mb-6 text-gray-500">
              {editTermDescLabel}
            </p>

            <Formik
              initialValues={selection}
              validationSchema={CreateTermSchema}
              onSubmit={onEditTerm}
            >
              {({ handleSubmit, handleChange, setFieldValue, values }) => (
                <form>

                  <h5 className="mb-4">{termInfoLabel}</h5>

                  <Label>{termNameFieldLabel}</Label>
                  <Input value={values.label} onChange={handleChange('label')} />

                  <Label>{termYearFieldLabel}</Label>
                  <select value={values.year} onChange={handleChange('year')}>
                    {TermYears.map((y: any) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>

                  <Label>{startDateLabel}</Label>
                  <Input type="date" value={values.start} onChange={handleChange('start')} />

                  <Label>{endDateLabel}</Label>
                  <Input type="date" value={values.end} onChange={handleChange('end')} />

                  <Switch
                    label={currentTermLabel}
                    defaultChecked={values.is_current === 1}
                    onChange={(v) => setFieldValue('is_current', v ? 1 : 0)}
                  />

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" onClick={editModal.closeModal}>
                      {closeLabel}
                    </Button>
                    <Button onClick={handleSubmit}>
                      {saveChangesLabel}
                    </Button>
                  </div>

                </form>
              )}
            </Formik>

          </div>
        </Modal>
      )}
    </>
  );
}

export const CreateTermSchema = Yup.object().shape({
   label: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  year: Yup.string().min(4, 'Too Short!').max(5, 'Too Long!').required('Required field'),
  start: Yup.string().min(10, 'Too Short!').max(12, 'Too Long!').required('Required field'),
  end: Yup.string().min(10, 'Too Short!').max(12, 'Too Long!').required('Required field'),
  is_current: Yup.number().min(0, 'Too Short!').max(1, 'Too Long!').required('Required field'),
});