import { toast } from "react-toastify";


export const successNotify = (msg) => {
  toast.success(`${msg}`, {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const failNotify = (msg) => {
  toast.error(`${msg}`, {
    position: toast.POSITION.TOP_CENTER,
  });
};
