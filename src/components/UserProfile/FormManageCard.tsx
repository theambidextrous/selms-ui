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


export default function FormManageCard({ selection, onExport, onRefresh } : { selection: FormObject, onExport: any, onRefresh: any}) {
  const bearerToken = useSelector(selectAccessToken) as string;
  const { isOpen, openModal, closeModal } = useModal();
  const editModal = useModal();

  const onCreateForm = async (values : FormObject) => {
    const resp = await addNewForm(bearerToken, values);
    if(resp.success){
      closeModal();
      setTimeout(() => {
        onSuccessToast('Form created successfully!');
      }, 300);
    }else{
      onErrorToast(resp.message);
    }
  }

  const onEditForm = async (values : any) => {
    const resp = await editForm(selection.id as any, bearerToken, values);
    if(resp.success){
      editModal.closeModal();
      setTimeout(() => {
        onSuccessToast('Form updated successfully!');
      }, 500);
    }else{
      onErrorToast(resp.message);
    }
  }

  const onLoadPageData = async () => {

  }

  useEffect(() => {
    async function LoadDefaults(){
      await onLoadPageData();
    }
    LoadDefaults();
  }, [])

  return (
    <>
      <div className="p-5 lg:p-6">
        <div className="flex flex-col gap-1 xl:flex-row">
          { selection && (
            <button
              onClick={editModal.openModal}
              className="flex w-full items-center text-white bg-brand-500 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              height="2em"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0a3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372l6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
              ></path>
            </svg>
              Edit Selected
            </button>
          )}
          <button
            onClick={openModal}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
          >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="2em"
            height="2em"
          >
            <path
              fill="currentColor"
              d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1m0-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
            ></path>
          </svg>
            Add Form
          </button>
          <button
            onClick={onRefresh}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              height="2em"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              >
                <path
                  strokeMiterlimit="10"
                  d="M18.024 16.957A8.373 8.373 0 0 1 3.74 11.045"
                ></path>
                <path
                  strokeLinejoin="round"
                  d="m17.35 21.25l.832-3.372a1.123 1.123 0 0 0-.854-1.382l-3.372-.843"
                ></path>
                <path
                  strokeMiterlimit="10"
                  d="M5.976 7.043a8.373 8.373 0 0 1 14.285 5.912"
                ></path>
                <path
                  strokeLinejoin="round"
                  d="m6.65 2.75l-.832 3.372a1.124 1.124 0 0 0 .855 1.382l3.371.843"
                ></path>
              </g>
            </svg>
            Refresh
          </button>
          <button
            onClick={onExport}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-64"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="2em"
              height="2em"
            >
              <path
                fill="currentColor"
                d="M94.284 65.553L75.825 52.411a1.25 1.25 0 0 0-1.312-.093c-.424.218-.684.694-.685 1.173l.009 6.221H57.231c-.706 0-1.391.497-1.391 1.204v11.442c0 .707.685 1.194 1.391 1.194h16.774v6.27c0 .478.184.917.609 1.136s.853.182 1.242-.097l18.432-13.228c.335-.239.477-.626.477-1.038v-.002c0-.414-.144-.8-.481-1.04"
              ></path>
              <path
                fill="currentColor"
                d="M64.06 78.553h-6.49a1.73 1.73 0 0 0-1.73 1.73h-.007v3.01H15.191V36.16h17.723a1.73 1.73 0 0 0 1.73-1.73V16.707h21.188v36.356h.011a1.73 1.73 0 0 0 1.726 1.691h6.49c.943 0 1.705-.754 1.726-1.691h.004V12.5h-.005V8.48a1.73 1.73 0 0 0-1.73-1.73h-32.87L5.235 32.7v58.819c0 .956.774 1.73 1.73 1.73h57.089a1.73 1.73 0 0 0 1.73-1.73v-2.448h.005v-8.79a1.73 1.73 0 0 0-1.729-1.728"
              ></path>
              <path
                fill="currentColor"
                d="M26.18 64.173c.831 0 1.55.623 1.786 1.342l2.408-1.121c-.553-1.273-1.771-2.685-4.193-2.685c-2.893 0-5.079 1.924-5.079 4.775c0 2.837 2.187 4.774 5.079 4.774c2.422 0 3.654-1.467 4.193-2.699l-2.408-1.107c-.235.719-.955 1.342-1.786 1.342c-1.342 0-2.242-1.024-2.242-2.311s.899-2.31 2.242-2.31m9.476 4.734a4.3 4.3 0 0 1-2.976-1.19l-1.453 2.076c.982.886 2.325 1.467 4.291 1.467c2.477 0 3.986-1.176 3.986-3.211c0-3.432-5.135-2.685-5.135-3.557c0-.235.152-.415.706-.415c.872 0 1.91.304 2.712.913l1.495-1.979c-1.052-.858-2.408-1.287-3.917-1.287c-2.533 0-3.833 1.495-3.833 3.059c0 3.64 5.148 2.74 5.148 3.626c0 .359-.498.498-1.024.498m7.615-7.045h-3.169l3.404 9.231h3.516l3.404-9.231h-3.169l-1.993 6.214z"
              ></path>
            </svg>
            Export
          </button>
        </div>
      </div>
      {/* Add modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add New Form Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Add Form details so that subjects/programs can be linked to it.
            </p>
          </div>
            <Formik
              initialValues={{
                name: '',
                description: '',
              }}
              validationSchema={CreateFormSchema}
              onSubmit={onCreateForm}
            >
              {({ errors, touched, handleSubmit, handleChange, values }) => (
                <form className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="mt-7">
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                Form Information
                            </h5>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Form/Level Name</Label>
                                    <Input onChange={handleChange('name')} type="text" value={values.name} />
                                    {errors.name && touched.name ? (
                                        <div className='text-error-400'>{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Description</Label>
                                    <Input onChange={handleChange('description')} type="text" value={values.description} />
                                    {errors.description && touched.description ? (
                                        <div className='text-error-400'>{errors.description}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={closeModal}>
                            Close
                        </Button>
                        <Button size="sm" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
              )}
            </Formik>
        </div>
      </Modal>

      {/* Edit modal */}
      { selection && (
        <Modal isOpen={editModal.isOpen} onClose={editModal.closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Editing <b>{selection.name}</b> Information
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Update Form details to keep the record up to date.
              </p>
            </div>
              <Formik
                initialValues={selection}
                validationSchema={CreateFormSchema}
                onSubmit={onEditForm}
              >
                {({ errors, touched, handleSubmit, handleChange, values }) => (
                  <form className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="mt-7">
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                Personal Information
                            </h5>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Form/Level Name</Label>
                                    <Input onChange={handleChange('name')} type="text" value={values.name} />
                                    {errors.name && touched.name ? (
                                        <div className='text-error-400'>{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Description</Label>
                                    <Input onChange={handleChange('description')} type="text" value={values.description} />
                                    {errors.description && touched.description ? (
                                        <div className='text-error-400'>{errors.description}</div>
                                    ) : null}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                      <Button size="sm" variant="outline" onClick={editModal.closeModal}>
                        Close
                      </Button>
                      <Button size="sm" onClick={handleSubmit}>
                        Save Changes
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
