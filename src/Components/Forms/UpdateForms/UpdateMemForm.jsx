import React, {useState, useEffect } from 'react';
import { EncryptStorage } from 'encrypt-storage';
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from 'react-router-dom';
import {toast} from "react-toastify";
import axios from 'axios';

toast.configure();
const UpdateMemForm = () => {
    const location = useLocation();
    const[loading, setLoading ] = useState(false);


    const id = location.state.memID;
    const Name = location.state.memName;
    const Phone = location.state.memPhone;
    const Cnic = location.state.memCnic;
    const City = location.state.memCity;
    const Age = location.state.memAge;
    const Address = location.state.memAdd;
    const MonFee = location.state.memMonFee;
    const RegFee = location.state.memRegFee;
    const regFeeStat = location.state.memRegFeeStatus;


    const [token, seToken] = useState('');
    const[userID , setUserID] = useState();
    const[btnPress , setBtnPress] = useState(false);
 
    const[memName, setMemName] = useState('');
    const[memPhone , setMemPhone] = useState('');
    const[memAge , setMemAge] = useState('');
    const[memAddress , setMemAddress] = useState('');
    const[memCnic , setMemCnic] = useState('');
    const[memCity , setMemCity] = useState('');
    const[memRegFee , setMemReg] = useState('0');
    const[memMonthlyFee , setMemMonthlyFee] = useState('');
    const[regFeeStatus , isRegFee] = useState('Not Paid')

    const[cincFile , setCnicFile] = useState('');
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

  const submitRegMem = () => {
    setLoading(true)
    if(memName && memPhone && memAge && memAddress && cincFile && memCnic && memCity && memRegFee && memMonthlyFee){
      var formdata = new FormData();
    formdata.append("phone", memPhone);
    formdata.append("member_name", memName);
    formdata.append("user_id", userID);
    formdata.append("address", memAddress);
    formdata.append("cnic",  memCnic);
    formdata.append("city", memCity);
    formdata.append("reg_fee",memRegFee);
    formdata.append("monthly_fee",  memMonthlyFee);
    formdata.append("reg_fee_status",  regFeeStatus);


    formdata.append("age", memAge);
    formdata.append("cnic_img", cincFile, "[PROXY]")
    

    axios.post(`${process.env.REACT_APP_BASE_URL}api/updatemember/${id}`, formdata, {
      headers: {
        Authorization: 'Bearer ' + token,

      },

    })
      .then(res => {
        if(res.data.result){
          setLoading(false)
          toast.info('Member Updated!')
          setInterval(() => {
            window.location.reload(true)
          }, 1500);
        }
        else{
          setLoading(false)
          toast.error(res.data.message)
        }
        
      })
      .catch((error) => {

          toast.warn("Please complete the information !");
          setLoading(false)
   
      })
    }
    else{
      toast.error("Fill the information")
      setLoading(false)
      setBtnPress(true)
    }
    
  }

  const autoFillInput = ()=>{
    setMemName(Name)
    setMemPhone(Phone)
    setMemAge(Age)
    setMemAddress(Address)
    setMemCnic(Cnic)
    setMemCity(City)
    setMemReg(RegFee)
    setMemMonthlyFee(MonFee)
    isRegFee(regFeeStat)
  }
  useEffect(() => {
    SetLocalLogin();
    autoFillInput();
  }, [])

  return (
    <>
<div className="app-content content ">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Update Member</h2>
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
                <h4 className="card-title">Update Members</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Member Name*</b></label>
                
                  <input type="text" className={memName ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control credit-card-mask"} value={memName} name="memName" onChange={(e)=>{setMemName(e.target.value)}} placeholder="Enter Name" id="credit-card" />
                  
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="phone-number"> <b>Phone Number*</b> </label>
                    <div className="input-group input-group-merge">
                      <span className={memPhone ==='' && btnPress === true ? "input-group-text btn-outline-danger":"input-group-text"}>PK (+92)</span>

                      <input type="number" className={memPhone ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control phone-number-mask"} value={memPhone} name="memPhone" onChange={(e)=>{setMemPhone(e.target.value)}} placeholder="1 234 567 8900" id="phone-number" />
                    </div>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="delimiters"> <b>Age*</b> </label>
                    <input type="number" className={memAge ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger": "form-control delimiter-mask"} value={memAge} name="memAge" onChange={(e)=>{setMemAge(e.target.value)}} placeholder="Enter Age" id="delimiters" />
                  </div>
                  
                  <div className="col-xl-12 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time"> <b>Address*</b> </label>
                    <input type="text" className={memAddress ==='' && btnPress === true ?"form-control credit-card-mask btn-outline-danger" :"form-control time-mask"} value={memAddress} name="memAddress" onChange={(e)=>{setMemAddress(e.target.value)}} placeholder="Enter Address" id="time" />
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="numeral-formatting"> <b>Upload CNIC*</b></label>
                    <input type="file" className={cincFile ==='' && btnPress === true ?"form-control numeral-mask btn-outline-danger":"form-control numeral-mask" }  placeholder="XXXXX-XXXXXXX-X" id="numeral-formatting" onChange={(e)=> setCnicFile(e.target.files[0])} />
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>CNIC*</b></label>
                    <input type="number" className={memCnic ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control block-mask"} value={memCnic} name="memCnic" onChange={(e)=>{setMemCnic(e.target.value)}}  placeholder="XXXXX-XXXXXXX-X" id="blocks" />
                  </div>
              
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="custom-delimiters"> <b>City*</b> </label>
                    <input type="text" className={memCity ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control block-mask"} value={memCity} name="memCity" onChange={(e)=>{setMemCity(e.target.value)}} placeholder="Enter City" id="custom-delimiters" />
                  </div>

                  <div className="col-xl-12 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="prefix"> <b>Registration Fee*</b></label>
                    
                      <input type="number" className={memRegFee ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control block-mask"} value={memRegFee} name="memRegFee" onChange={(e)=>{setMemReg(e.target.value)}} placeholder="Enter Reg Fee" id="prefix" />
                    
                  </div>
                         <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  onClick={()=> isRegFee('Paid')} name="inlineRadioOptions"  defaultValue="option1" />
                        <label className="form-check-label">Paid</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  onClick={()=> isRegFee('Not Paid')} name="inlineRadioOptions" defaultValue="option1" />
                        <label className="form-check-label">Not Paid</label>
                    </div>
                    </div>
                 
                    

                  <div className="col-xl-12 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="prefix"><b>Monthly Fee*</b></label>
                    <input type="number" className={memMonthlyFee ==='' && btnPress === true ? "form-control credit-card-mask btn-outline-danger":"form-control block-mask"} value={memMonthlyFee} name="memMonthlyFee" onChange={(e)=>{setMemMonthlyFee(e.target.value)}} placeholder="Enter Monthly Fee"  id="prefix" />
                  </div>
                </div>
         
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

    </>
  )
}

export default UpdateMemForm