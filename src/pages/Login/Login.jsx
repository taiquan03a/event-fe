import React, { useState } from 'react';
import styles from './login.module.css';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import path from '../../constant/path';

const Login = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    // const navigate = useNavigate();
  
    const handleSignUp = () => {
      setIsSignUpMode(true);
      setUsernameLogin('')
      setPasswordLogin('')
    };
  
    const handleSignIn = () => {
      setIsSignUpMode(false);
      setUsername('')
      setEmail('')
      setPassword('')
    };
  
    // const handleSignUpSubmit = async (e) => {
    //   e.preventDefault();
    //   const newUser = {
    //     username: username,
    //     email: email,
    //     password: password,
    //     cart: [],
    //     historyProduct:[],
    //     orderProduct: []
    //   };
  
    //   try {
    //     const response = await userApi.createUser(newUser);
    //     console.log('Signup Successful:', response);
    //     if(response.success){
    //         await Swal.fire({
    //             icon: 'success',
    //             text: response.message,
    //             showConfirmButton: false, // Ẩn nút OK
    //             timer: 1000, // Tự động đóng sau 3 giây (3000 miligiây)
    //             timerProgressBar: false, // Hiển thị thanh tiến trình đếm ngược
    //         });

    //         setIsSignUpMode(false);
    //         setUsername('')
    //         setEmail('')
    //         setPassword('')
    //     }
    //     else{
    //         await Swal.fire({
    //             icon: 'error',
    //             text: response.message,
    //             showConfirmButton: false, // Ẩn nút OK
    //             timer: 1000, // Tự động đóng sau 3 giây (3000 miligiây)
    //             timerProgressBar: false, // Hiển thị thanh tiến trình đếm ngược
    //         });
    //     }
    //   } catch (error) {
    //     console.error('Signup Error:', error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Đăng ký không thành công!',
    //       text: 'Vui lòng thử lại sau.',
    //     });
    //   }
    // };
  
    // const handleSignInSubmit = async (e) => {
    //   e.preventDefault();
    //   const userCredentials = {
    //     username: usernameLogin,
    //     password: passwordLogin
    //   };
  
    //   try {
    //     const response = await userApi.loginUser(userCredentials);
    //     console.log('Đăng nhập thành công:', response);
    //     localStorage.setItem('userId', response.user.id);
    //     await Swal.fire({
    //         icon: 'success',
    //         text: response.message,
    //         showConfirmButton: false, // Ẩn nút OK
    //         timer: 1000, // Tự động đóng sau 3 giây (3000 miligiây)
    //         timerProgressBar: false, // Hiển thị thanh tiến trình đếm ngược
    //     });
    //     navigate(path.home);
    //     window.location.reload()
    //   } catch (error) {
    //     console.error('Login Error:', error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Đăng nhập không thành công!',
    //       text: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
    //     });
    //   }
    // };

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
      <div className={styles['forms-container']}>
        <div className={styles['signin-signup']}>
          <form className={styles['sign-in-form']} >
            <h2 className={styles.title}>Đăng nhập</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-user"></i>
              <input
                className={`${styles['input-xxx']}`}
                type="text"
                placeholder="Tài khoản"
                value={usernameLogin}
                onChange={(e) => setUsernameLogin(e.target.value)}
                required
              />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input
                className={`${styles['input-xxx']}`}
                type="password"
                placeholder="Mật khẩu"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Đăng nhập" className={`${styles.btn} solid`} required />
          </form>

          <form className={styles['sign-up-form']} >
            <h2 className={styles.title}>Đăng ký</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-user"></i>
              <input
                className={`${styles['input-xxx']}`}
                type="text"
                placeholder="Tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-envelope"></i>
              <input
                className={`${styles['input-xxx']}`}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input
                className={`${styles['input-xxx']}`}
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Đăng ký" className={`${styles.btn} solid`} required />
          </form>
        </div>
      </div>
      <div className={styles['panels-container']}>
        <div className={`${styles.panel} ${styles['left-panel']} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
          <div className={styles.content}>
            <h3>Event Organization</h3>
            <p>Đăng ký sự kiện một cách đơn giản và hiệu quả với website của chúng tôi!</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn" onClick={handleSignUp}>Tạo mới</button>
          </div>
        </div>

        <div className={`${styles.panel} ${styles['right-panel']} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
          <div className={styles.content}>
            <h3>Event Organization</h3>
            <p>Hãy trải nghiệm việc đăng ký sự kiện dễ dàng và nhanh chóng trên trang web của chúng tôi!</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-in-btn" onClick={handleSignIn}>Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
