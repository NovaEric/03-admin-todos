"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as todosApi from "@/todos/helpers/todos";



export const NewTodo = () => {
  const [description, setDescription] = useState('');

  const router = useRouter();

  const onSubmit = async(e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    await todosApi.createTodo(description);
    setDescription('');
    router.refresh();
  };
  
  const onChange = (e: ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault();
    setDescription(e.target.value);

  }

  const deleteCompleted = async () => {

    await todosApi.deleteTodos();
    router.refresh();
    
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full px-5 mx-5 mb-5">
      <input
        type="text"
        onChange={(e) => onChange(e)}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="Add Task"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Add
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={ () => deleteCompleted() }
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete All Completed
      </button>
    </form>
  );
};
