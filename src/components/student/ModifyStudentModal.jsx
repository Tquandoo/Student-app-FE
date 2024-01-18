import { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import * as yup from 'yup'
import { FaSave } from "react-icons/fa";
import {toast} from 'react-toastify'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

  const schema = yup.object({
    fullname: yup.string().required(),
    dob: yup.date().required().typeError('dob is a required field'),
    mobile: yup.string().required(),
    gender: yup.bool().required(),
    email: yup.string().email().required(),
    department: yup.string().required(),
    avatarUrl: yup.string().url().required()
  })

const ModifyStudentModal = ({ show, handleClose, studentId, setStudentId}) => {
  const [currentStudent, setCurrentStudent] = useState({})
  const [departmentList, setDepartmentList] = useState([])
  const [loading, setLoading] = useState(false)
  const [newAvatarUrl, setNewAvatarUrl] = useState(null)

  useEffect(() => {
    setLoading(true)
    getStudentById()
  },[studentId])

  useEffect (() => {
    async function getDepartmentList() {
      let departmentListRes = await fetch('https://6596b23a6bb4ec36ca0329d0.mockapi.io/department')
      let data = await departmentListRes.json()
      setDepartmentList(data)
    }
    getDepartmentList()
  },[])
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const getStudentById = async () => {
    // Kiểm tra xem studentId có tồn tại không
    if (studentId) {
      try {
        let studentRes = await fetch(`https://6596b23a6bb4ec36ca0329d0.mockapi.io/student/${studentId}`, {
          method: "GET"
        });
        let data = await studentRes.json();
        setValue('fullname', data?.fullname);
        setValue('mobile', data?.mobile);
        setValue('dob', dayjs(data?.dob).format('YYYY-DD-MMM'));
        setValue('email', data?.email);
        setValue('department', JSON.stringify(data?.department));
        setValue('avatarUrl', data?.avatarUrl);
        setValue('gender', Boolean(data?.gender));
        setCurrentStudent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    }
  }
  
  const handleCloseModal = ()  => {
    handleClose()
    setNewAvatarUrl(null)
  }

  const handleModifyStudent = async (values) => {
    values = {
      ...values,
      department: JSON.parse(values.department)
    }
    try{
        let modifyStudentRes =  await fetch(`https://6596b23a6bb4ec36ca0329d0.mockapi.io/student/${studentId}` ,{ 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        let result = await modifyStudentRes.json()
        console.log('result', result);
        if(Object.keys(result).length){
              toast.success('Student updated succeed')
              handleClose(false)
              setNewAvatarUrl(null)
              setStudentId(null)
        }
    }catch(e){
      toast.error('Can not update student')
    }
  }
  return(
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size='xl'
    >
      <Modal.Header closeButton>
        <Modal.Title>{currentStudent?.fullname} info </Modal.Title>
      </Modal.Header>
     <form onSubmit={handleSubmit(handleModifyStudent)}>
        <Modal.Body>
          {
            loading ? <p>loading...</p> : (

              <div className="row">
              <div className="col-md-6 col-lg-5 col-sm-12">
                  <div className="form-group mb-2">
                      <label className="form-label">Fullname</label>
                      <input
                          type="text"
                          className={` form-control`}
                          placeholder="Fullname..."
                          {...register('fullname')}
                      />
                      <span className="invalid-feedback">{errors.fullname?.message}</span>
                  </div>
                  <div className="form-group mb-2">
                      <div className="row">
                          <div className="col-md-6">
                              <label className="form-label">Date of birth</label>
                              <input
                                  type="date"
                                  className={`${errors.dob?.message ? 'is-invalid' : ''} form-control`}
                                  {...register('dob')}
                              />
                              <span className="invalid-feedback">{errors.dob?.message}</span>
                          </div>
                          <div className="col-md-6">
                              <label className="form-label">Gender</label>
                              <div>
                                 {
                                    currentStudent?.gender ? (
                                      <>
                                        <div className="form-check form-check-inline">
                                          <input
                                              type="radio"
                                              className={` form-check-input`}
                                              value={true}
                                              {...register('gender')}
                                              checked
                                          />
                                          <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                          <input
                                              type="radio"
                                              className={`${errors.gender?.message ? 'is-invalid' : ''} form-check-input`}
                                              value={false}
                                              {...register('gender')}
                                          />
                                          <label className="form-check-label">Female</label>
                                        </div>
                                      </>
                                    )
                                    : (
                                      <>
                                      <div className="form-check form-check-inline">
                                      <input
                                          type="radio"
                                          className={` form-check-input`}
                                          value={true}
                                          {...register('gender')}
                                      />
                                      <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                          type="radio"
                                          className={`${errors.gender?.message ? 'is-invalid' : ''} form-check-input`}
                                          value={false}
                                          {...register('gender')}
                                          checked
                                      />
                                      <label className="form-check-label">Female</label>
                                    </div>
                                    </>
                                    )
                                 }
                              </div>
                          </div>
                      </div>
                      </div>
                      <div className="form-group mb-2">
                          <label className="form-label">Mobile</label>
                          <input
                              type="tel"
                              className={`${errors.mobile?.message ? 'is-invalid' : ''} form-control`}
                              placeholder="Fullname..."
                              {...register('mobile')}
                          />
                          <span className="invalid-feedback">{errors.mobile?.message}</span>
                      </div>
                  </div>
                  <div className="col-md-4 col-lg-4 col-sm-12">
                      <div className="form-group mb-2">
                          <label className="form-label">Email</label>
                          <input
                              type="email"
                              className={`${errors.email?.message ? 'is-invalid' : ''} form-control`}
                              placeholder="Email..."
                              {...register('email')}
                          />
                          <span className="invalid-feedback">{errors.email?.message}</span>
                      </div>
                      <div className="form-group mb-2">
                          <label className="form-label">Department</label>
                          <select
                              className={`form-select`}
                              defaultValue={''}
                              {...register('department')}
                          >
                              <option value={''} disabled>Please select a department</option>
                              {
                                  departmentList?.map((depart) => (
                                      <option value={JSON.stringify(depart)} key={depart.id}>{depart.name}</option>
                                  ))
                              }
                          </select>
                          <span className="invalid-feedback">{errors.department?.message}</span>
                      </div>
                      <div className="form-group mb-2">
                          <label className="form-label">Avatar URL</label>
                          <input
                              type="url"
                              className={`form-control`}
                              placeholder="Avatar URL..."
                              {...register('avatarUrl')}
                              onChange={(e) =>setNewAvatarUrl(e.target.value)}
                          />
                          <span className="invalid-feedback">{errors.avatarUrl?.message}</span>
                      </div>
                  </div>
                  <div className='col-md-2 col-lg-3 col-sm-12'>
                      <img  className='w-100 rounded' src={newAvatarUrl || currentStudent?.avatarUrl} alt="" />
                  </div>
            </div>
            )
          }
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='btn btn-dark align-items-center' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary"  className='btn btn-piramry align-items-center'type='submit'>
            <FaSave className='me-2'/>
            Save
          </Button>
        </Modal.Footer>
     </form>
  </Modal> 
  )
}
export default ModifyStudentModal