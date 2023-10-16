import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { useContextCustom } from "../context/stateContext";

const Modal = ({ title, modalView }) => {
  Modal.propTypes = {
    title: PropTypes.string,
    modalView: PropTypes.any,
  };
  const { showModal, setShowModal } = useContextCustom();
  return (
    <div
      className={`${
        showModal ? "flex" : "hidden"
      } justify-center items-start absolute top-0 left-0 w-screen h-full pt-10`}
    >
      <div className="z-20 absolute top-0 left-0 h-full w-screen bg-black opacity-70"></div>
      <div className="z-50 min-w-[500px] min-h-[500px] flex flex-col justify-start items-center bg-[var(--sidebar-color)] border border-[var(--border-color)]">
        <div className="w-full h-[60px] px-5 flex justify-between items-center gap-10 bg-black mb-10">
          <span className="select-none text-[18px] font-semibold text-[var(--secondary-color)]">
            {title}
          </span>
          <MdClose
            onClick={() => setShowModal(false)}
            size={"1.5rem"}
            className="cursor-pointer text-[var(--secondary-color)]"
          />
        </div>
        {modalView}
      </div>
    </div>
  );
};

export default Modal;
