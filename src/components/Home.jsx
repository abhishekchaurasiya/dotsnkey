import React, { useEffect, useState } from 'react';
import baseUrl from '../baseUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Edit from '../pages/Edit';

const Home = () => {
    let tableHeadingData = ["ID", "Full Name", "Email", "Country", "State", "City", "Language", "Date", "Actions"];

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate();

    const fetchDataInDB = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${baseUrl}/allCustomer`);
            setData(response.data.data)
            setTotalPages(response.data.totalPages)
            setPages(response.data.page_number)
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    const pageHandler = (page) => {
        setPages(page)
        fetchDataInDB(page)
        toast.success(`Hello I am page ${page}`)
    };


    const deleteHandler = async (id) => {
        setLoading(true)
        try {
            const response = await axios.delete(`${baseUrl}/deleteCustomer/${id}`);
            toast.success(response.data.message)
            setLoading(false)
            setRefresh((prev) => !prev)

        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchDataInDB()
    }, [refresh])

    return (
        <div className='w-[80vw] items-center m-auto mt-11'>
            <div className='flex justify-between'>
                <h1 className=' font-bold'>Customer List</h1>
                <button
                    onClick={() => navigate("/addnew")}
                    className=' bg-slate-900 px-2 rounded-sm text-white mb-2'>
                    Add New
                </button>
            </div>
            <div>
                <table className='border-collapse border border-black-900 w-[80vw]'>
                    <thead>
                        <tr>
                            {
                                tableHeadingData.map((items, index) => {
                                    return <th className='border border-slate-600' key={index} > {items}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className=' text-center'>
                        {
                            data.map((items, id) => {
                                return <tr key={id}>
                                    <td className='border border-slate-600'>{id + 1}</td>
                                    <td className='border border-slate-600'>{items.fullname}</td>
                                    <td className='border border-slate-600'>{items.email}</td>
                                    <td className='border border-slate-600'>{items.country}</td>
                                    <td className='border border-slate-600'>{items.state}</td>
                                    <td className='border border-slate-600'>{items.city}</td>
                                    <td className='border border-slate-600'>{items.language}</td>
                                    <td className='border border-slate-600'>{new Date().toDateString(items.createdAt)}</td>
                                    <td className='border border-slate-600'>
                                        <div className='flex items-center justify-around'>
                                            <button className=' bg-slate-900 px-2 rounded-sm text-white'
                                                onClick={() => navigate(`/edit/${items._id}`)}>
                                                Edit
                                            </button>
                                            <button className=' bg-slate-900 px-2 rounded-sm text-white'
                                                onClick={() => deleteHandler(items._id)} >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>

                </table>
                <div className='flex border border-slate-600 justify-end border-t-0 px-5 gap-6 items-center py-2'>
                    {
                        page >= 1 &&
                        <button className=' bg-slate-900 px-2 rounded-sm text-white'
                            onClick={() => pageHandler(page - 1)}>Previous</button>
                    }

                    {
                        page <= totalPages &&
                        <button className=' bg-slate-900 px-2 rounded-sm text-white '
                            onClick={() => pageHandler(page + 1)}>Next</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;
