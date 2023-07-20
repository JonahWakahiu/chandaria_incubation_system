import { useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { services } from "../../data";
import { ToastContainer, toast } from "react-toastify";
import * as GiIcons from "react-icons/gi";
import * as Yup from "yup";
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
      <div className="row justify-content-around">
        <div className="col-lg-6 ">
          <div className="row justify-content-around">
            <div
              className="border rounded shadow me-2 col"
              style={{ height: "150px" }}
            >
              <h6>Mentor</h6>
              <Avatar alt="user13" src="/img/user13.jpg" />

              <br />
              <a className="mb-0" href="">
                Profile
              </a>
            </div>
            <div
              className="border rounded shadow me-2 col"
              style={{ height: "150px" }}
            >
              <h6>Task Completed</h6>

              <br />
              {/* <a className="mb-0" href="">
                Profile
              </a> */}
            </div>

            {/* <div
              className="border rounded shadow me-2 col-md-3"
              style={{ height: "150px" }}
            >
              <h6>Mentor</h6>
              John Doe <br />
              <a className="mb-0" href="">
                Profile
              </a>
            </div> */}
          </div>
          <div className="row mt-4 justify-content-around">
            <div className="card col-12">
              <div className="card-header">Progress per form</div>
              <div className="card-body">
                <p>Expectation Form</p>
                <ProgressBar completed={60} maxCompleted={100} />
                <p>Quarterly Progress Report</p>
                <ProgressBar completed={100} maxCompleted={100} />
                <p>Innovation Tracking form</p>
                <ProgressBar completed={20} maxCompleted={100} />
                <p>Quartely MileStone Feedback</p>
                <ProgressBar completed={0} maxCompleted={100} />
                <p>Needs assessment form</p>
                <ProgressBar completed={35} maxCompleted={100} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 mt-3 mb-2 py-2 pt-3 me-3 shadow border">
          <Formik
            initialValues={{
              firstname: user ? user.firstName : "",
              lastname: user ? user.lastName : "",
              phonenumber: user ? user.phoneNumber : "",
              gmail: user ? user.email : "",
              nationalid: user ? user.nationalId : "",
              userexpectation: "",
              stageenterpricePyramid: "",
              projectbasedService: "",
            }}
            validationSchema={Yup.object().shape({
              firstname: Yup.string()
                .matches(
                  /^[a-zA-Z]{2,15}$/,
                  "Should only contains alphabets and 2 to 15 characters"
                )
                .required("Required"),
              lastname: Yup.string()
                .matches(
                  /^[a-zA-Z]{2,20}$/,
                  "Should only contains alphabets and 2 to 20 characters"
                )
                .required("Required"),
              gmail: Yup.string()
                .email("Invalid Email address")
                .required("Required"),
              phonenumber: Yup.string()
                .matches(/^0(1|7)[\d]{8}$/, "Invalid phone number hint: 07/01")
                .required("Required"),
              nationalid: Yup.string()
                .matches(/^[0-9]{8}$/, "National Id must be 8 characters only")
                .required("Required"),
              userexpectation: Yup.string().required("Required"),
              stageenterpricePyramid: Yup.string().required("Required"),
              projectbasedService: Yup.string().required("Required"),
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
                  <Field name="firstname">
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        fullWidth
                        helperText={<ErrorMessage name="firstname " />}
                        label="First Name"
                        defaultValue={user && user.firstName}
                      />
                    )}
                  </Field>
                </div>
                {/* lastName */}
                <div className="col-md-6">
                  <Field name="lastname">
                    {({ field }) => (
                      <TextField
                        defaultValue={user && user.lastName}
                        {...field}
                        variant="standard"
                        label="Last Name"
                        fullWidth
                        helperText={<ErrorMessage name="lastname" />}
                      />
                    )}
                  </Field>
                </div>
                {/* phoneNumber */}
                <div className="col-md-6">
                  <Field name="phonenumber">
                    {({ field }) => (
                      <TextField
                        defaultValue={user && user.phoneNumber}
                        variant="standard"
                        label="Phone Number"
                        {...field}
                        fullWidth
                        helperText={<ErrorMessage name="phonenumber" />}
                      />
                    )}
                  </Field>
                </div>
                {/* email */}
                <div className="col-md-6">
                  <Field name="gmail">
                    {({ field }) => (
                      <TextField
                        defaultValue={user && user.email}
                        variant="standard"
                        label="Email"
                        {...field}
                        fullWidth
                        helperText={<ErrorMessage name="gmail" />}
                      />
                    )}
                  </Field>
                </div>
                {/* national Id */}
                <div className="col-md-6">
                  <Field name="nationalid">
                    {({ field }) => (
                      <TextField
                        defaultValue={user && user.nationalId}
                        {...field}
                        variant="standard"
                        label="National Id"
                        fullWidth
                        helperText={<ErrorMessage name="nationalid" />}
                      />
                    )}
                  </Field>
                </div>
                <div className="col-12">
                  <label htmlFor="userExpectation" className="form-label">
                    A brief outline of your expectations about the service
                    package at the innovation center
                  </label>
                  <Field name="userexpectation">
                    {({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        maxRows={5}
                        variant="standard"
                        fullWidth
                        helperText={<ErrorMessage name="userexpectation" />}
                      />
                    )}
                  </Field>
                </div>

                <div className="col-12">
                  <Field name="stageenterpricePyramid">
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
                      </FormControl>
                    )}
                  </Field>
                </div>

                <div className="col-12">
                  <Field name="projectbasedService">
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
