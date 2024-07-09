import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../../components/SideBar/Sidebar';
import adminApi from '../../../api/adminApi';
import Swal from 'sweetalert2';

function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await adminApi.getAllUser();
                setUsers(userData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người dùng:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserAction = async (id) => {
        try {
            await adminApi.activeUser(id); // Gọi API active/deactivate người dùng
            // Cập nhật lại trạng thái của người dùng trong state
            setUsers(users.map(user => {
                if (user.id === id) {
                    return { ...user, active: !user.active }; // Đảo ngược trạng thái active
                }
                return user;
            }));
        } catch (error) {
            console.error('Lỗi khi thực hiện hành động người dùng:', error);
        }
    };

    const confirmAction = async (id, action) => {
        const result = await Swal.fire({
            title: action === 'delete' ? 'Xóa người dùng' : 'Kích hoạt người dùng',
            text: action === 'delete' ? 'Bạn có chắc muốn xóa người dùng này?' : 'Bạn có chắc muốn kích hoạt người dùng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            handleUserAction(id);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 p-4">
                <div className="p-10">
                    <h2 className="text-2xl font-bold mb-5">Quản lý Người dùng</h2>
                    <table className="min-w-full text-center">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Họ</th>
                                <th className="py-2 px-4 border-b">Tên</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Trạng thái</th>
                                <th className="py-2 px-4 border-b">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{user.id}</td>
                                    <td className="py-2 px-4 border-b">{user.firstName}</td>
                                    <td className="py-2 px-4 border-b">{user.lastName}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.active ? 'Hoạt động' : 'Không hoạt động'}</td>
                                    <td className="py-2 px-4 border-b">
                                        {user.active ? (
                                            <>
                                                <button onClick={() => confirmAction(user.id, 'delete')} className="text-gray-600 hover:underline">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => confirmAction(user.id, 'activate')} className="text-green-600 hover:underline">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </button>
                                            </>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
