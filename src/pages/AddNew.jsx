import React, { useState } from 'react'
import { toast } from 'react-toastify';
import baseUrl from '../baseUrl';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const AddNew = () => {

    const [formdata, setFromData] = useState({
        fullname: "", email: "", password: "", confirmPassword: "", country: "", state: "", city: "",
        language: "", active: false,
    });

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFromData(prevsData => {
            return {
                ...prevsData,
                [name]: value
            }
        })
    };

    const submitHandler = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/customer`, {
                ...formdata
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
            });

            toast.success(response.data.message)
            setFromData(prvesData => {
                return {
                    ...prvesData, fullname: "", email: "", password: "", confirmPassword: "", country: "", state: "", city: "",
                    language: "", active: false,
                }
            });
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    return (
        <div className='w-[50vw] m-auto items-center mt-10 border-2 p-5 rounded-sm'>
            <div>
                <h1 className=' font-bold mb-3 underline'>Manage Customers:-</h1>
            </div>
            <form onSubmit={submitHandler}>
                <label className='flex justify-between'>
                    <p>Full Name</p>
                    <input type="text" name='fullname'
                        value={formdata.fullname}
                        onChange={changeHandler}
                        className=' bg-slate-900 px-2 rounded-sm text-white mb-2 outline-none'
                        placeholder="Enter full name"

                    />
                </label>

                <label className='flex justify-between'>
                    <p>Email</p>
                    <input type="email" name='email'
                        value={formdata.email}
                        onChange={changeHandler}
                        placeholder="Enter email"
                        className=' bg-slate-900 px-2 rounded-sm text-white mb-2 outline-none'
                    />
                </label>

                <label className='flex justify-between'>
                    <p>Password</p>
                    <input type="password" name='password'
                        value={formdata.password}
                        onChange={changeHandler}
                        placeholder="Enter password"
                        className=' bg-slate-900 px-2 rounded-sm text-white mb-2 outline-none'
                    />
                </label>

                <label className='flex justify-between'>
                    <p>Confirm Password</p>
                    <input type="password" name='confirmPassword'
                        value={formdata.confirmPassword}
                        onChange={changeHandler}
                        placeholder="Enter password"
                        className=' bg-slate-900 px-2 rounded-sm text-white mb-2 outline-none'
                    />
                </label>

                <label className='flex justify-between'>
                    <p> Country</p>
                    <select
                        name='country'
                        value={formdata.country}
                        onChange={changeHandler}
                        className=' bg-slate-900 px-2 rounded-sm text-white mb-2 outline-none w-[216px]'
                    >
                        <option value="india">India</option>
                        <option value="us">US</option>
                        <option value="japan">Japan</option>
                        <option value="australia">Australia</option>
                        <option value="britain">Britain</option>
                    </select>
                </label>

                <label className='flex justify-between'>
                    <p> State</p>
                    <select
                        name='state'
                        value={formdata.state}
                        onChange={changeHandler}
                        className=' bg-slate-900 px-2 rounded-sm text-white mb-2 outline-none w-[216px]'
                    >
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharastra">Maharastra</option>
                        <option value="UP">UP</option>
                        <option value="Odisa">Odisa</option>
                        <option value="Rajasthan">Rajasthan</option>
                    </select>
                </label>

                <label className='flex justify-between'>
                    <p> City</p>
                    <select
                        name='city'
                        value={formdata.city}
                        onChange={changeHandler}
                        className=' bg-slate-900 px-2 rounded-sm text-white mb-2 outline-none w-[216px]'
                    >
                        <option value="Indore">Indore</option>
                        <option value="Satna">Satna</option>
                        <option value="Newyork">Newyork</option>
                        <option value="Washington">Washington</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                </label>

                <label className='flex justify-between'>
                    <p> Language</p>
                    <select
                        name='language'
                        value={formdata.language}
                        onChange={changeHandler}
                        className=' bg-slate-900 px-2 rounded-sm text-white mb-2 outline-none w-[216px]'
                    >
                        <option value="Hindi">Hindi</option>
                        <option value="Enlish">Enlish</option>
                        <option value="Japnai">Japnai</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Gujarati">Gujarati</option>
                    </select>
                </label>
                <div className=' flex justify-end gap-2'>
                    <button disabled={loading}
                        className='bg-blue-950 py-1 px-10 rounded-full mt-2 text-slate-100 font-semibold'
                        type=''>
                        Cancel
                    </button>

                    <button disabled={loading}
                        className='bg-blue-950 py-1 px-10 rounded-full mt-2 text-slate-100 font-semibold'
                        type='submit'>
                        Save
                    </button>

                </div>
            </form>
        </div>
    )
}

export default AddNew
