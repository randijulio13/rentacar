import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "./Button";
import InputFile from "./InputFile";
import InputText from "./InputText";
import Modal from "./Modal";
import Textarea from "./Textarea";

export default function AddCarModal({ isOpen, closeModal, getCars }) {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [color, setColor] = useState('#000000')

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("color", data.color);
    formData.append("price", data.price);
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

  useEffect(() => {
    setValue('color', color)
  }, [color])

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
              {...register("name", {
                required: "Name is required",
              })}
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
              {...register("description", {
                required: "Description is required",
              })}
              invalid={errors.description ? "true" : ""}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="price">Price</label>
            <InputText type="number" id="price" name="price" {...register("price", {
              required: "Price is required",
            })}
              invalid={errors.price ? "true" : ""}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="color">Color</label>
            <input type="color" id="color" className="h-10 border-none rounded w-full outline-none" onChange={(e) => setColor(e.target.value)} />
            <input type="hidden" {...register('color', { value: color, required: true })} />
            {errors.color && (
              <span className="text-red-500">{errors.color.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="image">Photo</label>
            <InputFile
              {...{ id: "image", name: "image" }}
              {...register("image", {
                required: "File is required",
              })}
              invalid={errors.image ? "true" : ""}
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>
          <div className="flex gap-x-2">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" type="submit">
              Submit
            </Button>
            <Button
              type="button"
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
