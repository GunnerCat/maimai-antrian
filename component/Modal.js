import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onQueue }) => {
  const [name, setName] = useState('');

  const handleQueue = () => {
    onQueue(name);
    setName('');
  };

  return (
    <div className="modal" style={{ display: isOpen ? 'block' : 'none' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            {}
          </div>
          <div className="modal-body">
            <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)}placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleQueue}>Save changes</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Modal;
