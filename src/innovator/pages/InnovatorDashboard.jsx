import { useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { services } from "../../data";
import { ToastContainer, toast } from "react-toastify";
import * as GiIcons from "react-icons/gi";
import * as Yup from "yup";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  MenuItem,
  Paper,
  Avatar,
  TextField,
  LinearProgress,
  LinearProgressProps,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import "../Innovator.css";
import { UserContext } from "../../UserContext";
import ProgressBar from "@ramonak/react-progress-bar";

const percentage = 66;
function InnovatorDashboard(props) {
  const { score } = props;
  const url =
    "http://localhost/incubation_system_rest_api/innovator/handleExpectationForm%20copy.php";
  async function handleExpectationFormData(formData, actions) {
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
        toast.success(responseData.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      toast.error("Server connection failed!", {
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
  const { user } = useContext(UserContext);
  const percentage = 66;
  return (
    <div className="container-fluid">
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
      <div className="row justify-content-around p-2">
        <div
          className="border rounded shadow col bg-light mx-2"
          style={{ height: "150px" }}
        >
          <h6>Tasks</h6>
        </div>

        <div
          className="border rounded shadow me-2 col bg-light"
          style={{ height: "150px" }}
        >
          <h6>Completed</h6>
          <div className="mt-auto">
            <ProgressBar completed={60} maxCompleted={100} />
          </div>
        </div>

        <div
          className="border rounded shadow col me-2 bg-light"
          style={{ height: "150px" }}
        >
          <h6>Team Members</h6>
        </div>

        <div
          className="border rounded shadow col me-2 bg-light"
          style={{ height: "150px" }}
        >
          <h6>Mentor</h6>
          <Avatar alt="user13" src="/img/user13.jpg" />

          <br />
          <a className="mb-0" href="">
            Profile
          </a>
        </div>
      </div>
      <div className="row justify-content-between px-3 py-2">
        <div className="card col me-2 bg-light">
          <div className="card-header">Weekly Performance Report</div>
          <div className="card-body">
            <ResponsiveContainer width={"100%"} height={450}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-lg-5 shadow border bg-light">
          <Formik
            initialValues={{
              firstName: user ? user.firstName : "",
              lastName: user ? user.lastName : "",
              phoneNumber: user ? user.phoneNumber : "",
              email: user ? user.email : "",
              nationalId: user ? user.nationalId : "",
              userExpectation: "",
              stageEnterPricePyramid: "",
              projectBasedService: "",
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .matches(
                  /^[a-zA-Z]{2,15}$/,
                  "Should only contains alphabets and 2 to 15 characters"
                )
                .required("Required"),
              lastName: Yup.string()
                .matches(
                  /^[a-zA-Z]{2,20}$/,
                  "Should only contains alphabets and 2 to 20 characters"
                )
                .required("Required"),
              email: Yup.string()
                .email("Invalid Email address")
                .required("Required"),
              phoneNumber: Yup.string()
                .matches(/^0(1|7)[\d]{8}$/, "Invalid phone number hint: 07/01")
                .required("Required"),
              nationalId: Yup.string()
                .matches(/^[0-9]{8}$/, "National Id must be 8 characters only")
                .required("Required"),
              userExpectation: Yup.string().required("Required"),
              stageEnterPricePyramid: Yup.string().required("Required"),
              projectBasedService: Yup.string().required("Required"),
            })}
            onSubmit={(values, actions) => {
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              handleExpectationFormData(formData, actions);
              // for (let entry of formData.entries()) {
              //   console.log(entry);
              // }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="row g-3">
                <h6>Expectation Form</h6>
                {/* firstName */}
                <div className="col-md-6">
                  <Field name="firstName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="firstName " />
                          </span>
                        }
                        label="First Name"
                      />
                    )}
                  </Field>
                </div>
                {/* lastName */}
                <div className="col-md-6">
                  <Field name="lastName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="Last Name"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="lastName" />
                          </span>
                        }
                      />
                    )}
                  </Field>
                </div>
                {/* phoneNumber */}
                <div className="col-md-6">
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <TextField
                        variant="standard"
                        label="Phone Number"
                        {...field}
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="phoneNumber" />
                          </span>
                        }
                      />
                    )}
                  </Field>
                </div>
                {/* email */}
                <div className="col-md-6">
                  <Field name="email">
                    {({ field }) => (
                      <TextField
                        disabled
                        variant="standard"
                        label="Email"
                        {...field}
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="email" />
                          </span>
                        }
                      />
                    )}
                  </Field>
                </div>
                {/* national Id */}
                <div className="col-md-6">
                  <Field name="nationalId">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="National Id"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="nationalId" />
                          </span>
                        }
                      />
                    )}
                  </Field>
                </div>
                <div className="col-12">
                  <label htmlFor="userExpectation" className="form-label">
                    A brief outline of your expectations about the service
                    package at the innovation center
                  </label>
                  <Field name="userExpectation">
                    {({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        maxRows={5}
                        variant="standard"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="userExpectation" />
                          </span>
                        }
                      />
                    )}
                  </Field>
                </div>

                <div className="col-12">
                  <Field name="stageEnterPricePyramid">
                    {({ field }) => (
                      <FormControl variant="standard" fullWidth>
                        <InputLabel>
                          Provide the stage of your innovation based on the
                          enterprice pyramid
                        </InputLabel>
                        <Select
                          {...field}
                          label="Stage of Your innovation based on the Enterprice pyramid"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Idea">Idea</MenuItem>
                          <MenuItem value="Business plan">
                            Business Plan
                          </MenuItem>
                          <MenuItem value="Revenue">Revenue</MenuItem>
                          <MenuItem value="Profit">Profit</MenuItem>
                          <MenuItem value="Scale">Scale</MenuItem>
                        </Select>
                        <span className="errors">
                          <ErrorMessage name="stageEnterPricePyramid" />
                        </span>
                      </FormControl>
                    )}
                  </Field>
                </div>

                <div className="col-12">
                  <Field name="projectBasedService">
                    {({ field }) => (
                      <FormControl variant="standard" fullWidth>
                        <InputLabel>
                          Provide a service that your project needs to be based
                          on
                        </InputLabel>
                        <Select
                          {...field}
                          label="  Provide a service that your project needs to be based on"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {services.map((services) => (
                            <MenuItem key={services.id} value={services.name}>
                              {services.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <span className="errors">
                          <ErrorMessage name="projectBasedService" />
                        </span>
                      </FormControl>
                    )}
                  </Field>
                </div>

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
  );
}

export default InnovatorDashboard;

const data = [
  {
    name: "Monday",
    uv: 5,
  },
  {
    name: "Tuesday",
    uv: 6.5,
  },
  {
    name: "Wednesday",
    uv: 7,
  },
  {
    name: "Thursday",
    uv: 4,
  },
  {
    name: "Friday",
    uv: 7,
  },
  {
    name: "Saturday",
    uv: 10.2,
  },
  {
    name: "Sunday",
    uv: 9,
  },
];
