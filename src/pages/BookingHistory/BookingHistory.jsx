import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HistoryItem from './HistoryItem/HistoryItem';
const EventHistory = () => {
  const events = [
    {
      id: 1,
      title: 'Summer Music Festival',
      image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=75',
      startDate: 'August 15, 2024',
      endDate: 'August 18, 2024',
      location: 'Central Park, New York',
      registrant: 'Jonathan Reinink',
      registrationDate: 'July 1, 2024'
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      image: '/img/event2.jpg',
      startDate: 'September 10, 2024',
      endDate: 'September 12, 2024',
      location: 'Moscone Center, San Francisco',
      registrant: 'Alice Johnson',
      registrationDate: 'July 5, 2024'
    },
    // Add more events as needed
  ];

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
