import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../../components/SideBar/Sidebar';
import adminApi from '../../../api/adminApi';
import locationApi from '../../../api/locationApi';
import Swal from 'sweetalert2';
const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [supliers, setSuppliers] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [newEvent, setNewEvent] = useState({
        image: null, // image là một file, bạn có thể lưu trữ file đây
        name: '',
        begin: '',
        end: '',
        description: '',
        quantity: 0,
        province: '',
        district: '',
        ward: '',
        detail: '',
        supplierId: '',
    });
    console.log(newEvent);

    const [showAddModal, setShowAddModal] = useState(false);

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
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const data = await locationApi.getProvince();
                console.log(data);
                setProvinces(data.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const data = await adminApi.getAllSuplier();
                console.log(data);
                setSuppliers(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    // Fetch districts when province changes
    // Fetch districts and reset communes when province changes
    const handleProvinceChange = async (provinceCode) => {
        try {
            const districtData = await locationApi.getDistrict(provinceCode);
            setDistricts(districtData.data);
            
            // Reset communes to empty array when province changes
            setCommunes([]);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };


    // Fetch communes when district changes
    const handleDistrictChange = async (districtCode) => {
        try {
            const data = await locationApi.getWard(districtCode);
            setCommunes(data.data);
        } catch (error) {
            console.error('Error fetching communes:', error);
        }
    };
    const handleEditEvent = async () => {
        console.log(editingEvent);
        if (!editingEvent.active) {
            console.error('Chỉ có thể chỉnh sửa sự kiện đang hoạt động.');
            Swal.fire({
                icon: 'error',
                title: 'Không thể chỉnh sửa',
                text: 'Chỉ có thể chỉnh sửa sự kiện đang hoạt động.',
            });
            return;
        }
    
        try {
            await adminApi.editEvent(editingEvent.id, editingEvent);
            setEvents(events.map(event => (event.id === editingEvent.id ? editingEvent : event)));
            setEditingEvent(null);
            setShowEditModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Chỉnh sửa thành công!',
                text: 'Sự kiện đã được chỉnh sửa thành công.',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error editing event:', error);
        }
    };
    const handleToggleActive = async (id, active) => {
        console.log(id);
        console.log(active);
        try {
            const response = await adminApi.activeEvent(id); // Gọi API để active/deactive event
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
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewEvent({ ...newEvent, image: file });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await adminApi.createEvent(newEvent);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
       
    };
    console.log("Edit",editingEvent);
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 p-4 overflow-x-auto">
                <div className='p-10'>
                    <h2 className="text-2xl font-bold mb-4">Quản lý Sự kiện</h2>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="bg-header text-white px-4 py-2 rounded mb-5 hover:bg-btnHover"
                    >
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
                                        <button onClick={() => confirmToggleActive(event.id, event.active)} className="text-gray-600 px-4 py-2 rounded">
                                            <FontAwesomeIcon icon={event.active ? faTrashAlt : faCheck} className={event.active ? "text-red-500" : "text-green-500"} />
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
                    <div className="fixed inset-0 flex items-center justify-center max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded shadow-lg w-full text-black max-h-screen overflow-auto">
                            <h3 className="text-lg font-semibold mb-3">Chỉnh sửa Sự kiện</h3>
                            <input
                                type="text"
                                placeholder="Tên"
                                value={editingEvent.name}
                                onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Thời gian bắt đầu"
                                value={editingEvent.begin}
                                onChange={(e) => setEditingEvent({ ...editingEvent, begin: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Thời gian kết thúc"
                                value={editingEvent.end}
                                onChange={(e) => setEditingEvent({ ...editingEvent, end: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                                required
                            />
                            <select
                                    value={editingEvent.province}
                                    onChange={(e) => {
                                        setEditingEvent({ ...editingEvent, province: e.target.value });
                                        handleProvinceChange(e.target.value);
                                    }}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                >
                                    <option value="0">Chọn tỉnh/thành phố</option>
                                    {provinces.map((province, index) => (
                                        <option key={index} value={province.id}>{province.full_name}</option>
                                    ))}
                                </select>
                                <select
                                    value={editingEvent.district}
                                    onChange={(e) => {
                                        setEditingEvent({ ...editingEvent, district: e.target.value });
                                        handleDistrictChange(e.target.value);
                                    }}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                    disabled={districts.length === 0} // Disable select until districts are loaded
                                >
                                    <option value="">Chọn huyện/quận</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district.id}>{district.full_name}</option>
                                    ))}
                                </select>
                                <select
                                    value={editingEvent.ward}
                                    onChange={(e) => setEditingEvent({ ...editingEvent, ward: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                    disabled={communes.length === 0} // Disable select until communes are loaded
                                >
                                    <option value="">Chọn xã/phường</option>
                                    {communes.map((commune, index) => (
                                        <option key={index} value={commune.id}>{commune.full_name}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Số nhà"
                                    value={editingEvent.detail}
                                    onChange={(e) => setEditingEvent({ ...editingEvent, detail: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                />
                                <select
                                    value={editingEvent.supplierId}
                                    onChange={(e) => {
                                        setEditingEvent({ ...editingEvent, supplierId: e.target.value });
                                    }}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                >
                                    <option value="">Chọn nhà cung cấp</option>
                                    {supliers.map((suplier, index) => (
                                        <option key={index} value={suplier.id}>{suplier.name}</option>
                                    ))}
                                </select>
                            <input
                                type="file"
                                placeholder="URL Hình ảnh"
                                onChange={handleImageChange}
                                className="border rounded px-2 py-1 mb-3 w-full"
                                required
                            />
                            <textarea
                                placeholder="Mô tả"
                                value={editingEvent.description}
                                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Số lượng"
                                value={editingEvent.quantity}
                                onChange={(e) => setEditingEvent({ ...editingEvent, quantity: parseInt(e.target.value) })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Trạng thái"
                                value={editingEvent.active}
                                onChange={(e) => setEditingEvent({ ...editingEvent, active: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Ngày tạo"
                                value={editingEvent.createdAt}
                                onChange={(e) => setEditingEvent({ ...editingEvent, createdAt: e.target.value })}
                                className="border rounded px-2 py-1 mb-3 w-full"
                                required
                            />
                            <div className="flex justify-end">
                                <button onClick={() => setShowEditModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded mr-2">Hủy</button>
                                <button onClick={handleEditEvent} className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Event Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-black">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
                            <h3 className="text-xl font-semibold mb-3 text-black">Thêm Sự kiện</h3>
                            <form className='p-0' onSubmit={handleAddEvent}>
                                <input
                                    type="text"
                                    placeholder="Tên"
                                    value={newEvent.name}
                                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                />
                                <input
                                    type="date"
                                    placeholder="Thời gian bắt đầu"
                                    value={newEvent.begin}
                                    onChange={(e) => setNewEvent({ ...newEvent, begin: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                />
                                <input
                                    type="date"
                                    placeholder="Thời gian kết thúc"
                                    value={newEvent.end}
                                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                />
                                <select
                                    value={newEvent.province}
                                    onChange={(e) => {
                                        setNewEvent({ ...newEvent, province: e.target.value });
                                        handleProvinceChange(e.target.value);
                                    }}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                >
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {provinces.map((province, index) => (
                                        <option key={index} value={province.id}>{province.full_name}</option>
                                    ))}
                                </select>
                                <select
                                    value={newEvent.district}
                                    onChange={(e) => {
                                        setNewEvent({ ...newEvent, district: e.target.value });
                                        handleDistrictChange(e.target.value);
                                    }}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                    disabled={districts.length === 0} // Disable select until districts are loaded
                                >
                                    <option value="">Chọn huyện/quận</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district.id}>{district.full_name}</option>
                                    ))}
                                </select>
                                <select
                                    value={newEvent.ward}
                                    onChange={(e) => setNewEvent({ ...newEvent, ward: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                    disabled={communes.length === 0} // Disable select until communes are loaded
                                >
                                    <option value="">Chọn xã/phường</option>
                                    {communes.map((commune, index) => (
                                        <option key={index} value={commune.id}>{commune.full_name}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Số nhà"
                                    value={newEvent.detail}
                                    onChange={(e) => setNewEvent({ ...newEvent, detail: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                />
                                <select
                                    value={newEvent.supplierId}
                                    onChange={(e) => {
                                        setNewEvent({ ...newEvent, supplierId: e.target.value });
                                    }}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                >
                                    <option value="">Chọn nhà cung cấp</option>
                                    {supliers.map((suplier, index) => (
                                        <option key={index} value={suplier.id}>{suplier.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="file"
                                    placeholder="Hình ảnh"
                                    onChange={handleImageChange}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                />
                                {previewImage && (
                                    <img src={previewImage} alt="Preview" className="mt-2 mb-4 w-full h-auto rounded" />
                                )}
                                <textarea
                                    placeholder="Mô tả"
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Số lượng"
                                    value={newEvent.quantity}
                                    onChange={(e) => setNewEvent({ ...newEvent, quantity: parseInt(e.target.value) })}
                                    className="border rounded px-2 py-1 mb-3 w-full"
                                    required
                                />
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded mr-2">Hủy</button>
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}



            </div>
        </div>
    );
};

export default ManageEvents;
