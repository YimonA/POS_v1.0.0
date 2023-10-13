import { useContextCustom } from "../../context/stateContext";
import EditProfileStepper from "./EditProfileStepper";
import { BsArrowRightShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Group, Radio } from "@mantine/core";
import {
  editUserAddress,
  editUserDOB,
  editUserGender,
  editUserName,
} from "../../redux/services/userSlice";

const EditProfileInfo = () => {
  const { nextStepperHandler } = useContextCustom();

  const dispatch = useDispatch();
  const editUser = useSelector((state) => state.userSlice.editUser);

  const nextHandler = () => {
    nextStepperHandler(4);
  };

  return (
    <div className=" ">
      <form
        onSubmit={nextHandler}
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
              defaultValue={editUser?.name}
              onChange={(e) => dispatch(editUserName(e.target.value))}
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
            {/* <DateInput
              valueFormat="DD-MM-YYYY"
              label="choose Date"
              placeholder={editUDOB}
              defaultValue={editUDOB}
              onChange={setEditUDOB}
              maw={400}
              mx="auto"
              className="w-[380px] border-[var(--border-color)] text-[var(--secondary-color)] mx-0"
            /> */}
            <input
              type="text"
              defaultValue={editUser?.date_of_birth}
              onChange={(e) => dispatch(editUserDOB(e.target.value))}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
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
                  checked={editUser?.gender}
                  onChange={(e) => dispatch(editUserGender(e.target.value))}
                  value="male"
                  label="Male"
                />
                <Radio
                  checked={editUser?.gender}
                  onChange={(e) => dispatch(editUserGender(e.target.value))}
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
              value={editUser?.address}
              onChange={(e) => dispatch(editUserAddress(e.target.value))}
              placeholder=""
              className="w-[380px] h-[100px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
        </div>
        <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
          <EditProfileStepper />
          <button
            onClick={nextHandler}
            className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
          >
            Next <BsArrowRightShort size={"1.5rem"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileInfo;
