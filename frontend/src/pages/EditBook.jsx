import React from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useState,useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'
const EditBook = () => {
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading,setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setTitle(response.data.books.title);
      setAuthor(response.data.books.author);
      setPublishYear(response.data.books.publishYear);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error.message);
      setLoading(false);
    });
  },[]);
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`,data)
    .then((response) => {
      console.log(response.data);
      setLoading(false);
      enqueueSnackbar('Book saved successfully',{variant:'success'});
      navigate('/');
    })
    .catch((error) => {
      console.log(error.message);
      enqueueSnackbar('Failed to save book',{variant:'error'});
      setLoading(false);
    });
    
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? (<Spinner/>) : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type='text' id='title' className='border-2 border-slate-400 rounded-md p-2' value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>
    <div className='my-4'>
      <label className='text-xl mr-4 text-gray-500'>Author</label>
      <input type='text' id='author' className='border-2 border-slate-400 rounded-md p-2' value={author} onChange={(e) => setAuthor(e.target.value)} />
    </div>
    <div className='my-4'>
      <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
      <input type='text' id='publishYear' className='border-2 border-slate-400 rounded-md p-2' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
    </div>

      <button className='bg-green-600 text-white p-2 rounded-md' onClick={handleEditBook}>Save</button>
      </div>
      </div>
  )
}

export default EditBook;