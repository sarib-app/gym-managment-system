import React from 'react';
import {Link } from 'react-router-dom';

const ManageContentScreen = () => {
  return (
    <>
     {/* BEGIN: Content*/}
<div className="app-content content ">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Website Management </h2>
            <div className="breadcrumb-wrapper">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <div className="content-body">
      <section id="modal-examples">
        <div className="row">
          {/* share project card */}
          <div className="col-md-4">
            <div className="card"  style={{padding:"23px"}}>
              <div className="card-body text-center ">
                <i  className="fa-solid fa-bars-progress font-large-2 mb-1" />
                <h3>
                  Learn how to manage Dashboard &amp; Website
                </h3>
                <h3>                  
                   ویب سائٹ کو سنبھلیں۔
                </h3>
            
                {/* modal trigger button */}
                <Link to="/ManageWebDashScreens" type="button" className="btn btn-info mt-1"  data-bs-target="#shareProject">
                  Show
                </Link>
              </div>
            </div>
          </div>
          {/* / share project card */}
          {/* add new card  */}
          <div className="col-md-4">
            <div className="card" style={{padding:"28px"}}>
              <div className="card-body text-center">
                <i className="fa-solid fa-box-open font-large-2 mb-1" />
                <h3>
                  Open Website
                </h3>
                <h3> &nbsp;
                 ویب سائٹ کو کھولیں۔
                </h3>
              
                {/* modal trigger button */}
                <a href="https://www.fitnessfreak.ussoftprovider.com/" target="_blank"  className="btn btn-info mt-5"  data-bs-target="#addNewCard" >
                  Show
                </a>
              </div>
            </div>
          </div>
          {/* / add new card  */}
          {/* pricing card */}
          <div className="col-md-4 ">
            <div className="card" style={{padding:"31px"}}>
              <div className="card-body text-center ">
                <i data-feather="bar-chart-2" className="fa-solid fa-file-pen font-large-2 mb-1" />
                <h3>
               Update your website
                </h3>
              <h3>
            ویب سائٹ کو اپ ڈیٹ کریں۔      
            </h3>

                <Link  className="btn btn-info" to="/ManageWebsiteSection"data-bs-target="#pricingModal" style={{marginTop:"1em"}}>
                  Show
                </Link>
              </div>
            </div>
          </div>
          {/* / pricing card */}
      
         
        
        
        </div>
      </section>
      {/* share project modal */}
    </div>
  </div>
</div>
{/* END: Content*/}

       

    </>
    
  )
}

export default ManageContentScreen