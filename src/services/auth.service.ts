import ApiService from "./api.service";

type LoginPayload = {
  username: string;
  password: string;
};

const AuthService = {
  login(payload: LoginPayload) {
    return ApiService.post("/login", payload);
  },
  signup(payload: LoginPayload) {
    return ApiService.post("/register", payload);
  },
};

export default AuthService;
