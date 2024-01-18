import Header from "../components/header/Header"
import Sidebar from "../components/sideBar/Sidebar"
import Footer from "../components/footer/Footer"
import Student from "../components/student/StudentList"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const MainLayout = ({children}) => {
  const navigate = useNavigate()
  // console.log(document.cookie);
  // const getToken = () => {
    
  // }
  let cookies = document.cookie
  console.log('cookies', document.cookie)
  let cookieArr = cookies.split(";")

  const cookieObj = {};
  cookieArr.forEach(cookie => {
    const [key, value] = cookie.trim().split("=");
    cookieObj[key] = value;
  });
  
  // console.log( cookieObj )
  useEffect(() => {
        if(!cookieObj || !cookieObj?.student_app_token){
          navigate('/not-permission')
        }
  },[cookieObj])
  return (
    <>
        <Header />
        <div className="container d-flex">
          <Sidebar />
          <main className=" flex-grow-1 ">
            {children} 
          </main>
        </div>
        <Footer /> 
    </>
  )
}
export default MainLayout