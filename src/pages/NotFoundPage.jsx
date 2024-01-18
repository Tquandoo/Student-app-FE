import { FaQuestionCircle, FaFastBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NotFound from "../components/exception/NotFound";
export default function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <div className="vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
            <NotFound />
            <button onClick={() => navigate(-1)} className="btn btn-outline-warning d-flex align-items-center">
                <FaFastBackward className="me-2" />
                Back to previous page
            </button>
        </div>
    )
}