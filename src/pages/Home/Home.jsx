import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SliderEvent from "../../components/Slider.jsx/Slider";

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
                
            </div>
            <Footer />
        </div>
    );
}

export default Home;
