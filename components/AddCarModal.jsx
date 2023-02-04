import React, { useEffect, useMemo } from "react";
import Modal from "./Modal";
import Button from "./Button";
import InputText from "./InputText";
import Textarea from "./Textarea";
import InputFile from "./InputFile";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddCarModal({ isOpen, closeModal, getCars }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    console.log(errors.name);
    const formData = new FormData();

    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);

    let res = await axios.post("/api/car", formData);
    toast.success(res.data.message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    closeModal();
    getCars();
    reset();
  };

  const nameValidation = () => {
    return {
      required: "Name is required",
    };
  };

  const descriptionValidation = () => {
    return {
      required: "Description is required",
    };
  };

  const fileValidation = () => {
    return {
      required: "File is required",
    };
  };

  return (
    <Modal {...{ isOpen, closeModal, sm: true }}>
      <Modal.Title>Add Data</Modal.Title>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 py-2"
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name">Name</label>
            <InputText
              {...{ id: "name", name: "name" }}
              {...register("name", nameValidation)}
              invalid={errors.name ? "true" : ""}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="description">Description</label>
            <Textarea
              {...{ id: "description", name: "description" }}
              {...register("description", descriptionValidation)}
              invalid={errors.description ? "true" : ""}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="image">Photo</label>
            <InputFile
              {...{ id: "image", name: "image" }}
              {...register("image", fileValidation)}
              invalid={errors.image ? "true" : ""}
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>
          <div className="flex gap-x-2">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Submit
            </Button>
            <Button
              className="bg-slate-500 hover:bg-slate-600 text-white"
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
