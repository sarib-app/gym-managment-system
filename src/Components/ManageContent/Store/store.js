import create from "zustand";
import baseURL from '../../BaseUrl';
import axios from 'axios';

const useStore = create((set)=>({
    homeHeaderSection: ()=>{

        axios.post(`${baseURL}/api/homepage`)
        .then((res)=>{
            alert('Header Section Saved')
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}))