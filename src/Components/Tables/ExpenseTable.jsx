import { EncryptStorage } from 'encrypt-storage';
import "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react';
import { toast } from "react-toastify";
import{Link} from 'react-router-dom';
import axios from 'axios';


const ExpenseTable = () => {

const [getAllExpense , setAllExpense] = useState([]);

const[geToken , seToken] = useState('')
const d = new Date();
const Month = d.getMonth()+1;
const currentYear = new Date().getFullYear();
const [month,setMonth]=useState(Month);
const [year,setYear]=useState(currentYear);
const [userID,setUserId]=useState("");


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
      gettingExpense(userToken,userID)
      seToken(userToken)
      setUserId(userID)
    }
  } catch {
    return null;
  }
}


const onChangeyear=(year)=>{
  setYear(year)
  if(year===""){
    getDataAgain("year")
  }


}
const onChangeMonth=(month)=>{
  setMonth(month)
  if(month===""){
getDataAgain("month")
  }
}


////////RENDERS ON EMPTY INPUTS///////////


const getDataAgain=(type)=>{

  const d = new Date();
  const conditionalMonth = d.getMonth()+1;
  const conditionalYear = new Date().getFullYear();

  const Month = type === "month" ? conditionalMonth : month !=="" ? month : conditionalMonth;
  const currentYear = type==="year" ? conditionalYear : year !=="" ? year : conditionalYear;


  
    const expObj = {
      month:Month,
      year:currentYear,
      user_id:userID
    
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}api/fetchallvalues`,expObj,{
      headers: {
        Authorization: `Bearer ${geToken}`
    
      }})
    .then((res)=>{
      setAllExpense(res.data.Dues);
    })
    .catch((error)=>{
      return error
    })
  


}

///////////RENDERS ON USE EFFECT/////////////


const gettingExpense = (token,userID)=>{
  const expObj = {
    month:month,
    year:year,
    user_id:userID

  }
  axios.post(`${process.env.REACT_APP_BASE_URL}api/fetchallvalues`,expObj,{
    headers: {
      Authorization: `Bearer ${token}`
  
    }})
  .then((res)=>{
    setAllExpense(res.data.Dues);
    console.log(res.data)
  })
  .catch((error)=>{
    return error;
  })

}



const deleteExp = (id)=>{
  
  axios.delete(`${process.env.REACT_APP_BASE_URL}api/deletedues/${id}`,{
    headers: {
      Authorization: `Bearer ${geToken}`
  
    }})
  .then((res)=>{
    toast.error('Expense Deleted')
    setInterval(() => {
      window.location.reload(true)
    }, 1500);
  })
  .catch((error)=>{
    return error
  })

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
            <h2 className="content-header-title float-start mb-0">Expense Sheet</h2>
          </div>
        
        </div>
      </div>

    </div>

    <div className="content-body">
{/* Basic Tables start */}
<div className="row" id="basic-table">
  <div className="col-12">

    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Expense Sheet</h4>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-3">
          <label htmlFor="" className="form-info">Month</label>
      <input type="text" className="form-control" onChange={(e)=>onChangeMonth(e.target.value)}/>
          </div>
          <div className="col-3">
                  
      <label htmlFor="" className="form-info">Year</label>
      <input type="text" className="form-control" onChange={(e)=>onChangeyear(e.target.value)}/>
          </div>
          <div className="col-3 align-self-center mt-1">

          <button className="btn btn-outline-info" onClick={()=>SetLocalLogin()}>Search</button>
          </div>

        </div>

     
      <div className="table-responsive table-striped table-responsive-sm">
      {
              getAllExpense.length !== 0? 
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Expense Name</th>
              <th>Expense Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              getAllExpense.sort((a,b)=> new Date(...b.created_at.split("/").reverse()) - new Date(...a.created_at.split("/").reverse())).map((items,index)=>{
                return(
                  <tr>
                    <td>{index+1}</td>
                    <td>{items.utility_name}</td>
                    <td>{items.utility_expense}</td>
                        <td>{items.Fe_Date}</td>
                    <td>
                        <button onClick={()=>deleteExp(items.id)} className="btn btn-outline-danger btn-sm">
                        <i className="fa-solid fa-trash-can"></i>
                            </button>&nbsp;&nbsp;

                            <Link className="btn btn-outline-primary btn-sm" to={{pathname:"/UpdateExpenseForm"}} state={{
                              expID:items.id,
                              utilityName:items.utility_name,
                              utilityExpense:items.utility_expense,
                              utilityMonth:items.month,
                              utilityYear:items.year,
                              utilityDate:items.Fe_Date
                              }}>
                            <i className="fa-solid fa-pencil"></i>
                            </Link>
                    </td>
    
                    
                </tr>

                )
              })
            }
         
          </tbody>
          
        </table>
        :
        <div className="text-center">
        <h2>No Record Found</h2>
        </div>
       }
      </div>
      </div>
    </div>
  </div>
</div>

    </div>
     </div>
     </div>

    </>
  )
}

export default ExpenseTable