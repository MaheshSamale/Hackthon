import React, { useEffect, useState } from 'react'
import { getProfile, updateUser } from '../services/user'
import { toast } from 'react-toastify'

function Profile() {
    const [name, setName] = useState('user name')
    const [email, setEmail] = useState('user email')
    const [mobile, setMobile] = useState('+91')

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = async () => {
        const result = await getProfile()
        if (result.status == 'success') {
            const user = result.data
            setName(user.name)
            setEmail(user.email)
            setMobile(user.mobile)
        }
        else
            toast.error(result.error)
    }

    const updateUserProfile = async () => {
        const result = await updateUser(mobile)
        if (result.status == 'success')
            toast.success('Mobile Updated Successfully')
        else
            toast.error(result.error)
    }

    return (
        <div className='container w-75'>
            <div className='row'>
                <div className='col mt-3 mb-3'>
                    <input className="form-control" value={name} />
                </div>
                <div className='col mt-3 mb-3'>
                    <input className="form-control" value={email} />
                </div>
            </div>
            <div className='mb-3'>
                <input className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
            <button className='btn btn-danger' onClick={updateUserProfile}>Update</button>
        </div>
    )
}

export default Profile
