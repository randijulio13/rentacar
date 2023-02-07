import axios from "axios";
import classNames from "classnames";
import Image from "next/image";
import qs from "querystring";
import React, { useCallback, useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import AddCarModal from "../../components/AddCarModal";
import Button from "../../components/Button";
import DeleteCarModal from "../../components/DeleteCarModal";
import Template from "../../components/Template";

export default function Car() {
  const [cars, setCars] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    getCars();
  }, [page, limit]);

  const getCars = useCallback(async () => {
    let query = { page, limit };
    let { data } = await axios.get(`/api/car?${qs.stringify(query)}`);
    setCars(data);
  }, [page, limit]);

  const showDeleteModal = (id) => {
    setSelectedId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const closeAddModal = () => {
    setAddModal(false);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/car/${selectedId}`);
    getCars();
    toast.success("Data deleted successful", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    closeDeleteModal();
  };

  return (
    <Template>
      <div className="flex gap-x-2 mb-4">
        <Button
          className="bg-slate-700 hover:bg-slate-800 text-white flex items-center gap-2"
          onClick={() => setAddModal(true)}
        >
          <MdAddCircle /> Add Data
        </Button>
        <select
          onChange={(e) => setLimit(e.target.value)}
          className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 min-h-full rounded outline-none"
        >
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cars?.data?.map((car) => {
          return (
            <div
              className="bg-white min-h-max rounded-lg overflow-hidden shadow"
              key={car.id}
            >
              <div className="h-44 bg-red-500 overflow-hidden items-center">
                <img
                  src={`/images/${car.image}`}
                  alt=""
                  className="object-cover min-h-full w-full hover:scale-105 duration-200"
                />
              </div>
              <div className="px-4 py-2">
                <h1 className="font-semibold text-lg">{car.name}</h1>
                <span className="text-gray-400 text-sm">Description:</span>
                <p>{car.description}</p>
              </div>
              <div className="border-t-[1px] px-4 py-2 flex space-x-1">
                <Button className="bg-yellow-500 hover:bg-yellow-500 text-white">
                  Detail
                </Button>
                <button
                  onClick={() => showDeleteModal(car.id)}
                  className="bg-red-500 py-1 px-3 hover:bg-red-600 focus:outline-none focus:ring-2 ring-red-300 active:scale-105 duration-200 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {cars?.totalData > limit ? (
        <div className="flex mt-8">
          <button
            disabled={page == 1}
            className={classNames("px-4 py-2 border rounded-l-lg", {
              "bg-gray-200": page == 1,
            })}
            onClick={() => setPage((page) => page - 1)}
          >
            Previous
          </button>
          {Array.from(Array(cars?.totalPage), (e, i) => {
            return (
              <button
                key={i}
                disabled={i + 1 == page}
                className={classNames("px-4 py-2 border", {
                  "bg-slate-600 text-white": i + 1 == page,
                })}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            );
          })}
          <button
            disabled={page == cars.totalPage}
            className={classNames("px-4 py-2 border rounded-r-lg", {
              "bg-gray-200": page == cars.totalPage,
            })}
            onClick={() => setPage((page) => page + 1)}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
      <DeleteCarModal
        {...{
          isOpen: deleteModal,
          closeModal: closeDeleteModal,
          handleDelete,
        }}
      />
      <AddCarModal
        {...{ isOpen: addModal, closeModal: closeAddModal, getCars }}
      />
    </Template>
  );
}

Car.admin = true;
