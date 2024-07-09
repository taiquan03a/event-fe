import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../../components/SideBar/Sidebar';

const initialEvents = [
    {
        id: 1,
        name: 'Live Concert TRUNG QUÂN',
        startTime: '13 Jul, 2024 - 19:00',
        endTime: '13 Jul, 2024 - 22:00',
        location: 'HCMC - NHA THI ĐẤU PHÚ THỌ, Q.11',
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=75',
        description: 'A live concert by TRUNG QUÂN.',
        quantity: 100,
        status: 'Active',
        creationDate: '01 Jul, 2024'
    },
    {
        id: 2,
        name: 'Ngày Xửa... Ngày Xưa 35',
        startTime: '13 Jul, 2024 - 19:00',
        endTime: '13 Jul, 2024 - 22:00',
        location: 'HCMC - NHA THI ĐẤU PHÚ THỌ, Q.11',
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F48%2Fba%2Fb7%2Fe160ee347a0925650c41b15a611c928b.jpg&w=1920&q=75',
        description: 'A traditional play performance.',
        quantity: 200,
        status: 'Active',
        creationDate: '01 Jul, 2024'
    }
    // Add more events as needed
];

const ManageEvents = () => {
    const [events, setEvents] = useState(initialEvents);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditEvent = () => {
        setEvents(events.map(event => (event.id === editingEvent.id ? editingEvent : event)));
        setEditingEvent(null);
        setShowEditModal(false);
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 p-4 overflow-x-auto">
                <div className='p-10'>
                    <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
                    <button  className="bg-header text-white px-4 py-2 rounded mb-5 hover:bg-btnHover">
                        Add Event
                    </button>
                    <div className="overflow-y-auto max-h-screen"> {/* Adjust max height as per your requirement */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Start Time
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        End Time
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Creation Date
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {events.map((event) => (
                                    <tr key={event.id}>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.id}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.name}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.startTime}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.endTime}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.location}</td>
                                        <td className="py-4 px-6">
                                            <img src={event.image} alt={event.name} className="h-10 w-10 object-cover rounded-full" />
                                        </td>
                                        <td className="py-4 px-6">{event.description}</td>
                                        <td className="py-4 px-6">{event.quantity}</td>
                                        <td className="py-4 px-6">{event.status}</td>
                                        <td className="py-4 px-6">{event.creationDate}</td>
                                        <td className="py-4 px-6">
                                            <button onClick={() => { setEditingEvent(event); setShowEditModal(true); }} className="text-blue-600 hover:underline mr-2">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600 hover:underline">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit Event Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 flex items-center justify-center text-slate-950 mx-auto max-w-4xl">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h3 className="text-lg font-semibold mb-3">Edit Event</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                value={editingEvent.name}
                                onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Start Time"
                                value={editingEvent.startTime}
                                onChange={(e) => setEditingEvent({ ...editingEvent, startTime: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="End Time"
                                value={editingEvent.endTime}
                                onChange={(e) => setEditingEvent({ ...editingEvent, endTime: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={editingEvent.location}
                                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={editingEvent.image}
                                onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <textarea
                                placeholder="Description"
                                value={editingEvent.description}
                                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={editingEvent.quantity}
                                onChange={(e) => setEditingEvent({ ...editingEvent, quantity: parseInt(e.target.value) })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Status"
                                value={editingEvent.status}
                                onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Creation Date"
                                value={editingEvent.creationDate}
                                onChange={(e) => setEditingEvent({ ...editingEvent, creationDate: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <div className="flex justify-end">
                                <button onClick={() => setShowEditModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded mr-2">Cancel</button>
                                <button onClick={handleEditEvent} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageEvents;
