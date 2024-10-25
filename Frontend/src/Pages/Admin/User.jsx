import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { delet, get, put } from '../../services/Endpoint';
import toast from 'react-hot-toast';

export default function User() {
  const [Users, setUsers] = useState([]);
  const [loadedata, setLoadedata] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');

    if (confirmed) {
      try {
        const response = await delet(`/dashboard/delete/${userId}`);
        const data = response.data;

        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata); // Trigger reloading the data
        } else {
          toast.error('Failed to delete the user.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const handleEdit = (user) => {
    setUserData({ name: user.FullName, email: user.email });
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await put(`/dashboard/update/${selectedUser._id}`, userData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setIsEditing(false);
        setLoadedata(!loadedata); // Reload the user data
        setSelectedUser(null);
        setUserData({ name: '', email: '' });
      } else {
        toast.error('Failed to update the user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await get("/dashboard/users");
        const data = response.data;
        setUsers(data.Users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [loadedata]);

  return (
    <div className="container ">
      <h1 className="text-white mb-4">Usuarios</h1>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombres</th>
              <th scope="col">Email</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {Users && Users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.FullName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrashAlt /> Borrar
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit /> Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing User */}
      {isEditing && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuario</h5>
                <button type="button" className="btn-close" onClick={() => setIsEditing(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
