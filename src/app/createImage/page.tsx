'use client'
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const CreateScreen = dynamic(() => import("../components/CreateScreen"), {
  ssr: false,
});
const page = () => {
  const router = useRouter()
  useEffect(()=>{
    (async()=>{
      const authed = await axios.get('http://localhost:3000/api/user/auth',{withCredentials:true})
      if(authed.data.login===false){
        router.push('/login?back=createImage')
      }
    })();
  },[])
  
  return (
  <>
  <CreateScreen />
  </>
  
  )
}
export default page;
