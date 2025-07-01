import { Slide, toast } from 'react-toastify';

export const textAlign = (lang: string ) => lang === 'ar' ? 'text-right' : 'text-left';

export const onSuccessToast = (message: string) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: "colored",
    transition: Slide
});

export const onErrorToast = (message: string) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: "colored",
    transition: Slide
});

const currentYear = new Date().getFullYear();

export const TermYears = [
    currentYear,
    new Date(currentYear + 1, 1,1).getFullYear()
]

export const parseToTwoDecimals = (input: any) => {
  const num = typeof input === 'string' ? parseFloat(input) : input;
  return num.toFixed(2);
}