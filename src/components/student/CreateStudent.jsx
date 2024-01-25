import { useEffect, useState } from "react"
import { FaTimes, FaUserPlus } from "react-icons/fa";
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import DepartmentService from "../../services/department-services";
import StudentService from "../../services/student-services";

const schema = yup.object({
  fullname: yup.string().required(),
  dob: yup.date().required().typeError('dob is a required field'),
  mobile: yup.string().required(),
  gender: yup.bool().required(),
  email: yup.string().email().required(),
  department: yup.string().required(),
  avatarUrl: yup.string().url().required()
})
const CreateStudent = () => {
  const [departmentList, setDepartmentList] = useState([])
  const [isCreating, setIsCreating] = useState(false)

  useEffect (() => {
    async function getDepartmentList() {
    //   let departmentListRes = await fetch(`${import.meta.env.VITE_API_URI}/department`)
    //   let data = await departmentListRes.json()
    //   setDepartmentList(data)

    let departmentListRes = await DepartmentService.getDepartmentList()
    setDepartmentList(departmentList)
    }
    getDepartmentList()
  },[])

  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const handleCreateStudent = async (values) => {
    values = {
      ...values,
      department: values.department && JSON.parse(values.department)
    }
    try{
      setIsCreating(true)
      let result = await StudentService.createStudent(values)
      if (result) {
          reset()
          toast.success('Student created succeed', { theme: 'light' })
    }
      setIsCreating(false)
    } catch (error) {
      toast.error('Something went wrong, please contact administrator')
    }
  }
  return (
    <>
    <div>Create Student</div>
    <form onSubmit={handleSubmit(handleCreateStudent)} className="border rounded p-2">
            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="form-group mb-2">
                        <label className="form-label">Fullname</label>
                        <input
                            type="text"
                            className={`${errors.fullname?.message ? 'is-invalid' : ''} form-control`}
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
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className={`${errors.gender?.message ? 'is-invalid' : ''} form-check-input`}
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
                                        />
                                        <label className="form-check-label">Female</label>
                                    </div>
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
                <div className="col-md-6 col-lg-6 col-sm-12">
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
                            className={`${errors.department?.message ? 'is-invalid' : ''} form-select`}
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
                            className={`${errors.avatarUrl?.message ? 'is-invalid' : ''} form-control`}
                            placeholder="Avatar URL..."
                            {...register('avatarUrl')}
                        />
                        <span className="invalid-feedback">{errors.avatarUrl?.message}</span>
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label"></label>
                        <div className="d-flex">
                            {
                                isCreating ? (
                                    <button className="btn btn-success btn-sm d-flex align-items-center justify-content-center flex-grow-1 me-2" disabled>
                                        <FaUserPlus className="me-2" />
                                        Creating
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-success btn-sm d-flex align-items-center justify-content-center flex-grow-1 me-2">
                                        <FaUserPlus className="me-2" />
                                        Create
                                    </button>
                                )
                            }
                            <button type="button" className="btn btn-dark btn-sm d-flex align-items-center justify-content-center flex-grow-1"
                                onClick={() => reset()}
                            >
                                <FaTimes className="me-2" />
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
  )
}
export default CreateStudent