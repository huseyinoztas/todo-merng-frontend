import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useState, useRef, useEffect, useContext } from 'react'
import {ADD_TODO} from "./graphql/Mutation"
import { GET_TODOS, GET_TODO } from './graphql/Query'
import moment from 'moment'
import { TodoContext } from './TodoContext'
import { UPDATE_TODO } from './graphql/Mutation'

function Form() {

  const inputAreaRef = useRef();

  const [todo,setTodo] = useState({
    title:'',
    description:'',
    date: moment().format("YYYY-MM-DD")
  })

  

  const [addTodo] =useMutation(ADD_TODO);
  const [todoUpdate] =useMutation(UPDATE_TODO);
  const {chooseId,setChooseId}=useContext(TodoContext)

  const {loading,error,data} =useQuery(GET_TODO,{
    variables:{id:chooseId},onCompleted: (data) => {
      if (data && data.getTodo) {
        setTodo(data.getTodo)
      }
    }
  })
  
  const submitHandler = e => {
    e.preventDefault();

    if(chooseId===0){
      addTodo({
        variables:{
          title:todo.title,
          description:todo.description,
          date:todo.date
        },
        refetchQueries:[
          {query:GET_TODOS}
        ]
      })
      setTodo({
        title:'',
        description:'',
        date:''
      })
      setChooseId(0);
    } else {
      todoUpdate({
        variables:{
          id:chooseId,
          title:todo.title,
          description:todo.description,
          date:todo.date
        },
        refetchQueries:[
          {query:GET_TODOS}
        ]
      })
      setTodo({
        title:'',
        description:'',
        date:moment().format("YYYY-MM-DD")
      })
      setChooseId(0);
    }
  }

  useEffect(() => {
    const formTiklandı=e=>{
      if(!inputAreaRef.current.contains(e.target)){
        
        setChooseId(0);
        setTodo({
          title:'',
          description:'',
          date:''
        })
      } else {
        console.log('form içi tıklandı')
      }
    }

    document.addEventListener("mousedown", formTiklandı)
    return () => {
      document.removeEventListener("mousedown", formTiklandı)
    }
  },[])

  

  

  return (
    <form className='container form text-center' onSubmit={submitHandler}  ref={inputAreaRef}>
      <div className='text-center fs-2 text-primary fw-bold'>
        {(chooseId===0) ? "Add Todo" : "Update Todo"}
      </div>
      <div className='mt-3'>
        <label className='form-label text-secondary'>Title</label>
        <input value={todo.title} onChange={e=>setTodo({...todo,title:e.target.value})} type="text" className="form-control" />
      </div>
      <div className='mt-3'>
        <label className='form-label text-secondary'>Description</label>
        <input value={todo.description} onChange={e=>setTodo({...todo,description:e.target.value})} type="text" className="form-control" />
      </div>
      <div className='mt-3'>
        <label className='form-label text-secondary'>Date</label>
        <input value={todo.date} onChange={e=>setTodo({...todo,date:e.target.value})} type="date" className="form-control" />
      </div>
      <div className='text-center'>
        <button type='submit' className='btn btn-primary mt-3'>
            {(chooseId===0) ? "Add" : "Update"}
        </button>
      </div>
    </form>
  )
}

export default Form
