/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import * as Yup from 'yup';
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { useSelector } from "react-redux";
import { addSetup, fetchSchoolSetup } from "../../service";
import { selectAccessToken } from "../../stores/user";
import { ChangeEvent, useEffect, useState } from "react";
import { onErrorToast, onSuccessToast } from "../../util";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

export interface SchoolSetUpObject {
  id?: number,
  school: string,
  address: string,
  city: string,
  county: string,
  zip: string,
  email: string,
  phone: string,
  website: string,
  motto: string,
  logo: string,
}

export default function Setups() {
  const bearerToken = useSelector(selectAccessToken) as string;
  const editModal = useModal();
  const [data, setData] = useState<SchoolSetUpObject | null>();
  const handleSubmitData = async (values: SchoolSetUpObject) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const created = await addSetup(bearerToken, formData);
    if(created.success) {
      onSuccessToast("Updated successfully!");
      await loadSetupInfo();
      editModal.closeModal();
    }else {
      onErrorToast(created.message);
    }
  }

  const loadSetupInfo = async () => {
    const resp = await fetchSchoolSetup(bearerToken);
    if(resp.success){
      setData(resp.data?.data);
    }else{
      onErrorToast(resp.message);
    }
  }

  useEffect(() => {
      async function LoadDefaults(){
          await loadSetupInfo();
      }
      LoadDefaults();
  }, [])

  return (
    <div>
      <PageMeta
        title="School LMS - SELMS"
        description="School LMS - SELMS"
      />
      <PageBreadcrumb pageTitle="Setups" subTitle="Use this page to configure school information such as branding and contacts." />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      { data && (
         <div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>School Name</Label>
                <Input disabled type="text" value={data.school} />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>School Motto</Label>
                <Input disabled type="text" value={data.motto}/>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Address</Label>
                <Input disabled type="text" value={data.address} />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>City</Label>
                <Input disabled type="text" value={data.city} />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>County</Label>
                <Input disabled type="text" value={data.county} />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Zip</Label>
                <Input disabled type="text" value={data.zip} />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Email</Label>
                <Input disabled type="text" value={data.email} />
              </div>

              <div className="col-span-2 lg:col-span-1">
                  <Label>Phone</Label>
                  <Input disabled type="text" value={data.phone} />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Website</Label>
                <Input disabled type="text" value={data.website} />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label className="flex">
                  Logo
                  <img
                    src={data.logo}
                    style={{marginLeft: 30}}
                    alt="Cover"
                    className="w-12 h-12 border border-gray-200 rounded-xl dark:border-gray-800"
                  />
                </Label>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" onClick={editModal.openModal}>
                Modify information
              </Button>
            </div>
          </div>
        )}
        {/* Modal */}
        <Modal isOpen={editModal.isOpen} onClose={editModal.closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Update setup information
              </h4>
            </div>
            <Formik
              initialValues={data as SchoolSetUpObject}
              validationSchema={SchoolSetupSchema}
              onSubmit={handleSubmitData}
            >
              {({ handleChange, values, touched, errors, setFieldValue, handleSubmit}) => {
                return (
                  <div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                      <div className="col-span-2 lg:col-span-1">
                        <Label>School Name</Label>
                        <Input onChange={handleChange('school')} type="text" value={values.school} />
                        {errors.school && touched.school ? (
                          <div className='text-error-400'>{errors.school}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>School Motto</Label>
                        <Input onChange={handleChange('motto')} type="text" value={values.motto}/>
                        {errors.motto && touched.motto ? (
                          <div className='text-error-400'>{errors.motto}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Address</Label>
                        <Input onChange={handleChange('address')} type="text" value={values.address} />
                        {errors.address && touched.address ? (
                          <div className='text-error-400'>{errors.address}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>City</Label>
                        <Input onChange={handleChange('city')} type="text" value={values.city} />
                        {errors.city && touched.city ? (
                          <div className='text-error-400'>{errors.city}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>County</Label>
                        <Input onChange={handleChange('county')} type="text" value={values.county} />
                        {errors.county && touched.county ? (
                          <div className='text-error-400'>{errors.county}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Zip</Label>
                        <Input onChange={handleChange('zip')} type="text" value={values.zip} />
                        {errors.zip && touched.zip ? (
                          <div className='text-error-400'>{errors.zip}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Email</Label>
                        <Input onChange={handleChange('email')} type="text" value={values.email} />
                        {errors.email && touched.email ? (
                        <div className='text-error-400'>{errors.email}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                          <Label>Phone</Label>
                          <Input onChange={handleChange('phone')} type="text" value={values.phone} />
                          {errors.phone && touched.phone ? (
                          <div className='text-error-400'>{errors.phone}</div>
                          ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Website</Label>
                        <Input onChange={handleChange('website')} type="text" value={values.website} />
                        {errors.website && touched.website ? (
                        <div className='text-error-400'>{errors.website}</div>
                        ) : null}
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label className="flex">
                          Logo
                          { data && data.logo && (
                            <img
                              src={data.logo}
                              style={{marginLeft: 30}}
                              alt="Cover"
                              className="w-12 h-6 border border-gray-200 rounded-xl dark:border-gray-800"
                            />
                          )}
                        </Label>
                        <FileInput 
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const { files } = event.currentTarget;
                            if(files && files?.length > 0){
                              setFieldValue('logo', files[0]);
                            }
                          }} 
                          className="custom-class" 
                        />
                        {errors.logo && touched.logo ? (
                        <div className='text-error-400'>{errors.logo}</div>
                        ) : null}
                      </div>

                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                      <Button size="sm" onClick={handleSubmit}>
                        Save Changes
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

const SchoolSetupSchema = Yup.object().shape({
  school: Yup.string().min(3, 'Too Short!').max(255, 'Too Long!').required('Required field'),
  address: Yup.string().min(3, 'Too Short!').max(55, 'Too Long!').required('Required field'),
  city: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  county: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  zip: Yup.number().min(5, 'Too Short!').max(99999, 'Too Long!').required('Required field'),
  email: Yup.string().email('Invalid email').required('Required field'),
  phone: Yup.string().max(15, 'Too Long!').required('Required field'),
  website: Yup.string().min(5, 'Too Short!').max(155, 'Too Long!').required('Required field'),
  motto: Yup.string().min(3, 'Too Short!').max(55, 'Too Long!').required('Required field'),
  // logo: Yup.mixed()
  //   .test('fileType', 'Unsupported file format', (value: any) => 
  //     value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
  //   ),
});
