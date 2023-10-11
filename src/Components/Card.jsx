import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePendings } from "../context/PendingsContext";
import { Done, Trash } from "./ui/icons";

function Card({ pending }) {
  const { markPendingAsDone, removePending } = usePendings();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    // transition,
  } = useSortable({
    id: pending.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  if (pending.status === "Done" || pending.status === "Deleted") {
    return null;
  }

  const handleMarkAsDone = () => {
    markPendingAsDone(pending.id);
  };

  const handleDelete = () => {
    removePending(pending.id);
  };

  const cardClassName = isDueTodayOrTomorrow(pending.dueDate)
    ? "bg-[#FFD6D6]"
    : "bg-[#FFFFFF]";

  function isDueTodayOrTomorrow(dueDate) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return dueDate === formatDate(today) || dueDate === formatDate(tomorrow);
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // console.log(pendings)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex flex-col justify-between h-28 w-26 p-2 mx-4 rounded-md shadow-md mb-8 hover:bg-slate-100 ${cardClassName}`}
    >
      <p className="text-center font-semibold">{pending?.priority}</p>
      <p className="text-center overflow-y-auto max-h-16">{pending?.text}</p>
      <p className="text-center overflow-y-auto max-h-16">{pending?.dueDate}</p>
      <div className="flex justify-between text-lg ">
        <i className="text-green-500" onClick={handleMarkAsDone}><Done/></i>
        <i className="text-red-500" onClick={handleDelete}><Trash/></i>
      </div>
    </div>
  );
}

export default Card;
