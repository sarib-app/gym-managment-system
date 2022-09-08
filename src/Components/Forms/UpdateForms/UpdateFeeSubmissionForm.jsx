import { EncryptStorage } from 'encrypt-storage';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from 'react-router-dom';
import baseURL from '../../BaseUrl.js';
import {toast} from "react-toastify";
import axios from 'axios';

toast.configure();
const UpdateFeeSubmissionForm = () => {
    const location = useLocation();
    const[loading, setLoading ] = useState(false);


    const id = location.state.feeID;
    const monthlyFee = location.state.feeAmount;
    const pendingFee = location.state.feePending;
    const currMonth = location.state.feeMonth;
    const currYear = location.state.feeYear;

    const[tokenn, setToken] = useState('');
    const[month , setMonth] = useState('');
    const[year , setYear ] =useState('');

    const[getAmount , setAmout] = useState('');
    const[getPendingAmount,setPendingAmout] = useState(''); 
    const encryptStorage = new EncryptStorage('secret-key', {
      prefix: '@instance1',
    });
 
 

    const SetLocalLogin = async () => {
        try {
          let userToken = await encryptStorage.getItem('unique_key');
    
    
          if (userToken !== null) {
            setToken(userToken)
          }
        } catch {
          return null;
        }
      }

      const autFillFields = ()=>{
        setAmout(monthlyFee)
        setPendingAmout(pendingFee)
        setMonth(currMonth)
        setYear(currYear)

      }
    

    const submitMonthlyDues = ()=>{ 
      setLoading(true)
        const monthlyObj = {
            due_paid:getAmount,
            pending_payment:getPendingAmount,
            month:month,
            year:year,
      
          }
          axios.post(`${baseURL}api/updatefees/${id}`,monthlyObj,{
            headers: {
              Authorization: 'Bearer ' + tokenn,
      
            },
      
          })
          .then((res)=>{
            setLoading(false)
            toast.info("Fee Updated!")
            console.log(res)
          })
            
          .catch((error)=>{
            toast.warn("Incomplete Information !");
            setLoading(false)
            console.log(error)
          })

     
        }

        useEffect(() => {
            SetLocalLogin();
            autFillFields();
          }, [])
        
    
  return (
    <>
      <div className="app-content content"  style={{marginBottom:"2em"}}>
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
                <h4 className="card-title">Update Monthly Due</h4>
              </div>
              <div className="card-body">
                      {/* onKeyPress={(e)=>gettingPhoneNumber(e)}  */}
                <div className="row">
                {/* <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="phone-number"> <b>Phone Number*</b> </label>
                    <div className="input-group input-group-merge">
                      <span className="input-group-text">PK (+92)</span>
                      <input type="number" className="form-control phone-number-mask" placeholder="1 234 567 8900" id="phone-number" />
                    </div>
                  </div> */}

                  {/* <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Member Name*</b></label>
                    <input type="text" className="form-control credit-card-mask"  placeholder="Enter Name" id="credit-card" />
                  </div> */}
                    
                  {/* value={memName}  */}

     
                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time"> <b>Dues Amount*</b> </label>
                    <input type="number" className="form-control time-mask" value={getAmount} placeholder="Enter Amount" onChange={(e)=>{setAmout(e.target.value)}} id="time" />
                   
                  </div>
                  
                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time"> <b>Month*</b> </label>
                    <input type="number" className="form-control time-mask" value={month} placeholder="Enter Month" onChange={(e)=>{setMonth(e.target.value)}} id="time" />
                  </div>

                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time"> <b>Year*</b> </label>
                    <input type="number" className="form-control time-mask" value={year} placeholder="Enter Year" onChange={(e)=>{setYear(e.target.value)}} id="time" />
                  </div>



                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>Pending Payment &nbsp;(Optional)*</b></label>
                    <input type="text" className="form-control block-mask"  value={getPendingAmount} placeholder="Enter pending dues" onChange={(e)=>{setPendingAmout(e.target.value)}} id="blocks" />
                  </div>      

                </div>

                <div className="text-end">
                <button className="btn btn-info" onClick={submitMonthlyDues}>
                  {
                    loading === true? "Loading...":"Submit"
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

export default UpdateFeeSubmissionForm