import React, { useState, useEffect } from "react";

function AdminInnovator() {
  const [innovators, setInnovators] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function getRegistrationData() {
      try {
        const response = await fetch(
          "http://localhost/incubation_system_rest_api/Admin/getInnovators.php",
          {
            method: "GET",
            header: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        const innovators = responseData.data;
        setInnovators(innovators);
      } catch (error) {
        console.error("Error:".error);
      }
    }
    getRegistrationData();

    const interval = setInterval(() => {
      getRegistrationData();
    }, 3000);

    // Clear the interval when the component unmounts or when the dependencies change
    return () => {
      clearInterval(interval);
    };
  }, []);

  // sort function
  const keys = [
    "lastName",
    "email",
    "nationalId",
    "phoneNumber",
    "innovationCategory",
    "innovationStage",
  ];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="text-center">Registrations received</h3>

            <input
              className="form-control mb-2"
              type="text"
              placeholder="Search..."
              aria-label="Search"
              style={{ width: "300px" }}
              onChange={(e) => setQuery(e.target.value)}
            />

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">email</th>
                  <th scope="col">National ID</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">innovation Category</th>
                  <th scope="col">innovation Stage</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {search(innovators).map((innovator, index) => {
                  const {
                    firstName,
                    lastName,
                    email,
                    nationalId,
                    phoneNumber,
                    innovationCategory,
                    innovationStage,
                  } = innovator;

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{email}</td>
                      <td>{nationalId}</td>
                      <td>{phoneNumber}</td>
                      <td>{innovationCategory}</td>
                      <td>{innovationStage}</td>
                      <td>
                        <small className="text-success fw-bold">active</small>
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
