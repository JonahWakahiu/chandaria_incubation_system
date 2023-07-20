import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import "../styles/landingPage.css";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import * as Yup from "yup";

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");

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
      console.log("Error:".error);
    }
  }

  return (
    <>
      <NavigationBar />

      <div className="container-fluid bg-light">
        <div
          className="row justify-content-center align-items-center"
          id="loginContainer"
        >
          <div className="col-12 col-md-8 col-lg-5 col-xl-4">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Email is required")
                  .email("Enter a valid email"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={(values) => {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                  formData.append(key, values[key]);
                });

                handleLoginData(formData);
                // for (let entry of formData.entries()) {
                //   console.log(entry);
                // }
              }}
            >
              {(props) => (
                <Form
                  className="row bg-white g-4 border rounded p-4"
                  id="loginForm"
                >
                  <h4 className="text-center">Welcome Back!</h4>
                  <div className="col">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field type="email" name="email" className="form-control" />
                    <span className="errors">
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                  <div className="w-100"></div>
                  <div className="col">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                    />
                    <span className="errors">
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                  <Link>Forgot password</Link>

                  <div className="col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-success w-50">
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
