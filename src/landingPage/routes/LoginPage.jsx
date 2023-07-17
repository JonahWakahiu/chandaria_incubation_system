import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "../styles/landingPage.css";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

function LoginPage() {
  const { setUser } = useContext(UserContext);

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
      if (responseData.status === 200) {
        const role = responseData.data[0].role;
        const user = responseData.userInfo;

        if (role === "admin") {
          setUser(user);
          //navigate("/admin");
        } else if (role === "mentor") {
          setUser(user);
          //navigate("/mentor");
        } else if (role === "innovator") {
          setUser(user);
          navigate("/innovator");
        }
      } else {
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
    <div className="bg-light">
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
      <NavigationBar />
      <div className="bg-light">
        <div
          className="container d-flex justify-content-center align-items-center"
          id="loginContainer"
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });
              // console.log(values);
              handleLoginData(formData);
              for (let entry of formData.entries()) {
                console.log(entry);
              }
            }}
          >
            {(props) => (
              <Form
                className="row bg-white g-2 w-50 border rounded p-4"
                id="loginForm"
              >
                <h4 className="text-center">Welcome Back!</h4>
                <div className="col">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field type="email" name="email" className="form-control" />
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
                </div>
                <Link>Forgot password</Link>
                <div className="w-100"></div>
                <div className="col">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
