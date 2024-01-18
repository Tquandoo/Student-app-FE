import { FaQuestionCircle } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <FaQuestionCircle size={100} className="text-warning" />
            <h1>Page Not Found</h1>
            <p>Oop! We could not fin the page that you are looking for</p>
            <p>Please check the address and try again</p>
        </div>
    )
}