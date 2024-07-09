import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return ( 
        <footer className="text-center text-white mt-5 bg-header text-md">
            <section className="flex justify-center p-4 border-b border-gray-200">
                <div className="mr-5 hidden lg:block">
                    <span>Theo dõi chúng tôi trên mạng xã hội:</span>
                </div>
                <div>
                    <Link to="" className="mr-4 text-reset">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                    <Link to="" className="mr-4 text-reset">
                        <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                    <Link to="" className="mr-4 text-reset">
                        <FontAwesomeIcon icon={faGoogle} />
                    </Link>
                    <Link to="" className="mr-4 text-reset">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    <Link to="" className="mr-4 text-reset">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                    <Link to="" className="mr-4 text-reset">
                        <FontAwesomeIcon icon={faGithub} />
                    </Link>
                </div>
            </section>
            <section className="border-b border-gray-200">
                <div className="container mx-auto text-center text-md-start mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                        <div className="mb-4">
                            <div className="text-uppercase font-bold mb-4 text-2xl">
                                Hưng Thịnh
                            </div>
                            <p>
                                Cổng thông tin sự kiện tuyệt vời. Đăng ký, tham dự và tận hưởng một trải nghiệm sự kiện hoàn hảo cùng Hưng Thịnh.
                            </p>
                        </div>
                        <div className="mb-4">
                            <h6 className="text-uppercase font-bold mb-4">
                                Sự kiện
                            </h6>
                            <p>
                                <Link to="" className="text-reset text-decoration-none">Sự kiện sắp tới</Link>
                            </p>
                            <p>
                                <Link to="" className="text-reset text-decoration-none">Sự kiện đã diễn ra</Link>
                            </p>
                            <p>
                                <Link to="" className="text-reset text-decoration-none">Sự kiện phổ biến</Link>
                            </p>
                            <p>
                                <Link to="" className="text-reset text-decoration-none">Sự kiện trực tuyến</Link>
                            </p>
                        </div>
                        <div className="mb-4">
                            <h6 className="text-uppercase font-bold mb-4">
                                Thông tin
                            </h6>
                            <p>
                                <Link to="" className="text-reset text-decoration-none">Về chúng tôi</Link>
                            </p>
                            <p>
                                <Link to="" className="text-reset text-decoration-none">Chính sách bảo mật</Link>
                            </p>
                            <p>
                                <Link to="" className="text-reset text-decoration-none">Điều khoản & Điều kiện</Link>
                            </p>
                            <p>
                                <Link to="" className="text-reset text-decoration-none">Câu hỏi thường gặp</Link>
                            </p>
                        </div>
                        <div className="mb-4">
                            <h6 className="text-uppercase font-bold mb-4">Liên hệ</h6>
                            <p>
                                <FontAwesomeIcon icon={faHome} className="mr-3" />
                                123 Đường Sự Kiện, Thành phố, Quốc gia
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                                support@Hưng Thịnh.com
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                                +1 234 567 890
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faPrint} className="mr-3" />
                                +1 234 567 891
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4">
                © 2024 Hưng Thịnh. Bảo lưu mọi quyền.
            </div>
        </footer>
    );
}

export default Footer;
