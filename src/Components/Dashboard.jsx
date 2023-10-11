import React, { useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Card from "./Card";
import Modal from "./Modal";
import "./modal.css";
import { usePendings } from "../context/PendingsContext";

function Dashboard() {
  const { pendings, setPendings } = usePendings();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const countPendings = (status) =>
    pendings.filter((pending) => pending.status === status).length;

  const handleSquareClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    setPendings((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const sortByDueDate = (pendings) => {
    const sortedPendings = [...pendings];
  
    sortedPendings.sort((a, b) => {
      const dueDateA = new Date(a.dueDate);
      const dueDateB = new Date(b.dueDate);
  
      return dueDateA - dueDateB;
    });
  
    return sortedPendings;
  };

  const handleFilterAndSort = () => {
    const sortedPendings = sortByDueDate(pendings);
    setPendings(sortedPendings);
  };


  return (
    <div className="flex items-center justify-center mt-24">
      <div>
        <button
          onClick={handleFilterAndSort}
          className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2 hover:bg-blue-400 mb-2"
        >
          Sort by Expiration Date
        </button>

        <div
          className="h-screen w-screen bg-[#ffffff8a] flex border-2 rounded-md border-[#43ED3F] items-start justify-center"
          style={{ maxWidth: "900px", maxHeight: "550px" }}
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 m-16">
            <div
              onClick={handleSquareClick}
              className={`bg-slate-100 h-28 w-26 p-5 mx-5 rounded-md shadow-md flex cursor-pointer text-center hover:bg-slate-200`}
            >
              New pending
            </div>
            {isModalVisible && <Modal onClose={closeModal} />}
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext
                items={pendings}
                strategy={horizontalListSortingStrategy}
              >
                {pendings.map((pending, index) => (
                  <Card key={index} pending={pending} index={index} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-8 font-semibold">
          <p onClick={() => console.log("Hola")}>
            Active: {countPendings("Active")}
          </p>
          <p>Done: {countPendings("Done")}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
