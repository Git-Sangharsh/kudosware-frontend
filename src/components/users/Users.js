import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
const Users = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://kudosware-backend-q3ha.onrender.com/users"); // Replace with your backend URL
        setData(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h1 className="users-container-header">User List</h1>
      {error && <p>{error}</p>}
      <div className="users-wrapper">
        {data.map((user) => (
          <div className="users-wrapper-box" key={user._id}>
            <h5 className="users-wrapper-title">Name : {user.name} </h5>
            <h5 className="users-wrapper-title">Email : {user.email} </h5>
            <button className="download-resume">
              <a
                href={`https://kudosware-backend-q3ha.onrender.com/users/${user._id}/resume`}
                download
              >
                Download Resume
              </a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
