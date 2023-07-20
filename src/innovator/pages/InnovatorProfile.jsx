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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const url =
  "http://localhost/incubation_system_rest_api/LandingPage/registration.php";

async function sendInputData(formData, actions) {
  try {
    const response = await fetch(url, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    const responseData = await response.json();
    if (responseData.status === 202) {
      toast.info(responseData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (responseData.status === 200) {
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
  const { user } = useContext(UserContext);

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
      <CustomTabPanel value={value} index={0}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-6 p-3 shadow rounded border">
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  gmail: "",
                  phonenumber: "",
                  registrationnumber: "",
                  Institution: "",
                  Course: "",
                  nationalid: "",
                  businessskills: "",
                  incubationdate: "",
                  partnernames: "",
                  innovationcategory: "",
                  innovationstage: "",
                  Description: "",
                }}
                // validationSchema={Yup.object().shape({
                //   firstName: Yup.string().required("Required"),
                //   lastName: Yup.string().required("Required"),
                //   email: Yup.string().required("Required"),
                //   phoneNumber: Yup.string().required("Required"),
                //   registrationNumber: Yup.string().required("Required"),
                //   institution: Yup.string().required("Required"),
                //   course: Yup.string().required("Required"),
                //   nationalId: Yup.string().required("Required"),
                //   businessSkills: Yup.string().required("Required"),
                //   incubationDate: Yup.string().required("Required"),
                //   partnerNames: Yup.string().required("Required"),
                //   innovationCategory: Yup.string().required("Required"),
                //   innovationStage: Yup.string().required("Required"),
                //   description: Yup.string().required("Required"),
                // })}
                onSubmit={(values, actions) => {
                  const formData = new FormData();
                  Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                  });

                  // PersonalDetails(formData, actions);
                  for (let entry of formData.entries()) {
                    console.log(entry);
                  }
                }}
              >
                {(props) => (
                  <Form className="row g-3">
                    <legend>Personal Details</legend>

                    <div className="col-md-6">
                      <Field name="firstname">
                        {({ field }) => (
                          <TextField
                            label="First Name"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.firstName}
                            helperText={<ErrorMessage name="firstName" />}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="lastname">
                        {({ field }) => (
                          <TextField
                            label="Last Name"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.lastName}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="gmail">
                        {({ field }) => (
                          <TextField
                            label="Email"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.email}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="phonenumber">
                        {({ field }) => (
                          <TextField
                            label="Phone Number"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.phoneNumber}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="registrationnumber">
                        {({ field }) => (
                          <TextField
                            label="Registration Number"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.registrationNumber}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="Institution">
                        {({ field }) => (
                          <TextField
                            label="Institution"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.institution}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="Course">
                        {({ field }) => (
                          <TextField
                            label="Course"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.course}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="nationalid">
                        {({ field }) => (
                          <TextField
                            label="nationalId"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.nationalId}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="businessskills">
                        {({ field }) => (
                          <TextField
                            label="Business Skills"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.businessSkills}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="incubationdate">
                        {({ field }) => (
                          <TextField
                            label="Incubation Date"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.incubationDate}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="partnernames">
                        {({ field }) => (
                          <TextField
                            label="Name of your key partners"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.partnerNames}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="innovationcategory">
                        {({ field }) => (
                          <FormControl variant="standard" fullWidth>
                            <InputLabel>Innovation Category</InputLabel>
                            <Select
                              {...field}
                              defaultValue={user && user.innovationCategory}
                              label="innovation Category"
                            >
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
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="innovationstage">
                        {({ field }) => (
                          <FormControl variant="standard" fullWidth>
                            <InputLabel>Innovation Stage</InputLabel>
                            <Select
                              {...field}
                              label="innovation Stage 1"
                              defaultValue={user && user.innovationStage}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {stages.map((stages) => (
                                <MenuItem key={stages.id} value={stages.name}>
                                  {stages.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="Description">
                        {({ field }) => (
                          <TextField
                            label="Description"
                            variant="standard"
                            fullWidth
                            {...field}
                            defaultValue={user && user.description}
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
      <CustomTabPanel value={value} index={1}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-6 border p-3 rounded shadow">
              <Formik
                initialValues={{
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

                  // handleTeamMember(formData, actions);
                  for (let entry of formData.entries()) {
                    console.log(entry);
                  }
                }}
              >
                {(props) => (
                  <Form className="row g-3">
                    <legend>Team Member Details</legend>
                    <div className="col-md-6">
                      <Field
                        type="text"
                        as={TextField}
                        name="firstName"
                        variant="standard"
                        label="First Name"
                        fullWidth
                        helperText={<ErrorMessage name="firstName" />}
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
                        helperText={<ErrorMessage name="lastName" />}
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
                        helperText={<ErrorMessage name="email" />}
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
                        helperText={<ErrorMessage name="phoneNumber" />}
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
                        helperText={<ErrorMessage name="registrationNumber" />}
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
                        helperText={<ErrorMessage name="institution" />}
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
                        helperText={<ErrorMessage name="course" />}
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
                        helperText={<ErrorMessage name="nationalId" />}
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
                        helperText={<ErrorMessage name="businessSkills" />}
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
      <CustomTabPanel value={value} index={2}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 border p-3 rounded shadow">
              <Formik
                initialValues={{
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

                  // handleBusinessDetails(formData, actions);
                  for (let entry of formData.entries()) {
                    console.log(entry);
                  }
                }}
              >
                {(props) => (
                  <Form className="row g-2">
                    <legend>Business Details</legend>
                    <div className="col-md-6">
                      <Field
                        name="productStage"
                        label="At what stage is your business"
                        variant="standard"
                        select
                        fullWidth
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="productStage" />
                          </span>
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {stages.map((stages) => (
                          <MenuItem key={stages.id} value={stages.name}>
                            {stages.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    {/* prototype stage */}
                    <div className="col-md-6">
                      <FormLabel id="prototypeStage">
                        If at prototype stage, have you developed a prototype?
                        <span className="text-danger ms-2">*</span>
                      </FormLabel>
                      <Field name="prototypeStage">
                        {({ field }) => (
                          <>
                            <RadioGroup {...field}>
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
                          </>
                        )}
                      </Field>
                    </div>
                    {/* idea protection */}
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="ideaProtections"
                        label="Have you protected your idea?"
                        variant="standard"
                        select
                        fullWidth
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="ideaProtections" />
                          </span>
                        }
                      >
                        {ideaProtections.map((ideaProtections) => (
                          <MenuItem
                            key={ideaProtections.id}
                            value={ideaProtections.name}
                          >
                            {ideaProtections.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    {/* have you formed a team */}
                    <div className="col-md-6">
                      <FormLabel id="team">
                        Have you formed a team yet?
                        <span className="text-danger ms-2">*</span>
                      </FormLabel>
                      <Field name="team">
                        {({ field }) => (
                          <>
                            <RadioGroup {...field}>
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
                          </>
                        )}
                      </Field>
                    </div>
                    {/* is your start-up registered */}
                    <div className="col-md-6">
                      <FormLabel id="startupRegistered">
                        Is your startup registered?
                        <span className="text-danger ms-2">*</span>
                      </FormLabel>
                      <Field name="startupRegistered">
                        {({ field }) => (
                          <>
                            <RadioGroup {...field}>
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
                          </>
                        )}
                      </Field>
                    </div>
                    {/* have you received any funding recently */}
                    <div className="col-md-6">
                      <FormLabel id="fundedRecently">
                        Have you received any funding previously?
                        <span className="text-danger ms-2">*</span>
                      </FormLabel>
                      <Field name="fundedRecently">
                        {({ field }) => (
                          <>
                            <RadioGroup {...field}>
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
                          </>
                        )}
                      </Field>
                    </div>
                    {/* are you incubated in another incubator */}
                    <div className="col-md-6">
                      <FormLabel id="incubatedElsewhere">
                        Are you incubated in another incubator/accelerator?
                        <span className="text-danger ms-2">*</span>
                      </FormLabel>
                      <Field name="incubatedElsewhere">
                        {({ field }) => (
                          <>
                            <RadioGroup {...field}>
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
                          </>
                        )}
                      </Field>
                    </div>
                    {/* onboarded any partner */}
                    <div className="col-md-6">
                      <FormLabel id="onboardedPartner">
                        Have you onboarded any partners?
                        <span className="text-danger ms-2">*</span>
                      </FormLabel>
                      <Field name="onboardedPartner">
                        {({ field }) => (
                          <>
                            <RadioGroup {...field}>
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
                          </>
                        )}
                      </Field>
                    </div>
                    {/* services you project will require */}
                    <div className="col-md-6">
                      <Field
                        name="projectServices"
                        label="Service your project will require"
                        variant="standard"
                        select
                        fullWidth
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="projectServices" />
                          </span>
                        }
                      >
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
                      </Field>
                    </div>
                    {/* Support your project will require */}
                    <div className="col-md-6">
                      <Field
                        name="projectSupport"
                        label="Support your project will require"
                        variant="standard"
                        select
                        fullWidth
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="projectSupport" />
                          </span>
                        }
                      >
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
                      </Field>
                    </div>
                    {/* training your project will require */}
                    <div className="col-md-6">
                      <Field
                        name="projectTraining"
                        label="Training your project will require"
                        variant="standard"
                        select
                        fullWidth
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="projectTraining" />
                          </span>
                        }
                      >
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
                      </Field>
                    </div>
                    {/* specify any other services/support/training that you may
                    need */}
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="otherNeeds"
                        label="specify any other services/support/training that you may need"
                        multiline
                        maxRows={5}
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="otherNeeds" />
                          </span>
                        }
                      />
                    </div>
                    {/* signature */}
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="signature"
                        label="Signature"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="signature" />
                          </span>
                        }
                      />
                    </div>
                    {/* date */}
                    <div className="col-md-6">
                      <Field
                        type="text"
                        name="date"
                        label="Date"
                        fullWidth
                        variant="standard"
                        as={TextField}
                        helperText={
                          <span className="errors">
                            <ErrorMessage name="date" />
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
    </Box>
  );
}

export default InnovatorProfile;
