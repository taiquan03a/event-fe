import React, { useState, useEffect } from 'react';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useParams } from 'react-router-dom';
import userApi from '../../api/userApi'; // Đảm bảo import userApi từ đúng đường dẫn
import Swal from 'sweetalert2'; // Import Swal từ sweetalert2

function EventDetail() {
    const { id } = useParams(); // Lấy id từ params của URL
    const [event, setEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const eventData = await userApi.getEventDetail(id); // Sử dụng id lấy từ useParams
                setEvent(eventData);
                
                // Kiểm tra xem người dùng đã đăng ký sự kiện này chưa
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const bookingHistory = await userApi.getBookingHistory();
                    const isEventRegistered = bookingHistory.some(item => String(item.id) === id);
                    setIsRegistered(isEventRegistered);
                }
            } catch (error) {
                console.error('Error fetching event detail:', error);
            }
        };

        fetchEventDetail();
    }, [id]); // Thêm id vào dependencies của useEffect

    console.log(isRegistered);
    const handleEventRegistration = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Bạn cần đăng nhập để đăng ký sự kiện.');
            }
            // Gọi API đăng ký sự kiện
            const response = await userApi.eventRegister(id);
            console.log(response);
            // Kiểm tra response từ API
            if (response) {
                // Cập nhật trạng thái đã đăng ký
                setIsRegistered(true);
    
                // Hiển thị thông báo thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // Xử lý khi đăng ký không thành công
                throw new Error( 'Đăng ký không thành công.');
            }
        } catch (error) {
            console.error('Error registering for event:', error);
    
            // Hiển thị thông báo lỗi
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký không thành công',
                text:  'Đã xảy ra lỗi khi đăng ký sự kiện.'
            });
        }
    };
    

    if (!event) {
        return <p>Loading...</p>; // Hoặc bạn có thể hiển thị một spinner
    }

    return ( 
        <div className="min-h-screen">
            <Header/>
            <div className="container mx-auto max-w-7xl p-8">
                <div className="flex gap-8 bg-gray-500 p-5 rounded-3xl">
                    <div className="lg:col-span-1">
                        <img src={`data:image/jpeg;base64,${event.image}`} alt={event.name} className="w-auto h-96"/>
                    </div>
                    <div className="lg:col-span-1 flex flex-col justify-between p-6 rounded-lg space-y-4">
                        <h1 className="text-3xl font-bold">{event.name}</h1>
                        <p><strong>Ngày bắt đầu:</strong> {event.begin}</p>
                        <p className='text-wrap'><strong>Địa điểm:</strong> {event.location.detail}-{event.location.ward}-{event.location.district}-{event.location.province}</p>
                        <p><strong>Số lượng tối đa:</strong> {event.quantityMax}</p>
                        <p><strong>Số lượng hiện tại:</strong> {event.quantityCurrent}</p>
                        <p><strong>Mô tả:</strong> {event.description}</p>
                        {isRegistered ? (
                            <button className="bg-header hover:bg-btnHover text-white font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                                Đã đăng ký
                            </button>
                        ) : (
                            <button onClick={handleEventRegistration} className="bg-header hover:bg-btnHover text-white font-bold py-2 px-4 rounded">
                                Đăng ký ngay
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
     );
}

export default EventDetail;
