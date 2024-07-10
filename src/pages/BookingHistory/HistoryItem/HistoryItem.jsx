import React from 'react';

const HistoryItem = ({ event, onCancel }) => {
  return (
    <div className="max-w-6xl w-full lg:flex mb-8 mx-auto">
      <img  src={event.image} alt="" />
      <div className="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-6 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-2xl mb-4">{event.name}</div>
          <p className="text-gray-700 text-base mb-2">Địa điểm: {event.location.detail}-{event.location.ward}-{event.location.district}-{event.location.province}</p>
          <p className="text-gray-700 text-base mb-2">Ngày bắt đầu: {event.begin}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="text-gray-600">Ngày đăng ký: {event.registerTime}</p>
          </div>
          <button 
            onClick={() => onCancel(event.id)} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
