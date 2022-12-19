import { EncryptStorage } from 'encrypt-storage';
import "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react';
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import axios from 'axios';


toast.configure();
const DuesTable = () => {
  const [getAllDues , setAllDues] = useState([]);
  const[geToken , seToken] = useState('');
  const d = new Date();
  const Month = d.getMonth()+1;
  const currentYear = new Date().getFullYear();
  const [month,setMonth]=useState(Month);
  const [year,setYear]=useState(currentYear);
  const [userID , setUserID] = useState('');


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
      gettingMembersFee(userToken,userID)
      seToken(userToken)
      setUserID(userID)
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

const getDataAgain=(type)=>{


  const d = new Date();
  const conditionalMonth = d.getMonth()+1;
  const conditionalYear = new Date().getFullYear();

  const Month = type === "month" ? conditionalMonth : month !==" " ? month : conditionalMonth;
  const currentYear = type==="year" ? conditionalYear : year !==" " ? year : conditionalYear;

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
  setAllDues(res.data.Dues);
})
.catch((error)=>{
  return error;
})


}

const gettingMembersFee = (token,userID)=>{
  const dueObj = {
    month:month,
    year:year,
    user_id:userID

  }
  axios.post(`${process.env.REACT_APP_BASE_URL}api/fetchallvalues`,dueObj, {
    headers: {
      Authorization: `Bearer ${token}`,
  
    }
})
  .then((res)=>{
    setAllDues(res.data.Fees);
  })
  .catch((error)=>{
    return error;
  })

}

const deleteDues = (id)=>{
  axios.delete(`${process.env.REACT_APP_BASE_URL}api/deletefees/${id}`, {
    headers: {
      Authorization: `Bearer ${geToken}`,
  
    }
})
  .then((res)=>{
    toast.error('Fee Deleted')
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
            <h2 className="content-header-title float-start mb-0">Member Due Record</h2>
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
{/* Basic Tables start */}
<div className="row" id="basic-table">
  <div className="col-12">
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Member Due Record</h4>
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

<button className="btn btn-outline-info" onClick={SetLocalLogin}>Search</button>
</div>
          </div>

      <div className="table-responsive table-striped table-responsive-sm">
      {
              getAllDues.length !== 0? 
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th >Contact Number</th>
              <th>Member Name</th>
              <th>Due Amount</th>
              <th>Pending Payment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

            
          <tbody>

              {
               

                getAllDues.sort((a,b)=> new Date(...b.created_at.split("/").reverse()) - new Date(...a.created_at.split("/").reverse())).map((items,index)=> {
                  return(
                    <tr>
                    <td>{index+1}</td>
                    <td>{items.phone}</td>
                    <td>{items.member_name}</td>
                    <td>{items.due_paid}</td>
                    <td>{items.pending_payment}</td>
                    <td>{items.date}</td>
                    <td>
                        <button onClick={()=>deleteDues(items.id)} className="btn btn-outline-danger btn-sm">
                        <i className="fa-solid fa-trash-can"></i>
                            </button>

                            <Link className="btn btn-outline-primary btn-sm" to={{pathname:"/UpdateFeeForm"}} state={{
                              feeID:items.id,
                              feeAmount:items.due_paid,
                              feePending:items.pending_payment,
                              feeMonth:items.month,
                              feeYear:items.year
                            }} style={{marginTop:"0.5em"}}>
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

export default DuesTable