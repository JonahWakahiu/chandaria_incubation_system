import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

function ImageGallery() {
  // fetch api function
  const url =
    "http://localhost/incubation_system_rest_api/LandingPage/registration.php";

  async function sendInputData(formData) {
    try {
      const response = await fetch(url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData.status);
      if (responseData.status === 200) {
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
  return (
    <div className="container">
      <section className="row">
        <Formik
          initialValues={{ name: "", email: "", photo: "" }}
          onSubmit={(values) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              formData.append(key, values[key]);
            });
            sendInputData(formData);
            for (let entry of formData.entries()) {
              console.log(entry);
            }
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid Email address")
              .required("Required"),
            photo: Yup.string().required("Required"),
          })}
        >
          {(props) => (
            <Form>
              <label htmlFor="form-control" className="form-label">
                Name
              </label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" />
              <br />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field type="text" name="email" className="form-control" />
              <ErrorMessage name="email" />
              <br />
              <label htmlFor="photo">Photo</label>
              <input
                className="form-control"
                type="file"
                name="photo"
                onChange={(event) =>
                  props.setFieldValue("photo", event.target.files[0])
                }
              />{" "}
              <br />
              <ErrorMessage name="photo" />
              <br />
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default ImageGallery;
