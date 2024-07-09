import React from 'react';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function EventDetail() {
    const event = {
        title: 'Liveshow Cẩm Ly - Kỷ niệm 30 năm ca hát - Tự tình quê hương 6',
        startDate: 'August 15, 2024',
        endDate: 'August 18, 2024',
        location: 'Hà Nội, Việt Nam',
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=75',
        description: 'Liveshow đặc biệt kỷ niệm 30 năm ca hát của Cẩm Ly với chủ đề "Tự tình quê hương 6". Một sự kiện âm nhạc đặc sắc với những ca khúc gắn liền với tên tuổi của Cẩm Ly và sự xuất hiện của nhiều nghệ sĩ nổi tiếng.'
    };

    return ( 
        <div className="min-h-screen">
            <Header/>
            <div className="container mx-auto max-w-7xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-500 p-5 rounded-3xl">
                    <div className="lg:col-span-1">
                        <img src={event.image} alt={event.title} className="w-full rounded-lg shadow-lg h-full"/>
                    </div>
                    <div className="lg:col-span-1 flex flex-col justify-between p-6 rounded-lg space-y-4">
                        <h1 className="text-3xl font-bold">{event.title}</h1>
                        <p><strong>Ngày bắt đầu:</strong> {event.startDate}</p>
                        <p><strong>Ngày kết thúc:</strong> {event.endDate}</p>
                        <p><strong>Địa điểm:</strong> {event.location}</p>
                        <p><strong>Mô tả:</strong> {event.description}</p>
                        <button className="bg-header hover:bg-btnHover text-white font-bold py-2 px-4 rounded">
                            Đăng ký ngay
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
     );
}

export default EventDetail;
