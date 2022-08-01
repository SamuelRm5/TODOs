

export const saveTodos = ( newTodos, setTodos ) => {

    const stringifiedTodos = JSON.stringify( newTodos );
    localStorage.setItem('TODOS_V1', stringifiedTodos );
    setTodos( newTodos );
}
