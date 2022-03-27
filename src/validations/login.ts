import * as yup from "yup";

const loginFormSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default loginFormSchema;
