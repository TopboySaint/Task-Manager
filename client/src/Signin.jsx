import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import api from './api'
import { useNavigate, Link } from 'react-router-dom'

const Signin = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().min(6, 'Minimum of 6 characters is required').required('Password is required')
    }),
    onSubmit: (values, { setSubmitting }) => {
      setError('')
  api.post('/signin', values)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            navigate('/tasks')
          } else {
            setError(response.data.message || 'Unexpected response from server.')
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message)
          } else {
            setError('Could not connect to the server. Please try again later.')
          }
        })
        .finally(() => setSubmitting(false))
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="card p-8 shadow-sm">

          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-10 w-10 bg-brand rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-brand-contrast" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-text">TaskMint</span>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-text">Welcome Back</h2>
            <p className="mt-2 text-sm text-muted">Sign in to your account to manage your tasks</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={formik.handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-muted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full pl-10 pr-3 py-3 border border-default rounded-lg bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition duration-200 ${formik.touched.email && formik.errors.email ? 'ring-red-200 border-red-300 bg-red-50' : ''}`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-text">Password</label>
                <Link to="#" className="text-sm text-accent hover:opacity-90">Forgot password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-muted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full pl-10 pr-3 py-3 border border-default rounded-lg bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition duration-200 ${formik.touched.password && formik.errors.password ? 'ring-red-200 border-red-300 bg-red-50' : ''}`}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full btn btn-primary btn-md flex items-center justify-center gap-3"
              >
                <svg className="h-5 w-5 text-brand-contrast/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span>Sign in</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            <p>Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-accent hover:opacity-90">Create one</Link>
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-muted">
          <p>By continuing you agree to our <a href="#" className="text-accent hover:underline">Terms</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  )
}

export default Signin