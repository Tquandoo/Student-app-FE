import {useState, useEffect} from 'react'
import dayjs from 'dayjs'
import { IoIosMale } from "react-icons/io";
import { IoIosFemale } from "react-icons/io";
import { FaUserTimes, FaUserCog, FaSearch} from "react-icons/fa";
import { toast} from 'react-toastify'
import Swal from 'sweetalert2'
import { Link } from "react-router-dom"
import ModifyStudentModal from './ModifyStudentModal';
import Spinner from '../spinner/Spinner';
const Student = () => {
  const [studentList, setStudentList] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [studentId, setStudentId] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [keyword, setKeyword] = useState(null)
  const [filters, setFilters] = useState({
    searchText: '',
    sort: 'fullname',
    order: 'asc',
    page: 1,
    limit: 10,
    direction: 'next'
  })
  useEffect(() => {
    setLoading(true)
    getAllStudent()
  }, [selectedStudent, studentId, filters])
  const getAllStudent =  async () => {
      let studentListRes = await fetch(`${import.meta.env.VITE_API_URI}/student?_page=${filters?.page}&_limit=${filters?.limit}&_sort=${filters.sort}&_order=${filters.order}&fullname_like=${filters.searchText}`)
      let data = await studentListRes.json()
      setStudentList(data)
      setLoading(false)
  }
  useEffect(() => {
    async function getTotalRows() {
        let totalRowsRes = await fetch(`${import.meta.env.VITE_API_URI}/student?fullname_like=${filters.searchText}`)
        let data = await totalRowsRes.json();
        let totalPages = Math.ceil(Number(data.length) / Number(filters.limit))
        setTotalPages(totalPages);
    }
    getTotalRows()
  }, [filters.limit, filters.searchText])
  const handleRemoveStudent = (student) => {
    Swal.fire({
      title: "Are you sure to remove this student?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then( async ( result ) => {
      if(result.isConfirmed){
      let removeStudentRes = await  fetch(`https://6596b23a6bb4ec36ca0329d0.mockapi.io/student/${student.id}`, {
            method: 'DELETE'
        }) 
        let removedStudentRes = await removeStudentRes.json()
        if(removedStudentRes){
          toast.success('Student removed succed')
          setSelectedStudent(removeStudentRes)
        }
      }
    })
  }

  const handleModifyStudent = (student) => {
    setShowModal(true)
    setStudentId(student?.id)
  }

  const handleNextPage = () => {
    setFilters({
      ...filters,
      page: Number(filters.page) + 1,
      direction: 'next'
    })
    console.log(filters);
  }
  const handlePreviousPage = () => {
    if(Number(filters.page) >1){
      setFilters({
        ...filters,
        page: Number(filters.page) - 1,
        direction: 'prev'
      })
    }
  }
  const handleChangePageSize = (e) => {
    setFilters({
      ...filters,
      limit: Number(e.target.value)
    })
  }

  const handleChangeField = (e) => {
    setFilters({
      ...filters,
      sort: e.target.value
    })
  }
  const handleChangeSort =(e) => {
    setFilters({
      ...filters,
      order: e.target.value
    })
  }
  const handleSearch = (e) => {
    e.preventDefault()
    setFilters({
        ...filters,
        searchText: keyword
    })
}
  return (
   <>
   <div className="d-flex align-items-center justify-content-between my-2">
                <form onSubmit={handleSearch} className="d-flex align-items-center w-50">
                    <input type="text"
                        className="form-control form-control-sm"
                        placeholder="search..."
                        onInput={(e) => setKeyword(e.target.value)}
                    />
                    <FaSearch size={20} className="text-secondary" style={{ marginLeft: '-23px' }} />
                </form>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center me-2">
                        <span className="me-2">Field</span>
                        <select 
                          className="form-select form-select-sm"
                          defaultValue={'fullname'}
                          onChange={handleChangeField}
                          >
                            <option value="fullname">Fullname</option>
                            <option value="email">Email</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">Sort</span>
                        <select 
                          className="form-select form-select-sm"
                          defaultValue={'asc'}
                          onChange={handleChangeSort}
                          >
                            <option value="asc">Ascendent</option>
                            <option value="desc">Descendent</option>
                        </select>
                    </div>
                </div>
            </div>
            {loading ? <Spinner /> : (
              <table className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
              <thead className="table-secondary">
                <tr>
                    <th className="text-center">#ID</th>
                    <th className="text-center">Fullname</th>
                    <th className="text-center">Date of birth</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Mobile</th>
                    <th className="text-center">Department</th>
                    <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                    studentList?.map(student => (
                      <tr key={student.id}> 
                        <td>{student.id}</td>
                        <td className='d-flex align-items-center'>
                          <div>
                            <img className='avatar-sm me-2' src={student.avatarUrl} alt="avatar" />
                          </div>
                          <div className='d-flex flex-column '>
                            <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                            {Boolean(student.gender) ? <IoIosMale  className="text-primary" /> : <IoIosFemale className="text-warning"/>}
                          </div>
                        </td>
                        <td className="text-end align-middle">{dayjs(student.dob).format('MMM DD YYYY')}</td>
                        <td className="text-end align-middle">{student.email}</td>
                        <td className="text-end align-middle">{student.mobile}</td>
                        <td className="text-end align-middle">{student.department.name}</td>
                        <td >
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <FaUserTimes role='button' 
                                  title='Remove student'
                                  className='text-danger'
                                  size='20'
                                  onClick={() => handleRemoveStudent(student)}
                                />
                                <FaUserCog role='button' 
                                    title='modify detail'
                                    className='text-success'
                                    size='20'
                                    onClick={() => handleModifyStudent(student)}
                                />
                            </div>
                        </td>
                      </tr>
                    ))
                  }
              </tbody>
            </table>
          )
          }
          <div className="d-flex align-items-center justify-content-between">
                <ul className="pagination">
                <li className={`page-item ${Number(filters.page) <= 1 ? 'disabled' : filters.direction === 'prev' ? 'active' : ''}`} >
                        <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                    </li>
                    <li className="page-item">
                    <button className={`page-link ${Number(filters.page) >= totalPages ? 'disabled' : filters.direction === 'next' ? 'active' : ''}`} onClick={handleNextPage}>Next</button>
                    </li>
                </ul>
                <div className="d-flex align-items-center">
                    <span style={{width: '150px'}}>Items per page</span>
                    <select 
                      className="form-select form-select-sm" 
                      style={{width: '60px'}}
                      defaultValue={10}
                      onChange= { handleChangePageSize}
                      >
                        <option value={10}>10</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
          <ModifyStudentModal 
              show= { showModal } 
              handleClose= {() => setShowModal(false) }
              studentId = { studentId }
              setStudentId={ setStudentId }
            />
      </>
    )
}
export default Student