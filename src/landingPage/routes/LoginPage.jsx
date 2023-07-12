import { Formik, Form, Field } from "formik";
import "../styles/landingPage.css";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const url =
    "http://localhost/incubation_system_rest_api/LandingPage/login.php";
  async function handleLogin(formData) {
    try {
      const response = await fetch(url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.success === true) {
        const role = responseData.data[0].role;

        if (role === "admin001") {
          navigate("/admin");
        } else if (role === "mentor") {
          navigate("/mentor");
        } else if (role === "innovator") {
          navigate("/innovator");
        } else {
          navigate("login");
        }
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-light">
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
              handleLogin(formData);
              // for (let entry of formData.entries()) {
              //   console.log(entry);
              // }
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
