import React from 'react';
import { Link } from 'react-router-dom';
import path from '../../../constant/path';

function Event({ data }) {
    return (
        <Link to={`${path.events}/${data.id}`} className='no-underline'>
            <div className="bg-gray-500 p-6 rounded-lg shadow-lg hover:-translate-y-3 duration-300">
                <img src={data.image} alt={data.title} className="h-40 w-full object-cover rounded-md mb-3"/>
                <h3 className="text-xl font-bold mb-2">{data.title}</h3>
                <p className="mb-3">{data.price}</p>
                <p className="mb-3">{data.date}</p>
                <p className="mb-3">{data.location}</p>
            </div>
        </Link>
    );
}

export default Event;
