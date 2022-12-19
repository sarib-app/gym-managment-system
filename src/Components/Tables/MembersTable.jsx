import { EncryptStorage } from 'encrypt-storage';
import "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react';
import { toast } from "react-toastify";
import {Link} from'react-router-dom';
import axios from 'axios';

const MembersTable = () => {
  
const [getMembers , setMemRecord] = useState([]);
const[contact , setContact] = useState('');
const[geToken , seToken] = useState();
const[date , setDate] = useState('');



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
      gettingMembers(userToken,userID)
      seToken(userToken)
    }
  } catch {
    return null;
  }
}

const delMember = (id)=>{
  axios.delete(`${process.env.REACT_APP_BASE_URL}api/deletemember/${id}`,{
    headers: {
      Authorization: `Bearer ${geToken}`
  
    }})
  .then((res)=>{
    toast.error('Member Deleted')
    setInterval(() => {
      window.location.reload(true)
    }, 1500);

  })
  .catch((error)=>{
    return error;
  })

}


const gettingMembers = (token,id)=>{
  
  axios.get(`${process.env.REACT_APP_BASE_URL}api/fetchByUserid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
  
    }
})
  .then((res)=>{
    setMemRecord(res.data.members);
  })
  .catch((error)=>{
    return error
  })

}


const gettingRegMembers = ()=>{

  if(date && !contact) {
    return(
    getMembers.filter((item)=>item.date === date).map((items,index)=>{
        return(
          <tr>
            <td>{index+1}</td>
            <td>{items.member_name}</td>
            <td>{items.phone}</td>
            <td>{items.address}</td>
            <td>{items.cnic}</td>
            <td>{items.city}</td>
            <td>{items.age}</td>
            <td>{items.reg_fee}</td>
            <td>{items.monthly_fee}</td>
            <td>{items.reg_fee_status}</td>
            <td>{items.fee_status}</td>
            <td>{items.date}</td>
          <td>
              <button onClick={()=>delMember(items.id)} className="btn btn-outline-danger btn-sm">
              <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <Link to={{pathname:"/UpdateMemForm"}} state={{
                    memID:items.id,
                    memName:items.member_name,
                    memPhone:items.phone,
                    memAdd:items.address,
                    memCnic:items.cnic,
                    memCity:items.city,
                    memAge:items.age,
                    memRegFee:items.reg_fee,
                    memMonFee:items.monthly_fee,
                    memRegFeeStatus:items.reg_fee_status

                    }} className="btn btn-outline-primary btn-sm" style={{marginTop:"0.5em"}}>
                  <i className="fa-solid fa-pencil"></i>
                  </Link>
          </td>
          

          
      </tr>

        )
      })

    
    
    )
    }
    else if(contact && !date){
      return(
      getMembers.filter((item)=>item.phone === contact).map((items,index)=>{
        return(
          <tr>
            <td>{index+1}</td>
            <td>{items.member_name}</td>
            <td>{items.phone}</td>
            <td>{items.address}</td>
            <td>{items.cnic}</td>
            <td>{items.city}</td>
            <td>{items.age}</td>
            <td>{items.reg_fee}</td>
            <td>{items.monthly_fee}</td>
            <td>{items.reg_fee_status}</td>
            <td>{items.fee_status}</td>
            <td>{items.date}</td>
          <td>
              <button onClick={()=>delMember(items.id)} className="btn btn-outline-danger btn-sm">
              <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <Link to={{pathname:"/UpdateMemForm"}} state={{
                    memID:items.id,
                    memName:items.member_name,
                    memPhone:items.phone,
                    memAdd:items.address,
                    memCnic:items.cnic,
                    memCity:items.city,
                    memAge:items.age,
                    memRegFee:items.reg_fee,
                    memMonFee:items.monthly_fee,
                    memRegFeeStatus:items.reg_fee_status

                    }} className="btn btn-outline-primary btn-sm" style={{marginTop:"0.5em"}}>
                  <i className="fa-solid fa-pencil"></i>
                  </Link>
          </td>
          

          
      </tr>

        )
      })
      )
    }
    else if(date && contact){
      return(
      getMembers.filter((item)=>item.date === date && item.phone === contact).map((items,index)=>{
        return(
          <tr>
            <td>{index+1}</td>
            <td>{items.member_name}</td>
            <td>{items.phone}</td>
            <td>{items.address}</td>
            <td>{items.cnic}</td>
            <td>{items.city}</td>
            <td>{items.age}</td>
            <td>{items.reg_fee}</td>
            <td>{items.monthly_fee}</td>
            <td>{items.reg_fee_status}</td>
            <td>{items.fee_status}</td>
            <td>{items.date}</td>
          <td>
              <button onClick={()=>delMember(items.id)} className="btn btn-outline-danger btn-sm">
              <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <Link to={{pathname:"/UpdateMemForm"}} state={{
                    memID:items.id,
                    memName:items.member_name,
                    memPhone:items.phone,
                    memAdd:items.address,
                    memCnic:items.cnic,
                    memCity:items.city,
                    memAge:items.age,
                    memRegFee:items.reg_fee,
                    memMonFee:items.monthly_fee,
                    memRegFeeStatus:items.reg_fee_status

                    }} className="btn btn-outline-primary btn-sm" style={{marginTop:"0.5em"}}>
                  <i className="fa-solid fa-pencil"></i>
                  </Link>
          </td>
          

          
      </tr>

        )
      })
      )
    }
    else
      {
        return(
        getMembers.sort((a,b)=> new Date(...b.created_at.split("/").reverse()) - new Date(...a.created_at.split("/").reverse())).map((items,index)=>{
            return(
              <tr>
                <td>{index+1}</td>
                <td>{items.member_name}</td>
                <td>{items.phone}</td>
                <td>{items.address}</td>
                <td>{items.cnic}</td>
                <td>{items.city}</td>
                <td>{items.age}</td>
                <td>{items.reg_fee}</td>
                <td>{items.monthly_fee}</td>
                <td>{items.reg_fee_status}</td>
                <td>{items.fee_status}</td>
                <td>{items.date}</td>
              <td>
                  <button onClick={()=>delMember(items.id)} className="btn btn-outline-danger btn-sm">
                  <i className="fa-solid fa-trash-can"></i>
                      </button>
                      <Link to={{pathname:"/UpdateMemForm"}} state={{
                        memID:items.id,
                        memName:items.member_name,
                        memPhone:items.phone,
                        memAdd:items.address,
                        memCnic:items.cnic,
                        memCity:items.city,
                        memAge:items.age,
                        memRegFee:items.reg_fee,
                        memMonFee:items.monthly_fee,
                        memRegFeeStatus:items.reg_fee_status

                        }} className="btn btn-outline-primary btn-sm" style={{marginTop:"0.5em"}}>
                      <i className="fa-solid fa-pencil"></i>
                      </Link>
              </td>
              

              
          </tr>
  
            )
          })
          )
        }

    

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
            <h2 className="content-header-title float-start mb-0">Members Record</h2>
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
        <h4 className="card-title">Members Record</h4>
      </div>
      <div className="card-body">
        <div className="row">
       <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
            <label className="form-label" htmlFor="credit-card"> <b>Search with Date*</b></label>
                <input type="text" className="form-control credit-card-mask"   placeholder="Search with Date..." onChange={(e)=> setDate(e.target.value)} id="credit-card" />
        </div>
        <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
            <label className="form-label" htmlFor="credit-card"> <b>Search with Contact*</b></label>
                <input type="number" className="form-control credit-card-mask"   placeholder="Search with Contact..." onChange={(e)=> setContact(e.target.value)}id="credit-card" />
        </div>
      </div>
      <div className="table-responsive table-striped table-responsive">
      {
              getMembers.length !== 0? 
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Cinc</th>
              <th>City</th>
              <th>Age</th>
              <th>Reg Fee</th>
              <th>Monthly Fee</th>
              <th>Reg Status</th>
              <th>Fee Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              gettingRegMembers()
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

export default MembersTable