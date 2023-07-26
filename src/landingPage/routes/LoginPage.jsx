import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import "../styles/landingPage.css";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import { useContext, useState, MouseEvent } from "react";
import { UserContext } from "../../UserContext";
import * as Yup from "yup";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const url =
    "http://localhost/incubation_system_rest_api/LandingPage/login.php";

  // handle login data
  async function handleLoginData(formData, actions) {
    try {
      const response = await fetch(url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      const responseData = await response.json();
      console.log("the response is".responseData);
      if (responseData.status === 200) {
        const role = responseData.data[0].role;
        console.log("role is".role);
        const user = responseData.userInfo;

        if (role === "admin") {
          setUser(user);
          navigate("/admin");
        } else if (role === "mentor") {
          setUser(user);
          navigate("/mentor");
        } else if (role === "innovator") {
          setUser(user);
          navigate("/innovator");
        }
      } else {
        setError(responseData.message);
        actions.setSubmitting(false);
        toast.warning(responseData.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      actions.setSubmitting(false);
      toast.error("Server connection failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      <div className="container-fluid bg-body-secondary">
        <div
          className="row justify-content-center align-items-center"
          id="loginContainer"
        >
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Email is required")
                  .email("Enter a valid email"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={(values, actions) => {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                  formData.append(key, values[key]);
                });

                handleLoginData(formData, actions);
                // for (let entry of formData.entries()) {
                //   console.log(entry);
                // }
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  className="row bg-light g-4 border rounded p-4"
                  id="loginForm"
                >
                  <h4 className="text-center">Welcome Back!</h4>

                  <div className="col-12">
                    <Field name="email">
                      {({ field }) => (
                        <>
                          <InputLabel htmlFor="password">Email</InputLabel>
                          <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            helperText={<ErrorMessage name="email" />}
                          />
                        </>
                      )}
                    </Field>
                  </div>

                  <div className="col-12">
                    <Field name="password">
                      {({ field }) => (
                        <>
                          <InputLabel htmlFor="adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            id="adornment-password"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </>
                      )}
                    </Field>
                  </div>
                  <Link>Forgot password</Link>

                  <div className="col-12 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success w-50"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default LoginPage;
