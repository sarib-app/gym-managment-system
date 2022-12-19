import HomePricing from '../../../WebImages/HomePricing.JPG';
import {useLocation , Link} from 'react-router-dom';
import { EncryptStorage } from 'encrypt-storage';
import React,{useState,useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';

const HomePricingSec = () => {

  const location = useLocation();

  const normFee = location.state.normFee;
  const prooFee = location.state.proFee;
  const advvFee = location.state.advFee;
  
  
  const normTxtOne = location.state.normTxtOne;
  const normTxtTwo = location.state.normTxtTwo;

  const prooTxtOne = location.state.proTxtOne;
  const prooTxtTwo = location.state.proTxtTwo;

  const advvTxtOne = location.state.advTxtOne;
  const advvTxtTwo = location.state.advTxtTwo;

    const[loading , setLoading] = useState(false);
    const [userID , setUserID] = useState('');
  
  
  
  
  /*Home Pricing Section*/
  
    const[normalFee , setNormalFee] = useState('');  
    const[normalTxtOne , setNormalTxtOne] = useState('');
    const[normalTxtTwo , setNomralTxtTwo] = useState('');
  
    
    const[proFee , setProFee] = useState('');  
    const[proTxtOne , setProTxtOne] = useState('');
    const[proTxtTwo , setProTxtTwo] = useState('');
  
  
    const[advFee , setAdvFee] = useState('');  
    const[advTxtOne , setAdvTxtOne] = useState('');
    const[advTxtTwo , setAdvTxtTwo] = useState('');
  
  
  
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

  const homePricingSection = ()=>{
    if(normalFee && normalTxtOne && normalTxtTwo && proFee && proTxtOne && proTxtTwo && advFee && advTxtOne && advTxtTwo)
    {
      setLoading(true)
      const homeObj = {
        normal_fee:normalFee,
        normal_txt_one:normalTxtOne,
        normal_txt_two:normalTxtTwo,
    
        professional_fee:proFee,
        prof_txt_one:proTxtOne,
        prof_txt_two:proTxtTwo,
    
        advanced_fee:advFee,
        adv_txt_one:advTxtOne,
        adv_txt_two:advTxtTwo
      }
    
      axios.post(`${process.env.REACT_APP_BASE_URL}api/updatepricing/${userID}`,homeObj)
      .then((res)=>{
        console.log(res)
        setLoading(false)
        toast.info('Pricing Added ')
        
      })
      .catch((error)=>{
        return error
      })

    }
    else{
      toast.warn('Incomplete Info')
      setInterval(() => {
        setLoading(false)
      }, 1000);

    }
   
  
  }


  const autoFillPrice = ()=>{


setNormalFee(normFee)
setNormalTxtOne(normTxtOne)
setNomralTxtTwo(normTxtTwo)

setProFee(prooFee)
 setProTxtOne(prooTxtOne)
 setProTxtTwo(prooTxtTwo)

  setAdvFee(advvFee)
 setAdvTxtOne(advvTxtOne)
 setAdvTxtTwo(advvTxtTwo)


  }
  
  
  
  useEffect(() => {
    SetLocalLogin();
    autoFillPrice();
    
  }, [])
  return (
    <>
      <div className="app-content content">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Pricing Section</h2>
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
         <img className="img-fluid" src={HomePricing} alt="" />
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"><b>Fee Pricing Section</b> </h4>
            </div>
            <div className="card-body  py-50">
            <h4 className="card-title"><b>Normal Fee</b> </h4>
                <div className="row">
                
                  <div className="mb-1 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Normal Fee</b> </label>
                    <input type="number" id="companyName" name="companyName" value={normalFee} className="form-control" placeholder="Normal Fee" onChange={e => setNormalFee(e.target.value)} data-msg="Please enter company name" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b> Normal Fee Description One</b></label>
                    <input className="form-control" type="text" id="billingEmail" value={normalTxtOne} name="billingEmail" placeholder="Normal Fee Description One" onChange={e => setNormalTxtOne(e.target.value)} data-msg="Please enter billing email" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b> Normal Fee Description Two</b></label>
                    <input className="form-control" type="text" id="billingEmail" value={normalTxtTwo} name="billingEmail" placeholder="Normal Fee Description Two" onChange={e => setNomralTxtTwo(e.target.value)}data-msg="Please enter billing email" />
                  </div>
                
                 
                </div>

               
                <h4 className="card-title"><b>Professional Fee</b> </h4>
                <div className="row">
                  <div className="mb-1 col-md-6">
                  
                      
                     
                    <label htmlFor="companyName" className="form-label"><b>Professional Fee</b> </label>
                    <input type="number" id="companyName" name="companyName" value={proFee} className="form-control" placeholder="Professional Fee" onChange={e => setProFee(e.target.value)} data-msg="Please enter company name" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b> Professional Fee Description One</b></label>
                    <input className="form-control" type="text" id="billingEmail" value={proTxtOne} name="billingEmail" placeholder="Professional Fee Description One" onChange={e => setProTxtOne(e.target.value)} data-msg="Please enter billing email" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b> Professional Fee Description Two</b></label>
                    <input className="form-control" type="text" id="billingEmail" value={proTxtTwo} name="billingEmail" placeholder="Professional Fee Description Two" onChange={e => setProTxtTwo(e.target.value)}data-msg="Please enter billing email" />
                  </div>
                </div>

                <h4 className="card-title"><b>Advanced Fee</b> </h4>
                <div className="row">
                  <div className="mb-1 col-md-6">
                
                    <label htmlFor="companyName" className="form-label"><b>Advanced Fee</b> </label>
                    <input type="number" id="companyName" value={advFee} name="companyName" className="form-control" placeholder="Advanced Fee" onChange={e => setAdvFee(e.target.value)} data-msg="Please enter company name" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b> Advanced Fee Description One</b></label>
                    <input className="form-control" type="text" value={advTxtOne} id="billingEmail" name="billingEmail" placeholder="Advanced Fee Description One" onChange={e => setAdvTxtOne(e.target.value)} data-msg="Please enter billing email" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b> Advanced Fee Description Two</b></label>
                    <input className="form-control" type="text" value={advTxtTwo} id="billingEmail" name="billingEmail" placeholder="Advanced Fee Description Two" onChange={e => setAdvTxtTwo(e.target.value)} data-msg="Please enter billing email" />
                  </div>
                </div>

                <div className="p-1 text-end">
                  <button type="submit" className="btn btn-info me-1" onClick={homePricingSection}>
                    {
                      loading === true ?"loading...":"Save"
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

export default HomePricingSec