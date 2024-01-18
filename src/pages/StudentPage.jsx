
import Student from "../components/student/StudentList"
import { FaPersonMilitaryToPerson, FaUserGear } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import MainLayout from "../layouts/MainLayout"
import { Link, Outlet, NavLink, useLocation, useParams } from "react-router-dom"
const StudentPage = () => {
  const { studentId } = useParams()
  const location = useLocation()
  const pathName = location.pathname.split('/').pop()
  const isActice = pathName === 'student' || pathName === 'list'

  return(
    <>
      <MainLayout>
        <ul className="nav nav-tabs mb-2">
          <li className="nav-item">
              <NavLink to={'/student/list'} className={`nav-link d-flex align-items-center ${isActice ? 'active' : ''}`}>
                  <FaPersonMilitaryToPerson className="me-2" />
                  Student List
              </NavLink>
          </li>
          <li className="nav-item">
              <NavLink to={'/student/add'} className="nav-link  d-flex align-items-center">
                  <IoMdPersonAdd className="me-2" />
                        Create Student
              </NavLink>
          </li>
          {
            studentId && (
                <li className="nav-item">
                  <NavLink to = {`${studentId}`} className="nav-link d-flex align-items-center">
                    <FaUserGear  className='me-2'/>
                    Student Details
                  </NavLink>
                </li>
            )
          }
        </ul>
        <Outlet />
      </MainLayout>
    </>
  )
}
export default StudentPage