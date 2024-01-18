import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake, FaMobileAlt, FaBackward } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import NotFound from "../exception/NotFound";

export default function StudentDetail() {
    const { studentId } = useParams()
    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getStudentById() {
            let studentRes = await fetch(`${import.meta.env.VITE_API_URI}/student/${studentId}`, { method: "GET" })
            let data = await studentRes.json()
            setStudent(data)
            setLoading(false)
        }
        getStudentById()
    }, [studentId])

    return (
        <>
            {
                loading ? <Spinner /> : (
                    <>
                        <div className="d-flex align-items-center justify-content-center">
                            {
                                Object.keys(student).length !== 0 ? (
                                    <>
                                        <img className="avatar-lg me-4" src={student?.avatarUrl} alt="" />
                                        <div className="flex-grow-1 d-flex flex-column">
                                            <div className="border-dashed align-items-center py-2">
                                                <FaUser size={20} className="text-primary me-2" />
                                                <span>{student?.fullname}</span>
                                            </div>
                                            <div className="border-dashed d-flex align-items-center py-2">
                                                <MdEmail size={20} className="text-primary me-2" />
                                                <span>{student?.email}</span>
                                            </div>
                                            <div className="border-dashed align-items-center py-2">
                                                <FaBirthdayCake size={20} className="text-primary me-2" />
                                                <span>{dayjs(student?.dob).format('MMMM DD YYYY')}</span>
                                            </div>
                                            <div className="border-dashed align-items-center py-2">
                                                <BsGenderAmbiguous size={20} className="text-primary me-2" />
                                                <span>{student?.gender ? 'Male' : 'Famale'}</span>
                                            </div>
                                            <div className="border-dashed align-items-center py-2">
                                                <FaMobileAlt size={20} className="text-primary me-2" />
                                                <span>{student?.mobile}</span>
                                            </div>
                                            <div className="border-dashed align-items-center py-2">
                                                <FcDepartment size={20} className="text-primary me-2" />
                                                <span>{student?.department?.name}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <NotFound />
                                )
                           } 
                        </div>
                        <Link to={'/student/list'}>
                            <FaBackward className="me-2" />
                            Back to list
                        </Link>
                    </>
                )
            }
        </>
    )
}