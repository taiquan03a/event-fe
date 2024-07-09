import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../../components/SideBar/Sidebar';
import adminApi from '../../../api/adminApi';
import Swal from 'sweetalert2';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventData = await adminApi.getAllEvent();
                setEvents(eventData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEditEvent = async () => {
        try {
            await adminApi.updateEvent(editingEvent.id, editingEvent);
            setEvents(events.map(event => (event.id === editingEvent.id ? editingEvent : event)));
            setEditingEvent(null);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error editing event:', error);
        }
    };

    // Handle toggle active state of event
const handleToggleActive = async (id, active) => {
    console.log(id);
    console.log(active);
    try {
        const response =  await adminApi.activeEvent(id); // Gọi API để active/deactive event
        console.log(response);
        // Cập nhật lại state events
        setEvents(events.map(event => {
            if (event.id === id) {
                return { ...event, active: !active }; // Đảo ngược trạng thái active
            }
            return event;
        }));
    } catch (error) {
        console.error('Error toggling event active state:', error);
    }
};

// Confirm active/deactive event
const confirmToggleActive = async (id, active) => {
    const action = active ? 'deactivate' : 'activate';
    const result = await Swal.fire({
        title: `Chuyển sang trạng thái ${active ? 'Không hoạt động' : 'Hoạt động'}`,
        text: `Bạn có chắc muốn ${action} sự kiện này?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    });

    if (result.isConfirmed) {
        handleToggleActive(id, active);
    }
};


    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 p-4 overflow-x-auto">
                <div className='p-10'>
                    <h2 className="text-2xl font-bold mb-4">Quản lý Sự kiện</h2>
                    <button className="bg-header text-white px-4 py-2 rounded mb-5 hover:bg-btnHover">
                        Thêm Sự kiện
                    </button>
                    <div className="overflow-y-auto max-h-screen"> {/* Adjust max height as per your requirement */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thời gian bắt đầu
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thời gian kết thúc
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Địa điểm
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hình ảnh
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mô tả
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày tạo
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Chỉnh sửa
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {events.map((event) => (
                                    <tr key={event.id}>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.id}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.name}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.begin}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.end}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{event.location}</td>
                                        <td className="py-4 px-6">
                                            <img src={event.image} alt={event.name} className="h-10 w-10 object-cover rounded-full" />
                                        </td>
                                        <td className="py-4 px-6">{event.description}</td>
                                        <td className="py-4 px-6">{event.quantity}</td>
                                        <td className="py-4 px-6">{event.active ? 'Hoạt động' : 'Không hoạt động'}</td>
                                        <td className="py-4 px-6">{event.createdAt}</td>
                                        <td className="py-4 px-6">
                                        <button onClick={() => { setEditingEvent(event); setShowEditModal(true); }} className="text-blue-600 hover:underline mr-2">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </td>

                                        <td className="py-4 px-6">                                            
                                            <button onClick={() => confirmToggleActive(event.id, event.active)} className={`ml-2 ${event.active ? 'text-red-600' : 'text-green-600'} hover:underline`}>
                                                {event.active ? 'Deactivate' : 'Activate'}
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
                            <h3 className="text-lg font-semibold mb-3">Chỉnh sửa Sự kiện</h3>
                            <input
                                type="text"
                                placeholder="Tên"
                                value={editingEvent.name}
                                onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Thời gian bắt đầu"
                                value={editingEvent.begin}
                                onChange={(e) => setEditingEvent({ ...editingEvent, begin: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Thời gian kết thúc"
                                value={editingEvent.end}
                                onChange={(e) => setEditingEvent({ ...editingEvent, end: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Địa điểm"
                                value={editingEvent.location}
                                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="URL Hình ảnh"
                                value={editingEvent.image}
                                onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <textarea
                                placeholder="Mô tả"
                                value={editingEvent.description}
                                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="number"
                                placeholder="Số lượng"
                                value={editingEvent.quantity}
                                onChange={(e) => setEditingEvent({ ...editingEvent, quantity: parseInt(e.target.value) })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Trạng thái"
                                value={editingEvent.active}
                                onChange={(e) => setEditingEvent({ ...editingEvent, active: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Ngày tạo"
                                value={editingEvent.createdAt}
                                onChange={(e) => setEditingEvent({ ...editingEvent, createdAt: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                            />
                            <div className="flex justify-end">
                                <button onClick={() => setShowEditModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded mr-2">Hủy</button>
                                <button onClick={handleEditEvent} className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageEvents;
