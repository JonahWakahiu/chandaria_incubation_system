import { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/landingPage.css";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

function RegistrationForm() {
  const [inputs, setInputs] = useState({
    name: "",
    nationalid: "",
    phonenumber: "",
    kuStudent: "",
    school: "",
    registrationNumber: "",
    registeredIP: "",
    incubationDate: "",
    photo: "",
    partner: "",
    innovationCategory: "",
    innovationStage: "",
    description: "",
  });

  // Create a new FormData object
  const formData = new FormData();

  formData.append("name", inputs.name);
  formData.append("email", inputs.email);
  formData.append("nationalid", inputs.nationalid);
  formData.append("mobile", inputs.phonenumber);
  formData.append("kuStudent", inputs.kuStudent);
  formData.append("school", inputs.school);
  formData.append("registrationNumber", inputs.registrationNumber);
  formData.append("registeredIP", inputs.registeredIP);
  formData.append("incubationDate", inputs.incubationDate);
  formData.append("photo", inputs.photo);
  formData.append("partner", inputs.partner);
  formData.append("innovationCategory", inputs.innovationCategory);
  formData.append("innovationStage", inputs.innovationStage);
  formData.append("description", inputs.description);

  const handleFileChange = (e) => {
    setInputs((values) => ({ ...values, photo: e.target.files[0] }));
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((values) => ({ ...values, [e.target.name]: value }));

    if (value === "Other") {
      setOthers(true);
    } else {
      setOthers(false);
    }
  };

  // state that defines the errors
  const [errors, setErrors] = useState({});
  // react-bootstrap validation
  const [validated, setValidated] = useState(false);
  // setting recaptcha states
  const [recaptchaClicked, setRecaptchaClicked] = useState(false);
  const [recaptchaClickedErr, setRecaptchaClickedErr] = useState(false);

  // hide and show inputs field when the user is a KU
  const [show, setShow] = useState(false);

  //show an alert
  const [alert, setAlert] = useState(false);

  // others on select field
  const [others, setOthers] = useState(false);

  // fetch api function
  async function sendInputData() {
    try {
      const response = await fetch(
        "http://localhost/incubation_system_rest_api/incubatee/insertRegistration.php",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log(responseData.status);
      if (responseData.status === 200) {
        setInputs({
          // Clear the form data
          name: "",
          nationalid: "",
          phonenumber: "",
          kuStudent: "",
          school: "",
          registrationNumber: "",
          registeredIP: "",
          incubationDate: null,
          photo: null,
          partner: "",
          innovationCategory: "",
          innovationStage: "",
          description: "",
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Form submitted successfully!",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    } catch (error) {
      console.error("Error:".error);
    }
  }

  // inputs form
  function handleFormInputs(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (recaptchaClicked && form.checkValidity() === true) {
      sendInputData();
    } else {
      setRecaptchaClickedErr(true);
      e.stopPropagation();
    }
    setValidated(true);
  }

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormInputs}
        id="registrationForm"
      >
        {alert ? (
          <div className="alert alert-success" role="alert">
            submitted successfully
          </div>
        ) : null}
        <Row className="mb-3 g-3">
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="name">
              Full Name:<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              name="name"
              value={inputs.name}
              type="text"
              id="name"
              required
              onChange={handleChange}
              onBlur={(e) => {
                let regex = /^[a-zA-Z]{2,15} [a-zA-Z]{2,15}$/;
                if (regex.test(e.target.value)) {
                  setErrors((values) => ({ ...values, nameErr: false }));
                } else {
                  setErrors((values) => ({ ...values, nameErr: true }));
                }
              }}
            />

            {errors.nameErr ? (
              <span className="errors">
                Enter your firstname and lastname e.g John Doe
              </span>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="email">
              Email:<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              name="email"
              id="email"
              value={inputs.email}
              type="email"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="nationalid">
              National ID:<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              name="nationalid"
              id="nationalid"
              value={inputs.nationalid}
              type="text"
              required
              onChange={handleChange}
              onBlur={(e) => {
                let regex = /^[0-9]{8}$/;
                if (regex.test(e.target.value)) {
                  setErrors((values) => ({ ...values, nationalIdErr: false }));
                } else {
                  setErrors((values) => ({ ...values, nationalIdErr: true }));
                }
              }}
            />
            {errors.nationalIdErr ? (
              <span className="errors">National id must be 8 digit long</span>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="mobilenumber">
              Mobile Number:<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              name="phonenumber"
              id="mobilenumber"
              value={inputs.phonenumber}
              type="text"
              required
              onChange={handleChange}
              onBlur={(e) => {
                let regex = /^0(1|7)[\d]{8}$/;
                if (regex.test(e.target.value)) {
                  setErrors((values) => ({ ...values, mobileErr: false }));
                } else {
                  setErrors((values) => ({ ...values, mobileErr: true }));
                }
              }}
            />
            {errors.mobileErr ? (
              <span className="errors">
                Enter a valid number e.g 07xxxxxxxx / 01xxxxxxxx
              </span>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="kustudent">
              Are you a KU student?<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Check
              type="radio"
              name="kuStudent"
              id="kustudent"
              value="yes"
              checked={inputs.kuStudent === "yes"}
              label={"Yes"}
              onChange={handleChange}
              required
              onClick={(e) => setShow(true)}
            />
            <Form.Check
              type="radio"
              name="kuStudent"
              value="no"
              checked={inputs.kuStudent === "no"}
              label={"No"}
              onChange={handleChange}
              required
              onClick={(e) => setShow(false)}
            />
            {show ? (
              <>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="school">
                    School:<span className="text-danger ms-1">*</span>
                  </Form.Label>
                  <Form.Select
                    name="school"
                    id="school"
                    onChange={handleChange}
                    value={inputs.school}
                    required
                  >
                    <option value="" disabled selected>
                      Choose...
                    </option>
                    <option value="Agricultural and Environmental Science">
                      Agricultural and Environmental Science
                    </option>
                    <option value="School and Business, Economics and Tourism">
                      School and Business, Economics and Tourism
                    </option>
                    <option value="School of Engineering and Architecture">
                      School of Engineering and Architecture
                    </option>
                    <option value="School of Health Science">
                      School of Health Science
                    </option>
                    <option value="School of law, arts and social science">
                      School of law, arts and social science
                    </option>
                    <option value="School of pure and applied science">
                      School of pure and applied science
                    </option>
                    <option value="Graduate School">Graduate School</option>
                    <option value="Digital School of virtual and open learning">
                      Digital School of virtual and open learning
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="registrationnumber">
                    Registration Number:
                    <span className="text-danger ms-1">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="registrationnumber"
                    name="registrationNumber"
                    value={inputs.registrationNumber}
                    onChange={handleChange}
                    required
                    onBlur={(e) => {
                      let regex = /^[A-Za-z]\d{2}\/\d{4}\/\d{4}$/;
                      if (regex.test(e.target.val)) {
                        setErrors((values) => ({
                          ...values,
                          registrationNumberErr: false,
                        }));
                      } else {
                        setErrors((values) => ({
                          ...values,
                          registrationNumberErr: true,
                        }));
                      }
                    }}
                  />
                  {errors.registrationNumberErr ? (
                    <span className="errors">
                      Enter a valid registration Number
                    </span>
                  ) : null}
                </Form.Group>
              </>
            ) : null}
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="registeredip">
              Is your Ip registered?<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Check
              type="radio"
              value="yes"
              id="registeredip"
              checked={inputs.registeredIP === "yes"}
              name="registeredIP"
              label={"Yes"}
              required
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              value="no"
              checked={inputs.registeredIP === "no"}
              name="registeredIP"
              label={"No"}
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="incubationdate">
              Date of Incubation:<span className="text-danger ms-1">*</span>
            </Form.Label>
            <div className="w-100"></div>
            <DatePicker
              className="form-control"
              required
              id="incubationdate"
              autoComplete="off"
              name="incubationdate"
              value={inputs.incubationDate}
              selected={inputs.incubationDate}
              maxDate={new Date()}
              onChange={(date) => {
                setInputs((values) => ({ ...values, incubationDate: date }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="photo">
              Passport Photo:<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              id="photo"
              required
              type="file"
              name="photo"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={8}>
            <Form.Label htmlFor="partner">
              Names of key partners/investors if any:
            </Form.Label>
            <Form.Control
              type="text"
              id="partner"
              name="partner"
              value={inputs.partner}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md={8}>
            <Form.Label htmlFor="innovationCategory">
              Category of your Innovation:
              <span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Select
              name="innovationCategory"
              id="innovationCategory"
              onChange={handleChange}
              required
            >
              <option value="" selected disabled>
                Choose...
              </option>
              <option value="Business and Professional Services">
                Business and Professional Services
              </option>
              <option value="Information and communication Technology">
                Information and Communication Technology
              </option>
              <option value="Marketing and communication">
                Marketing and communication
              </option>
              <option value="Manufacturing and communication">
                Manufacturing and communication
              </option>
              <option value="Transport and logistics">
                Transport and logistics
              </option>
              <option value="Bio and Nano-Technology">
                Bio and Nano-Technology
              </option>
              <option value="Health and Nutrition">Health and Nutrition</option>
              <option value="Bio and Nano-Technology">
                Bio and Nano-Technology
              </option>
              <option value="Health and Nutrition">Health and Nutrition</option>
              <option value="Green and ecological business">
                Green and ecological business
              </option>
              <option value="Tourism and eco-tourism">
                Tourism and eco-tourism
              </option>
              <option value="fine and Performing Arts">
                Fine and Performing Arts
              </option>
              <option value="Sport, Leisure and Entertainment">
                Sports, Leisure and Entertainment
              </option>
              <option value="water and Sanitation">Water and Sanitation</option>
              <option value="Energy">Energy</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md={8}>
            <Form.Label htmlFor="innovationstage">
              Stage of Innovation:<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Select
              name="innovationStage"
              id="innovationstage"
              onChange={handleChange}
              required
            >
              <option value="" disabled selected>
                Choose...
              </option>
              <option value="Research and Development">
                Research and Development
              </option>
              <option value="Prototype Phase">Prototype Phase</option>
              <option value="Start-up">Start-Up</option>
              <option value="Market phase">Market phase</option>
              <option value="Scaling-up phase">Scaling-up phase</option>
              <option value="Other">Other (Specify)</option>
            </Form.Select>
            {others ? <Form.Control name="otherfield" /> : null}
          </Form.Group>
          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="description">
              A brief description of your innovation. (not exceeding 250 words):
              <span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              id="description"
              name="description"
              style={{ height: "300px" }}
              value={inputs.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <ReCAPTCHA
              sitekey="6Lckv7AmAAAAAK9AlfL0fGpqN-2r3jdckUghvx_L"
              onChange={() => setRecaptchaClicked(true)}
            />
            {recaptchaClickedErr === true && recaptchaClicked === false ? (
              <span className="errors">
                Click the Recaptcha before submitting
              </span>
            ) : null}
          </Form.Group>
          <Form.Group
            as={Col}
            md={12}
            className="d-flex justify-content-center mt-3"
          >
            <button className="btn" id="registrationBtn" type="submit">
              Submit
            </button>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
}

export default RegistrationForm;
