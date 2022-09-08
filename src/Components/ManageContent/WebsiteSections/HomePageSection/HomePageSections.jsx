import React,{useState, useEffect} from 'react';
import { EncryptStorage } from 'encrypt-storage';
import baseURL from '../../../BaseUrl.js';
import {Link} from 'react-router-dom';
import axios from 'axios';

const HomePageSections = () => {
    const[headerSectionData , setHeaderSectionData] = useState([]);
    const[chooseProgramData , setChooseProgramData] = useState([]);
    const[pricingData , setPricingData] = useState([]);

    const encryptStorageTwo = new EncryptStorage('secret-key', {
        prefix: '@instance2',
      });
    const SetLocalLogin = async () => {
      try {
        let userID = await encryptStorageTwo.getItem('userID');
    
    
        if ( userID !== null) {
       
            gettingHeaderSectionData(userID)
            gettingChooseProgramData(userID)
            gettingPricingData(userID)
    
        }
      } catch {
        return null;
      }
    }
    

    const gettingHeaderSectionData =  (id)=>{
        axios.get(`${baseURL}api/homepagelist/${id}`)
       .then((res)=>{
         setHeaderSectionData(res.data)
       })
       .catch((err)=>{
         console.log(err)
       })
     }
    
     const gettingChooseProgramData =  (id)=>{
        axios.get(`${baseURL}api/programlist/${id}`)
       .then((res)=>{
        setChooseProgramData(res.data)
       })
       .catch((err)=>{
         console.log(err)
       })
     }


     const gettingPricingData =  (id)=>{
        axios.get(`${baseURL}api/pricinglist/${id}`)
       .then((res)=>{
        setPricingData(res.data)
       })
       .catch((err)=>{
         console.log(err)
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
            <h2 className="content-header-title float-start mb-0">Home Page Sections</h2>
            <div className="breadcrumb-wrapper">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/ManageWebsiteSection">Home</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div className="content-body">
      <section id="modal-examples">
        <div className="row p-1">
      <div className="col-md-4">
  <div className="card">
    <div className="card-body text-center">
    <i className="fa-solid fa-square-minus font-large-2 mb-1"></i>
      <h5 className="card-title">Update Header Section</h5>
      <p className="card-text">Elegant Share Project options modal popup example, easy to use in any page.</p>
      
      {
        headerSectionData === null?
        <Link type="button" className="btn btn-info" data-bs-target="#shareProject" onClick={alert('No data found')}>
            Show
          </Link>
          :
        headerSectionData.map((items)=>{
          return(
            <Link type="button" className="btn btn-info" to={{pathname:"/HomeHeaderSec"}}  data-bs-target="#shareProject"
            state={{
                gymName:items.gym_name,
                gymDec:items.gym_para,
                ownerImage:items.owner_img
            }}
            >
            Show
          </Link>
          )
        
        })

      }
     
    </div>
  </div>
</div>

<div className="col-md-4">
  <div className="card">
    <div className="card-body text-center">
    <i className="fa-solid fa-chart-pie font-large-2 mb-1"></i>      
    <h5 className="card-title">Update Choose your program section</h5>
      <p className="card-text">Elegant Share Projects easy to use in any page.</p>
      {
        chooseProgramData === null ?
        <Link type="button" className="btn btn-info" data-bs-target="#shareProject" onClick={alert('No data found')}>
        Show
      </Link>
      :
          chooseProgramData.map((items)=>{
            return(
              <Link type="button" className="btn btn-info" to={{pathname:"/HomeChooseProgramSec"}}  data-bs-target="#shareProject"
              state={{
                  headOne:items.head_one,
                  paraOne:items.para_one,
                  imageOne:items.img_one,

                  headTwo:items.head_two,
                  paraTwo:items.para_two,
                  imageTwo:items.img_two,

                  headThree:items.head_three,
                  paraThree:items.para_three,
                  imageThree:items.img_three,
                
                  headfour:items.head_four,
                  parafour:items.para_four,
                  imagefour:items.img_four,
                  
              }}
              >
              Show
            </Link>
            )
          
          })

      }
    
    </div>
  </div>
</div>

<div className="col-md-4">
  <div className="card">
    <div className="card-body text-center">
    <i className="fa-solid fa-clipboard-check font-large-2 mb-1"></i>   
     <h5 className="card-title">Update Pricing Section</h5>
      <p className="card-text">Elegant Share Project options modal popup example, easy to use in any page.</p>
      {
        pricingData === null ?
        <Link type="button" className="btn btn-info" data-bs-target="#shareProject" onClick={alert('No data found')}>
        Show
      </Link>
        :
        pricingData.map((items)=>{
            return(
              <Link type="button" className="btn btn-info" to={{pathname:"/HomePricingSec"}}  data-bs-target="#shareProject"
              state={{
                  normFee:items.normal_fee,
                  normTxtOne:items.normal_txt_one,
                  normTxtTwo:items.normal_txt_two,

                  proFee:items.professional_fee,
                  proTxtOne:items.prof_txt_one,
                  proTxtTwo:items.prof_txt_two,

                  advFee:items.advanced_Fee,
                  advTxtOne:items.adv_txt_one,
                  advTxtTwo:items.adv_txt_two,
              }}
              >
              Show
            </Link>
            )
          
          })
      }
    

      
    </div>
  </div>
</div>

        </div>
      </section>
      {/* share project modal */}
    </div>
    </div>
    </div>

    </>
  )
}

export default HomePageSections