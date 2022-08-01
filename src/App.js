
import { useRef, useState } from 'react';
import { TodoList } from './components/TodoList';
import { AiFillCheckCircle,AiOutlineSend } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';

import './App.css';
import { saveTodos } from './helpers/localStorage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ModalDelete } from './components/Modals/ModalDelete';


export function App() {

// JUST DELETE THE COMPLETED TODOs
// VERIFY THAT A TODO NOT REPEAT

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    const [todos, setTodos] = useLocalStorage('TODOS_V1', []);
    const [hidden, setHidden] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [todoID, setTodoID] = useState("");
    const todoInput =useRef(null);

    const completedTodos = todos.filter( todo => !!todo.completed).length;

    // ----------------- TODOS managment ----------------- //
    const addTodo = (text) => {

      console.log( text );
      const newTodos = [...todos];
      newTodos.push({
        completed: false,
        text,
      })
      saveTodos( newTodos, setTodos );
      todoInput.current.textContent = "";
    }
    const completeTODO = ( text ) => {
      const todoIndex = todos.findIndex( todo => todo.text === text);
      const newTodos = [...todos];
      newTodos[todoIndex].completed = true;
      saveTodos( newTodos, setTodos );
    } 
    const deleteTODO = ( text ) => {
      const todoIndex = todos.findIndex( todo => todo.text === text);
      const newTodos = [...todos];
      newTodos.splice( todoIndex, 1 );
      saveTodos( newTodos, setTodos );
      setOpenModal(false);
    } 

    const emptyValidation = ( txt ) => {
      if (txt.length <= 5) {
        return false;
      }
      else{
        return true;
      }
    }

    const handleKeyUp = event => {
      if ( event.keyCode === 13 ) {

        if ( emptyValidation( event.target.value ) ) {
          addTodo(event.target.value);
        }
        else {
          alert("TODO length has to contains more than 5 characters ");
        }
      }
      
      }
      const handleSend = event => {
        if ( emptyValidation( todoInput.current.value ) ) {
          addTodo(todoInput.current.value);
        }
        else {
          alert("TODO length has to contains more than 5 characters ");
        }
      }

    const totalTodos = todos.length;


    // TODO: Restrincción en el innput con 44 caracteres-

    return (
      <>
        <header className='header'>
          <h1 className='header__title'>TO DO</h1>
          <p className='header__date'>{ hoy.toDateString() }</p>
          <img className='todos__love' src="https://cdn-icons-png.flaticon.com/512/427/427735.png" alt="" />
          <div className='header__cont-input'>
            <input ref={todoInput} onKeyUp={handleKeyUp} minLength={5} maxLength={44} className='header__input' type="text" placeholder='Type youy task here' />
            <button onClick={handleSend} id='btnSend'><AiOutlineSend style={{marginTop:"7px"}} /></button>
          </div>
         
          <p className='header__completed'>You have completed <strong>{completedTodos}</strong> of <strong>{totalTodos}</strong></p>
        </header>
        <div className='todos'>
          <div className="todos__contenedor">
            {
              todos.map( todo => (
                <TodoList 
                  key = {todo.text}
                  task = {todo.text}
                  completed = {todo.completed}
                  hidden = { hidden }
                  onComplete={() => {
                    completeTODO( todo.text )
                  }}
                  onDelete = {() => {
                    setOpenModal( true )
                    setTodoID( todo.text )
                  }}
                  />
                  ))
                }
          {
            (todos.length === 0) && <p className='emptyTODO'>You've got nothing</p>
          } 
          </div>
        </div>

        <div className='filter'>
            <button onClick={() => {setHidden("completed")}} className='filter__filter'>
                <AiFillCheckCircle style={{fontSize:"25px",color:"#3bb54a"}}></AiFillCheckCircle>
            </button>
            <button onClick={() => {setHidden("uncompleted")}} className='filter__filter'>
                <div className='nothing'>
                  
                </div>
            </button>
            <button onClick={() => {setHidden("")}} className='filter__filter'>
                  <div>All</div>
            </button>
        </div>
        {
          (openModal)&&
          <ModalDelete>
            <MdOutlineCancel className='deleteModal__exit' onClick={()=>{setOpenModal(false)}}/>
            <div className='deleteModal'>
                <div className='deleteModal__top'>
                  <p>You're goign to delete</p>
                  <p>"{todoID}"</p>
                  <p>¿Are you sure?</p>
                </div>
                <div className='deleteModal__bottom'>
                  <button onClick={()=>{setOpenModal(false)}} className='deleteModal__btn btnCancel'>No</button>
                  <button onClick={deleteTODO} className='deleteModal__btn btnSucces'>Yes</button>
                </div>
                
            </div>
          </ModalDelete>
          
        }
        
      </>
    );
}

