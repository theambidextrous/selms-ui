import { Slide, toast } from 'react-toastify';

export const downloadPdf = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer'
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const textAlign = (lang: string ) => lang === 'ar' ? 'text-right' : 'text-left';

export const cleanPicUrl = (url: string) => {

    if(!url || url === 'default.png'){
        return '/images/user/default.png';
    }
    const isDuplicate = (url.split("http").length - 1) > 1;
    if(isDuplicate){
        const urlNew = url.replace("http://127.0.0.1:8000/pci/api/v1/downloads/get/rpt/file/", "");
        return urlNew.replace("http://ec2-3-249-35-195.eu-west-1.compute.amazonaws.com:8000/pci/api/v1/downloads/get/rpt/file/", "");
    }
    return url;
}

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

export const toUserTypeName = (value: any) => {
    if(value.data.is_admin){
        return 'App Admin';
    }
    if(value.data.is_lib){
        return 'Library Admin';
    }
    if(value.data.is_fin){
        return 'Finance Admin';
    }
    return 'Parent'
}

export const toUserTypeId = (value: any) => {
    if(value.is_admin){
        return 1;
    }
    if(value.is_lib){
        return 2;
    }
    if(value.is_fin){
        return 3;
    }
    if(value.is_parent){
        return 4;
    }
    return 0;
}