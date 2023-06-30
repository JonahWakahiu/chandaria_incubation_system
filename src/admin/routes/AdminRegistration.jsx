import React, { useState, useEffect } from "react";

function AdminInnovator() {
  const [registrations, setRegistrations] = useState([]);

  // state for updating values

  useEffect(() => {
    async function getRegistrationData() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/incubatee/getRegistration.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const registrations = responseData.data;
        setRegistrations(registrations);
      } catch (error) {
        console.error("Error:".error);
      }
    }
    getRegistrationData();

    const interval = setInterval(() => {
      getRegistrationData();
    }, 3000);

    //Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  // send an id to the API to make the changes
  async function sendHandleAccept(id) {
    const acceptData = new FormData();

    acceptData.append("id", id);
    try {
      const response = await fetch(
        "http://localhost/incubation_system_rest_api/Admin/handleAccept.php",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: acceptData,
        }
      );

      const responseData = await response.json();
      console.log(responseData.message);
    } catch (error) {
      console.error("Error:".error);
    }
  }

  function handleAccept(id) {
    sendHandleAccept(id);
    console.log(id);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="text-center">Registrations received</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th scope="col">Name</th>
                  <th scope="col">email</th>
                  <th scope="col">National ID</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">innovation Category</th>
                  <th scope="col">innovation Stage</th>
                  <th scope="col">Status</th>
                  <th scope="col">operation</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration, index) => {
                  const {
                    id,
                    name,
                    email,
                    nationalid,
                    phonenumber,
                    innovationCategory,
                    innovationStage,
                  } = registration;
                  console.log(registration);

                  return (
                    <tr key={id}>
                      <td className="text-sm">{index + 1}</td>
                      <td className="text-sm">{name}</td>
                      <td>{email}</td>
                      <td>{nationalid}</td>
                      <td>{phonenumber}</td>
                      <td>{innovationCategory}</td>
                      <td>{innovationStage}</td>
                      <td>
                        <small>pending...</small>
                      </td>
                      <td>
                        <div className="btn-group g-2">
                          <button
                            className="btn btn-success btn-sm me-2"
                            type="button"
                            onClick={() => handleAccept(id)}
                          >
                            accept
                          </button>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-warning btn-sm">View</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminInnovator;
