import {login,emailName,email,password,passwordName} from '../../interceptors.js';
import { EncryptStorage } from 'encrypt-storage';
import RedBell from './Images/NotifiCircle.svg';
import React,{useEffect,useState} from 'react';
import FeatherIcon from 'feather-icons-react';
import { AsyncStorage } from "AsyncStorage";
import Avatar from './Images/barbell.png';

const Navbar = () => {
  const[admiName , setAdminName] = useState('');
  const encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });
  const encryptStorageTwo = new EncryptStorage('secret-key', {
    prefix: '@instance2',
  });

  const SetLocalLogin = async () => {
    try {
      let userName = await AsyncStorage.getItem('userName');
  
      if (userName !== null) {
        setAdminName(userName)
      }
    } catch {
      return null;
    }
  }

  const LogOut = () => {
    AsyncStorage.setItem(login, JSON.stringify(true));
    AsyncStorage.setItem(emailName,(email));
    AsyncStorage.setItem(passwordName,(password));
    AsyncStorage.setItem('userName',(null));
    
    
    encryptStorage.removeItem('unique_key');
    encryptStorageTwo.removeItem('userID');

    window.location.reload(true);
  };

  useEffect(() => {
    SetLocalLogin()
  }, [])
  
  return (
    <>
     <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
    <div className="navbar-container d-flex content">
      <div className="bookmark-wrapper d-flex align-items-center">
        {/* <h3 style={{fontSize:"18px", fontFamily:"Montserrat"}}>My Profile</h3> */}
        <ul className="nav navbar-nav d-xl-none">
          <li className="nav-item"><a className="nav-link menu-toggle" ><FeatherIcon className="ficon" icon="menu" /></a></li>
        </ul>
        {/* <ul className="nav navbar-nav bookmark-icons">
          <li className="nav-item d-none d-lg-block"><a className="nav-link" href="app-email.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Email"><i className="ficon" data-feather="mail" /></a></li>
          <li className="nav-item d-none d-lg-block"><a className="nav-link" href="app-chat.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Chat"><i className="ficon" data-feather="message-square" /></a></li>
          <li className="nav-item d-none d-lg-block"><a className="nav-link" href="app-calendar.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Calendar"><i className="ficon" data-feather="calendar" /></a></li>
          <li className="nav-item d-none d-lg-block"><a className="nav-link" href="app-todo.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Todo"><i className="ficon" data-feather="check-square" /></a></li>
        </ul>
        <ul className="nav navbar-nav">
          <li className="nav-item d-none d-lg-block"><a className="nav-link bookmark-star"><i className="ficon text-warning" data-feather="star" /></a>
            <div className="bookmark-input search-input">
              <div className="bookmark-input-icon"><i data-feather="search" /></div>
              <input className="form-control input" type="text" placeholder="Bookmark" tabIndex={0} data-search="search" />
              <ul className="search-list search-list-bookmark" />
            </div>
          </li>
        </ul> */}
      </div>
      <ul className="nav navbar-nav align-items-center ms-auto">
        {/* <li className="nav-item dropdown dropdown-language"><a className="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="flag-icon flag-icon-us" /><span className="selected-language">English</span></a>
          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-flag"><a className="dropdown-item" href="#" data-language="en"><i className="flag-icon flag-icon-us" /> English</a><a className="dropdown-item" href="#" data-language="fr"><i className="flag-icon flag-icon-fr" /> French</a><a className="dropdown-item" href="#" data-language="de"><i className="flag-icon flag-icon-de" /> German</a><a className="dropdown-item" href="#" data-language="pt"><i className="flag-icon flag-icon-pt" /> Portuguese</a></div>
        </li> */}
        {/* <li className="nav-item d-none d-lg-block"><a className="nav-link nav-link-style"><FeatherIcon className="ficon" icon="moon" /></a></li> */}
        {/* <li className="nav-item nav-search"><a className="nav-link nav-link-search"><i className="ficon" data-feather="search" /></a>
          <div className="search-input">
            <div className="search-input-icon"><i data-feather="search" /></div>
            <input className="form-control input" type="text" placeholder="Explore Vuexy..." tabIndex={-1} data-search="search" />
            <div className="search-input-close"><i data-feather="x" /></div>
            <ul className="search-list search-list-main" />
          </div>
        </li> */}

        {/* <li className="nav-item dropdown dropdown-cart me-25"><a className="nav-link" href="#" data-bs-toggle="dropdown"><i className="ficon" data-feather="shopping-cart" /><span className="badge rounded-pill bg-primary badge-up cart-item-count">6</span></a>
          <ul className="dropdown-menu dropdown-menu-media dropdown-menu-end">
            <li className="dropdown-menu-header">
              <div className="dropdown-header d-flex">
                <h4 className="notification-title mb-0 me-auto">My Cart</h4>
                <div className="badge rounded-pill badge-light-primary">4 Items</div>
              </div>
            </li>

            <li className="scrollable-container media-list">
              <div className="list-item align-items-center"><img className="d-block rounded me-1" src="../../../app-assets/images/pages/eCommerce/1.png" alt="donuts" width={62} />
                <div className="list-item-body flex-grow-1"><i className="ficon cart-item-remove" data-feather="x" />
                  <div className="media-heading">
                    <h6 className="cart-item-title"><a className="text-body" href="app-ecommerce-details.html"> Apple watch 5</a></h6><small className="cart-item-by">By Apple</small>
                  </div>
                  <div className="cart-item-qty">
                    <div className="input-group">
                      <input className="touchspin-cart" type="number" defaultValue={1} />
                    </div>
                  </div>
                  <h5 className="cart-item-price">$374.90</h5>
                </div>
              </div>
              <div className="list-item align-items-center"><img className="d-block rounded me-1" src="../../../app-assets/images/pages/eCommerce/7.png" alt="donuts" width={62} />
                <div className="list-item-body flex-grow-1"><i className="ficon cart-item-remove" data-feather="x" />
                  <div className="media-heading">
                    <h6 className="cart-item-title"><a className="text-body" href="app-ecommerce-details.html"> Google Home Mini</a></h6><small className="cart-item-by">By Google</small>
                  </div>
                  <div className="cart-item-qty">
                    <div className="input-group">
                      <input className="touchspin-cart" type="number" defaultValue={3} />
                    </div>
                  </div>
                  <h5 className="cart-item-price">$129.40</h5>
                </div>
              </div>
              <div className="list-item align-items-center"><img className="d-block rounded me-1" src="../../../app-assets/images/pages/eCommerce/2.png" alt="donuts" width={62} />
                <div className="list-item-body flex-grow-1"><i className="ficon cart-item-remove" data-feather="x" />
                  <div className="media-heading">
                    <h6 className="cart-item-title"><a className="text-body" href="app-ecommerce-details.html"> iPhone 11 Pro</a></h6><small className="cart-item-by">By Apple</small>
                  </div>
                  <div className="cart-item-qty">
                    <div className="input-group">
                      <input className="touchspin-cart" type="number" defaultValue={2} />
                    </div>
                  </div>
                  <h5 className="cart-item-price">$699.00</h5>
                </div>
              </div>
              <div className="list-item align-items-center"><img className="d-block rounded me-1" src="../../../app-assets/images/pages/eCommerce/3.png" alt="donuts" width={62} />
                <div className="list-item-body flex-grow-1"><i className="ficon cart-item-remove" data-feather="x" />
                  <div className="media-heading">
                    <h6 className="cart-item-title"><a className="text-body" href="app-ecommerce-details.html"> iMac Pro</a></h6><small className="cart-item-by">By Apple</small>
                  </div>
                  <div className="cart-item-qty">
                    <div className="input-group">
                      <input className="touchspin-cart" type="number" defaultValue={1} />
                    </div>
                  </div>
                  <h5 className="cart-item-price">$4,999.00</h5>
                </div>
              </div>
              <div className="list-item align-items-center"><img className="d-block rounded me-1" src="../../../app-assets/images/pages/eCommerce/5.png" alt="donuts" width={62} />
                <div className="list-item-body flex-grow-1"><i className="ficon cart-item-remove" data-feather="x" />
                  <div className="media-heading">
                    <h6 className="cart-item-title"><a className="text-body" href="app-ecommerce-details.html"> MacBook Pro</a></h6><small className="cart-item-by">By Apple</small>
                  </div>
                  <div className="cart-item-qty">
                    <div className="input-group">
                      <input className="touchspin-cart" type="number" defaultValue={1} />
                    </div>
                  </div>
                  <h5 className="cart-item-price">$2,999.00</h5>
                </div>
              </div>
            </li>
            <li className="dropdown-menu-footer">
              <div className="d-flex justify-content-between mb-1">
                <h6 className="fw-bolder mb-0">Total:</h6>
                <h6 className="text-primary fw-bolder mb-0">$10,999.00</h6>
              </div><a className="btn btn-primary w-100" href="app-ecommerce-checkout.html">Checkout</a>
            </li>
          </ul>
        </li> */}
        {/* <span className="badge rounded-pill bg-danger badge-up" style={{width:"0.2em"}}></span> */}
        <li className="nav-item dropdown dropdown-notification me-25"><a className="nav-link" href="#" data-bs-toggle="dropdown" ><FeatherIcon className="ficon" icon="bell"  /> <img className="img-fluid"src={RedBell} alt="" style={{marginTop:"-1.7em", marginLeft:"-0.9em"}} /></a>
          <ul className="dropdown-menu dropdown-menu-media dropdown-menu-end">
            {/* <li className="dropdown-menu-header">
              <div className="dropdown-header d-flex">
                <h4 className="notification-title mb-0 me-auto">Notifications</h4>
                <div className="badge rounded-pill badge-light-primary">6 New</div>
              </div>
            </li> */}

            {/* <li className="scrollable-container media-list"><a className="d-flex" href="#">
                <div className="list-item d-flex align-items-start">
                  <div className="me-1">
                    <div className="avatar"><img src="../../../app-assets/images/portrait/small/avatar-s-15.jpg" alt="avatar" width={32} height={32} /></div>
                  </div>
                  <div className="list-item-body flex-grow-1">
                    <p className="media-heading"><span className="fw-bolder">Congratulation Sam 🎉</span>winner!</p><small className="notification-text"> Won the monthly best seller badge.</small>
                  </div>
                </div>
              </a><a className="d-flex" href="#">
                <div className="list-item d-flex align-items-start">
                  <div className="me-1">
                    <div className="avatar"><img src="../../../app-assets/images/portrait/small/avatar-s-3.jpg" alt="avatar" width={32} height={32} /></div>
                  </div>
                  <div className="list-item-body flex-grow-1">
                    <p className="media-heading"><span className="fw-bolder">New message</span>&nbsp;received</p><small className="notification-text"> You have 10 unread messages</small>
                  </div>
                </div>
              </a><a className="d-flex" href="#">
                <div className="list-item d-flex align-items-start">
                  <div className="me-1">
                    <div className="avatar bg-light-danger">
                      <div className="avatar-content">MD</div>
                    </div>
                  </div>
                  <div className="list-item-body flex-grow-1">
                    <p className="media-heading"><span className="fw-bolder">Revised Order 👋</span>&nbsp;checkout</p><small className="notification-text"> MD Inc. order updated</small>
                  </div>
                </div>
              </a>
              <div className="list-item d-flex align-items-center">
                <h6 className="fw-bolder me-auto mb-0">System Notifications</h6>
                <div className="form-check form-check-primary form-switch">
                  <input className="form-check-input" id="systemNotification" type="checkbox" defaultChecked />
                  <label className="form-check-label" htmlFor="systemNotification" />
                </div>
              </div><a className="d-flex" href="#">
                <div className="list-item d-flex align-items-start">
                  <div className="me-1">
                    <div className="avatar bg-light-danger">
                      <div className="avatar-content"><i className="avatar-icon" data-feather="x" /></div>
                    </div>
                  </div>
                  <div className="list-item-body flex-grow-1">
                    <p className="media-heading"><span className="fw-bolder">Server down</span>&nbsp;registered</p><small className="notification-text"> USA Server is down due to high CPU usage</small>
                  </div>
                </div>
              </a><a className="d-flex" href="#">
                <div className="list-item d-flex align-items-start">
                  <div className="me-1">
                    <div className="avatar bg-light-success">
                      <div className="avatar-content"><i className="avatar-icon" data-feather="check" /></div>
                    </div>
                  </div>
                  <div className="list-item-body flex-grow-1">
                    <p className="media-heading"><span className="fw-bolder">Sales report</span>&nbsp;generated</p><small className="notification-text"> Last month sales report generated</small>
                  </div>
                </div>
              </a><a className="d-flex" href="#">
                <div className="list-item d-flex align-items-start">
                  <div className="me-1">
                    <div className="avatar bg-light-warning">
                      <div className="avatar-content"><i className="avatar-icon" data-feather="alert-triangle" /></div>
                    </div>
                  </div>
                  <div className="list-item-body flex-grow-1">
                    <p className="media-heading"><span className="fw-bolder">High memory</span>&nbsp;usage</p><small className="notification-text"> BLR Server using high memory</small>
                  </div>
                </div>
              </a>
            </li>
             */}
            {/* <li className="dropdown-menu-footer"><a className="btn btn-primary w-100" href="#">Read all notifications</a></li> */}
          </ul>
        </li>
        <li className="nav-item dropdown dropdown-user"><a className="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div className="user-nav d-sm-flex d-none"><span className="user-name fw-bolder">{admiName}</span><span className="user-status">Admin</span></div><span className="avatar"><img className="round" src={Avatar} alt="avatar" height={40} width={40} /><span className="avatar-status-online" /></span>
          </a>
          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
            {/* <a className="dropdown-item" href="page-profile.html">
              <i className="me-50" data-feather="user" /> Profile</a>
              <a className="dropdown-item" href="app-email.html">
                <i className="me-50" data-feather="mail" /> Inbox</a>
                <a className="dropdown-item" href="app-todo.html">
                  <i className="me-50" data-feather="check-square" /> Task</a>
                  <a className="dropdown-item" href="app-chat.html">
                    <i className="me-50" data-feather="message-square" /> Chats</a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="page-account-settings-account.html">
              <i className="me-50" data-feather="settings" /> Settings</a>
              <a className="dropdown-item" href="page-pricing.html">
                <i className="me-50" data-feather="credit-card" /> Pricing</a>
                <a className="dropdown-item" href="page-faq.html">
                  <i className="me-50" data-feather="help-circle" /> FAQ</a> */}
                  <a href="/" className="dropdown-item" onClick={LogOut}>
                    <FeatherIcon className="me-50" icon="power" /> Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <ul className="main-search-list-defaultlist d-none">
    <li className="d-flex align-items-center"><a href="#">
        <h6 className="section-label mt-75 mb-0">Files</h6>
      </a></li>
    <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
        <div className="d-flex">
          <div className="me-75"><img src="../../../app-assets/images/icons/xls.png" alt="png" height={32} /></div>
          <div className="search-data">
            <p className="search-data-title mb-0">Two new item submitted</p><small className="text-muted">Marketing Manager</small>
          </div>
        </div><small className="search-data-size me-50 text-muted">'17kb</small>
      </a></li>
    <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
        <div className="d-flex">
          <div className="me-75"><img src="../../../app-assets/images/icons/jpg.png" alt="png" height={32} /></div>
          <div className="search-data">
            <p className="search-data-title mb-0">52 JPG file Generated</p><small className="text-muted">FontEnd Developer</small>
          </div>
        </div><small className="search-data-size me-50 text-muted">'11kb</small>
      </a></li>
    <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
        <div className="d-flex">
          <div className="me-75"><img src="../../../app-assets/images/icons/pdf.png" alt="png" height={32} /></div>
          <div className="search-data">
            <p className="search-data-title mb-0">25 PDF File Uploaded</p><small className="text-muted">Digital Marketing Manager</small>
          </div>
        </div><small className="search-data-size me-50 text-muted">'150kb</small>
      </a></li>
    <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
        <div className="d-flex">
          <div className="me-75"><img src="../../../app-assets/images/icons/doc.png" alt="png" height={32} /></div>
          <div className="search-data">
            <p className="search-data-title mb-0">Anna_Strong.doc</p><small className="text-muted">Web Designer</small>
          </div>
        </div><small className="search-data-size me-50 text-muted">'256kb</small>
      </a></li>
    <li className="d-flex align-items-center"><a href="#">
        <h6 className="section-label mt-75 mb-0">Members</h6>
      </a></li>
    <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view-account.html">
        <div className="d-flex align-items-center">
          <div className="avatar me-75"><img src="../../../app-assets/images/portrait/small/avatar-s-8.jpg" alt="png" height={32} /></div>
          <div className="search-data">
            <p className="search-data-title mb-0">John Doe</p><small className="text-muted">UI designer</small>
          </div>
        </div>
      </a></li>
    <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view-account.html">
        <div className="d-flex align-items-center">
          <div className="avatar me-75"><img src="../../../app-assets/images/portrait/small/avatar-s-1.jpg" alt="png" height={32} /></div>
          <div className="search-data">
            <p className="search-data-title mb-0">Michal Clark</p><small className="text-muted">FontEnd Developer</small>
          </div>
        </div>
      </a></li>
    <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view-account.html">
        <div className="d-flex align-items-center">
          <div className="avatar me-75"><img src="../../../app-assets/images/portrait/small/avatar-s-14.jpg" alt="png" height={32} /></div>
          <div className="search-data">
            <p className="search-data-title mb-0">Milena Gibson</p><small className="text-muted">Digital Marketing Manager</small>
          </div>
        </div>
      </a></li>
    <li className="auto-suggestion"><a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view-account.html">
        <div className="d-flex align-items-center">
          <div className="avatar me-75"><img src="../../../app-assets/images/portrait/small/avatar-s-6.jpg" alt="png" height={32} /></div>
          <div className="search-data">
            <p className="search-data-title mb-0">Anna Strong</p><small className="text-muted">Web Designer</small>
          </div>
        </div>
      </a></li>
  </ul>
  <ul className="main-search-list-defaultlist-other-list d-none">
    <li className="auto-suggestion justify-content-between"><a className="d-flex align-items-center justify-content-between w-100 py-50">
        <div className="d-flex justify-content-start"><span className="me-75" data-feather="alert-circle" /><span>No results found.</span></div>
      </a></li>
  </ul>



    </>
  )
}

export default Navbar