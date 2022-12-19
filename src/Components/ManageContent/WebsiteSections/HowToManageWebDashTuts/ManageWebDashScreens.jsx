import React from 'react';
import {Link} from 'react-router-dom';

const ManageWebDashScreens = () => {
  return (
    <>
    <div className="app-content content ">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Website &amp; Dashboard Management </h2>
            <div className="breadcrumb-wrapper">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/ManageContent">Home</a>
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
          <div className="col-md-6">
            <div className="card p-1">
              <div className="card-body text-center p-4">
                <i  className="fa-solid fa-table-columns font-large-2 mb-1" />
                <h3>
                  How to Operate  Dashboard
                </h3>&nbsp;
                <h3>
            ویب سائٹ کو کیسے اپ ڈیٹ کریں۔      
            </h3>
            
                {/* modal trigger button */}
                <Link to="/ManageDashboardTuts" type="button" className="btn btn-info mt-1"  data-bs-target="#shareProject">
                  Show
                </Link>
              </div>
            </div>
          </div>
          {/* / share project card */}
          {/* add new card  */}
          <div className="col-md-6">
            <div className="card p-1">
              <div className="card-body text-center p-5">
                <i className="fa-solid fa-globe font-large-2 mb-1" />
                <h3>
                  How to update website
                </h3>
                <h3> &nbsp;
                 ویب سائٹ کو کھولیں۔
                </h3>
              
                {/* modal trigger button */}
                <Link to="/ManageWebsiteTuts" type="button" className="btn btn-info mt-1"  data-bs-target="#addNewCard">
                  Show
                </Link>
              </div>
            </div>
          </div>
          {/* / add new card  */}
  
      
         
        
        
        </div>
      </section>
      {/* share project modal */}
    </div>
  </div>
</div>

    </>
  )
}

export default ManageWebDashScreens