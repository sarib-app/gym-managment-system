import AboutUsTrainer from '../../../WebImages/AboutUsTrainers.JPG';
import AboutSec from '../../../WebImages/AboutSec.JPG';
import { EncryptStorage } from 'encrypt-storage';
import React,{useState,useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import {useLocation , Link} from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const AboutUsForm = () => {
  const location = useLocation();

  const aboutMainHeading = location.state.aboutUSHeading;
  const aboutUSPara = location.state.aboutUSPara;
  const aboutQualityPara = location.state.qualityPara;
  const trainOne = location.state.trainOne;
  const trainOneImg = location.state.trainOneImg;
  const trainTwo = location.state.trainTwo;
  const trainTwoImg = location.state.trainTwoImg;
  const trainThree = location.state.trainThree;
  const trainThreeImg = location.state.trainThreeImg;
  const trainFour = location.state.trainFour;
  const trainFourImg = location.state.trainFourImg;


  const [userID , setUserID] = useState('');
  const[loading , setLoading] = useState(false);

  /*About Us Section Hooks*/ 
  const[aboutHeading , setAboutHeading] = useState('');
  const[aboutPara , setAboutPara] = useState('');
  const[qualityPara , setQualityPara] = useState('');

  /*Trainer Section Hooks */
  
  const[trainerOne , setTrainerOne] = useState('');
  const[trainerImgOne, setTrainerImgOne] = useState(null);

  const[trainerImgOneDis, setTrainerImgOneDis] = useState('');

  const[trainerTwo , setTrainerTwo] = useState('');
  const[trainerImgTwo, setTrainerImgTwo] = useState(null);

  const[trainerImgTwoDis, setTrainerImgTwoDis] = useState('');

  
  const[trainerThree, setTrainerThree] = useState('');
  const[trainerImgThree, setTrainerImgThree] = useState(null);

  const[trainerImgThreeDis, setTrainerImgThreeDis] = useState('');
  
  const[trainerFour , setTrainerFour] = useState('');
  const[trainerImgFour, setTrainerImgFour] = useState(null);

  const[trainerImgFourDis, setTrainerImgFourDis] = useState('');



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



const trainerSection = ()=>{
  const formdata = new FormData();
  if(aboutHeading && aboutPara && qualityPara && trainerOne  && trainerTwo  && trainerThree  && trainerFour  ){
    setLoading(true)
    formdata.append("sec1_para", aboutHeading);
    formdata.append("about_us_para",aboutPara);
    formdata.append("our_quality_para",qualityPara);


  formdata.append("trainer1_name", trainerOne);
  
  trainerImgOne !==null &&
  formdata.append("trainer1_img",trainerImgOne);
  
  formdata.append("trainer2_name",trainerTwo);

  trainerImgTwo !==null &&
  formdata.append("trainer2_img", trainerImgTwo);
  
  formdata.append("trainer3_name",trainerThree);

  trainerImgThree !==null &&
  formdata.append("trainer3_img",trainerImgThree);
  
  formdata.append("trainer4_name",trainerFour);
  
  trainerImgFour !==null &&
  formdata.append("trainer4_img",trainerImgFour);
  
    axios.post(`${process.env.REACT_APP_BASE_URL}api/updateaboutus/${userID}`,formdata)
    .then((res)=>{
      setLoading(false)
      toast.info('About-Us Section Added')
    })
    .catch((err)=>{
      return err
    })
  }
  else{
    toast.warn('Incomplete Info')
    setInterval(() => {
      setLoading(false)
    }, 1000);
  }

}


const autoFillAboutUS = ()=>{


 setAboutHeading(aboutMainHeading)
 setAboutPara(aboutUSPara)
 setQualityPara(aboutQualityPara)

 setTrainerOne(trainOne)
 setTrainerImgOneDis(trainOneImg)

 setTrainerTwo(trainTwo)
 setTrainerImgTwoDis(trainTwoImg)

 setTrainerThree(trainThree)
 setTrainerImgThreeDis(trainThreeImg)

 setTrainerFour(trainFour)
 setTrainerImgFourDis(trainFourImg)
  
  
}

useEffect(() => {
  SetLocalLogin()
  autoFillAboutUS()
}, [])


  return (
    <>
<div className="app-content content">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
    <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">About-US &amp; trainer Section</h2>
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
      <div className="row">
        <div className="col-12">
          <img className="img-fluid p-1 ps-5" src={AboutSec} alt="" />
        <div className="card">
            <div className="card-header">
              <h4 className="card-title"><b>About Us Section</b> </h4>
            </div>
            <div className="card-body  py-50">
             
                <div className="row">
                  <div className="mb-1 col-md-12">
                    <label htmlFor="companyName" className="form-label"><b>Title</b> </label>
                    <input type="text" id="companyName" name="companyName" value={aboutHeading} className="form-control" placeholder="Enter Title" onChange={e => setAboutHeading(e.target.value)} data-msg="Please enter company name" />
                  </div>
                  <div className="mb-1 col-md-12">
                    <label htmlFor="billingEmail" className="form-label"> <b>About-Us Description</b></label>
                    <textarea className="form-control" type="text" id="billingEmail" value={aboutPara} name="billingEmail" placeholder="About Us description" onChange={e => setAboutPara(e.target.value)}data-msg="Please enter billing email" rows={5}/>
                  </div>
                  <div className="mb-1 col-md-12">
                    <label htmlFor="taxId" className="form-label"> <b>Our Quality Description</b> </label>
                    <textarea type="text" id="taxId" name="taxId" className="form-control" value={qualityPara} placeholder="Our Quality Description" onChange={e => setQualityPara(e.target.value)} rows={5}/>
                  </div>
                 
                </div>
                {/* <div className="p-1 text-end">
                  <button type="submit" className="btn btn-info me-1"
                  onClick={aboutUsSection}
                  >
                    {
                      loading === true?"loading...":"Save"
                    }
                  </button>
                </div> */}
            </div>
            
          </div>
        </div>
        <img  className="img-fluid p-1" src={AboutUsTrainer} alt="" />
        <div className="card">
            <div className="card-header">
              <h4 className="card-title"><b>Our Trainer Section</b> </h4>
            </div>
            <div className="card-body  py-50">
                <div className="row">

        
                <h4> <b>Trainer One</b> </h4>
                  <div className="mb-2 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Trainer Name</b> </label>
                    <input type="text" id="companyName" name="companyName" value={trainerOne} className="form-control" placeholder="Trainer Name" onChange={e => setTrainerOne(e.target.value)} data-msg="Please enter company name" />
                  </div>
                
                  <div className="mb-2 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Trainer Image</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID"  onChange={e => setTrainerImgOne(e.target.files[0])}  />
                  <span>{trainerImgOneDis}</span>
                  </div>

                  <h4> <b>Trainer Two</b> </h4>

                  <div className="mb-2 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Trainer Name</b> </label>
                    <input type="text" id="companyName" name="companyName" value={trainerTwo} className="form-control" placeholder="Trainer Name"  onChange={e => setTrainerTwo(e.target.value)} data-msg="Please enter company name" />
                  </div>
                
                  <div className="mb-1 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Trainer Image</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID"  onChange={e => setTrainerImgTwo(e.target.files[0])}  />
                  <span>{trainerImgTwoDis}</span>
                  </div>

                  <h4> <b>Trainer Three</b> </h4>
                  <div className="mb-2 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Trainer Name</b> </label>
                    <input type="text" id="companyName" name="companyName" value={trainerThree} className="form-control" placeholder="Trainer Name"  onChange={e => setTrainerThree(e.target.value)} data-msg="Please enter company name" />
                  </div>
                
                  <div className="mb-2 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Trainer Image</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID"   onChange={e => setTrainerImgThree(e.target.files[0])} />
                  <span>{trainerImgThreeDis}</span>
                  </div>

                  <h4> <b>Trainer Four</b> </h4>


                  <div className="mb-2 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Trainer Name</b> </label>
                    <input type="text" id="companyName" name="companyName" value={trainerFour} className="form-control" placeholder="Trainer Name"  onChange={e => setTrainerFour(e.target.value)} data-msg="Please enter company name" />
                  </div>
                
                  <div className="mb-2 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Trainer Image</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control"  onChange={e => setTrainerImgFour(e.target.files[0])} placeholder="Enter Tax ID"   />
                  <span>{trainerImgFourDis}</span>
                  </div>
                  </div>
                  </div>
                  <div className="p-1 text-end">
                  <button type="submit" className="btn btn-info me-1" onClick={trainerSection} >
                    {
                      loading === true?"loading..." : "Save"
                    }
                  </button>
                </div>
            </div>
      </div>
  </div>

  </div>
</div>
        
    </>
  )
}

export default AboutUsForm