import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HistoryItem from './HistoryItem/HistoryItem';
import userApi from '../../api/userApi'; // Đảm bảo import userApi từ đúng đường dẫn

const EventHistory = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const bookingHistory = await userApi.getBookingHistory();
        setEvents(bookingHistory);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchBookingHistory();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Lịch Sử Đăng Ký Sự Kiện</h2>
        {events.map(event => (
          <HistoryItem key={event.id} event={event} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default EventHistory;
