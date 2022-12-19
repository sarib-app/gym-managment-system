import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { EncryptStorage } from 'encrypt-storage';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJs.register(
  Tooltip, Title, ArcElement, Legend
)

toast.configure();
const RevenueChart = () => {
  const [getAllExpense , setAllExpense] = useState([]);
  const [duesAmout , setDuesAmount] = useState([]);

  
  const[month , setMonth] = useState();
  const[year, setYear] = useState();
  const[token , geToken] = useState();
  const[ID , setUerID] = useState();


  const d = new Date();
  const Month = d.getMonth()+1;
  const currentYear = new Date().getFullYear();
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

  
      if (userToken && userID) {
        gettingMembersFee(userToken,userID)
        gettingExpense(userToken,userID)
        setUerID(userID)
        geToken(userToken)
      }
    } catch {
      return null;
    }
  }



const gettingPrevData = ()=>{
  if(month && year){
    const allExpObj = {
      month:month,
      year:year,
      user_id:ID
  
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}api/fetchallvalues`,allExpObj, {
      headers: {
        Authorization: `Bearer ${token}`
    
      }
  })
    .then((res)=>{
   
      setDuesAmount(res.data.Fees);
      setAllExpense(res.data.Dues);
    })
    .catch((error)=>{
      return error
    })
  }
  else{
    toast.warn('Field is empty')
  }

}


  const gettingMembersFee = (token,userID)=>{
    const allExpObj = {
      month:Month,
      year:currentYear,
      user_id:userID
  
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}api/fetchallvalues`,allExpObj,{
      headers: {
        Authorization: `Bearer ${token}`,
    
      }
  })
    .then((res)=>{
      setDuesAmount(res.data.Fees);
    })
    .catch((error)=>{
      return error
    })
  
  }

  const gettingExpense = (token,userID)=>{
    const allExpObj = {
      month:Month,
      year:currentYear,
      user_id:userID
  
    }
    
    axios.post(`${process.env.REACT_APP_BASE_URL}api/fetchallvalues`,allExpObj,{
      headers: {
        Authorization: `Bearer ${token}`,
    
      }
  })
    .then((res)=>{
      setAllExpense(res.data.Dues);
    })
    .catch((error)=>{
      return error
    })
  
  
  }

  const gettingFeeSum = duesAmout.reduce((acc,curr)=>    acc+ +curr.due_paid,0);
  const gettingExpenseSum = getAllExpense.reduce((acc,curr)=>    acc+ +curr.utility_expense,0);
  
  const gettingTotalRevenue = gettingFeeSum-gettingExpenseSum;
  
  


    const data ={
     
        datasets: [
          {
            data: [
              
              gettingFeeSum, gettingExpenseSum, gettingTotalRevenue
              
            ]
            ,
            backgroundColor:[
              '#7367F0',
              'rgba(0, 198, 255, 1)',
              '#18ffff'
            ]
        },
      ]
      
      ,
      labels: [


          `Income`,
          `Expense`,
          `Revenue`
      
          
      ]
      
      
      
    }

 


  
    useEffect(() => {
      SetLocalLogin();
    }, [])
  return (
    <>
    <div className="app-content content ">
    <div className="content-wrapper container-xxl p-0">

    <div className="content-header row">
     <div className="content-header-left col-md-9 col-12 mb-2">
       <div className="row breadcrumbs-top">
         <div className="col-12">
           <h2 className="content-header-title float-start mb-0">Revenue Chart</h2>
           {/* <div className="breadcrumb-wrapper">
             <ol className="breadcrumb">
               <li className="breadcrumb-item"><a href="index.html">Home</a>
               </li>
               <li className="breadcrumb-item"><a href="#">Form Elements</a>
               </li>
               <li className="breadcrumb-item active">Input Mask
               </li>
             </ol>
           </div> */}
         </div>
       </div>
     </div>

   </div>
   <div className="content-body">
   <div className="row mb-3">
    <div className="col-3">
          <label htmlFor="" className="form-info">Month</label>
      <input type="text" className="form-control" onChange={(e)=>setMonth(e.target.value)}/>
          </div>
          <div className="col-3">
                  
      <label htmlFor="" className="form-info">Year</label>
      <input type="text" className="form-control" onChange={(e)=>setYear(e.target.value)}/>
          </div>
          <div className="col-3 align-self-center mt-1">

          <button className="btn btn-outline-info" onClick={gettingPrevData}>Search</button>
          </div>
          </div>
               <section id="apexchart">
                   <div className="row">
                 {/* Line Chart Starts */}
                        <div className="col-12">
                        <div className="card">
                          <div className="
                            card-header
                            d-flex
                            flex-sm-row flex-column
                            justify-content-md-between
                            align-items-start
                            justify-content-start
                          ">
                            <div>
                              <h4 className="card-title mb-25">Revenue</h4>
                              {/* <span className="card-subtitle text-muted">Commercial networks &amp; enterprises</span> */}
                            </div>
                            
                          </div>
                          <div className="card-body d-block mx-auto revenue-card-body" >
                          <Pie  data={data}   />

                          {/* <Chart options={chart.options} series={chart.series} type="bar" width={500} height={520} /> */}
                          </div>
                        </div>
                        </div>
                  {/* Line Chart Ends */}
                       </div>
                       </section>
           </div>

        </div>
        </div>

   </>
  )
}

export default RevenueChart