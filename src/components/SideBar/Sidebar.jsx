// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
        <div className="bg-header w-full lg:w-1/6 min-h-screen">
            <div className="p-4">
                <h1 className="text-3xl font-bold">Admin </h1>
            </div>
            <nav className="mt-5">
                <Link to="/manage-users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-btnHover">
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Quản lý người dùng
                </Link>
                <Link to="/manage-events" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-btnHover">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Quản lý sự kiện
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
