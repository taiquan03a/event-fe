import React from 'react';
import path from '../../constant/path';
import { Link } from 'react-router-dom';

const CanceledItem = ({ event }) => {
    console.log(event);
  return (
    <div className="max-w-4xl w-full lg:flex mb-8 mx-auto">
      <img className='w-64 h-64'  src={`data:image/jpeg;base64,${event.image}`} alt="" />
      <div className="border-r h-64 border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400  rounded-b lg:rounded-b-none lg:rounded-r bg-white p-6 flex flex-col justify-between leading-normal w-full">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-2xl mb-4">{event.name}</div>
          <p className="text-gray-700 text-base mb-2">Địa điểm: {event.location.detail}-{event.location.ward}-{event.location.district}-{event.location.province}</p>
          <p className="text-gray-700 text-base mb-2">Ngày bắt đầu: {event.begin}</p>
          <p className="text-gray-700 text-base mb-2">Ngày kết thúc: {event.end}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="text-gray-600">Ngày hủy: {event.cancelTime}</p>
          </div>
          <Link to={`${path.events}/${event.id}`} className='no-underline'>
            <button 
                className="bg-header hover:bg-btnHover text-white font-bold py-2 px-4 rounded"
            >
                Đăng ký lại
            </button>
          
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CanceledItem;
