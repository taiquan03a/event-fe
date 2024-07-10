import React, { useState, useEffect } from 'react';
import Event from './Event/Event'; // Assuming Event component is in a file named Event.js
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import userApi from '../../api/userApi';

const EventList = () => {
    const eventsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventData = await userApi.getAllEvents(); // Replace with your API call
                setEvents(eventData);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    console.log(events);
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <Header />
            <div className="container mx-auto p-10 max-w-7xl">
                <h2 className="text-center text-3xl font-bold mb-8">Danh sách sự kiện</h2>
                {events.length === 0 ? (
                    <p className="text-center text-gray-500">Không có sự kiện nào.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentEvents.map(event => (
                            <Event key={event.id} data={event} />
                        ))}
                    </div>
                )}
                {events.length > eventsPerPage && (
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
                )}
            </div>
            <Footer />
        </div>
    );
};

export default EventList;
