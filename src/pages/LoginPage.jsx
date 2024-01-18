import AccountLayout from "../layouts/AccountLayout"
import { FaUserShield } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { toast} from 'react-toastify'
import { useState } from "react";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
})

const LoginPage = () => {

  const {register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const handleLogin = async (values) => {
    try {
        setLoading(true)
        let loginRes = await fetch('https://reqres.in/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        let data = await loginRes.json()
        if (data?.token) {
            let date = new Date()
            // let expires = date.setDate(date.getDate() + 1)
            let expires = date.setDate(date.getDate() + 1);
            // console.log(`student_app_token=${data?.token}; expires=${(new Date(expires)).toUTCString()}`);
            document.cookie = `student_app_token=${data?.token}; expires=${(new Date(expires)).toUTCString()}`
            navigate('/student', { replace: true })
        }

        if (data?.error) {
            toast.error('User not found')
        }
        setLoading(false)
    } catch (error) {

    }
}
  return(
        <AccountLayout>
          {loading ? <Spinner /> : null}
          <div className="login-page d-flex flex-column justify-content-center align-items-center">
              <h6 className="mb-4">
                <FaUserShield className="me-2" size={40} />
                Student App
              </h6>
              <form onSubmit={handleSubmit(handleLogin)} className="w-100">
                <div className="d-flex form-group flex-column mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email"
                    className={`${errors.email?.message ? 'is-invalid' : ''} form-control`}
                    {...register('email')}
                  />
                  <span className="invalid-feedback">{errors?.email?.message}</span>
                </div>
                <div className="d-flex flex-column mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password"
                    className={`${errors?.password?.message ? 'is-invalid' : ''} form-control`}
                    {...register('password')}
                  />
                  <span className="invalid-feedback">{errors?.password?.message}</span>
                </div>
               <div className="form-group mb-3 d-flex">
                  <input type="submit" className="btn btn-primary flex-grow-1" />
               </div>
                <div className="form-group mb-4 d-flex justify-content-center">
                    <Link to={'/'}>Forgot Password</Link>
                  </div>
              </form>
          </div>
        </AccountLayout>
  )
}
export default LoginPage