import { EncryptStorage } from 'encrypt-storage';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Chart from 'react-apexcharts';
import baseURL from '../BaseUrl.js';
import axios from 'axios';


toast.configure();
const DailyChart = () => {
  const [duesAmout , setDuesAmount] = useState([]);
  const[display ,setDisplay] = useState('income');
  const[getUserID , setUserID] = useState('');
  const[geToken , seToken] = useState('');
  const[income, setIncome] = useState([]);
  const[month , setMonth] = useState();
  const[year, setYear] = useState();

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
        gettingData(userToken,userID)

        seToken(userToken)
        setUserID(userID)
      }
    } catch {
      return null;
    }
  }


  const d = new Date();
  const Month = d.getMonth()+1;
  const currentYear = new Date().getFullYear();

const gettingPrevData = ()=>{
  if( month && year ){
    
  const allExpObj = {
    month:month,
    year:year,
    user_id:getUserID

  }
  axios.post(`${baseURL}api/fetchallvalues`,allExpObj, {
    headers: {
      Authorization: `Bearer ${geToken}`
  
    }
})
  .then((res)=>{
    setIncome(res.data.Fees);
    setDuesAmount(res.data.Dues);
    setDisplay('expense')
    console.log(res.data)
  })
  .catch((error)=>{
    console.log(error);
  })

  }

  else{
    toast.warn("Field is empty")
  }


}



const gettingData = (userToken,userID)=>{

  const allExpObj = {
    month:Month,
    year:currentYear,
    user_id:userID

  }
  axios.post(`${baseURL}api/fetchallvalues`,allExpObj, {
    headers: {
      Authorization: `Bearer ${userToken}`
  
    }
})
  .then((res)=>{
    setIncome(res.data.Fees);
    setDuesAmount(res.data.Dues);
    setDisplay('expense')
  })
  .catch((error)=>{
    console.log(error);
  })
}







const gettingExpense = ()=>{
  
  setDisplay("expense")
  
}


const gettingIncome = ()=>{
  
  setDisplay('income')

}
  



  useEffect(() => {
    SetLocalLogin();
    
  }, [])


  const gettingIncomeDate = income.map((items)=> items.date)
  const gettingIncomeAmount = income.map((items)=> items.due_paid);


  const gettingExpenseAmount = duesAmout.map((items)=>items.utility_expense)
  const gettingExpenseDate = duesAmout.map((items)=> items.Fe_Date)


  const data ={
    options: {
      chart: {
        id: 'apexchart-example',
        responsive: true,
        maintainAspectRatio: false
      },
      xaxis: {
        categories: gettingIncomeDate
      }
    },
    seriesA: [
      {
      name: 'Income',
      data: gettingIncomeAmount,
      color:"#00CFE8"
    },

  ],
   
  
  }


  
  const dataTwo ={
    options: {
      chart: {
        id: 'apexchart-example',
        responsive: true,
        maintainAspectRatio: false
      },

      xaxis: {
        categories: gettingExpenseDate
      }
    
    },
    seriesB: [
      {
      name: 'Expense',
      data: gettingExpenseAmount,
      color:"#7367f0"
    },

  ],

  }

  return (
    <>
     <div className="app-content content ">
     <div className="content-wrapper container-xxl p-0">

     <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Daily Chart</h2>
            <div className="row">
          
            </div>
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
      <input type="text" className= "form-control" onChange={(e)=>setYear(e.target.value)}/>
      </div>

          <div className="col-3 align-self-center mt-1">

          <button className="btn btn-outline-info" onClick={gettingPrevData}>Search</button>
          </div>
          </div>

                <div className="row">
                     <div className="col-12">
                    {/* <p>
                        An Apexcharts.js component for ApexCharts. Read full documnetation
                        <a href="https://apexcharts.com/docs/installation/" target="_blank">here</a>.
                    </p> */}
                    </div>

                </div>
                <section id="apexchart" >
                    <div className="row" >
                  {/* Line Chart Starts */}
<div className="col-12" >
  <div className="card" >
    <div className="
      card-header
      d-flex
      flex-sm-row flex-column
      justify-content-md-between
      align-items-start
      justify-content-start
    ">
      <div>
        <h4 className="card-title mb-25">Balance</h4>
        {/* <span className="card-subtitle text-muted">Commercial networks &amp; enterprises</span> */}
      </div>
      <div className="d-flex align-items-center flex-wrap mt-sm-0 mt-1">

        <button className="btn btn-outline-primary btn-sm me-1"  onClick={gettingExpense}>Expense</button>
        <button className="btn btn-outline-info btn-sm me-1" onClick={gettingIncome}>Income</button>

        {/* <span className="badge badge-light-secondary">
          <FeatherIcon className="text-danger font-small-3" icon="arrow-down" />
          <span className="align-middle">20%</span>
        </span> */}
      </div>
    </div>
    <div className="card-body">

      {
        display === 'income'?
        <Chart  
        
        height={260}
        options={data.options} series={data.seriesA} type="bar"  />  :

     <Chart 
     height={260}

     className="d-flex" options={dataTwo.options} series={dataTwo.seriesB} type="bar" />  
      }

      
   
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

export default DailyChart