import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const errortoast = ({ message }) => {
    return toast.error(message || "Something Went Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // className: " bg-black",
        // theme: "dark",
    });
}

export const successtoast = ({ message }) => {

    return toast.success(message || "Something Went Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // className: " bg-black",
        // theme: "dark",            
    });
}
