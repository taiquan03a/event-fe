import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import path from '../../constant/path';

const Sidebar = () => {
    const navigate = useNavigate();

    const  handleLogout = () => {
        Swal.fire({
            title: 'Đăng xuất',
            text: 'Bạn có chắc chắn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('role');
                navigate('/login');
            }
        });
    };

    return (
        <div className="bg-header w-full lg:w-1/6 min-h-screen">
            <div className="p-4">
                <h1 className="text-3xl font-bold">Admin </h1>
            </div>
            <nav className="mt-5">
                <Link to={path.manageUsers} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-btnHover">
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Quản lý người dùng
                </Link>
                <Link to={path.manageEvents} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-btnHover">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Quản lý sự kiện
                </Link>
                <Link to={path.manageSuplier} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-btnHover">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Quản lý nhà cung cấp
                </Link>
                <button 
                    onClick={handleLogout} 
                    className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-btnHover"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Đăng xuất
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
