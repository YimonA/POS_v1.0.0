import { useContextCustom } from "../../context/stateContext";
import CreateUserStepper from "./CreateUserStepper";
import { BsArrowRightShort } from "react-icons/bs";
import Cookies from "js-cookie";
// import { useGetBrandsQuery } from "../../redux/api/brandApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUsers } from "../../redux/services/userSlice";
import { DateInput } from "@mantine/dates";
import { Group, Radio } from "@mantine/core";

const CreateUserInfo = () => {
  const {
    uName,
    setUName,
    uDOB,
    setUDOB,
    uGender,
    setUGender,
    uAddress,
    setUAddress,
    nextStepperHandler,
  } = useContextCustom();
  const token = Cookies.get("token");
 

  // const nextHandler = (endpoint) => {
  //   nextStepperHandler(endpoint);
  // };

  useEffect(() => {
    // console.log("dob", uDOB);
  }, [uDOB]);

  return (
    <div className=" ">
      <form
        action=""
        className=" flex gap-20 justify-start items-stretch bg-[--base-color]"
      >
        <div className=" flex flex-col gap-5 px-14 py-10 w-[680px] h-fit bg-[var(--sidebar-color)]">
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              value={uName}
              onChange={(e) => setUName(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Date of Birth
            </label>
            <DateInput
              valueFormat="DD-MM-YYYY"
              label="choose Date"
              placeholder="DOB"
              value={uDOB}
              onChange={setUDOB}
              maw={400}
              mx="auto"
              className="w-[380px] border-[var(--border-color)] text-[var(--secondary-color)] mx-0"
            />
          </div>

          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Gender
            </label>
            <Radio.Group name="gender" withAsterisk>
              <Group mt="xs">
                <Radio
                  checked={uGender}
                  onChange={(e) => setUGender(e.target.value)}
                  value="male"
                  label="Male"
                />
                <Radio
                  checked={uGender}
                  onChange={(e) => setUGender(e.target.value)}
                  value="female"
                  label="Female"
                />
              </Group>
            </Radio.Group>
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Address
            </label>
            <textarea
              value={uAddress}
              onChange={(e) => setUAddress(e.target.value)}
              placeholder=""
              className="w-[380px] h-[100px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
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
      </form>
    </div>
  );
};

export default CreateUserInfo;
