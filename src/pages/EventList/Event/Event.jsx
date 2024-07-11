import React from 'react';
import { Link } from 'react-router-dom';
import path from '../../../constant/path';

function Event({ data }) {
    const formattedDate = new Date(data.begin).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    return (
        <Link to={`${path.events}/${data.id}`} className='no-underline'>
            <div className="bg-gray-500 p-6 rounded-lg shadow-lg hover:-translate-y-3 duration-300 h-full">
                <img src={`data:image/jpeg;base64,${data.image}`} alt={data.name} className="h-40 w-full object-cover rounded-md mb-3"/>
                <h3 className="text-xl font-bold mb-2">{data.name}</h3>
                <p className="mb-3">Thời gian: {formattedDate}</p>
                <p className="mb-3">Địa điểm: {data.location.detail}-{data.location.ward}-{data.location.district}-{data.location.province}</p>
                <p className="mb-3">Số lượng tối đa: {data.quantityMax}</p>
                <p className="mb-3">Số lượng hiện tại: {data.quantityCurrent}</p>
            </div>
        </Link>
    );
}

export default Event;
