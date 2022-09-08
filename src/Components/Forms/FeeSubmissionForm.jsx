import { EncryptStorage } from 'encrypt-storage';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import baseURL from '../BaseUrl.js';
import axios from 'axios';


toast.configure();
const FeeSubmissionForm = () => {
  const[fetchMemData , setFetchingData] = useState([]);
  const[tokenn, setToken] = useState('');
  const[memName , setMemName] = useState('');
  const[memFee , setMemFee] = useState('');
  const[getPhone, setMemPhone] = useState('');
  const[getUserID, setUserID] = useState('');
  const[getAmount , setAmout] = useState('');
  const[getPendingAmount,setPendingAmout] = useState(''); 
  const[loading, setLoading ] = useState(false);

  const encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });
  const encryptStorageTwo = new EncryptStorage('secret-key', {
    prefix: '@instance2',
  });




const gettingPhoneNumber = (e)=>{
  
  let keyCode = e.code;

  if( keyCode ==="Enter" || keyCode  === "NumpadEnter"){
  fetchingMemData(e);
  setMemPhone(e.target.value);
}

else{
 
  }

}


  const SetLocalLogin = async () => {
    try {
      let userToken = await encryptStorage.getItem('unique_key');
      let user_ID = await encryptStorageTwo.getItem('userID');


      if (userToken !== null) {
        setToken(userToken)
        setUserID(user_ID)
      }
    } catch {
      return null;
    }
  }




  const fetchingMemData = (e)=>{
     const userID = {
      user_id:getUserID
     }
      axios.post(`${baseURL}api/fetchByPhone/${e.target.value}`,userID,{
        headers: {
          Authorization: `Bearer ${tokenn}`,
      
        },
      
      })
      .then((res)=>{
        if(res.data.length > 0){
          setFetchingData(res.data[0])
          setMemName(res.data[0].member_name)
          setMemFee(res.data[0].monthly_fee)
        }
        else{

          
             toast.warn("No Record Found")
        }
        
        
      })
      .catch((error)=>{
        console.log(error)
      })
      

}


  

  const d = new Date();
  const Month = d.getMonth()+1;
  const currentYear = new Date().getFullYear();


  const submitMonthlyDues = ()=>{
    setLoading(true)
    const monthlyObj = {
      user_id:getUserID,
      phone:getPhone,
      member_name:memName,
      due_paid:getAmount,
      pending_payment:getPendingAmount,
      month:Month,
      year:currentYear,

    }
    axios.post(`${baseURL}api/addfees`,monthlyObj,{
      headers: {
        Authorization: 'Bearer ' + tokenn,

      },

    })
    .then((res)=>{
      if(res.data.result){
        setLoading(false)
      toast.info("Fees Submitted !")
      // setInterval(() => {
      //   window.location.reload(true)
      // }, 1500)
      setPendingAmout('');
        setMemPhone('');
        setMemName('');
        setMemFee('');
        setAmout('');
      console.log(res)
    }
    else{
      setLoading(false)
      toast.error(res.data.message)
    }
    })
      
    .catch((error)=>{
      toast.warn("Incomplete Information !");
      setLoading(false)
      console.log(error)
    })
  }

  useEffect(() => {
    SetLocalLogin();
  }, [])
  
  return (
    <>
        <div className="app-content content"  style={{marginBottom:"4em"}}>
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Due Submission</h2>
         
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
                <h4 className="card-title">Monthly due submission</h4>
              </div>
              <div className="card-body">
                <div className="row">
                <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="phone-number"> <b>Phone Number*</b> </label>
                    <div className="input-group input-group-merge">
                      <span className="input-group-text">PK (+92)</span>
                      <input type="number" className="form-control phone-number-mask"  onKeyPress={(e)=>gettingPhoneNumber(e)}  placeholder="1 234 567 8900" id="phone-number" />
                    </div>
                  </div>

                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Member Name*</b></label>
                    <input type="text" className="form-control credit-card-mask" value={memName}  placeholder="Enter Name" id="credit-card" />
                  </div>


     
                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time"> <b>Dues Amount*</b> </label>
                    <input type="number" className="form-control time-mask" placeholder="Enter Amount" value={getAmount} onChange={(e)=>{setAmout(e.target.value)}} id="time" />
                    {
                      memFee?
                      <span>Payable Amount: {memFee}</span>:null
                    }
                  </div>


                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>Pending Payment &nbsp;(Optional)*</b></label>
                    <input type="text" className="form-control block-mask"  placeholder="Enter pending dues" value={getPendingAmount} onChange={(e)=>{setPendingAmout(e.target.value)}} id="blocks" />
                  </div>      

                </div>

                <div className="text-end">
                <button className="btn btn-info" onClick={submitMonthlyDues}>
                  {
                    loading === true ? "Loading...":"Submit"
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

export default FeeSubmissionForm