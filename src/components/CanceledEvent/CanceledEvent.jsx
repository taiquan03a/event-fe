import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CanceledItem from './CanceledItem';
import userApi from '../../api/userApi';
const CanceledEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCanceledHistory = async () => {
      try {
        const canceledHistory = await userApi.getCancelHistory();
        setEvents(canceledHistory.reverse());
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchCanceledHistory();
  }, []);


  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Lịch Sử Hủy Sự Kiện</h2>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">Bạn chưa hủy sự kiện nào.</p>
        ) : (
          events.map(event => (
            <CanceledItem key={event.id} event={event}/>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CanceledEvent;
