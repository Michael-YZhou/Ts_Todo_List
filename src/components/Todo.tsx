import { useState, type ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../util/http";
import { deleteTodo } from "../util/http";
import Modal from "./UI/Modal";

type TodoProps = {
  title: string;
  children: ReactNode;
  id: number;
  completed: boolean;
};

export default function Todo({ title, children, id, completed }: TodoProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      console.log(`Task ${title} deleted successfully`);
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // can navigate to a new page after delete success using navigate('/destination') if needed
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ id });
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this task? This action cannot be
            undone.
          </p>
          <div className="flex justify-end items-center gap-8">
            <button
              className="font-inherit cursor-pointer bg-transparent text-[#3f0c26] rounded font-bold hover:text-[#7c184c]"
              onClick={handleStopDelete}
            >
              Cancel
            </button>
            <button
              className="font-inherit cursor-pointer px-6 py-2 bg-[#e30d7c] text-white rounded shadow-md font-bold hover:bg-[#e30d5b] hover:shadow-lg hover:text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
      <article className="flex items-start justify-between">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {}}
          className="mr-2"
        />
        <div>
          <h2
            className={`m-0 text-xl text-[#b1c1c3] ${
              completed ? "line-through text-gray-500" : ""
            }`}
          >
            {title}
          </h2>
          <p
            className={`m-0 text-[0.85rem] text-[#dfd9be] ${
              completed ? "line-through text-gray-500" : ""
            }`}
          >
            {children}
          </p>
        </div>
        <button
          className="px-2 bg-transparent border-none text-[#909a9a] cursor-pointer hover:text-[#f9a73b]"
          onClick={handleStartDelete}
        >
          Delete
        </button>
      </article>
    </>
  );
}
