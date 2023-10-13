import { useContextCustom } from "../../context/stateContext";
import { BsArrowRightShort } from "react-icons/bs";
import EditProfileStepper from "./EditProfileStepper";
import { useEffect } from "react";

const EditContactInfo = () => {
  const {
    sdata,
    editUPosition,
    setEditUPosition,
    editUEmail,
    setEditUEmail,
    editUPhone,
    setEditUPhone,
    nextStepperHandler,
  } = useContextCustom();

  useEffect(() => {
    setEditUPosition(sdata?.role);
    setEditUEmail(sdata?.email);
    setEditUPhone(sdata?.phone_number);
  });

  return (
    <div className="flex gap-20 justify-start items-stretch bg-[--base-color]">
      <div className=" w-[680px] h-fit bg-[var(--sidebar-color)]">
        <form action="" className="px-14 py-10 flex flex-col gap-5">
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Position
            </label>
            <input
              type="text"
              defaultValue={editUPosition}
              onChange={(e) => setEditUPosition(e.target.value)}
              placeholder=""
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              defaultValue={editUEmail}
              onChange={(e) => setEditUEmail(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>

          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Phone
            </label>
            <input
              type="text"
              defaultValue={editUPhone}
              onChange={(e) => setEditUPhone(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
        </form>
      </div>
      <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
        <EditProfileStepper />
        <button
          onClick={() => nextStepperHandler(4)}
          className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
        >
          Next <BsArrowRightShort size={"1.5rem"} />
        </button>
      </div>
    </div>
  );
};

export default EditContactInfo;
