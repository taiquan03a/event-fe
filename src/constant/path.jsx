
const path = {
    home: '/',
    login: '/login',
    dashboardAdmin: '/dashboard-admin',
    about: '/about',
    events: '/events',
    eventDetail: (id)=> `/events/${id}`,
    manageUsers: '/manage-users',
    manageEvents: 'manage-events',
    bookingHistory: 'booking-history',
};

export default path;
