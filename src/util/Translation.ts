import { Slide, toast } from 'react-toastify';

export const textAlign = (lang: string ) => lang === 'ar' ? 'text-right' : 'text-left';

export const onSuccessToast = (message: string) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    theme: "colored",
    transition: Slide
});

export const onErrorToast = (message: string) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
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

export const LessonMarkers = {
    Red: "Danger",
    Green: "Success",
    Blue: "Primary",
    Orange: "Warning",
};

export const LessonDays = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
};