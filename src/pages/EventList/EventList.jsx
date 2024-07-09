import React, { useState } from 'react';
import Event from './Event/Event'; // Assuming Event component is in a file named Event.js
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const EventList = () => {
    const events = [
        {
            id: 1,
            title: 'Summer Music Festival',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=7',
            price: '$50',
            date: 'August 15, 2024',
            location: 'Central Park, New York'
        },
        {
            id: 2,
            title: 'Tech Conference 2024',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=7',
            price: '$100',
            date: 'September 10-12, 2024',
            location: 'Moscone Center, San Francisco'
        },
        {
            id: 3,
            title: 'Tech Conference 2024',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=7',
            price: '$100',
            date: 'September 10-12, 2024',
            location: 'Moscone Center, San Francisco'
        },
        {
            id:4,
            title: 'Tech Conference 2024',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=7',
            price: '$100',
            date: 'September 10-12, 2024',
            location: 'Moscone Center, San Francisco'
        },
   
    ];

    // Số lượng sự kiện trên mỗi trang
    const eventsPerPage = 6;

    // Trang hiện tại, bắt đầu từ trang đầu tiên
    const [currentPage, setCurrentPage] = useState(1);

    // Tính chỉ số bắt đầu và chỉ số kết thúc của danh sách sự kiện hiện tại
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='min-h-screen'>
            <Header />
            <div className="container mx-auto p-10 max-w-7xl">
                <h2 className="text-center text-3xl font-bold mb-8">Danh sách sự kiện</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentEvents.map(event => (
                        <Event key={event.id} data={event} />
                    ))}
                </div>
                {/* Phân trang */}
                <div className="mt-8 flex justify-center">
                    <nav className="block">
                        <ul className="flex pl-0 rounded list-none flex-wrap">
                            {[...Array(Math.ceil(events.length / eventsPerPage)).keys()].map(number => (
                                <li key={number} className="relative block py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-700 mr-1 mb-1">
                                    <button onClick={() => paginate(number + 1)} className="page-link">
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventList;
