import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePendings } from "../context/PendingsContext";
import { Close } from "./ui/icons";

const Modal = ({ onClose }) => {
  const { pendings, setPendings } = usePendings();
  const [dueDate, setDueDate] = useState("");
  

  console.log(pendings);

  const handleSubmit = (e) => {
    e.preventDefault();
    const priority = e.target.priority.value;
    const text = e.target.text.value;
    const status = e.target.status.value;

    const newPending = {
      id: uuidv4(), // Utiliza UUID para generar un ID único
      priority,
      text,
      status,
      dueDate,
    };

    setPendings([...pendings, newPending]);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content w-auto h-suto flex flex-col items-center">
        <h2 className="mb-4">New Pending Form</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-start">
          <div className="mb-4">
            <label htmlFor="priority" className="text-gray-700">
              Priority:
            </label>
            <input
              className="p-2 border rounded-md w-full"
              placeholder="Medium"
              type="text"
              id="priority"
              name="priority"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="text" className="text-gray-700">
              Text:
            </label>
            <input
              className="p-2 border rounded-md w-full"
              placeholder="Some text"
              type="text"
              id="text"
              name="text"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="text-gray-700">
              Status:
            </label>
            <select
              id="status"
              name="status"
              className="p-2 border rounded-md w-full"
              required
            >
              <option value="Active">Active</option>
              <option value="Done">Done</option>
              <option value="Deleted">Deleted</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="text-gray-700">
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="p-2 border rounded-md w-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>


          <button
            type="submit"
            className="bg-indigo-500 rounded-md hover:bg-indigo-400 text-white p-2"
          >
            Submit
          </button>
        </form>
        <i className="close cursor-pointer" onClick={onClose}>
          <Close/>
        </i>
      </div>
    </div>
  );
};

export default Modal;
