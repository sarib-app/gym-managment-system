import React from 'react';
import {Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';


const SideBar = () => {
  return (
    <>
     <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto" style={{marginTop:"-1em"}}><a className="navbar-brand" href="/" style={{fontSize:"3em"}}><span className="brand-logo">
        <i className="fa-solid fa-dumbbell text-info"></i>
             </span>
            <h2 className="brand-text text-info" style={{fontSize:"17px", marginLeft:"-0.4em"}}>Gym Panel</h2>
          </a>
          </li>
        <li className="nav-item nav-toggle" style={{marginTop:"0.4em"}}><a className="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse"><FeatherIcon className="d-block d-xl-none text-info toggle-icon font-medium-4" icon="x" /><FeatherIcon className="d-none d-xl-block collapse-toggle-icon font-medium-4  " icon="disc" data-ticon="disc" /></a></li>
      </ul>
    </div>
    <div className="shadow-bottom" />
    <div className="main-menu-content mt-2">
      <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
        {/* <li className=" nav-item"><a className="d-flex align-items-center" href="index.html"><i data-feather="home" /><span className="menu-title text-truncate" data-i18n="Dashboards">Dashboards</span><span className="badge badge-light-warning rounded-pill ms-auto me-1">2</span></a>
          <ul className="menu-content">
            <li><a className="d-flex align-items-center" href="dashboard-analytics.html"><i data-feather="circle" /><span className="menu-item text-truncate" data-i18n="Analytics">Analytics</span></a>
            </li>
            <li><a className="d-flex align-items-center" href="dashboard-ecommerce.html"><i data-feather="circle" /><span className="menu-item text-truncate" data-i18n="eCommerce">eCommerce</span></a>
            </li>
          </ul>
        </li> */}
        {/* <li className=" navigation-header"><span data-i18n="Apps & Pages">Apps &amp; Pages</span><i data-feather="more-horizontal" />
        </li> */}
        {/* <li className=" nav-item"><Link className="d-flex align-items-center" to="/emailComp"><i data-feather="mail" /><span className="menu-title text-truncate" data-i18n="Email">Email</span></Link>
        </li> */}
        {/* <li className=" nav-item"><a className="d-flex align-items-center" href="app-chat.html"><i data-feather="message-square" /><span className="menu-title text-truncate" data-i18n="Chat">Chat</span></a>
        </li> */}
        <li className="nav-item mt-1"><Link className="d-flex align-items-center" to="/"><i className="fa-solid fa-user-group"></i><span className="menu-title text-truncate" data-i18n="User">Reg Members</span></Link>
        </li>
        <li className="nav-item"><Link className="d-flex align-items-center" to="/FeeSubmissionForm"><i className="fa-solid fa-money-bill"></i><span className="menu-title text-truncate" data-i18n="clipboard">Fee Submission</span></Link>
        </li>
        <li className="nav-item"><Link className="d-flex align-items-center" to="/ExpenseForm"><i className="fa-solid fa-wallet"></i><span className="menu-title text-truncate" data-i18n="clipboard">Expense Form</span></Link>
        </li>
        <li className="nav-item"><Link className="d-flex align-items-center" to="/RegMemberTable"><i className="fa-solid fa-table-list"></i><span className="menu-title text-truncate" data-i18n="users">Members Record</span></Link>
        </li>
        <li className="nav-item"><Link className="d-flex align-items-center" to="/MemberDueRecord"><i className="fa-solid fa-clipboard-list"></i><span className="menu-title text-truncate" data-i18n="feather">Dues Record</span></Link>
        </li>
        {/* <li className="nav-item"><a className="d-flex align-items-center" href="#anything"><FeatherIcon icon="bar-chart-2" /><span className="menu-title text-truncate" data-i18n="Invoice">Statistics</span></a> */}
          {/* <ul className="menu-content">
            <li><a className="d-flex align-items-center" href="app-invoice-list.html"><i data-feather="circle" /><span className="menu-item text-truncate" data-i18n="List">List</span></a>
            </li>
            <li><a className="d-flex align-items-center" href="app-invoice-preview.html"><i data-feather="circle" /><span className="menu-item text-truncate" data-i18n="Preview">Preview</span></a>
            </li>
            <li><a className="d-flex align-items-center" href="app-invoice-edit.html"><i data-feather="circle" /><span className="menu-item text-truncate" data-i18n="Edit">Edit</span></a>
            </li>
            <li><a className="d-flex align-items-center" href="app-invoice-add.html"><i data-feather="circle" /><span className="menu-item text-truncate" data-i18n="Add">Add</span></a>
            </li>
          </ul> */}
        {/* </li> */}
        <li className=" nav-item"><Link className="d-flex align-items-center" to="/ExpenseTable"><i className="fa-solid fa-arrow-up-short-wide"></i><span className="menu-title text-truncate" data-i18n="File Manager">Expense Sheet</span></Link>
        </li>

        <li className=" nav-item"><Link className="d-flex align-items-center" to="/DailyChart"><i className="fa-solid fa-chart-area"></i><span className="menu-title text-truncate"  data-i18n="Roles">Daily Chart</span></Link>
        </li>


        
        <li className=" nav-item"><Link className="d-flex align-items-center" to="/RevenueChart"><i className="fa-solid fa-chart-line"></i><span className="menu-title text-truncate"  data-i18n="Roles">Revenue Chart</span></Link>
        </li>

         {/* <li className=" nav-item"><a className="d-flex align-items-center" href="#"><FeatherIcon icon="thumbs-up" /><span className="menu-title text-truncate" data-i18n="thumbs-up">Feedback</span></a>
           <ul className="menu-content">
            <li><a className="d-flex align-items-center" href="app-access-roles.html"><FeatherIcon icon="circle" /><span className="menu-item text-truncate" data-i18n="Roles">Roles</span></a>
            </li>
            <li><a className="d-flex align-items-center" href="app-access-permission.html"><FeatherIcon icon="circle" /><span className="menu-item text-truncate" data-i18n="Permission">Permission</span></a>
            </li>
          </ul> 
         </li>   */}
        <li className=" nav-item"><Link to="/ManageContent" className="d-flex align-items-center" ><i className="fa-solid fa-list-check"></i><span className="menu-title text-truncate" data-i18n="File Manager">Manage Content</span></Link>
        </li>
        
       
      </ul>
    </div>
  </div>


    </>
  )
}

export default SideBar