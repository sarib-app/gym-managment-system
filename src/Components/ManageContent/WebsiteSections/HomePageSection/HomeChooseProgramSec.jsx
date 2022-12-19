import HomeChooseProgram from '../../../WebImages/HomeChooseProgram.JPG';
import {useLocation , Link} from 'react-router-dom';
import  "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react';
import {EncryptStorage} from 'encrypt-storage';
import { toast } from "react-toastify";
import axios from 'axios';

const HomeChooseProgramSec = () => {
  const location = useLocation();

  const headOne = location.state.headOne;
  const headTwo = location.state.headTwo;
  const headThree = location.state.headThree;
  const headfour = location.state.headfour;

  
  
  const paraOne = location.state.paraOne;
  const paraTwo = location.state.paraTwo;
  const paraThree = location.state.paraThree;
  const parafour = location.state.parafour;


  const imageOne = location.state.imageOne;
  const imageTwo = location.state.imageTwo;
  const imageThree = location.state.imageThree;
  const imagefour = location.state.imagefour;




    const[loading , setLoading] = useState(false);
    const [userID , setUserID] = useState('');
  

  const[progHeadOne , setProgHeadOne ] = useState('');
  const[progParaOne, setProgParaOne] = useState('');
  const[progImgOne, setProgImgOne] = useState(null);

  const[progImgOneDis, setProgImgOneDis] = useState('');

  const[progHeadTwo , setProgHeadTwo] = useState('');
  const[progParaTwo, setProgParaTwo] = useState('');
  const[progImgTwo , setProgImgTwo] = useState(null);

  const[progImgTwoDis, setProgImgTwoDis] = useState('');


  const[progHeadThree , setProgHeadThree] = useState('');
  const[progParaThree, setProgParaThree] = useState('');
  const[progImgThree , setProgImgThree] = useState(null);

  const[progImgThreeDis, setProgImgThreeDis] = useState('');



  const[progHeadFour , setProgHeadFour] = useState('');
  const[progParaFour, setProgParaFour] = useState('');
  const[progImgFour , setProgImgFour] = useState(null);

  const[progImgFourDis, setProgImgFourDis] = useState('');


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


    const homeChooseProgramSection = ()=>{
        setLoading(true)
      
      
        if(progHeadOne && progParaOne  && progHeadTwo && progParaTwo   && progHeadThree && progParaThree &&progHeadFour && progParaFour )
          {
            const formdata = new FormData();
        formdata.append("head_one", progHeadOne);
        formdata.append("para_one",progParaOne);

        progImgOne != null &&
        formdata.append("img_one", progImgOne );
      
        formdata.append("head_two", progHeadTwo);
        formdata.append("para_two",progParaTwo);
        
         progImgTwo != null &&
          formdata.append("img_two", progImgTwo)
        
      
        formdata.append("head_three", progHeadThree);
        formdata.append("para_three",progParaThree);

        progImgThree != null &&
        formdata.append("img_three", progImgThree);
      
        formdata.append("head_four", progHeadFour);
        formdata.append("para_four",progParaFour);
        
        progImgFour != null &&
        formdata.append("img_four", progImgFour);
      
        axios.post(`${process.env.REACT_APP_BASE_URL}api/updateprogram/${userID}`,formdata)
        .then((res)=>{
          setLoading(false)
          toast.info('Program Section Added')
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

      const autoFillChooseProgramSec = ()=>{
        
        setProgHeadOne(headOne)
        setProgParaOne(paraOne)
        setProgImgOneDis(imageOne)
        
        setProgHeadTwo(headTwo)
        setProgParaTwo(paraTwo)
        setProgImgTwoDis(imageTwo)

        setProgHeadThree(headThree)
        setProgParaThree(paraThree)
        setProgImgThreeDis(imageThree)

        setProgHeadFour(headfour)
        setProgParaFour(parafour)
        setProgImgFourDis(imagefour)
      }
      useEffect(() => {
        SetLocalLogin();  
        autoFillChooseProgramSec();
      }, [])
  return (
    <>
      <div className="app-content content">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Choose Program Section </h2>
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
          <img src={HomeChooseProgram} className="img-fluid" alt="" />
        <div className="card">
            <div className="card-header">
              <h4 className="card-title"><b>Choose your program section</b> </h4>
            </div>
            <div className="card-body  py-50">
                <div className="row">
                    <h4> <b>Section One</b> </h4>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Heading One</b> </label>
                    <input type="text" id="companyName" name="companyName" value={progHeadOne}  className="form-control"placeholder="Heading One" onChange={e => setProgHeadOne(e.target.value)} data-msg="Please enter company name" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b>Description One</b></label>
                    <input className="form-control" type="text" id="billingEmail" value={progParaOne} name="billingEmail" placeholder="Description One"  onChange={e => setProgParaOne(e.target.value)} data-msg="Please enter billing email" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Image One</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID"   onChange={e => setProgImgOne(e.target.files[0])}/>
                  <span>{progImgOneDis}</span>
                  </div>
                 
                </div>

                <div className="row">
                <h4 className="mt-1"> <b>Section Two</b> </h4>

                  <div className="mb-1 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Heading Two</b> </label>
                    <input type="text" id="companyName" name="companyName" value={progHeadTwo} className="form-control" placeholder="Heading Two"  onChange={e => setProgHeadTwo(e.target.value)} data-msg="Please enter company name" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b>Description Two</b></label>
                    <input className="form-control" type="text" id="billingEmail" value={progParaTwo} name="billingEmail" placeholder="Description Two"  onChange={e => setProgParaTwo(e.target.value)} data-msg="Please enter billing email" />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Image Two</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID"  onChange={e => setProgImgTwo(e.target.files[0])}/>
                  <span>{progImgTwoDis}</span>
                  </div>
                 
                </div>

                
                <div className="row">
                <h4 className="mt-1"> <b>Section Three</b> </h4>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Heading Three</b> </label>
                    <input type="text" id="companyName" name="companyName" value={progHeadThree} className="form-control" placeholder="Heading Three" data-msg="Please enter company name" onChange={e => setProgHeadThree(e.target.value)} />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b>Description Three</b></label>
                    <input className="form-control" type="text" id="billingEmail" value={progParaThree} name="billingEmail" placeholder="Description Three" data-msg="Please enter billing email"onChange={e => setProgParaThree(e.target.value)} />
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Image Three</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID" onChange={e => setProgImgThree(e.target.files[0])}/>
                  <span>{progImgThreeDis}</span>
                  </div>
                 
                </div>

                <div className="row">
                <h4 className="mt-1"> <b>Section Four</b> </h4>

                  <div className="mb-1 col-md-6">
                    <label htmlFor="companyName" className="form-label"><b>Heading Four</b> </label>
                    <input type="text" id="companyName" value={progHeadFour} name="companyName" className="form-control" placeholder="Heading Four" data-msg="Please enter company name" onChange={e => setProgHeadFour(e.target.value)}/>
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="billingEmail" className="form-label"> <b>Description Four</b></label>
                    <input className="form-control" value={progParaFour} type="text" id="billingEmail" name="billingEmail" placeholder="Description Four" data-msg="Please enter billing email" onChange={e => setProgParaFour(e.target.value)}/>
                  </div>
                  <div className="mb-1 col-md-6">
                    <label htmlFor="taxId" className="form-label"> <b>Image Four</b> </label>
                    <input type="file" id="taxId" name="taxId"  className="form-control" placeholder="Enter Tax ID" onChange={e => setProgImgFour(e.target.files[0])} />
                  <span>{progImgFourDis}</span>
                  </div>
                 
                </div>
                <div className="p-1 text-end">
                  <button type="submit" className="btn btn-info me-1" onClick={homeChooseProgramSection}>
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
    </div>
    </div>

    </>
  )
}

export default HomeChooseProgramSec