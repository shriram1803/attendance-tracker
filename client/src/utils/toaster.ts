import { toast } from "react-toastify";

export const successToast = (content: string) => {
    toast.success(content, {
        position: 'bottom-right'
    });
};

export const errorToast = (content: string) => {
    toast.error(content, {
        position: 'bottom-right'
    });
};