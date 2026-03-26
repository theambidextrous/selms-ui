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
import { addNewForm, editForm } from "../../service";
import { onErrorToast, onSuccessToast } from "../../util";
import { FormObject } from "../../pages/Academics/Forms";
import { selectWordTranslation } from "../../stores/translation/translationSelector";

export default function FormManageCard({
  selection,
  onExport,
  onRefresh
}: {
  selection: FormObject,
  onExport: any,
  onRefresh: any
}) {

  const bearerToken = useSelector(selectAccessToken) as string;
  const { isOpen, openModal, closeModal } = useModal();
  const editModal = useModal();

  // ✅ TRANSLATIONS
  const manageLabel = useSelector(selectWordTranslation("Manage Selected"));
  const addFormLabel = useSelector(selectWordTranslation("Add Form"));
  const refreshLabel = useSelector(selectWordTranslation("Refresh"));
  const exportLabel = useSelector(selectWordTranslation("Export"));

  const closeLabel = useSelector(selectWordTranslation("Close"));
  const submitLabel = useSelector(selectWordTranslation("Submit"));
  const saveChangesLabel = useSelector(selectWordTranslation("Save Changes"));

  const formInfoLabel = useSelector(selectWordTranslation("Form Information"));
  const addFormTitleLabel = useSelector(selectWordTranslation("Add New Form Information"));
  const addFormDescLabel = useSelector(selectWordTranslation("Add Form details so that subjects/programs can be linked to it"));

  const editFormTitleLabel = useSelector(selectWordTranslation("Editing form"));
  const editFormDescLabel = useSelector(selectWordTranslation("Update form details to keep the record up to date"));

  const formNameLabel = useSelector(selectWordTranslation("Form/Level Name"));
  const descriptionLabel = useSelector(selectWordTranslation("Description"));

  // ✅ ACTIONS
  const onCreateForm = async (values: FormObject) => {
    const resp = await addNewForm(bearerToken, values);
    if (resp.success) {
      closeModal();
      setTimeout(() => onSuccessToast('Form created successfully!'), 300);
    } else {
      onErrorToast(resp.message);
    }
  };

  const onEditForm = async (values: any) => {
    const resp = await editForm(selection.id as any, bearerToken, values);
    if (resp.success) {
      editModal.closeModal();
      setTimeout(() => onSuccessToast('Form updated successfully!'), 500);
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
            {addFormLabel}
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
            {addFormTitleLabel}
          </h4>
          <p className="text-sm mb-6 text-gray-500">
            {addFormDescLabel}
          </p>

          <Formik
            initialValues={{
              name: '',
              description: '',
            }}
            validationSchema={CreateFormSchema}
            onSubmit={onCreateForm}
          >
            {({ errors, touched, handleSubmit, handleChange, values }) => (
              <form>

                <h5 className="mb-4 font-medium">{formInfoLabel}</h5>

                <Label>{formNameLabel}</Label>
                <Input value={values.name} onChange={handleChange('name')} />
                {errors.name && touched.name && <div>{errors.name}</div>}

                <Label>{descriptionLabel}</Label>
                <Input value={values.description} onChange={handleChange('description')} />
                {errors.description && touched.description && <div>{errors.description}</div>}

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
              {editFormTitleLabel} <b>{selection.name}</b>
            </h4>
            <p className="text-sm mb-6 text-gray-500">
              {editFormDescLabel}
            </p>

            <Formik
              initialValues={selection}
              validationSchema={CreateFormSchema}
              onSubmit={onEditForm}
            >
              {({ errors, touched, handleSubmit, handleChange, values }) => (
                <form>

                  <h5 className="mb-4">{formInfoLabel}</h5>

                  <Label>{formNameLabel}</Label>
                  <Input value={values.name} onChange={handleChange('name')} />
                  {errors.name && touched.name && <div>{errors.name}</div>}

                  <Label>{descriptionLabel}</Label>
                  <Input value={values.description} onChange={handleChange('description')} />
                  {errors.description && touched.description && <div>{errors.description}</div>}

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

export const CreateFormSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  description: Yup.string().min(3, 'Too Short!').max(1000, 'Too Long!').required('Required field'),
});