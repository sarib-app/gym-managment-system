import './App.css';
import { AsyncStorage } from 'AsyncStorage';
import {login} from './interceptors';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import SideBar from './Components/Layout/SideBar.jsx';
import Navbar from './Components/Layout/Navbar.jsx';
import Footer from './Components/Layout/Footer.jsx';

import Login from './Components/Auth/Login.jsx';
import Registration from './Components/Auth/Registration.jsx';

import RegMemForm from './Components/Forms/RegMemForm.jsx';
import FeeSubmissionForm from './Components/Forms/FeeSubmissionForm.jsx';
import ExpenseForm from './Components/Forms/ExpenseForm.jsx';

import UpdateMemForm from './Components/Forms/UpdateForms/UpdateMemForm.jsx';
import UpdateFeeForm from './Components/Forms/UpdateForms/UpdateFeeSubmissionForm.jsx';
import UpdateExpenseForm from './Components/Forms/UpdateForms/UpdateExpenseForm.jsx';

import RegMemberTable from './Components/Tables/MembersTable.jsx';
import MemberDueRecord from './Components/Tables/DuesTable.jsx';
import ExpenseTable from './Components/Tables/ExpenseTable.jsx';

import DailyChart from './Components/Charts/DailyChart.jsx';
import RevenueChart from './Components/Charts/RevenueChart.jsx';

import ManageContentScreen from './Components/ManageContent/ManageContentScreen.jsx';
import ManageWebsiteSection from './Components/ManageContent/ManageWebsiteSections.jsx';
import HomePageSection from './Components/ManageContent/WebsiteSections/HomePageSection/HomePageSections.jsx'

import HomeHeaderSec from './Components/ManageContent/WebsiteSections/HomePageSection/HomeHeaderSec.jsx';
import HomeChooseProgramSec from './Components/ManageContent/WebsiteSections/HomePageSection/HomeChooseProgramSec.jsx';
import HomePricingSec from './Components/ManageContent/WebsiteSections/HomePageSection/HomePricingSec.jsx';



import AboutUsForm from './Components/ManageContent/WebsiteSections/AboutUsPageSection/AboutUsForm.jsx';
import GalleryForm from './Components/ManageContent/WebsiteSections/GallerySection/GalleryForm.jsx';

import ManageWebDashScreens from './Components/ManageContent/WebsiteSections/HowToManageWebDashTuts/ManageWebDashScreens.jsx';
import ManageWebsiteTuts from './Components/ManageContent/WebsiteSections/HowToManageWebDashTuts/ManageWebsiteTuts.jsx';
import ManageDashboardTuts from './Components/ManageContent/WebsiteSections/HowToManageWebDashTuts/ManageDashboardTuts.jsx';


function App() {
  const [loginn, setLogin] = useState(true);
  const SetLocalLogin= async ()=>{
    try{
      let userLogin = await AsyncStorage.getItem(login);
      let parsed = JSON.parse(userLogin);
      if(parsed !== null){
        setLogin(parsed);
      }
    }catch{
        return null;
    }
  }
  useEffect(() => {
    SetLocalLogin()
  }, [])
 

  return (
    <div>
      {
        loginn===true?  
        <Router>
<Routes>        
<Route path="/" exact element={<Login/>}/>
<Route path="/Registration" element={<Registration/>}/>
</Routes>


</Router>
:

<Router>
  
  <Navbar />
  <SideBar  />
  <Routes>
  <Route  path="/" element={<RegMemForm/>}/>  
  
  <Route  path="/FeeSubmissionForm" element={<FeeSubmissionForm/>}/>  
  
  <Route  path="/UpdateFeeForm" element={<UpdateFeeForm/>}/>  
  <Route  path="/UpdateMemForm" element={<UpdateMemForm/>}/>  
  <Route  path="/UpdateExpenseForm" element={<UpdateExpenseForm/>}/>  
  
  
  
  
  <Route  path="/ExpenseForm" element={<ExpenseForm/>}/>  


  <Route  path="/RegMemberTable" element={<RegMemberTable/>}/>  
 
  <Route  path="/MemberDueRecord" element={<MemberDueRecord/>}/>  
  
  <Route  path="/ExpenseTable" element={<ExpenseTable/>}/>  
  
  
  <Route path="/DailyChart" element={<DailyChart/>}/>
  <Route path="/RevenueChart" element={<RevenueChart/>}/>

  <Route path="/ManageContent" element={<ManageContentScreen/>}/>
  <Route path="/ManageWebsiteSection" element={<ManageWebsiteSection/>}/>
  
  <Route path="/HomePageSection" element={<HomePageSection/>}/>
  <Route path="/HomeHeaderSec" element={<HomeHeaderSec/>}/>
  <Route path="/HomeChooseProgramSec" element={<HomeChooseProgramSec/>}/>
  <Route path="/HomePricingSec" element={<HomePricingSec/>}/>


  <Route path="/AboutUsForm" element={<AboutUsForm/>}/>
  <Route path="/GalleryForm" element={<GalleryForm/>}/>

  
  <Route path="/ManageWebDashScreens" element={<ManageWebDashScreens/>}/>
  <Route path="/ManageWebsiteTuts" element={<ManageWebsiteTuts/>}/>

  <Route path="/ManageDashboardTuts" element={<ManageDashboardTuts/>}/>

  

  
  
  
  
  </Routes>
  {/* <Footer/> */}
  </Router>
  
      }
    

    </div>
  );
}

export default App;
