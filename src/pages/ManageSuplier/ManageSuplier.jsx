import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'; // Add faEdit icon
import Sidebar from '../../components/SideBar/Sidebar';
import Swal from 'sweetalert2';
import adminApi from '../../api/adminApi';

const ManageSuplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        name: '',
        phone: '',
        address: '',
        description: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false); // Track whether modal is in edit mode
    const [editSupplierId, setEditSupplierId] = useState(null); // Track which supplier is being edited

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const data = await adminApi.getAllSuplier();
            setSuppliers(data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    const handleAddSupplier = async () => {
        try {
            if (editMode && editSupplierId) {
                await adminApi.editSuplier(editSupplierId, newSupplier); // Call editSuplier API with edited supplier data
                Swal.fire({
                    icon: 'success',
                    title: 'Sửa thành công!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                await adminApi.createSuplier(newSupplier); // Call createSuplier API with new supplier data
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm mới thành công!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            fetchSuppliers();
            setShowModal(false);
            setNewSupplier({
                name: '',
                phone: '',
                address: '',
                description: '',
            });
            setEditMode(false);
            setEditSupplierId(null);
        } catch (error) {
            console.error('Error saving supplier:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi lưu thông tin nhà cung cấp.',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleSupplierAction = async (id) => {
        try {
            await adminApi.activeSuplier(id);
            fetchSuppliers();
        } catch (error) {
            console.error('Error activating supplier:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi kích hoạt nhà cung cấp.',
                confirmButtonText: 'OK',
            });
        }
    };

    const confirmAction = async (id, action) => {
        const result = await Swal.fire({
            title: action === 'delete' ? 'Xóa nhà cung cấp' : 'Kích hoạt nhà cung cấp',
            text: action === 'delete' ? 'Bạn có chắc muốn xóa nhà cung cấp này?' : 'Bạn có chắc muốn kích hoạt nhà cung cấp này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            handleSupplierAction(id);
        }
    };

    const openModal = (supplier) => {
        if (supplier) {
            // If editing an existing supplier, set modal in edit mode and populate fields
            setEditMode(true);
            setEditSupplierId(supplier.id);
            setNewSupplier({
                name: supplier.name,
                phone: supplier.phone,
                address: supplier.address,
                description: supplier.description,
            });
        } else {
            // If adding a new supplier, reset fields
            setNewSupplier({
                name: '',
                phone: '',
                address: '',
                description: '',
            });
            setEditMode(false);
            setEditSupplierId(null);
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewSupplier({
            name: '',
            phone: '',
            address: '',
            description: '',
        });
        setEditMode(false);
        setEditSupplierId(null);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1 p-4">
                <div className="p-10">
                    <h2 className="text-2xl font-bold mb-5">Quản lý Nhà cung cấp</h2>
                    <div className="mb-4">
                        <button onClick={() => openModal()} className="bg-header hover:bg-btnHover text-white font-bold py-2 px-4 rounded">
                            Thêm Nhà cung cấp
                        </button>
                    </div>
                    <table className="min-w-full text-center">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Tên</th>
                                <th className="py-2 px-4 border-b">Số điện thoại</th>
                                <th className="py-2 px-4 border-b">Địa chỉ</th>
                                <th className="py-2 px-4 border-b">Mô tả</th>
                                <th className="py-2 px-4 border-b">Trạng thái</th>
                                <th className="py-2 px-4 border-b">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map(supplier => (
                                <tr key={supplier.id}>
                                    <td className="py-2 px-4 border-b">{supplier.id}</td>
                                    <td className="py-2 px-4 border-b">{supplier.name}</td>
                                    <td className="py-2 px-4 border-b">{supplier.phone}</td>
                                    <td className="py-2 px-4 border-b">{supplier.address}</td>
                                    <td className="py-2 px-4 border-b">{supplier.description}</td>
                                    <td className="py-2 px-4 border-b">{supplier.active ? 'Hoạt động' : 'Không hoạt động'}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={() => openModal(supplier)} className="mr-2 text-blue-600 hover:underline">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        {supplier.active ? (
                                            <>
                                                <button onClick={() => confirmAction(supplier.id, 'delete')} className="text-red-500 hover:underline">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => confirmAction(supplier.id, 'activate')} className="text-green-600 hover:underline">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 max-w-3xl mx-auto">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full text-black">
                        <h2 className="text-xl font-bold mb-4">{editMode ? 'Sửa thông tin Nhà cung cấp' : 'Thêm Nhà cung cấp'}</h2>
                        <form onSubmit={handleAddSupplier} className="flex flex-col">
                            <div className="mb-4 flex w-full items-center">
                                <label className="block text-sm font-bold mb-2 w-1/4" htmlFor="name">
                                    Tên Nhà cung cấp
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newSupplier.name}
                                    onChange={handleInputChange}
                                    className="w-3/4 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex w-full items-center">
                                <label className="block text-sm font-bold mb-2 w-1/4" htmlFor="phone">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={newSupplier.phone}
                                    onChange={handleInputChange}
                                    className="w-3/4 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex w-full items-center">
                                <label className="block text-sm font-bold mb-2 w-1/4" htmlFor="address">
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={newSupplier.address}
                                    onChange={handleInputChange}
                                    className="w-3/4 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex w-full items-center">
                                <label className="block text-sm font-bold mb-2 w-1/4" htmlFor="description">
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newSupplier.description}
                                    onChange={handleInputChange}
                                    className="w-3/4 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                                    Hủy
                                </button>
                                <button type="submit" className="bg-header hover:bg-btnHover text-white font-bold py-2 px-4 rounded">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageSuplier;
