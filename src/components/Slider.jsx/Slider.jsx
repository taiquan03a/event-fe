import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import userApi from '../../api/userApi';

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

const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh'
    };
    return date.toLocaleDateString('en-US', options);
};

const SliderEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await userApi.getAllEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

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
                            <img src={event.image} alt={event.name} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white">{event.name}</h3>
                                <p className="text-white">{formatEventDate(event.begin)}</p>
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
