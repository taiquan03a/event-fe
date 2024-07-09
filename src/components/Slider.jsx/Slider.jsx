import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const events = [
    {
        id: 1,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=75',
        title: 'Live Concert TRUNG QUÂN',
        date: '13 Jul, 2024',
        location: 'HCMC - 19:00 - NHA THI ĐẤU PHÚ THỌ, Q.11'
    },
    {
        id: 2,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F48%2Fba%2Fb7%2Fe160ee347a0925650c41b15a611c928b.jpg&w=1920&q=75',
        title: 'Ngày Xửa... Ngày Xưa 35',
        date: '13 Jul, 2024',
        location: 'HCMC - 19:00 - NHA THI ĐẤU PHÚ THỌ, Q.11'
    },
    {
        id: 2,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F48%2Fba%2Fb7%2Fe160ee347a0925650c41b15a611c928b.jpg&w=1920&q=75',
        title: 'Ngày Xửa... Ngày Xưa 35',
        date: '13 Jul, 2024',
        location: 'HCMC - 19:00 - NHA THI ĐẤU PHÚ THỌ, Q.11'
    }
];

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className}  rounded-full p-2 absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer`}
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className}  rounded-full p-2 absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer `}
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const SliderEvent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
            <Slider {...settings}>
                {events.map(event => (
                    <div key={event.id} className="p-4">
                        <Link to={`/events/${event.id}`}>
                            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                    <p className="text-white">{event.date}</p>
                                    <p className="text-white">{event.location}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
    );
};

export default SliderEvent;
