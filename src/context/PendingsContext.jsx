import { createContext, useContext, useState, React } from "react";

const PendingsContext = createContext();

export const usePendings = () => {
  const context = useContext(PendingsContext);
  if (!context) {
    throw new Error("usePendings must be used within a PendingsProvider");
  }
  return context;
};

export const PendingsProvider = ({ children }) => {
  const [pendings, setPendings] = useState([
    {
      id: 1,
      priority: "High",
      text: "Example 1",
      status: "Active",
      dueDate: "2023-10-25",
    },
    {
      id: 4,
      priority: "Medium",
      text: "Example 2",
      status: "Active",
      dueDate: "2023-10-11",
    },
    {
      id: 5,
      priority: "Low",
      text: "Example 3",
      status: "Active",
      dueDate: "2023-10-21",
    },
    {
      id: 6,
      priority: "High",
      text: "Example 4",
      status: "Active",
      dueDate: "2023-10-12",
    },
  ]);

  const markPendingAsDone = (pendingId) => {
    // console.log(pendingId);
    setPendings((prevPendings) =>
      prevPendings.map((prevPending) =>
        prevPending.id === pendingId
          ? { ...prevPending, status: "Done" }
          : prevPending
      )
    );
  };

  const removePending = (id) => {
    setPendings((prevPendings) =>
      prevPendings.filter((pending) => pending.id !== id)
    );
  };

  const sortByDueDate = (pendings) => {
    return pendings.sort((a, b) => {
      const dueDateA = new Date(a.dueDate);
      const dueDateB = new Date(b.dueDate);
      return dueDateA - dueDateB;
    });
  };

  return (
    <PendingsContext.Provider
      value={{ pendings, setPendings, markPendingAsDone, removePending, sortByDueDate }}
    >
      {children}
    </PendingsContext.Provider>
  );
};
