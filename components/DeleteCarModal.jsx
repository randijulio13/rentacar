import Button from "./Button";
import Modal from "./Modal";

export default function DeleteCarModal({ isOpen, closeModal, handleDelete }) {
  return (
    <>
      <Modal {...{ isOpen, closeModal }}>
        <Modal.Title>Delete this data?</Modal.Title>
        <Modal.Body>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              This action cannot be reverted.
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Yes, Delete
            </Button>
            <Button onClick={closeModal}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
