import { EncryptStorage } from 'encrypt-storage';
import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ManageWebsiteSections = () => {
  const[aboutPageData , setAboutPageData] = useState([]);
  const[galleryPage , setGalleryPageData] = useState([]);

  const encryptStorageTwo = new EncryptStorage('secret-key', {
    prefix: '@instance2',
  });
const SetLocalLogin = async () => {
  try {
    let userID = await encryptStorageTwo.getItem('userID');


    if ( userID !== null) {
   
      gettingAboutPageData(userID)
      gettingGalleryPageData(userID)

    }
  } catch {
    return null;
  }
}


const gettingAboutPageData =  (id)=>{
  axios.get(`${process.env.REACT_APP_BASE_URL}api/aboutuslist/${id}`)
 .then((res)=>{
  setAboutPageData(res.data)
 })
 .catch((err)=>{
  return err
 })

}

const gettingGalleryPageData = (id)=>{
  axios.get(`${process.env.REACT_APP_BASE_URL}api/imageslist/${id}`)
  .then((res)=>{
    setGalleryPageData(res.data)
  })
  .catch((err)=>{
    return err
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
            <h2 className="content-header-title float-start mb-0">Manage Website Sections</h2>
            <div className="breadcrumb-wrapper">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/ManageContent">Home</Link>
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
    <i className="fa-solid fa-house font-large-2 mb-1"></i>
      <h5 className="card-title">Update Home Page Sections</h5>
      <p className="card-text">Elegant Share Project options modal popup example, easy to use in any page.</p>
            <Link to="/HomePageSection" type="button" className="btn btn-info"   data-bs-target="#shareProject">
            Show
          </Link>
    </div>
  </div>
</div>

<div className="col-md-4">
  <div className="card">
    <div className="card-body text-center">
    <i className="fa-solid fa-users-viewfinder font-large-2 mb-1"></i>      
    <h5 className="card-title">Update About US &amp; Trainer's Section</h5>
      <p className="card-text">Elegant Share Project options modal popup example, easy to use in any page.</p>
      {
        aboutPageData === null ?
        <Link  type="button" className="btn btn-info"   data-bs-target="#shareProject" onClick={alert('No Data Found')}>
        Show
      </Link>
      :
        aboutPageData.map((items)=>{
          return(
            <Link to={{pathname:"/AboutUsForm"}} state={{
              aboutUSHeading:items.sec1_para,
              aboutUSPara:items.about_us_para,
              qualityPara:items.our_quality_para,
              trainOne:items.trainer1_name,
              trainOneImg:items.trainer1_img,
              trainTwo:items.trainer2_name,
              trainTwoImg:items.trainer2_img,
              trainThree:items.trainer3_name,
              trainThreeImg:items.trainer3_img,
              trainFour:items.trainer4_name,
              trainFourImg:items.trainer4_img

              
            }} 
            type="button" className="btn btn-info"  data-bs-target="#shareProject">
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
    <i className="fa-solid fa-border-all font-large-2 mb-1"></i>   
     <h5 className="card-title">Update Gallery &amp; Social Media links Section</h5>
      <p className="card-text">Elegant Share Project options modal popup example, easy to use in any page.</p>
      {
        galleryPage === null ?
        <Link  type="button" className="btn btn-info"   data-bs-target="#shareProject" onClick={alert('No Data Found')}>
        Show
      </Link>
      :
        galleryPage.map((items)=>{
          return(
            <Link type="button" to={{pathname:"/GalleryForm"}} className="btn btn-info" data-bs-target="#shareProject"
            state={{
              imageOne:items.img_1,
              imageTwo:items.img_2,
              imageThree:items.img_3,
              imageFour:items.img_4,
              imageFive:items.img_5,
              imageSix:items.img_6,
              imageSeven:items.img_7,
              imageEight:items.img_8,
              imageNine:items.img_9,

              fbLink:items.link_one,
              intaLink:items.link_two,
              youtubeLink:items.link_three

            
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

export default ManageWebsiteSections