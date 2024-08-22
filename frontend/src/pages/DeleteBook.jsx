import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useSnackbar } from 'notistack'
const DeleteBook = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
    .then((response) => {
      console.log(response.data);
      setLoading(false);
      enqueueSnackbar('Book deleted successfully',{variant:'success'});
      navigate('/');
    })
    .catch((error) => {
      console.log(error.message);
      enqueueSnackbar('Failed to delete book',{variant:'error'});
      setLoading(false);
    });
  };
  return (
    <div>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (<Spinner/>) : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <h3 className='text-xl'>Are you sure you want to delete this book?</h3>
          <button onClick={handleDeleteBook} className='bg-red-600 text-white p-2 rounded-md'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook;