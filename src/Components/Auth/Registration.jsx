import "react-toastify/dist/ReactToastify.css";
import FeatherIcon from 'feather-icons-react';
import Arm from './Images/Recovery.png';
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";
import React,{useState} from 'react';


const Registeration = () => {
  const[loading, setLoading ] = useState(false);

  const [inputs, setInputs] = useState({
    Username:'',
    Email:'',
    Password:'',
    RePassword:'',
    Phone:'',
    Cnic:''
  })

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitReg = ()=>{
   
    if(inputs.Password !==  inputs.RePassword){
      toast.warn(`Password doesn't match`)
      
    }
    else{
      setLoading(true)
      var formdata = new FormData();
      formdata.append("name", inputs.Username);
      formdata.append("email",inputs.Email);
      formdata.append("password", inputs.Password);
      formdata.append("password_confirmation", inputs.RePassword);
      formdata.append("roleid", "developer");
      formdata.append("phone",inputs.Phone);
      formdata.append("cnic", inputs.Cnic);
      
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch(`${process.env.REACT_APP_BASE_URL}api/register`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result.user){
            setLoading(false);
            toast.info("Registered !")
            setInterval(() => {
              window.location.reload(true);
            }, 1500);
          }else{
            setLoading(false);
            toast.error(result.message)
          }
        
        })
        .catch(error => {
          return error
        });
    }


   
  }

  return (
    <div>
         {/* BEGIN: Content*/}
<div className="app-content">
  <div className="content-wrapper">
   
    <div className="content-body">
      <div className="auth-wrapper auth-basic px-2">
        <div className="auth-inner my-2">
          {/* Register basic */}
          <div className="card mb-0" style={{boxShadow:"0px 6px 8px rgba(199, 217, 237, 0.8)"}}>
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
                <h2 className="brand-text text-primary"> <img src={Arm} alt="" width={220}/> </h2>
              </a>
              <h4 className="card-title mb-3 text-center">Registeration starts here 🚀</h4>
              <p className="card-text mb-2">Make your app management easy and fun!</p>
              <div className="auth-register-form mt-2" >
                <div className="mb-1">
                  <label htmlFor="register-username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="register-username" name="Username" onChange={inputHandler} placeholder="johndoe" aria-describedby="register-username" tabIndex={1} autofocus />
                </div>

                <div className="mb-1">
                  <label htmlFor="register-email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="register-email" name="Email" onChange={inputHandler} placeholder="john@example.com" aria-describedby="register-email" tabIndex={2} />
                </div>
                <div className="mb-1">
                  <label htmlFor="register-password" className="form-label">Password</label>
                  <div className="input-group input-group-merge form-password-toggle">
                    <input type="password" className="form-control form-control-merge" id="register-password" name="Password" onChange={inputHandler} placeholder="············" aria-describedby="register-password" tabIndex={3} />
                    <span className="input-group-text cursor-pointer"><i data-feather="eye" /></span>
                  </div>
                </div>

                <div className="mb-1">
                  <label htmlFor="register-password" className="form-label">Re-password</label>
                  <div className="input-group input-group-merge form-password-toggle">
                    <input type="password" className="form-control form-control-merge" id="register-password" name="RePassword" onChange={inputHandler} placeholder="············" aria-describedby="register-password" tabIndex={3} />
                    <span className="input-group-text cursor-pointer"><i data-feather="eye" /></span>
                  </div>
                </div>

                <div className="mb-1">
                  <label htmlFor="register-email" className="form-label">Ph#</label>
                  <input type="number" className="form-control" id="register-email" name="Phone" placeholder="+92 333 123456789" onChange={inputHandler} aria-describedby="register-email" tabIndex={2} maxLength={11}/>
                </div>

                <div className="mb-1">
                  <label htmlFor="register-email" className="form-label">CNIC</label>
                  <input type="number" maxLength={5} className="form-control" id="register-email" name="Cnic" placeholder="XXXXX-XXXXXXX-X" onChange={inputHandler} aria-describedby="register-email" tabIndex={2} />
                </div>

                <div className="mb-1">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="register-privacy-policy" tabIndex={4} />
                    <label className="form-check-label text-info" htmlFor="register-privacy-policy">
                      I agree to <a className="text-info" href="#">privacy policy &amp; terms</a>
                    </label>
                  </div>
                </div>
                <button className="btn btn-info w-100" tabIndex={5} onClick={submitReg}>
                  {
                    loading === true ?"Loading...":"Sign Up"
                  }
                </button>
              </div>
              <p className="text-center mt-2">
                <span>Already have an account?</span>
                <Link to="/">&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-info">Sign in instead</span>
                </Link>
              </p>
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
          {/* /Register basic */}
        </div>
      </div>
    </div>
  </div>
</div>
{/* END: Content*/}

    </div>
  )
}

export default Registeration