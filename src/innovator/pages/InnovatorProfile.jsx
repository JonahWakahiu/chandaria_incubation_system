import React, { useState, useContext, SyntheticEvent } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext";
import {
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Typography,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
} from "@mui/material";
import {
  categories,
  stages,
  ideaProtections,
  projectServices,
  projectTraining,
  projectSupport,
} from "../../data";
import * as Yup from "yup";
import "../Innovator.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const PersonalDetailsURL =
  "http://localhost/incubation_system_rest_api/innovator/handleProfileUpdate.php";
const TeamMemberURL =
  "http://localhost/incubation_system_rest_api/innovator/handleTeamMember.php";
const BusinessDetailsURL =
  "http://localhost/incubation_system_rest_api/innovator/handleBusinessDetails.php";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function InnovatorProfile() {
  const [value, setValue] = useState(0);
  const { user, setUser } = useContext(UserContext);

  async function handleTeamMember(formData, actions) {
    try {
      const response = await fetch(TeamMemberURL, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const responseData = await response.json();
      if (responseData.status === 200) {
        actions.resetForm();
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

  async function handlePersonalDetails(formData) {
    try {
      const response = await fetch(PersonalDetailsURL, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const responseData = await response.json();
      const updatedData = responseData.userInfo;
      if (responseData.status === 200) {
        setUser(updatedData);
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

  async function handleBusinessDetails(formData) {
    try {
      const response = await fetch(BusinessDetailsURL, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const responseData = await response.json();
      const updatedData = responseData.userInfo;
      if (responseData.status === 200) {
        setUser(updatedData);
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

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Personal Details" {...a11yProps(0)} />
          <Tab label="Team Member Details" {...a11yProps(1)} />
          <Tab label="Business Details" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={value}
        index={0}
        className="bg-body-secondary"
        style={{ height: "88vh" }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-9 col-xl-8 p-3 shadow rounded border bg-light">
              <Formik
                initialValues={{
                  firstName: user ? user.firstName : "",
                  lastName: user ? user.lastName : "",
                  email: user ? user.email : "",
                  phoneNumber: user ? user.phoneNumber : "",
                  registrationNumber: user ? user.registrationNumber : "",
                  institution: user ? user.institution : "",
                  course: user ? user.course : "",
                  nationalId: user ? user.nationalId : "",
                  businessSkills: user ? user.businessSkills : "",
                  incubationDate: user ? user.incubationDate : "",
                  partnerNames: user ? user.partnerNames : "",
                  innovationCategory: user ? user.innovationCategory : "",
                  innovationStage: user ? user.innovationStage : "",
                  description: user ? user.description : "",
                  photo: "",
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required("Required"),
                  lastName: Yup.string().required("Required"),
                  email: Yup.string().required("Required"),
                  phoneNumber: Yup.string().required("Required"),
                  registrationNumber: Yup.string().required("Required"),
                  institution: Yup.string().required("Required"),
                  course: Yup.string().required("Required"),
                  nationalId: Yup.string().required("Required"),
                  businessSkills: Yup.string().required("Required"),
                  incubationDate: Yup.string().required("Required"),
                  partnerNames: Yup.string().required("Required"),
                  innovationCategory: Yup.string().required("Required"),
                  innovationStage: Yup.string().required("Required"),
                  description: Yup.string().required("Required"),
                })}
                onSubmit={(values) => {
                  const formData = new FormData();
                  Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                  });

                  handlePersonalDetails(formData);
                  // for (let entry of formData.entries()) {
                  //   console.log(entry);
                  // }
                }}
              >
                {({ errors, touched, isSubmitting, setFieldValue }) => (
                  <Form className="clearfix">
                    <legend className="text-center">Personal Details</legend>

                    <section className="col-md-5 float-md-end mb-3 ms-md-3 mt-md-5 d-flex flex-column align-items-center">
                      <h6>Profile Picture</h6>
                      <img
                        src={user && user.photo}
                        alt="user2"
                        style={{
                          height: "150px",
                          width: "150px",
                        }}
                        className="border border-4 border-dark rounded"
                      />
                      <div className="w-75 mt-2">
                        <input
                          type="file"
                          name="photo"
                          variant="standard"
                          onChange={(event) =>
                            setFieldValue("photo", event.target.files[0])
                          }
                        />
                      </div>
                      <span className="errors">
                        <ErrorMessage name="photo" />
                      </span>
                    </section>
                    <div className="col-md-6">
                      <Field name="firstName">
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            label="First Name"
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="firstName" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="lastName">
                        {({ field }) => (
                          <TextField
                            label="Last Name"
                            variant="standard"
                            fullWidth
                            {...field}
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="lastName" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="email">
                        {({ field }) => (
                          <TextField
                            disabled
                            value={user && user.email}
                            label="Email"
                            variant="standard"
                            fullWidth
                            {...field}
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="email" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="phoneNumber">
                        {({ field }) => (
                          <TextField
                            label="Phone Number"
                            variant="standard"
                            fullWidth
                            {...field}
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="phoneNumber" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="nationalId">
                        {({ field }) => (
                          <TextField
                            label="nationalId"
                            variant="standard"
                            fullWidth
                            {...field}
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="nationalId" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>

                    <div className="col-md-6">
                      <Field name="registrationNumber">
                        {({ field }) => (
                          <TextField
                            label="Registration Number"
                            variant="standard"
                            fullWidth
                            {...field}
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="registrationNumber" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col">
                          <Field name="institution">
                            {({ field }) => (
                              <TextField
                                label="Institution"
                                variant="standard"
                                fullWidth
                                {...field}
                                helperText={
                                  <span className="errors">
                                    <ErrorMessage name="institution" />
                                  </span>
                                }
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col">
                          <Field name="course">
                            {({ field }) => (
                              <TextField
                                label="Course"
                                variant="standard"
                                fullWidth
                                {...field}
                                helperText={
                                  <span className="errors">
                                    <ErrorMessage name="course" />
                                  </span>
                                }
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col">
                          {" "}
                          <Field name="businessSkills">
                            {({ field }) => (
                              <TextField
                                label="Business Skills"
                                variant="standard"
                                fullWidth
                                {...field}
                                helperText={
                                  <span className="errors">
                                    <ErrorMessage name="businessSkills" />
                                  </span>
                                }
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col">
                          <Field name="incubationDate">
                            {({ field }) => (
                              <TextField
                                label="Incubation Date"
                                variant="standard"
                                fullWidth
                                {...field}
                                helperText={
                                  <span className="errors">
                                    <ErrorMessage name="incubationDate" />
                                  </span>
                                }
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col">
                          {" "}
                          <Field name="partnerNames">
                            {({ field }) => (
                              <TextField
                                label="Name of your key partners"
                                variant="standard"
                                fullWidth
                                {...field}
                                helperText={
                                  <span className="errors">
                                    <ErrorMessage name="partnerNames" />
                                  </span>
                                }
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col">
                          <Field name="innovationCategory">
                            {({ field }) => (
                              <FormControl variant="standard" fullWidth>
                                <InputLabel>Innovation Category</InputLabel>
                                <Select {...field} label="innovation Category">
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {categories.map((categories) => (
                                    <MenuItem
                                      key={categories.id}
                                      value={categories.name}
                                    >
                                      {categories.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <span className="errors">
                                  <ErrorMessage name="innovationCategory" />
                                </span>
                              </FormControl>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col">
                          {" "}
                          <Field name="innovationStage">
                            {({ field }) => (
                              <FormControl variant="standard" fullWidth>
                                <InputLabel>Innovation Stage</InputLabel>
                                <Select {...field} label="innovation Stage 1">
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {stages.map((stages) => (
                                    <MenuItem
                                      key={stages.id}
                                      value={stages.name}
                                    >
                                      {stages.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <span className="errors">
                                  <ErrorMessage name="innovationStage" />
                                </span>
                              </FormControl>
                            )}
                          </Field>
                        </div>
                        <div className="col">
                          <Field name="description">
                            {({ field }) => (
                              <TextField
                                multiline
                                maxRows={5}
                                label="Description"
                                variant="standard"
                                fullWidth
                                {...field}
                                helperText={
                                  <span className="errors">
                                    <ErrorMessage name="description" />
                                  </span>
                                }
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center mt-2">
                      <button className="btn btn-success w-50" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={1}
        className="bg-body-secondary"
        style={{ height: "88vh" }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-6 border p-3 rounded shadow bg-light">
              <Formik
                initialValues={{
                  keyInnovatorEmail: user ? user.email : "",
                  firstName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  registrationNumber: "",
                  institution: "",
                  course: "",
                  nationalId: "",
                  businessSkills: "",
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required("Required"),
                  lastName: Yup.string().required("Required"),
                  email: Yup.string().required("Required"),
                  phoneNumber: Yup.string().required("Required"),
                  registrationNumber: Yup.string().required("Required"),
                  institution: Yup.string().required("Required"),
                  course: Yup.string().required("Required"),
                  nationalId: Yup.string().required("Required"),
                  businessSkills: Yup.string().required("Required"),
                })}
                onSubmit={(values, actions) => {
                  const formData = new FormData();
                  Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                  });

                  handleTeamMember(formData, actions);
                  // for (let entry of formData.entries()) {
                  //   console.log(entry);
                  // }
                }}
              >
                {(props) => (
                  <Form className="row g-3">
                    <legend className="text-center">Team Member Details</legend>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        as={TextField}
                        name="firstName"
                        variant="standard"
                        label="First Name"
                        fullWidth
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="firstName" />
                          </span>
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="lastName" />
                          </span>
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="email"
                        label="email"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="email" />
                          </span>
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="nationalId"
                        label="National Id"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="nationalId" />
                          </span>
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="phoneNumber"
                        label="Phone Number"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="phoneNumber" />
                          </span>
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="institution"
                        label="Institution"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="institution" />
                          </span>
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="course"
                        label="Course Pursuing"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="course" />
                          </span>
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="registrationNumber"
                        label="Registration Number(if Student)"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="registrationNumber" />
                          </span>
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="businessSkills"
                        label="Skills towards business"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="businessSkills" />
                          </span>
                        }
                      />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <button className="btn btn-success w-50" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={2}
        className="bg-body-secondary"
        style={{ height: "88vh" }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 border p-3 rounded shadow bg-light">
              <Formik
                initialValues={{
                  email: user ? user.email : "",
                  productStage: "",
                  prototypeStage: "",
                  ideaProtections: "",
                  team: "",
                  startupRegistered: "",
                  fundedRecently: "",
                  incubatedElsewhere: "",
                  onboardedPartner: "",
                  projectServices: "",
                  projectSupport: "",
                  projectTraining: "",
                  otherNeeds: "",
                  signature: "",
                  date: "",
                }}
                validationSchema={Yup.object().shape({
                  productStage: Yup.string().required("Required"),
                  prototypeStage: Yup.string().required("Required"),
                  ideaProtections: Yup.string().required("Required"),
                  team: Yup.string().required("Required"),
                  startupRegistered: Yup.string().required("Required"),
                  fundedRecently: Yup.string().required("Required"),
                  incubatedElsewhere: Yup.string().required("Required"),
                  onboardedPartner: Yup.string().required("Required"),
                  projectServices: Yup.string().required("Required"),
                  projectSupport: Yup.string().required("Required"),
                  projectTraining: Yup.string().required("Required"),
                  otherNeeds: Yup.string().required("Required"),
                  signature: Yup.string().required("Required"),
                  date: Yup.string().required("Required"),
                })}
                onSubmit={(values, actions) => {
                  const formData = new FormData();
                  Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                  });

                  handleBusinessDetails(formData, actions);
                  // for (let entry of formData.entries()) {
                  //   console.log(entry);
                  // }
                }}
              >
                {(props) => (
                  <Form className="row g-2">
                    <legend className="text-center">Business Details</legend>
                    <div className="col-md-6">
                      <Field name="productStage">
                        {({ field }) => (
                          <FormControl variant="standard" fullWidth>
                            <InputLabel>
                              At What stage is your business?
                            </InputLabel>
                            <Select {...field}>
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {stages.map((stages) => (
                                <MenuItem key={stages.id} value={stages.name}>
                                  {stages.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <span className="errors">
                              <ErrorMessage name="productStage" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* prototype stage */}
                    <div className="col-md-6">
                      <Field name="prototypeStage">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel id="prototypeStage">
                              If at prototype stage, have you developed a
                              prototype?
                            </FormLabel>
                            <RadioGroup
                              {...field}
                              aria-labelledby="prototypeStage"
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                            <span className="errors">
                              <ErrorMessage name="prototypeStage" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* idea protection */}
                    <div className="col-md-6">
                      <Field name="ideaProtections">
                        {({ field }) => (
                          <FormControl variant="standard" fullWidth>
                            <InputLabel>
                              Have you protected your idea? Tick appropriately:
                            </InputLabel>
                            <Select {...field}>
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {ideaProtections.map((ideaProtections) => (
                                <MenuItem
                                  key={ideaProtections.id}
                                  value={ideaProtections.name}
                                >
                                  {ideaProtections.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <span className="errors">
                              <ErrorMessage name="ideaProtections" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* have you formed a team */}
                    <div className="col-md-6">
                      <Field name="team">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel id="team">
                              Have you formed a team yet?
                            </FormLabel>
                            <RadioGroup {...field} aria-labelledby="team">
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                            <span className="errors">
                              <ErrorMessage name="team" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* is your start-up registered */}
                    <div className="col-md-6">
                      <Field name="startupRegistered">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel id="startupRegistered">
                              Is your startup registered?
                              <span className="text-danger ms-2">*</span>
                            </FormLabel>
                            <RadioGroup
                              {...field}
                              aria-labelledby="startupRegistered"
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                            <span className="errors">
                              <ErrorMessage name="startupRegistered" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* have you received any funding recently */}
                    <div className="col-md-6">
                      <Field name="fundedRecently">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel id="fundedRecently">
                              Have you received any funding previously?
                              <span className="text-danger ms-2">*</span>
                            </FormLabel>
                            <RadioGroup
                              {...field}
                              aria-labelledby="fundedRecently"
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                            <span className="errors">
                              <ErrorMessage name="fundedRecently" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* are you incubated in another incubator */}
                    <div className="col-md-6">
                      <Field name="incubatedElsewhere">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel id="incubatedElsewhere">
                              Are you incubated in another
                              incubator/accelerator?
                              <span className="text-danger ms-2">*</span>
                            </FormLabel>
                            <RadioGroup
                              {...field}
                              aria-labelledby="incubatedElsewhere"
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                            <span className="errors">
                              <ErrorMessage name="incubatedElsewhere" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* onboarded any partner */}
                    <div className="col-md-6">
                      <Field name="onboardedPartner">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel id="onboardedPartner">
                              Have you onboarded any partners?
                              <span className="text-danger ms-2">*</span>
                            </FormLabel>
                            <RadioGroup
                              {...field}
                              aria-labelledby="onboardedPartner"
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                            <span className="errors">
                              <ErrorMessage name="onboardedPartner" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* services you project will require */}
                    <div className="col-md-6">
                      <Field name="projectServices">
                        {({ field }) => (
                          <FormControl variant="standard" fullWidth>
                            <InputLabel>
                              Services your project will require?
                            </InputLabel>
                            <Select {...field}>
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {projectServices.map((projectServices) => (
                                <MenuItem
                                  key={projectServices.id}
                                  value={projectServices.name}
                                >
                                  {projectServices.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <span className="errors">
                              <ErrorMessage name="projectServices" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* Support your project will require */}
                    <div className="col-md-6">
                      <Field name="projectSupport">
                        {({ field }) => (
                          <FormControl variant="standard" fullWidth>
                            <InputLabel>
                              Support your project will require
                            </InputLabel>
                            <Select {...field}>
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {projectSupport.map((projectSupport) => (
                                <MenuItem
                                  key={projectSupport.id}
                                  value={projectSupport.name}
                                >
                                  {projectSupport.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <span className="errors">
                              <ErrorMessage name="projectSupport" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* training your project will require */}
                    <div className="col-md-6">
                      <Field name="projectTraining">
                        {({ field }) => (
                          <FormControl variant="standard" fullWidth>
                            <InputLabel>
                              Training your project will require
                            </InputLabel>
                            <Select {...field}>
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {projectTraining.map((projectTraining) => (
                                <MenuItem
                                  key={projectTraining.id}
                                  value={projectTraining.name}
                                >
                                  {projectTraining.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <span className="errors">
                              <ErrorMessage name="projectTraining" />
                            </span>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    {/* specify any other services/support/training that you may
                    need */}
                    <div className="col-md-6">
                      <Field name="otherNeeds">
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            multiline
                            maxRows={5}
                            label="specify any other services/support/training that you may need"
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="otherNeeds" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>

                    {/* signature */}
                    <div className="col-md-6">
                      <Field name="signature">
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            label="Signature"
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="signature" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>

                    {/* date */}
                    <div className="col-md-6">
                      <Field name="date">
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            label="Date"
                            helperText={
                              <span className="errors">
                                <ErrorMessage name="date" />
                              </span>
                            }
                          />
                        )}
                      </Field>
                    </div>

                    <div className="col-12 d-flex justify-content-center">
                      <button className="btn btn-success w-50" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </CustomTabPanel>
    </Box>
  );
}

export default InnovatorProfile;
