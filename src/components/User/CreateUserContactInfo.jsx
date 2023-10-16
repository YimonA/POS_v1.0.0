import { useContextCustom } from "../../context/stateContext";
import CreateUserStepper from "./CreateUserStepper";
import { BsArrowRightShort } from "react-icons/bs";

const CreateUserContactInfo = () => {
  const {
    uPosition,
    setUPosition,
    uEmail,
    setUEmail,
    uPhone,
    setUPhone,
    uPassword,
    setUPassword,
    uConfirmPassword,
    setUConfirmPassword,
    nextStepperHandler,
  } = useContextCustom();

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
              value={uPosition}
              onChange={(e) => setUPosition(e.target.value)}
              placeholder="admin or staff"
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Email{" "}
            </label>
            <input
              type="text"
              value={uEmail}
              onChange={(e) => setUEmail(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>

          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
Phone            </label>
            <input
              type="text"
              value={uPhone}
              onChange={(e) => setUPhone(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              value={uPassword}
              onChange={(e) => setUPassword(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={uConfirmPassword}
              onChange={(e) => setUConfirmPassword(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>

        </form>
      </div>
      <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
        <CreateUserStepper />
        <button
          onClick={()=>nextStepperHandler(4)}
          className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
        >
          Next <BsArrowRightShort size={"1.5rem"} />
        </button>
      </div>
    </div>
  );
};

export default CreateUserContactInfo;
