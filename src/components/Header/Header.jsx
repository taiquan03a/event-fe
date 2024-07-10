import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../../assets/hungthinh-logo.png';
import path from '../../constant/path';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsLoggedIn(!!token); // Chuyển đổi token thành boolean
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleBookingHistoryClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Thông báo',
                text: 'Bạn cần đăng nhập để xem lịch sử đặt chỗ.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
            <header className="bg-header">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5">
                            <span className="sr-only">Your Event</span>
                            <img className="w-8" src={Logo} alt="" />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link to={path.home} className="text-lg font-semibold leading-6 text-white">Trang chủ</Link>
                        <Link to={path.about} className="text-lg font-semibold leading-6 text-white">Về chúng tôi</Link>
                        <Link to={path.events} className="text-lg font-semibold leading-6 text-white">Sự kiện</Link>
                        <Link to={path.bookingHistory} onClick={handleBookingHistoryClick} className="text-lg font-semibold leading-6 text-white">Lịch sử</Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="text-lg font-semibold leading-6 text-white">
                                Đăng xuất <span aria-hidden="true">&rarr;</span>
                            </button>
                        ) : (
                            <Link to="/login" className="text-lg font-semibold leading-6 text-white">
                                Đăng nhập <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>
                </nav>

                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-10"></div>
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Event</span>
                                <img className="h-8 w-auto" src={Logo} alt="" />
                            </Link>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Link to={path.home} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Trang chủ</Link>
                                    <Link to={path.about} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Về chúng tôi</Link>
                                    <Link to={path.events} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Sự kiện</Link>
                                    <Link to={path.bookingHistory} onClick={handleBookingHistoryClick} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Lịch sử</Link>
                                </div>
                                <div className="py-6">
                                    {isLoggedIn ? (
                                        <button onClick={handleLogout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            Đăng xuất
                                        </button>
                                    ) : (
                                        <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            Đăng nhập
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
