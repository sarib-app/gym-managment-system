import { EncryptStorage } from 'encrypt-storage';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from 'react-router-dom';
import {toast} from "react-toastify";
import axios from 'axios';

toast.configure();
const UpdateExpenseForm = () => {
    const location = useLocation();
    const[loading, setLoading ] = useState(false);


    const id = location.state.expID;
    const utilityName = location.state.utilityName;
    const utilityExpense = location.state.utilityExpense;
    const currMonth = location.state.utilityMonth;
    const currYear = location.state.utilityYear;
    const utilityDate = location.state.utilityDate

    const[tokenn, setToken] = useState('');
    const[month , setMonth] = useState('');
    const[year , setYear ] =useState('');

    const[getUtiliName , setUtiliName] = useState('');
    const[getUtiliAmount,setUtiliAmount] = useState(''); 
    const[getUtiliDate , setUtilityDate] = useState('');
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

        setUtiliAmount(utilityExpense)
        setUtilityDate(utilityDate)
        setUtiliName(utilityName)
        setMonth(currMonth)
        setYear(currYear)

      }
    

    const submitUtility = ()=>{ 
      setLoading(true)
        const monthlyObj = {
            utility_name:getUtiliName,
            utility_expense:getUtiliAmount,
            Fe_Date:getUtiliDate,
            month:month,
            year:year
          }
          axios.post(`${process.env.REACT_APP_BASE_URL}api/updatedues/${id}`,monthlyObj,{
            headers: {
              Authorization: 'Bearer ' + tokenn,
      
            },
      
          })
          .then((res)=>{
            setLoading(false)
            toast.info("Utility Updated!");
          })
            
          .catch((error)=>{
            toast.warn("Incomplete Information !");
            setLoading(false)
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
            <h2 className="content-header-title float-start mb-0">Utility Submission</h2>
         
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
                <h4 className="card-title">Update Utility</h4>
              </div>
              <div className="card-body">
                <div className="row">

     
                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time"> <b>Utility Name*</b> </label>
                    <input type="text" className="form-control time-mask" value={getUtiliName} placeholder="Enter utility name" onChange={(e)=>{setUtiliName(e.target.value)}} id="time" />
                   
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
                    <label className="form-label" htmlFor="blocks"> <b>Utility Expense</b></label>
                    <input type="number" className="form-control block-mask"  value={getUtiliAmount} placeholder="Enter utility amount" onChange={(e)=>{setUtiliAmount(e.target.value)}} id="blocks" />
                  </div>  

                        <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>Utility Date*</b></label>
                    <input type="date" className="form-control block-mask"  value={getUtiliDate}  onChange={(e)=>{setUtilityDate(e.target.value)}} id="blocks" />
                  </div>         

                </div>

                <div className="text-end">
                <button className="btn btn-info" onClick={submitUtility}>
                  {
                    loading === true ?"Loading...":"Submit"
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

export default UpdateExpenseForm