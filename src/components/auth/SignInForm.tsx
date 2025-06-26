import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { login } from '../../service';
import { useDispatch } from 'react-redux';
import { AuthState, keep, userLogin } from '../../stores/user';


const SigninSchema = Yup.object().shape({
   password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
});

export default function SignInForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined >(undefined);

  const [isChecked, setIsChecked] = useState(false);

  const onLogin = async (values: any) => {
    const resp = await login(values);
    if(!resp.success){
      setError(resp.message);
    }else{
      const { data } = resp.data;
      dispatch(keep({ accessToken: data.token, accessExpiresAt: new Date(2027, 7, 3).getTime() } as AuthState))
      dispatch(userLogin(data));
    }
  }
  
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
            { error !== undefined && (
              <p className='text-error-400 mt-3'>{ error }</p>
            )}
          </div>
        <div>
          <Formik
            initialValues={{
              password: '',
              email: '',
            }}
            validationSchema={SigninSchema}
            onSubmit={onLogin}
          >
            {({ errors, touched, handleSubmit, handleChange }) => (
              <form>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input onChange={handleChange('email')} name='email' placeholder="example.email@gmail.com" />
                    {errors.email && touched.email ? (
                      <div className='text-error-400'>{errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label>
                      Password <span className="text-error-400">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input onChange={handleChange('password')}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                    {errors.password && touched.password ? <div className='text-error-400'>{errors.password}</div> : null}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isChecked} onChange={setIsChecked} />
                      <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                        Keep me logged in
                      </span>
                    </div>
                    <Link
                      to="#"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div>
                    <Button onClick={handleSubmit} className="w-full" size="sm">
                      Sign in
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
