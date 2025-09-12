import { createContext, useContext, useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext()

export const Appcontextprovider = ({ children }) => {
  const [user, setuser] = useState(false)
  const [showLogin, setshowLogin] = useState(false)
  const [token, settoken] = useState(localStorage.getItem("token"))
  

  const [credit, setCredit] = useState(false)
  const backendUrl = import.meta.env.BACKEND_URL



  const storeToken = (token) => {
    settoken(token)
    return localStorage.setItem("token", token)
  }

  //for nav bar
  const islogin = !!token

  //logout user
  const logoutUser = () => {
    settoken("")
    return localStorage.removeItem("token")
  }




 const loadcredidtData= async()=>{
  try {
    const {data}= await axios.get( 'https://imagica-ai-backend.onrender.com/api/auth/user',
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log("getting it");
    
    if (data.user) {
      console.log(data.user , "we got it");
      
      setCredit(data.user)
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }finally{
    console.log("not able");
    
  }
 }

useEffect(()=>{
 if (token) {
   loadcredidtData()
 }
},[token])


//code for generating the image with api

const generateImage= async(prompt)=>{
  try {
  const {data}=  await axios.post('https://imagica-ai-backend.onrender.com/api/image/image-generate',{prompt},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (data.success) {
      return data.resultImage
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

  return <AppContext.Provider value={{
    user, setuser, showLogin, setshowLogin,  backendUrl, storeToken, logoutUser, token, settoken, credit, islogin
    , setCredit, generateImage, loadcredidtData
  }}>
    {children}
  </AppContext.Provider>
}

export const useData = () => {
  return useContext(AppContext)
}
