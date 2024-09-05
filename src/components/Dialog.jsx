import React, { useState, useRef, useEffect } from 'react';
import './Dialog.css';

const ModalDialog = ({ isOpen, position, onClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="modal"
            style={{
                top: position.y,
                left: position.x,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {children}
        </div>
    );
};

export default ModalDialog;