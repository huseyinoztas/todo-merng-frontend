import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { DELETE_TODO } from './graphql/Mutation'
import { GET_TODOS } from './graphql/Query'
import {MdDelete} from 'react-icons/md'
import moment from 'moment/moment'
import 'moment/locale/tr';
import { useContext } from 'react'
import {TodoContext} from './TodoContext'


function List() {

  const {chooseId,setChooseId}=useContext(TodoContext);

  const {loading, error, data} = useQuery(GET_TODOS);

  const [deleteTodo] = useMutation(DELETE_TODO);

  const handleDelete =(id) => {
    deleteTodo({
      variables:{
        id:id
      },
      refetchQueries:[
        {query:GET_TODOS}
      ]
    })
    setChooseId(0)
  }
  
  if(loading) return <p className='text-center text-warning'>Downloading...</p>
  if(error) return <p className='text-center text-danger'>{error.message}</p>

  return (
    <div className='container list text-center'>
      <div className='text-center fs-2 text-secondary fw-bold mb-4'>Todo's</div>
      {data.getTodos.length===0 ? (<p className='fs-3'>Todo has not been added yet</p>) : 
      (<div className="list-group">
        {data?.getTodos.map(todo=> (
          <a className="list-group-item list-group-item-action" aria-current='true' key={todo.id} onClick={()=>setChooseId(todo.id)}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{todo.title}</h5>
              <h4 onClick={() => handleDelete(todo.id)}><MdDelete /></h4>
            </div >
            <p className="mb-1">{todo.description}</p>
            <small>{moment(todo.date).fromNow()}</small>
        </a>
        ))}
      </div>
      )}     
    </div>
  )
}

export default List
