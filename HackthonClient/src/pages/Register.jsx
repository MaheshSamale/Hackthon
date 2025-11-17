import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { registerUser } from '../services/user'
import { toast } from 'react-toastify'

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const signup = async () => {
        //to-do  -> check for the validations if user have entered the data in the input fields
        const result = await registerUser(name, email, password, mobile)
        if (result.status == 'success') {
            toast.success('Signup Successful')
            navigate('/login')
        }
        else
            toast.error(result.error)
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
    <div className='container w-50 border border-secondary p-4 rounded'>
         <h3 className='text-center'>Register</h3>
        <div className="mb-3 mt-3">
            <label htmlFor="inputName" className="form-label">Full Name</label>
            <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="name"
                onChange={e => setName(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="name@example.com"
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div className='mb-3'>
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
                type="password"
                id="inputPassword"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                placeholder='password'
                onChange={e => setPassword(e.target.value)}
            />
            <div id="passwordHelpBlock" className="form-text">
                Your password must be 8–20 characters, contain letters & numbers,
                and not include spaces or special characters.
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="inputMobile" className="form-label">Phone</label>
            <input
                type="tel"
                className="form-control"
                id="inputMobile"
                placeholder="9999999999"
                onChange={e => setMobile(e.target.value)}
            />
        </div>

        <div className='mb-3'>
            <button className='btn btn-success' onClick={signup}>Signup</button>
        </div>

        <div>
            <label> Have an account? </label>
            <Link to="/"> Click Here</Link>
        </div>

    </div>
</div>

    )
}

export default Register
