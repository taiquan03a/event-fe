
const path = {
    home: '/',
    login: '/login',
    about: '/about',
    events: '/events',
    eventDetail: (id)=> `/events/${id}`,
    bookingHistory: '/booking-history',
    canceledHistory: '/canceled-history',
    manageUsers: '/manage-users',
    manageEvents: '/manage-events',
    manageSuplier: '/manage-suplier',
};

export default path;
