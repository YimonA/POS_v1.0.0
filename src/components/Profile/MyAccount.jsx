import { Link, useNavigate } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { BsClockFill } from "react-icons/bs";
import { BsInfoCircleFill } from "react-icons/bs";
import { LuMailOpen } from "react-icons/lu";
import { LuPhoneCall } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useChangeProfilePWMutation } from "../../redux/api/profileApi";
import Cookies from "js-cookie";
import { useLogoutMutation } from "../../redux/api/authApi";
import { removeUser } from "../../redux/services/authSlice";

const MyAccount = () => {
  const { liHandler } = useContextCustom();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();
  const [changePassword, setChangePassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const token = Cookies.get("token");
  const [changeProfilePW] = useChangeProfilePWMutation();
  const nav = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authSlice.user);

  const logoutHandler = async () => {
    const data = await logout(token);
    dispatch(removeUser());
    if (data) {
      nav("/login");
    }
    console.log(data);
  };

  const changePWHandler = (e) => {
    e.preventDefault();
    const newData = {
      current_password: currentPassword,
      password: changePassword,
      password_confirmation: confirmPassword,
    };
    console.log("pw", newData);
    changeProfilePW({ newData, token });
    logoutHandler();
  };
  return (
    <div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">Profile</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Profile / My Account / Information
          </p>{" "}
        </div>
        <Link to={"/profile-edit"}>
          <button
            onClick={() => liHandler("edit")}
            className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
          >
            Edit Profile
          </button>
        </Link>
      </div>
      {/* Breadcrumg end */}

      <div className="">
        <div className="px-10 h-fit bg-[var(--sidebar-color)]">
          <div className=" flex justify-between items-center">
            <div className=" flex items-center gap-10">
              <div className="relative py-10">
                <img
                  src={
                    user?.photo === null
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
                      : user?.photo
                  }
                  className="-mt-[70px] w-[140px] h-[140px] rounded-full  flex justify-center items-center object-cover object-center"
                />
                {/* <div className="absolute bottom-[40px] right-3 w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                <PiPencilSimpleLineBold />
              </div> */}
              </div>

              <div className="w-fit">
                <h1 className=" text-[26px] text-white font-semibold">
                  {user?.name}{" "}
                </h1>
                <span className=" text-[14px] font-medium text-[#C5C1C1]">
                  {user?.role} /
                  <BsClockFill className="m-0 inline text-[var(--font-color)] mx-2" />
                  Active in 1 hr
                </span>
              </div>
            </div>
            <div className=" flex justify-end items-center gap-5 z-20">
              <button className="inline-block bg-gray-700 w-10 h-10 p-3 rounded-full cursor-pointer">
                <LuMailOpen
                  size={"1rem"}
                  className="text-[var(--secondary-color)]"
                />
              </button>
              <button className="inline-block bg-gray-700 w-10 h-10 p-3 rounded-full cursor-pointer">
                <LuPhoneCall
                  size={"1rem"}
                  className="text-[var(--secondary-color)]"
                />
              </button>
            </div>
          </div>
          <div className=" border-b-2 border-b-[var(--border-color)] h-[50px] flex justify-start items-center gap-2">
            <BsInfoCircleFill
              size={"1rem"}
              className="text-[var(--font-color)]"
            />
            <p onClick={() => setShowChangePassword(false)}
 className="text-white text-[16px] cursor-pointer">Personal</p>
            <BsInfoCircleFill
              size={"1rem"}
              className="ms-4 text-[var(--font-color)] "
            />
            <p
              onClick={() => setShowChangePassword(true)}
              className="text-white text-[16px] cursor-pointer"
            >
              Change Password
            </p>
          </div>
          {showChangePassword ? (
            <form
              onSubmit={changePWHandler}
              action=""
              className="flex flex-col gap-5 py-10 "
            >
              <div className=" flex justify-start items-start">
                <label
                  htmlFor=""
                  className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
                />
              </div>
              <div className=" flex justify-start items-start">
                <label
                  htmlFor=""
                  className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
                >
                  Change Password
                </label>
                <input
                  type="password"
                  value={changePassword}
                  onChange={(e) => setChangePassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
                />
              </div>
              <button className="w-[200px] h-[40px] myBlueBtn font-medium text-[14px] my-5 mx-auto">
                Change Password
              </button>
            </form>
          ) : (
            <div className=" flex justify-between items-center py-10">
              <div className="w-fit flex flex-col gap-5 basis-1/2">
                <p className=" font-medium text-[18px] text-[#B9B9B9]">
                  Date of Birth
                </p>
                <p className=" font-medium text-[18px] text-[#B9B9B9]">
                  Gender
                </p>
                <p className=" font-medium text-[18px] text-[#B9B9B9]">Phone</p>
                <p className=" font-medium text-[18px] text-[#B9B9B9]">Mail</p>
                <p className=" font-medium text-[18px] text-[#B9B9B9]">
                  Address
                </p>
              </div>
              <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
                <p className=" font-medium text-[18px] text-white">
                  : {user?.date_of_birth}
                </p>
                <p className=" font-medium text-[18px] text-white">
                  : {user?.gender}
                </p>
                <p className=" font-medium text-[18px] text-white">
                  : {user?.phone_number}
                </p>
                <p className=" font-medium text-[18px] text-white">
                  : {user?.email}
                </p>
                <p className=" font-medium text-[18px] text-white">
                  : {user?.address}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
