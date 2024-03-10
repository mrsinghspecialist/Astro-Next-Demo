"use client";
import React, { useState } from "react";
import CategoriesModal from "../SearchMallModal/SearchMallModal";

export default function AddModal({
  setOpenAddModal,
}: {
  setOpenAddModal: (value: boolean) => void;
}) {
  const [selected, setSelected] = useState("Paid Remedy");
  const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
  return (
    <>
      <div className="absolute top-[25%] left-[30%] h-auto w-[40%] bg-white roundeFd-lg">
        <div
          className="absolute right-4 top-4 cursor-pointer font-extrabold bg-blue-300 p-3 py-2 rounded-md"
          onClick={() => setOpenAddModal(false)}
        >
          X
        </div>
        <div className="flex flex-col p-5 py-8">
          <h1 className="font-black text-3xl justify-center w-full text-center">
            Suggest Remedy
          </h1>
          <div className="mt-10">
            Remedy Type
            <div className="mt-3 flex justify-between space-x-4">
              <button
                className={`p-3 bg-slate-300 w-[50%] rounded-md hover:bg-blue-200 ${
                  selected === "Paid Remedy" && "!bg-green-500"
                }`}
                onClick={() => setSelected("Paid Remedy")}
              >
                Paid Remedy
              </button>
              <button
                className={`p-3 bg-slate-300 w-[50%] rounded-md hover:bg-blue-200 ${
                  selected === "Free Remedy" && "!bg-green-500"
                }`}
                onClick={() => setSelected("Free Remedy")}
              >
                Free Remedy
              </button>
            </div>
          </div>
          {selected === "Paid Remedy" && (
            <div className="mt-8">
              Remedy From
              <div className="mt-3 flex justify-between space-x-4">
                <button
                  className="p-3 bg-slate-300 w-[50%] rounded-md"
                  onClick={() => setOpenCategoriesModal(true)}
                >
                  Search from AstroSevaMall
                </button>
                <button className="p-3 bg-slate-300 w-[50%] rounded-md">
                  Create your own
                </button>
              </div>
            </div>
          )}
          {selected === "Free Remedy" && (
            <div className="mt-8 bg-slate-400 p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              quaerat harum facere. Voluptatum quia, cum sed eligendi numquam
            </div>
          )}
        </div>
      </div>
      {openCategoriesModal && (
        <CategoriesModal setOpenCategoriesOpenModal={setOpenCategoriesModal} />
      )}
    </>
  );
}
