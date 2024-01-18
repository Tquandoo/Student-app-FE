import { PiStudentBold, PiSignOutDuotone  } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate()
    
    const handleSigout = () => {
        navigate('/login', {replace: true})   
        document.cookie = 'student_app_token = null' 
    }
    return (
     <nav className="navbar navbar-expand-lg border-bottom container">
        <div className="container ">
            <Link to="/student" href="#" className="navbar-brand d-flex align-items-center">
                <PiStudentBold  size={25} className="me-2"/>
                Student APP
            </Link>
            <button onClick={handleSigout} className="btn btn-signout d-flex align-items-center">
                <PiSignOutDuotone size={18} className="me-2 "/>
                Sign out
            </button>
        </div>
     </nav>
    )
}
export default Header