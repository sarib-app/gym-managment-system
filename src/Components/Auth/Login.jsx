import {login, goFuckYourSelf,emailName,email,passwordName,password} from '../../interceptors.js';
import { EncryptStorage } from 'encrypt-storage';
import "react-toastify/dist/ReactToastify.css";
import FeatherIcon from 'feather-icons-react';
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import React,{useState} from 'react';
import axios from 'axios';

toast.configure();
const Login = () => {
  const [passwordType, setPasswordType] = useState("password");  
  const[loading, setLoading ] = useState(false);
  const[eye,seteye]=useState(true);

  const [inputs, setInputs] = useState({
    Username:'',
    Password:''
  })
  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const togglePassword =()=>{
    if(passwordType ==="password")
    {
      setPasswordType("text");
      seteye(false);

    }
    else{

      setPasswordType("password");
      seteye(true);

    }
    
    
  }
  
  const SignIN = (e) => {
    e.preventDefault()
    setLoading(true)
    const userObj = {
      email:inputs.Username,
      password:inputs.Password
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}api/login`,userObj)
    .then((res)=>{
      const encryptStorage = new EncryptStorage('secret-key', {
        prefix: '@instance1',
      });
      const encryptStorageTwo = new EncryptStorage('secret-key', {
        prefix: '@instance2'
      });
        AsyncStorage.setItem(login,(goFuckYourSelf));
        AsyncStorage.setItem(emailName,email);
        AsyncStorage.setItem(passwordName,password);
        AsyncStorage.setItem('userName',(res.data.user.name));
        
        
        encryptStorage.setItem('unique_key',res.data.token);
        encryptStorageTwo.setItem('userID',(res.data.user.id));

        setLoading(false)
        toast.info("Successfully Logged In")

        setInterval(() => {
          
            window.location.reload(true);
          }, 1500);

         
    })
    .catch((error)=>{
      setLoading(false);
      toast.warn("Incorrect Credentials");
      // setInterval(() => {
          
      //   window.location.reload(true);
      // }, 1500);
    setInputs({
        Username:'',
        Password:''
      })
      return error;
    })

     
  }

  return (
    <>
      <div className="app-content ">

  <div className="content-wrapper">
    <div className="content-body">
      <div className="auth-wrapper auth-basic px-2">
        <div className="auth-inner my-2">
          {/* Login basic */}
          <div className="card mb-0">
            <div className="card-body">
              <a href="" className="brand-logo">
                {/* <svg viewBox="0 0 139 95" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height={28}>
                  <defs>
                    <linearGradient id="linearGradient-1" x1="100%" y1="10.5120544%" x2="50%" y2="89.4879456%">
                      <stop stopColor="#000000" offset="0%" />
                      <stop stopColor="#FFFFFF" offset="100%" />
                    </linearGradient>
                    <linearGradient id="linearGradient-2" x1="64.0437835%" y1="46.3276743%" x2="37.373316%" y2="100%">
                      <stop stopColor="#EEEEEE" stopOpacity={0} offset="0%" />
                      <stop stopColor="#FFFFFF" offset="100%" />
                    </linearGradient>
                  </defs>
                  <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                      <g id="Group" transform="translate(400.000000, 178.000000)">
                        <path className="text-primary" id="Path" d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z" style={{fill: 'currentColor'}} />
                        <path id="Path1" d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z" fill="url(#linearGradient-1)" opacity="0.2" />
                        <polygon id="Path-2" fill="#000000" opacity="0.049999997" points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325" />
                        <polygon id="Path-21" fill="#000000" opacity="0.099999994" points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338" />
                        <polygon id="Path-3" fill="url(#linearGradient-2)" opacity="0.099999994" points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288" />
                      </g>
                    </g>
                  </g>
                </svg> */}
                <h2 className="brand-text text-primary ms-1" style={{fontSize:"5em"}}><i className="fa-solid fa-dumbbell text-info"></i></h2>
              </a>
              <h4 className="card-title mb-4 text-center">Welcome to Dashboard! 👋</h4>
              <p className="card-text mb-2">Please sign-in to your account and start the adventure</p>
              <form className="auth-login-form mt-2" onSubmit={SignIN}>
                <div className="mb-1">
                  <label htmlFor="login-email" className="form-label">Email</label>
                  <input type="text" className="form-control" id="login-email" name="Username" onChange={inputHandler} value={inputs.Username} placeholder="john@example.com" aria-describedby="login-email" tabIndex={1} autofocus />
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between">
                    <label className="form-label"  htmlFor="login-password" >Password</label>
                    {/* <a href="">
                      <small>Forgot Password?</small>
                    </a> */}
                  </div>
                  <div className="input-group input-group-merge form-password-toggle">
                    <input type={passwordType} className="form-control form-control-merge" id="login-password" name="Password"  value={inputs.Password} onChange={inputHandler}tabIndex={2} placeholder="············" aria-describedby="login-password" />
                    <span className="input-group-text cursor-pointer" ><i onClick={togglePassword}  className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`} /></span>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember-me" tabIndex={3} />
                    <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                  </div>
                </div>
                <button className="btn btn-info w-100" type="submit" tabIndex={4}>
                  {
                  loading === true?"Loading...":"Sign in" 
                  }
                </button>
              </form>
              {/* <p className="text-center mt-2">
                <span>New on our platform?</span>
                <Link to="/Registration">&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-info">Create an account</span>
                </Link>
              </p> */}
              <div className="divider my-2">
                <div className="divider-text">or</div>
              </div>
              <div className="auth-footer-btn d-flex justify-content-center">
                <a href="#" className="btn btn-facebook">
                <FeatherIcon icon="facebook" />
                </a>
                <a href="#" className="btn btn-twitter white">
                  <FeatherIcon icon="twitter" />
                </a>
                <a href="#" className="btn btn-google">
                  <FeatherIcon icon="mail" />
                </a>
                <a href="#" className="btn btn-github">
                  <FeatherIcon icon="github" />
                </a>
              </div>
            </div>
          </div>
          {/* /Login basic */}
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default Login