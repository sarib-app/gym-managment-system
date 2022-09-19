import React, {useState, useEffect } from 'react';
import { EncryptStorage } from 'encrypt-storage';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import baseURL from '../BaseUrl.js';
import axios from 'axios';

toast.configure();
const RegMemForm = () => {
  const[checked, isRegFee] = useState('Not Paid');
  const[cincFile , setCnicFile] = useState(null);
  const [token, seToken] = useState('');
  const[userID , setUserID] = useState();
  const[btnPress , setBtnPress] = useState(false);

  const[loading, setLoading ] = useState(false);
  const encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });
  const encryptStorageTwo = new EncryptStorage('secret-key', {
    prefix: '@instance2',
  });
  const SetLocalLogin = async () => {
    try {
      let userToken = await encryptStorage.getItem('unique_key');
      let userID = await encryptStorageTwo.getItem('userID');
  
      if (userToken !== null && userID !== null) {
        seToken(userToken);
        setUserID(userID)
      }

    } catch {
      return null;
    }
  }




  const [inputs , setInputs] = useState({
    memName:'',
    phoneNo:'',
    memAge:'',
    memAddress:'',
    memCnic:'',
    memCity:'',
    memRegFee:'0',
    memMonthlyFee:''
    
  })

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitRegMem = () => {
    setLoading(true)
    if(inputs.memName && inputs.phoneNo && inputs.memAge && inputs.memAddress && cincFile && inputs.memCnic && inputs.memCity && inputs.memMonthlyFee){
      var formdata = new FormData();
    formdata.append("phone", inputs.phoneNo);
    formdata.append("member_name", inputs.memName);
    formdata.append("user_id", userID);
    formdata.append("address", inputs.memAddress);
    formdata.append("cnic",  inputs.memCnic);
    formdata.append("city", inputs.memCity);
    formdata.append("reg_fee",inputs.memRegFee);
    formdata.append("monthly_fee",  inputs.memMonthlyFee);
    formdata.append("reg_fee_status", "Not Paid");
    formdata.append("fee_status", "Paid");
    formdata.append("age", inputs.memAge);
    formdata.append("role_id", "1");
    formdata.append("cnic_img", cincFile, "[PROXY]")

    axios.post(`${baseURL}api/addmember`, formdata, {
      headers: {
        Authorization: 'Bearer ' + token,

      },

    })
      .then(res => {
        if(res.data.result){
          setLoading(false)
          toast.info('Member Registered!')
          // setInterval(() => {
          //   window.location.reload(true)
          // }, 1500);
          setInputs({
            memName:'',
            phoneNo:'',
            memAge:'',
            cincFile:'',
            memAddress:'',
            memCnic:'',
            memCity:'',
            memRegFee:'0',
            memMonthlyFee:''
          })
        }
        else{
          toast.error(res.data.message)
        }
        
      })
      .catch((error) => {
       
          toast.warn("Complete the Information !");
          console.log(error)
   
      })
    }
    else{
      toast.error("Fill the information")
      setLoading(false)
      setBtnPress(true)
    }
    
  }
  useEffect(() => {
    SetLocalLogin()
  }, [])
  
  return (
    <div>
        {/* BEGIN: Content*/}
<div className="app-content content ">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Members Registration</h2>
          </div>
        </div>
      </div>

    </div>
    <div className="content-body">
      {/* Input Mask start */}
      <section id="input-mask-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Reg Members</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Member Name*</b></label>
                
                  <input type="text" className={inputs.memName ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control credit-card-mask"} value={inputs.memName} name="memName" onChange={inputHandler} placeholder="Enter Name" id="credit-card" />
                  
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="phone-number"> <b>Phone Number*</b> </label>
                    <div className="input-group input-group-merge">
                      <span className={inputs.phoneNo ==='' && btnPress === true ? "input-group-text btn-outline-danger":"input-group-text"}>PK (+92)</span>

                      <input type="number" className={inputs.phoneNo ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control phone-number-mask"} value={inputs.phoneNo} name="phoneNo" onChange={inputHandler} placeholder="1 234 567 8900" id="phone-number" />
                    </div>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="delimiters"> <b>Age*</b> </label>
                    <input type="number" className={inputs.memAge ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger": "form-control delimiter-mask"} value={inputs.memAge} name="memAge" onChange={inputHandler} placeholder="Enter Age" id="delimiters" />
                  </div>
                  
                  <div className="col-xl-12 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time"> <b>Address*</b> </label>
                    <input type="text" className={inputs.memAddress ==='' && btnPress === true ?"form-control credit-card-mask btn-outline-danger" :"form-control time-mask"} name="memAddress" value={inputs.memAddress} onChange={inputHandler} placeholder="Enter Address" id="time" />
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 ">
                    <label className="form-label" htmlFor="numeral-formatting"> <b>Upload CNIC*</b></label>
                    <input type="file" className={cincFile ==='' && btnPress === true ?"form-control numeral-mask btn-outline-danger":"form-control numeral-mask" } placeholder="XXXXX-XXXXXXX-X"  id="numeral-formatting" onChange={(e)=> setCnicFile(URL.createObjectURL(e.target.files[0]))} />
                    {/* style={{width:"20em",height:"5em"}} */}
                    {
                      cincFile === null ? null :
                      <img src={cincFile} className="w-100 h-50 mt-1 rounded"  alt="preview_image" />
                    }
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>CNIC*</b></label>
                    <input type="number" className={inputs.memCnic ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control block-mask"} name="memCnic" value={inputs.memCnic} onChange={inputHandler}  placeholder="XXXXX-XXXXXXX-X" id="blocks" />
                  </div>
              
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="custom-delimiters"> <b>City*</b> </label>
                    <input type="text" className={inputs.memCity ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control block-mask"} name="memCity" value={inputs.memCity} onChange={inputHandler} placeholder="Enter City" id="custom-delimiters" />
                  </div>

                  <div className="col-xl-12 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="prefix"> <b>Registration Fee*</b></label>
                    
                      <input type="number" className="form-control prefix-mask" name="memRegFee" value={inputs.memRegFee} onChange={inputHandler} placeholder="Enter Reg Fee" id="prefix" />
                    
                  </div>
                  
                    <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  onClick={()=> isRegFee('Paid')} name="inlineRadioOptions"  defaultValue="option1" />
                        <label className="form-check-label" >Paid</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" onClick={()=> isRegFee('Not Paid')} defaultValue="option2" />
                        <label className="form-check-label">Not Paid</label>
                    </div>
                    </div>
                    

                  <div className="col-xl-12 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="prefix"><b>Monthly Fee*</b></label>
                    <input type="number" className={inputs.memMonthlyFee ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control block-mask"} value={inputs.memMonthlyFee} name="memMonthlyFee" onChange={inputHandler} placeholder="Enter Monthly Fee"  id="prefix" />
                  </div>
                </div>
                {/* <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  onClick={()=> isMonthlyFee('Paid')} name="inlineRadioOptions"  defaultValue="option3" />
                        <label className="form-check-label">Paid</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  onClick={()=> isMonthlyFee('Not Paid')} name="inlineRadioOptions" defaultValue="option4" />
                        <label className="form-check-label">Not Paid</label>
                    </div>
                    </div> */}
                <div className="text-end">
                <button className="btn btn-info" onClick={submitRegMem}>
                  {
                  loading === true? "Loading..." : "Submit"
                  }
                  
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Input Mask End */}
    </div>
  </div>
</div>
{/* END: Content*/}

    </div>
  )
}

export default RegMemForm