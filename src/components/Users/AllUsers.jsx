import axios from "axios";
import React, { useEffect, useState } from "react";

function AllUsers() {
  const api = "https://fakestoreapi.com/users";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(api);
      setUsers(res.data);
    } catch (error) {
      console.log("Error while fetching all users", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-base-300">
                <th>{user.id}</th>
                <td>
                  <div className="font-bold">
                    {user.name.firstname} {user.name.lastname}
                  </div>
                  <div className="text-sm opacity-50">{user.address.city}</div>
                </td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="btn btn-outline btn-sm sm: p-5"
                    onClick={() => setSelectedUser(user)}
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl">Full Address</h3>
            <p className="py-2 text-gray-600">
              {selectedUser.address.number}, {selectedUser.address.street},{" "}
              {selectedUser.address.city}, {selectedUser.address.zipcode}
            </p>

            <h2 className="py-2 text-lg font-semibold">Geolocation</h2>
            <p className="text-gray-600">
              Latitude: {selectedUser.address.geolocation.lat}
            </p>
            <p className="text-gray-600">
              Longitude: {selectedUser.address.geolocation.long}
            </p>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default AllUsers;
