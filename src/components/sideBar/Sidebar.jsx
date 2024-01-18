import { RiDashboardFill } from "react-icons/ri"
import { PiStudentFill } from "react-icons/pi"
import { Link, NavLink } from "react-router-dom"
const Sidebar = () => {

  return (
    <aside className="" style={{minWidth: "200px", height: "500px"}}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/dashboard" href="#"  className="nav-link d-flex align-items-center">
            <RiDashboardFill size={20} className="me-2 "/>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/student"href="#"  className="nav-link ">
            <PiStudentFill size={20} className="me-2 "/>
              Student
            </NavLink>
        </li>
      </ul>
    </aside>
  ) 
}
export default Sidebar