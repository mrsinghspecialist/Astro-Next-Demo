"use client";
import AddModal from "@/components/AddModal/AddModal";
import { useState } from "react";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        className="bg-gray-500 text-white p-3"
        onClick={() => setOpenModal(true)}
      >
        Open Modal
      </button>
      {openModal && (
        <div className="absolute top-[25%] left-[30%] h-94 w-[40%] bg-white rounded-lg">
          <div
            className="absolute right-4 top-4 cursor-pointer font-extrabold bg-blue-300 p-3 py-2 rounded-md"
            onClick={() => setOpenModal(false)}
          >
            X
          </div>
          <div className="flex flex-col p-5 py-8 items-center justify-center">
            <h1 className="font-black text-3xl">Suggest Remedy</h1>
            <p className="mt-12 leading-7">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
              molestiae ex impedit corporis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Commodi vitae aliquam assumenda
              repudiandae ipsa harum incidunt veniam architecto praesentium esse
              tempora ducimus consectetur at, nemo iste voluptatum ipsum sunt
              velit reprehenderit dolores!
            </p>
            <button
              className="p-2 mt-10 rounded-md w-[70%] text-white bg-gradient-to-b from-[#fb7038] to-[#ff0600]"
              onClick={() => setOpenAddModal(true)}
            >
              Add
            </button>
          </div>
        </div>
      )}
      {openAddModal && (
        <>
          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-gray-800 opacity-50"></div>
          <AddModal setOpenAddModal={setOpenAddModal} />
        </>
      )}
    </div>
  );
}
