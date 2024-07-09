import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../../components/SideBar/Sidebar';

const initialUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password1' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password2' }
];

function ManageUsers() {
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({ id: '', firstName: '', lastName: '', email: '', password: '' });
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleAddUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ id: '', firstName: '', lastName: '', email: '', password: '' });
        setShowAddModal(false);
    };

    const handleEditUser = () => {
        setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
        setEditingUser(null);
        setShowEditModal(false);
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 p-4">
                <div className="p-10">
                    <h2 className="text-2xl font-bold mb-5">Manage Users</h2>
                    <button onClick={() => setShowAddModal(true)} className="bg-header text-white px-4 py-2 rounded mb-5 hover:bg-btnHover">
                        Add User
                    </button>
                    <table className="min-w-full text-center">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">First Name</th>
                                <th className="py-2 px-4 border-b">Last Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{user.id}</td>
                                    <td className="py-2 px-4 border-b">{user.firstName}</td>
                                    <td className="py-2 px-4 border-b">{user.lastName}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={() => { setEditingUser(user); setShowEditModal(true); }} className="text-blue-600 hover:underline mr-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:underline">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Add User Modal */}
                    {showAddModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg max-w-xl">
                                <h3 className="text-xl font-semibold mb-3 text-header">Add User</h3>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={newUser.firstName}
                                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={newUser.lastName}
                                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                />
                                <div className="flex justify-end">
                                    <button onClick={() => setShowAddModal(false)} className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded mr-2">Cancel</button>
                                    <button onClick={handleAddUser} className="bg-header hover:bg-btnHover text-white px-4 py-2 rounded">Add</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit User Modal */}
                    {showEditModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                            <div className="bg-white p-6 rounded shadow-lg max-w-xl">
                                <h3 className="text-xl text-header font-semibold mb-3">Edit User</h3>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={editingUser.firstName}
                                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={editingUser.lastName}
                                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={editingUser.password}
                                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                />
                                <div className="flex justify-end">
                                    <button onClick={() => setShowEditModal(false)} className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded mr-2">Cancel</button>
                                    <button onClick={handleEditUser} className="bg-header hover:bg-btnHover text-white px-4 py-2 rounded">Save</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
