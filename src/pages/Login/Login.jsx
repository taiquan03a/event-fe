import React, { useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import path from '../../constant/path';
import authApi from '../../api/auth';
const Login = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const navigate = useNavigate();
  
    const handleSignUp = () => {
      setIsSignUpMode(true);
      setEmailLogin('');
      setPasswordLogin('');
    };
  
    const handleSignIn = () => {
      setIsSignUpMode(false);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    };

    const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
  
      try {
        const response = await authApi.register(newUser); // Replace authApi.createUser with your actual API call
        console.log('Signup Successful:', response);
        if(response.statusCode === 200){
            await Swal.fire({
                icon: 'success',
                text: response.message,
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: false,
            });

            setIsSignUpMode(false);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        } else {
            await Swal.fire({
                icon: 'error',
                text: response.message,
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: false,
            });
        }
      } catch (error) {
        console.error('Signup Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Đăng ký không thành công!',
          text: 'Vui lòng thử lại sau.',
        });
      }
    };
  
    const handleSignInSubmit = async (e) => {
      e.preventDefault();
      const userCredentials = {
          email: emailLogin,
          password: passwordLogin,
      };
  
      try {
          const response = await authApi.login(userCredentials); // Thay authApi.loginUser bằng API thực tế của bạn
          console.log('Đăng nhập thành công:', response);
  
          await Swal.fire({
              icon: 'success',
              text: 'Đăng nhập thành công',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: false,
          });
          localStorage.setItem('accessToken', response.accessToken);
          if (response.roles[0] === 'ROLE_ADMINISTRATOR') {
              navigate(path.manageUsers);
          } else if (response.roles[0] === 'ROLE_USER') {
              navigate(path.home);
          } else {
              console.error('Unknown role:', response.roles);
          }
  
      } catch (error) {
          console.error('Login Error:', error);
          Swal.fire({
              icon: 'error',
              title: 'Đăng nhập không thành công!',
              text: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
          });
      }
  };

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
      <div className={styles['forms-container']}>
        <div className={styles['signin-signup']}>
          <form className={styles['sign-in-form']} onSubmit={handleSignInSubmit}>
            <h2 className={styles.title}>Đăng nhập</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-user"></i>
              <input
                className={`${styles['input-xxx']} w-full h-full px-4 outline-none rounded-3xl`}
                type="email"
                placeholder="Email"
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
                required
              />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input
                className={`${styles['input-xxx']} w-full h-full px-4 outline-none rounded-3xl`}
                type="password"
                placeholder="Mật khẩu"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Đăng nhập" className={`${styles.btn} solid`} required />
          </form>

          <form className={styles['sign-up-form']} onSubmit={handleSignUpSubmit}>
            <h2 className={styles.title}>Đăng ký</h2>
            <div className={`${styles['input-field']}`}>
              <input
                className={`${styles['input-xxx']} w-full h-full px-4 outline-none rounded-3xl`}
                type="text"
                placeholder="Họ"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={`${styles['input-field']}`}>
              <input
                className={`${styles['input-xxx']} w-full h-full px-4 outline-none rounded-3xl`}
                type="text"
                placeholder="Tên"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-envelope"></i>
              <input
                className={`${styles['input-xxx']} w-full h-full px-4 outline-none rounded-3xl`}
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
                className={`${styles['input-xxx']} w-full h-full px-4 outline-none rounded-3xl`}
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
            <h3>Hưng Thịnh</h3>
            <p>Đăng ký sự kiện một cách đơn giản và hiệu quả với website của chúng tôi!</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn" onClick={handleSignUp}>Tạo mới</button>
          </div>
        </div>

        <div className={`${styles.panel} ${styles['right-panel']} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
          <div className={styles.content}>
            <h3>Hưng Thịnh</h3>
            <p>Hãy trải nghiệm việc đăng ký sự kiện dễ dàng và nhanh chóng trên trang web của chúng tôi!</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-in-btn" onClick={handleSignIn}>Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
