import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {

  const url = "http://localhost:8080/signup"
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword:""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "password must not be less than 6 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null],"Password must match").required("Confirm your password")
    }),

    onSubmit:(values)=>{
      console.log(values);
      axios.post(url, values)
      .then((response)=>{
        console.log(response.data);
        if(response.status === 201){
          navigate("/signin")
        }
      })
    }
    
  })
  // console.log(formik.errors);





  return (
    <>
    <form action="" onSubmit={formik.handleSubmit} className="min-h-screen bg-surface-2 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-contrast" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-text">TaskMint</span>
          </div>
          <h1 className="text-3xl font-extrabold text-text">Create Account</h1>
          <p className="text-muted mt-2">Let us help you manage your tasks today</p>
        </div>

        {/* Signup Card */}
        <div className="card overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    autoComplete="name"
                    className="block w-full pl-10 pr-3 py-3 border border-default rounded-lg bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition duration-200"
                    placeholder="Username"
                  />
                  {
                    formik.touched.username?<span className='text-red-700 font-bold'>{formik.errors.username}</span>:null
                  }
                  
                </div>
              </div>

              {/* Email Input */}
              <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    autoComplete="email"
          className="block w-full pl-10 pr-3 py-3 border border-default rounded-lg bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition duration-200"
                    placeholder="you@example.com"
                  />
                  {
                    formik.touched.email?<span className='text-red-700 font-bold'>{formik.errors.email}</span>:null
                  }
                  
                </div>
              </div>

              {/* Password Input */}
              <div>
        <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    autoComplete="new-password"
          className="block w-full pl-10 pr-3 py-3 border border-default rounded-lg bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition duration-200"
                    placeholder="••••••••"
                  />
                  {
                    formik.touched.password?<span className='text-red-700 font-bold'>{formik.errors.password}</span>:null
                  }
                  
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-text mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    autoComplete="new-password"
                    className="block w-full pl-10 pr-3 py-3 border border-default rounded-lg bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition duration-200"
                    placeholder="•••••••"
                  />
                  {
                    formik.touched.confirmPassword?<span className='text-red-700 font-bold'>{formik.errors.confirmPassword}</span>:null
                  }
                  
                </div>
              </div>
              {/* Signup Button */}
              <div>
                <button
                  type="submit"
                  className="w-full btn btn-primary btn-md"
                >
                  Create Account
                </button>
              </div>
            </div>                      
          </div>

          {/* Login Link */}
          <div className="bg-surface-2 px-8 py-6 border-t border-default">
            <p className="text-center text-sm text-muted">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-accent hover:opacity-90 transition duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted">
          © 2023 TaskMint. All rights reserved.
        </p>
      </div>
    </form>
    </>
  )
}

export default Signup