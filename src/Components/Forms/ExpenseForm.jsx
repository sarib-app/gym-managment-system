import { EncryptStorage } from 'encrypt-storage';
import React,{useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';

toast.configure();
const ExpenseForm = () => {

  const[expenseName , setExpenseName] = useState('');
  const[expenseAmount, setExpenseAmount] = useState('');
  const[expenseDate , setExpenseDate] = useState('');
  const [tokenn, seToken] = useState('');
  const[user_ID , setUserID] = useState('');
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
      let getuserID = await encryptStorageTwo.getItem('userID');

      if (userToken !== null) {
        seToken(userToken)
        setUserID(getuserID)
      }
    } catch {
      return null;
    }
  }
  const d = new Date();
  const Month = d.getMonth()+1;
  const currentYear = new Date().getFullYear();
  

  const submitExpense = ()=>{
    setLoading(true)
    const expenseObj = {
      user_id:user_ID,
      utility_name:expenseName,
      utility_expense: expenseAmount,
      Fe_Date: expenseDate,
      month: Month,
      year:currentYear
    }  

    axios.post(`${process.env.REACT_APP_BASE_URL}api/adddues`,expenseObj,{
      headers: {
        Authorization: `Bearer ${tokenn}`,
    
      }
    })
    .then((res)=>{
      setLoading(false)
      toast.info("Expense Submitted !");
      setInterval(() => {
      setExpenseName('');
      setExpenseAmount('');
      setExpenseDate('');
      }, 1000);
   
    })
    .catch((error)=>{
      toast.warn("Incomplete Information !");
      setLoading(false)

    })

  
  
  }

  useEffect(() => {
    SetLocalLogin();
  }, [])
  
  return (
    <div>
          <div className="app-content content" style={{marginBottom:"9.9em"}}>
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Expense Form</h2>
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
      {/* Input Mask start */}
      <section id="input-mask-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Expense Form</h4>
              </div>
              <div className="card-body">
                <div className="row">

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Expense Name*</b></label>
                    <input type="text" className="form-control credit-card-mask" value={expenseName} onChange={(e)=> setExpenseName(e.target.value)} placeholder="Enter Expense Name" id="credit-card" />
                  </div>


     
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time"> <b>Expense Amount*</b> </label>
                    <input type="number" className="form-control time-mask" value={expenseAmount} onChange={(e)=> setExpenseAmount(e.target.value)} placeholder="Enter Expense Amount" id="time" />
                  </div>


                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>Date*</b></label>
                    <input type="date" className="form-control block-mask" value={expenseDate} onChange={(e)=>setExpenseDate(e.target.value)} id="blocks" />
                  </div>      

                </div>

                <div className="text-end">
                <button className="btn btn-info" onClick={submitExpense}>
                  {
                    loading === true?"Loading...":"Submit"
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
    </div>
  )
}

export default ExpenseForm