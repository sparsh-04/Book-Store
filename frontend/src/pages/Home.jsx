import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'
const Home = () => {
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showType,setShowType] = useState('table');
    useEffect(() => {
            setLoading(true);
            axios.get('http://localhost:5555/books')
            .then((response) => {
            setBooks(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error.message);
            setLoading(false);
        });
    }
    ,[]);

  return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-4'>
            <button onClick={() => setShowType('table')} className='bg-blue-600 text-white p-2 rounded-md'>Table</button>
            <button onClick={() => setShowType('card')} className='bg-blue-600 text-white p-2 rounded-md'>Card</button>
        </div>

        <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to='/books/create' className='bg-green-600 text-white p-2 rounded-md'>
            <MdOutlineAddBox className='inline-block' />
            </Link>
        </div>
        {loading ? <Spinner/>: (
            showType === 'card' ? <BooksCard books={books}/> :
            <BooksTable books={books}/>
            )
        }
    </div>
    )
}

export default Home