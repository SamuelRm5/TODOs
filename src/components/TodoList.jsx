import React from 'react'
import './todoList.css'
import { FiTrash2 } from 'react-icons/fi';

export const TodoList = ( props ) => {


    return (

        <div className={
            `todos__item ${props.completed && 'todos__item-completed'} 
            ${ ( (props.hidden === "completed") && ( !props.completed ) ) && "hidden" }
            ${ ( (props.hidden === "uncompleted") && ( props.completed ) ) && "hidden" } 
            `} 
            onDoubleClick={props.onComplete}
            >

            <div className={`todos__check ${props.completed && 'todos__check-completed'}`}></div>
            <p className={`todos__task ${props.completed && 'todos__task-completed'}`}>{ props.task }</p>
            {
                (props.completed===true) ?
                    <button onClick={() => {props.onDelete(props.task)} } className='todos__button-delete'><FiTrash2 /></button>   
                : <button className='todos__button-delete noDelete'><FiTrash2 /></button>
            }
        </div>
    )
}
