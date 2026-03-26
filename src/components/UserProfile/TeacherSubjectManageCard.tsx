/* eslint-disable react-hooks/exhaustive-deps */
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import Label from "../form/Label";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { selectWordTranslation } from "../../stores/translation";
import {
  addNewTeacherSubject,
  editTeacherSubject,
  fetchAllSubjects,
  fetchAllTeachers,
} from "../../service";
import { onErrorToast, onSuccessToast } from "../../util";
import { TeacherSubjectObject } from "../../pages/TeacherSubjects";

export default function TeacherSubjectManageCard({
  selection,
  onExport,
  onRefresh,
}: {
  selection: TeacherSubjectObject;
  onExport: any;
  onRefresh: any;
}) {
  const bearerToken = useSelector(selectAccessToken) as string;

  // TRANSLATIONS
  const editText = useSelector(selectWordTranslation("Edit Selected"));
  const assignText = useSelector(selectWordTranslation("Assign Subject"));
  const refreshText = useSelector(selectWordTranslation("Refresh"));
  const exportText = useSelector(selectWordTranslation("Export"));
  const closeText = useSelector(selectWordTranslation("Close"));
  const submitText = useSelector(selectWordTranslation("Submit"));
  const saveChangesText = useSelector(selectWordTranslation("Save Changes"));

  const teacherText = useSelector(selectWordTranslation("Teacher_data"));
  const subjectText = useSelector(selectWordTranslation("Subject"));
  const selectOptionText = useSelector(selectWordTranslation("Select option"));

  const assignTitleText = useSelector(selectWordTranslation("Assign Teacher Subjects"));
  const assignInfoText = useSelector(selectWordTranslation("Assignment Information"));
  const editTitleText = useSelector(selectWordTranslation("Editing Teacher Subject"));

  const createdSuccessText = useSelector(
    selectWordTranslation("Assigned created successfully!")
  );
  const updatedSuccessText = useSelector(
    selectWordTranslation("Updated successfully!")
  );

  const [teachers, setTeachersData] = useState<any[]>();
  const [subjects, setSubjectsData] = useState<any[]>();

  const { isOpen, openModal, closeModal } = useModal();
  const editModal = useModal();

  const onCreateTeacherSubject = async (values: TeacherSubjectObject) => {
    const resp = await addNewTeacherSubject(bearerToken, values);
    if (resp.success) {
      closeModal();
      setTimeout(() => {
        onSuccessToast(createdSuccessText as string);
      }, 300);
    } else {
      onErrorToast(resp.message);
    }
  };

  const onEditTeacherSubject = async (values: any) => {
    const resp = await editTeacherSubject(
      selection.id as any,
      bearerToken,
      values
    );
    if (resp.success) {
      editModal.closeModal();
      setTimeout(() => {
        onSuccessToast(updatedSuccessText as string);
      }, 500);
    } else {
      onErrorToast(resp.message);
    }
  };

  const onLoadPageData = async () => {
    const teachers = await fetchAllTeachers(bearerToken);
    if (teachers.success) {
      setTeachersData(teachers.data.data);
    } else {
      onErrorToast(teachers.message);
    }

    const subjects = await fetchAllSubjects(bearerToken);
    if (subjects.success) {
      setSubjectsData(subjects.data.data);
    } else {
      onErrorToast(subjects.message);
    }
  };

  useEffect(() => {
    onLoadPageData();
  }, []);

  return (
    <>
      <div className="p-5 lg:p-6">
        <div className="flex flex-col gap-1 xl:flex-row">

          {/* EDIT */}
          {selection && (
            <button
              onClick={editModal.openModal}
              className="flex w-full items-center text-white bg-brand-500 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
            >
              {editText as string}
            </button>
          )}

          {/* ASSIGN */}
          <button
            onClick={openModal}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
          >
            {assignText as string}
          </button>

          {/* REFRESH */}
          <button
            onClick={onRefresh}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
          >
            {refreshText as string}
          </button>

          {/* EXPORT */}
          <button
            onClick={onExport}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-64"
          >
            {exportText as string}
          </button>
        </div>
      </div>

      {/* ADD MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="rounded-3xl bg-white p-4 lg:p-11">
          <h4 className="text-2xl font-semibold">
            {assignTitleText as string}
          </h4>

          <Formik
            initialValues={{ subject: "", teacher: "" }}
            validationSchema={CreateTeacherSubjectSchema}
            onSubmit={onCreateTeacherSubject}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form className="flex flex-col">
                <h5 className="mt-6 mb-5 text-lg font-medium">
                  {assignInfoText as string}
                </h5>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Label>{teacherText as string}</Label>
                    <select
                      value={values.teacher}
                      onChange={handleChange("teacher")}
                      className="h-11 w-full rounded-lg border px-4"
                    >
                      <option value="">{selectOptionText as string}</option>
                      {teachers?.map((f: any) => (
                        <option value={f.id}>
                          {f.fname} {f.lname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>{subjectText as string}</Label>
                    <select
                      value={values.subject}
                      onChange={handleChange("subject")}
                      className="h-11 w-full rounded-lg border px-4"
                    >
                      <option value="">{selectOptionText as string}</option>
                      {subjects?.map((f: any) => (
                        <option value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 justify-end">
                  <Button variant="outline" onClick={closeModal}>
                    {closeText as string}
                  </Button>
                  <Button onClick={handleSubmit}>
                    {submitText as string}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      {selection && (
        <Modal
          isOpen={editModal.isOpen}
          onClose={editModal.closeModal}
          className="max-w-[700px] m-4"
        >
          <div className="rounded-3xl bg-white p-4 lg:p-11">
            <h4 className="text-2xl font-semibold">
              {editTitleText as string}
            </h4>

            <Formik
              initialValues={{ ...selection }}
              validationSchema={CreateTeacherSubjectSchema}
              onSubmit={onEditTeacherSubject}
            >
              {({ handleSubmit, handleChange, values }) => (
                <form className="flex flex-col">
                  <div className="grid grid-cols-2 gap-5 mt-6">
                    <div>
                      <Label>{teacherText as string}</Label>
                      <select
                        value={values.teacher}
                        onChange={handleChange("teacher")}
                        className="h-11 w-full rounded-lg border px-4"
                      >
                        <option value="">{selectOptionText as string}</option>
                        {teachers?.map((f: any) => (
                          <option value={f.id}>
                            {f.fname} {f.lname}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>{subjectText as string}</Label>
                      <select
                        value={values.subject}
                        onChange={handleChange("subject")}
                        className="h-11 w-full rounded-lg border px-4"
                      >
                        <option value="">{selectOptionText as string}</option>
                        {subjects?.map((f: any) => (
                          <option value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 justify-end">
                    <Button
                      variant="outline"
                      onClick={editModal.closeModal}
                    >
                      {closeText as string}
                    </Button>
                    <Button onClick={handleSubmit}>
                      {saveChangesText as string}
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

export const CreateTeacherSubjectSchema = Yup.object().shape({
  subject: Yup.string().max(5).required(),
  teacher: Yup.string().max(5).required(),
});