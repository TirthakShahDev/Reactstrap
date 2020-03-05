import * as Yup from "yup";
import { IValidationFormState } from "Types/StateTypes/stateTypes";
export const ValidationFormSchema = Yup.object().shape<IValidationFormState>({
  email: Yup.string()
    .email()
    .required("Required"),
  password: Yup.string().required("Required").min(5).max(10)
});
