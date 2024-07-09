import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function About() {
    return ( 
        <div className="min-h-screen">
            <Header />
            <div className="p-10">
                <div className="max-w-4xl mx-auto rounded-lg">
                    <h1 className="text-xl font-bold mb-5 text-center">Hưng Thịnh - Tinh Hoa Nước Hoa</h1>
                    <p className="text-md mb-4">
                        Chào mừng bạn đến với công ty Hưng Thịnh! Chúng tôi tự hào là nhà phân phối hàng đầu các loại nước hoa nhập khẩu và tự sản xuất nước hoa tại Việt Nam. Với sứ mệnh mang đến cho khách hàng những trải nghiệm hương thơm đẳng cấp và tinh tế, Hưng Thịnh không ngừng nỗ lực và sáng tạo trong từng sản phẩm.
                    </p>
                    <p className="text-md mb-4">
                        Chúng tôi hợp tác với các nhà sản xuất nước hoa uy tín trên thế giới để nhập khẩu những dòng nước hoa chất lượng nhất, đồng thời sở hữu dây chuyền sản xuất hiện đại để tạo ra những mùi hương độc đáo mang đậm dấu ấn riêng. Đội ngũ chuyên gia của Hưng Thịnh luôn tận tâm nghiên cứu và phát triển, đảm bảo mỗi sản phẩm đều đạt tiêu chuẩn cao nhất về chất lượng và an toàn.
                    </p>
                    <p className="text-md mb-4">
                        Chúng tôi tin rằng, mỗi giọt nước hoa không chỉ đơn thuần là một mùi hương mà còn là một phần của nghệ thuật và cảm xúc. Hưng Thịnh cam kết mang đến cho bạn những sản phẩm nước hoa tuyệt vời nhất, giúp bạn tự tin thể hiện phong cách và cá tính riêng.
                    </p>
                    <p className="text-md mb-4">
                        Cảm ơn bạn đã tin tưởng và lựa chọn Hưng Thịnh. Chúng tôi rất mong được đồng hành cùng bạn trên hành trình khám phá thế giới hương thơm.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;
