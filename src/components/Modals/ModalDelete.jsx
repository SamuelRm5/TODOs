import React from 'react'
import ReactDOM from 'react-dom'
import './modalDelete.css';

export function ModalDelete ( {children} )  {
    return ReactDOM.createPortal(
        <div className="ModalBackground">
            
            {children}

        </div>,
        document.getElementById('modal')
    );
}
