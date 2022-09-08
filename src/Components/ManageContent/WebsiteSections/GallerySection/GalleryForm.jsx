import { EncryptStorage } from 'encrypt-storage';
import GallerySection from '../../../WebImages/GallerySection.JPG'
import "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react';
import {useLocation,Link} from 'react-router-dom';
import baseURL from '../../../BaseUrl.js';
import { toast } from "react-toastify";
import axios from 'axios';

const GalleryForm = () => {
  const location = useLocation();
  const imgOne = location.state.imageOne;
  const imgTwo = location.state.imageTwo;
  const imgThree = location.state.imageThree;

  const imgFour = location.state.imageFour;
  const imgFive = location.state.imageFive;
  const imgSix = location.state.imageSix;

  const imgSeven = location.state.imageSeven;
  const imgEight = location.state.imageEight;
  const imgNine = location.state.imageNine;

  const facebook = location.state.fbLink;
  const instagram = location.state.intaLink;
  const Youtube = location.state.youtubeLink;

  
    const[loading , setLoading] = useState('');
    const[userID , setUserID] = useState('');

    const[galleryImgOne , setGalleryImgOne] = useState(null);
    const[galleryImgOneDis, setGalleryImgOneDis] = useState('');

    const[galleryImgTwo , setGalleryImgTwo] = useState(null);
    const[galleryImgTwoDis , setGalleryImgTwoDis] = useState('');

    const[galleryImgThree , setGalleryImgThree] = useState(null);
    const[galleryImgThreeDis , setGalleryImgThreeDis] = useState('');


    const[galleryImgFour , setGalleryImgFour] = useState(null);
    const[galleryImgFourDis , setGalleryImgFourDis] = useState('');

    const[galleryImgFive , setGalleryImgFive] = useState(null);
    const[galleryImgFiveDis , setGalleryImgFiveDis] = useState('');

    const[galleryImgSix , setGalleryImgSix ] = useState(null);
    const[galleryImgSixDis , setGalleryImgSixDis ] = useState('');


    const[galleryImgSeven , setGalleryImgSeven] = useState(null);
    const[galleryImgSevenDis , setGalleryImgSevenDis] = useState('');

    const[galleryImgEight , setGalleryImgEight] = useState(null);
    const[galleryImgEightDis , setGalleryImgEightDis] = useState('');

    const[galleryImgNine, setGalleryImgNine] = useState(null);
    const[galleryImgNineDis, setGalleryImgNineDis] = useState('');

    const[fbLink , setFbLink] = useState('');
    const[instaLink , setInstaLink] = useState('');
    const[youtubeLink , setYoutubeLink] = useState('');



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


    const galleryImagesSection = ()=>{
      if(fbLink && instaLink && youtubeLink)
      {
        setLoading(true)
        const formdata = new FormData();

        galleryImgOne !== null &&
          formdata.append("img_1",galleryImgOne);

          galleryImgTwo !== null &&
          formdata.append("img_2",galleryImgTwo );

          galleryImgThree !== null &&
          formdata.append("img_3", galleryImgThree);

          galleryImgFour !== null &&
          formdata.append("img_4",galleryImgFour );

          galleryImgFive !== null &&
          formdata.append("img_5",galleryImgFive );

          galleryImgSix !== null &&
          formdata.append("img_6",galleryImgSix);

          galleryImgSeven !== null &&
          formdata.append("img_7",galleryImgSeven );

          galleryImgEight !== null &&
          formdata.append("img_8",galleryImgEight );

          galleryImgEight !== null &&
          formdata.append("img_9",galleryImgNine );

          formdata.append("link_one",fbLink );
          formdata.append("link_two",instaLink );
          formdata.append("link_three",youtubeLink );





axios.post(`${baseURL}api/updateimages/${userID}`,formdata)
.then(res =>{
        setLoading(false)
        toast.info('Gallery Section Updated')
        console.log(res)
        
    })
    .catch((err)=>{
        console.log(err)
    })
    }
    else{
      toast.warn('Incomplete Info')
      setInterval(() => {
        setLoading(false)
      }, 1000);
    }

}
  
    const autoFillGalleryData = ()=>{

     setGalleryImgOneDis(imgOne)
     setGalleryImgTwoDis(imgTwo)
      setGalleryImgThreeDis(imgThree)
     setGalleryImgFourDis(imgFour)
     setGalleryImgFiveDis(imgFive)
     setGalleryImgSixDis(imgSix)
      setGalleryImgSevenDis(imgSeven)
      setGalleryImgEightDis(imgEight)
     setGalleryImgNineDis(imgNine)     
    setFbLink(facebook)
    setInstaLink(instagram)
    setYoutubeLink(Youtube)
    }
    useEffect(() => {
      SetLocalLogin()
      autoFillGalleryData()
      }, [])
    
  return (
    <>
    <div className="app-content content">
  <div className="content-wrapper container-xxl p-0">
  <div className="content-header row">
    <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Gallery Section&amp; Social Links</h2>
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
          <img src={GallerySection} className="img-fluid ps-5 p-1" alt="" />
        <div className="card">
            <div className="card-header">
              <h4 className="card-title"><b>Gallery Section</b> </h4>
            </div>
            <div className="card-body  py-50">
                <div className="row"> 
                
               <div className="mb-2 col-md-4">
                 <label htmlFor="taxId" className="form-label"> <b>Gallery Image One</b> </label>
                 <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID"  onChange={e => setGalleryImgOne(e.target.files[0])}  />
               <span>{galleryImgOneDis}</span>
               </div>

           <div className="mb-1 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Gallery Image Two</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID"  onChange={e => setGalleryImgTwo(e.target.files[0])}  />
                    <span>{galleryImgTwoDis}</span>

                  </div>

                  <div className="mb-2 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Gallery Image Three</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control" placeholder="Enter Tax ID"   onChange={e => setGalleryImgThree(e.target.files[0])} />
                    <span>{galleryImgThreeDis}</span>
                  </div>

                </div>

                  <div className="row">

                  <div className="mb-2 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Gallery Image Four</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control"  onChange={e => setGalleryImgFour(e.target.files[0])} placeholder="Enter Tax ID"   />
                    <span>{galleryImgFourDis}</span>
                  </div>

                  <div className="mb-2 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Gallery Image Five</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control"  onChange={e => setGalleryImgFive(e.target.files[0])} placeholder="Enter Tax ID"   />
                    <span>{galleryImgFiveDis}</span>
                  </div> 


                  <div className="mb-2 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Gallery Image Six</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control"  onChange={e => setGalleryImgSix(e.target.files[0])} placeholder="Enter Tax ID"   />
                    <span>{galleryImgSixDis}</span>
                  </div> 

                    </div>

                <div className="row">
                  <div className="mb-2 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Gallery Image Seven</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control"  onChange={e => setGalleryImgSeven(e.target.files[0])} placeholder="Enter Tax ID"   />
                    <span>{galleryImgSevenDis}</span>
                  </div> 


                  <div className="mb-2 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Gallery Image Eight</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control"  onChange={e => setGalleryImgEight(e.target.files[0])} placeholder="Enter Tax ID"   />
                    <span>{galleryImgEightDis}</span>
                  </div> 

                  <div className="mb-2 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Gallery Image Nine</b> </label>
                    <input type="file" id="taxId" name="taxId" className="form-control"  onChange={e => setGalleryImgNine(e.target.files[0])} placeholder="Enter Tax ID"   />
                    <span>{galleryImgNineDis}</span>
                  </div>
                </div>
                  
                </div>
                
            </div>
              {/*card-ends  */}

              <div className="card">
                <div className="card-header">
                <h4 className="card-title"><b>Add Social Media</b> </h4>
                </div>
                <div className="card-body py-50">
                  <div className="row">

                  <div className="mb-2 col-md-4">
                 <label htmlFor="taxId" className="form-label"> <b>Add facebook link</b> </label>
                 <input type="text" id="taxId" name="taxId" className="form-control" placeholder="Enter facebook link" value={fbLink} onChange={e => setFbLink(e.target.value)}  />
               </div>

           <div className="mb-1 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Add Instagram link</b> </label>
                    <input type="text" id="taxId" name="taxId" className="form-control" placeholder="Enter Instagram link" value={instaLink}  onChange={e => setInstaLink(e.target.value)}  />

                  </div>

                  <div className="mb-1 col-md-4">
                    <label htmlFor="taxId" className="form-label"> <b>Add Youtube link</b> </label>
                    <input type="text" id="taxId" name="taxId" className="form-control" placeholder="Enter Youtube" value={youtubeLink}  onChange={e => setYoutubeLink(e.target.value)}  />

                  </div>
                  </div>
                </div>
                <div className="p-1 text-end">
                  <button type="submit" className="btn btn-info me-1" onClick={galleryImagesSection}>
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

    </>
  )
}

export default GalleryForm