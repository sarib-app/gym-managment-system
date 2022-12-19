import HomeHeader from '../../../WebImages/HomeHeader.JPG';
import {useLocation , Link} from 'react-router-dom';
import React,{useState,useEffect  } from 'react';
import { EncryptStorage } from 'encrypt-storage';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';

const HomeHeaderSec = () => {

  const location = useLocation();
  const gym_Name = location.state.gymName;
  const gym_dec = location.state.gymDec;
  const owner_Img = location.state.ownerImage;
  

  const[loading , setLoading] = useState(false);
  const [userID , setUserID] = useState('');
    
  const[onwerImg , setOwnerImg] = useState(null);
  const[gymName , setGymName] = useState('');
  const[gymDesc, setGymDesc] = useState('');

  const[upOwnerImg , setUpOwnerImg] = useState('');

  const encryptStorageTwo = new EncryptStorage('secret-key', {
    prefix: '@instance2',
  });
const SetLocalLogin = async () => {
  try {
    let userID = await encryptStorageTwo.getItem('userID');


    if ( userID !== null) {
   
      setUserID(userID)

    }
  } catch {
    return null;
  }
}

  const homeHeaderSection = ()=>{
    setLoading(true)
  
    if(gymName && gymDesc ){
    
    const formdata = new FormData();
    formdata.append("gym_name",gymName);
    formdata.append("gym_para", gymDesc);

    onwerImg !=null && 
    formdata.append("owner_img",onwerImg);

    axios.post(`${process.env.REACT_APP_BASE_URL}api/updatehome/${userID}`, formdata)
    .then((res)=>{
      setLoading(false)
      toast.info('Section Added');
    })
    .catch((error)=>{
      console.log(error)
    })
    }
    else{
   
      toast.warn('Incomplete Info')
      setInterval(() => {
        setLoading(false)
      }, 1000);
  
    }
  
   
  }

  const autoFillHeaderSec = ()=>{
    setGymName(gym_Name)
    setGymDesc(gym_dec)
    setUpOwnerImg(owner_Img)


  }
  useEffect(() => {
    SetLocalLogin();
    autoFillHeaderSec();
    
  }, [])
  return (
    <>
    <div className="app-content content">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">

    <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Header Section</h2>
            <div className="breadcrumb-wrapper">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/HomePageSection">Home</Link>
                </li>
                
              </ol>
            </div>
          </div>
        </div>
      </div>
        </div>
        <div className="content-body">
      <div className="row">
        <div className="col-12">
          <img  className="img-fluid" src={HomeHeader} alt="" />
        <div className="card">
            <div className="card-header">
              <h4 className="card-title"><b>Header Section</b> </h4>
            </div>
            <div className="card-body  py-50">
                <div className="row">
                  <div className="mb-1 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Gym Name</b> </label>
                    <input type="text" id="companyName" name="companyName"  value={gymName}  className="form-control" placeholder="Gym Name" onChange={ e => setGymName(e.target.value)} data-msg="Please enter company name" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b> Gym Description</b></label>
                    <input className="form-control" type="text" id="billingEmail" value={gymDesc} name="billingEmail" placeholder="Gym description" onChange={ e => setGymDesc(e.target.value)} data-msg="Please enter billing email" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Owner Image</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control"   placeholder="Owner Image" onChange={ e => setOwnerImg(e.target.files[0])}/>
                    <span>{upOwnerImg}</span>
                  </div>
                 
                </div>
                <div className="p-1 text-end">
                  <button type="submit" className="btn btn-info me-1 " onClick={homeHeaderSection}>
                    {
                      loading === true? "loading...":"Save"
                    }
                  </button>
                 
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

export default HomeHeaderSec