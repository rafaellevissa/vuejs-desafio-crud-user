import * as yup from "yup";

const signupFormSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
});

export default signupFormSchema;
