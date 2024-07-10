import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HistoryItem from './HistoryItem/HistoryItem';
import userApi from '../../api/userApi'; // Đảm bảo import userApi từ đúng đường dẫn
import Swal from 'sweetalert2';

const EventHistory = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const bookingHistory = await userApi.getBookingHistory();
        setEvents(bookingHistory.reverse());
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchBookingHistory();
  }, []);

  const handleCancelEvent = async (idEvent) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc chắn muốn hủy sự kiện này?',
      text: "Bạn sẽ không thể hoàn tác điều này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        await userApi.cancelEvent(idEvent);
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Sự kiện đã được hủy thành công!',
        });
        setEvents(events.filter(event => event.id !== idEvent));
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Có lỗi xảy ra khi hủy sự kiện!',
        });
        console.error('Error canceling event:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Lịch Sử Đăng Ký Sự Kiện</h2>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">Bạn chưa đăng ký sự kiện nào.</p>
        ) : (
          events.map(event => (
            <HistoryItem key={event.id} event={event} onCancel={handleCancelEvent} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventHistory;
