import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SliderEvent from "../../components/Slider.jsx/Slider";
import Event from "../EventList/Event/Event";
const events = [
    {
        id: 1,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=75',
        title: 'Live Concert TRUNG QUÂN',
        date: '13 Jul, 2024',
        price: 'From 1.000.000đ',
        location: 'HCMC - 19:00 - NHA THI ĐẤU PHÚ THỌ, Q.11'
    },
    {
        id: 2,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F48%2Fba%2Fb7%2Fe160ee347a0925650c41b15a611c928b.jpg&w=1920&q=75',
        title: 'Ngày Xửa... Ngày Xưa 35',
        date: '13 Jul, 2024',
        price: 'From 250.000đ',
        location: 'HCMC - 19:00 - NHA THI ĐẤU PHÚ THỌ, Q.11'
    },
    {
        id: 3,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=75',
        title: 'Acoustic Night with Anh Khoa',
        date: '20 Jul, 2024',
        price: 'From 800.000đ',
        location: 'HCMC - 20:00 - Saigon Acoustic Lounge'
    },
    {
        id: 4,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F48%2Fba%2Fb7%2Fe160ee347a0925650c41b15a611c928b.jpg&w=1920&q=75',
        title: 'Rock Show - The Wall',
        date: '25 Jul, 2024',
        price: 'From 600.000đ',
        location: 'HCMC - 19:30 - Lan Anh Music Center'
    },
    {
        id: 5,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F48%2Fba%2Fb7%2Fe160ee347a0925650c41b15a611c928b.jpg&w=1920&q=75',
        title: 'Classical Music Evening',
        date: '30 Jul, 2024',
        price: 'From 1.200.000đ',
        location: 'HCMC - 18:00 - Opera House'
    },
    {
        id: 6,
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2FUpload%2Feventcover%2F2024%2F02%2F22%2FBF092B.jpg&w=1920&q=75',
        title: 'Stand-Up Comedy Night',
        date: '5 Aug, 2024',
        price: 'From 300.000đ',
        location: 'HCMC - 20:00 - Comedy Club'
    }
];


function Home() {
    return (
        <div>
            <Header />
            <div className="container mx-auto py-8 px-16 max-w-7xl">
                <SliderEvent />
                <section className="my-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Chào mừng bạn đến với Hưng Thịnh</h2>
                    <p className="text-center text-lg text-white mb-8">
                        Chào mừng bạn đến với Hưng Thịnh - nơi tinh hoa của nghệ thuật và cảm xúc trong từng sự kiện và từng giọt nước hoa. Chúng tôi tự hào là nền tảng hàng đầu trong việc tổ chức sự kiện đẳng cấp và phân phối nước hoa cao cấp tại Việt Nam.
                    </p>
                    <p className="text-center text-lg text-white mb-8">
                        Tại Hưng Thịnh, chúng tôi hợp tác chặt chẽ với các đối tác và nhà tổ chức sự kiện uy tín trên toàn thế giới, để đem đến cho khách hàng những trải nghiệm sự kiện độc đáo và mang tính cộng đồng cao. Đồng thời, chúng tôi không ngừng sáng tạo và phát triển các dòng nước hoa tinh tế, mang đậm dấu ấn riêng.
                    </p>
                    <p className="text-center text-lg text-white mb-8">
                        Chúng tôi cam kết không ngừng nỗ lực và sáng tạo để mỗi sự kiện của chúng tôi không chỉ đơn thuần là một hoạt động, mà còn là một tác phẩm nghệ thuật với sự kết hợp tinh tế giữa hương vị, thị giác và cảm xúc. Mỗi giọt nước hoa của Hưng Thịnh không chỉ là mùi hương, mà còn là một phần của nghệ thuật và cảm xúc.
                    </p>
                </section>



                <section className="my-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Sự kiện nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map(event => (
                            <Event key={event.id} data={event} />
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
