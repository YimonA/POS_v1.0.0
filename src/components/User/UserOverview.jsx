import { BsArrowRight } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useGetUsersQuery } from "../../redux/api/userApi";
import { useEffect } from "react";
import { addUsers } from "../../redux/services/userSlice";

const UserOverview = () => {
  const { liHandler, setProfileData } = useContextCustom();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { data } = useGetUsersQuery(token);
  const users = useSelector((state) => state.userSlice.users);

  useEffect(() => {
    dispatch(addUsers({ users: data }));
    console.log("data", data);
    // console.log("users", users);
  }, [data]);

  const profileDetailHandler = (user) => {
    setProfileData(user);
    console.log("user", user);
  };

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      <div className=" flex justify-between items-center mb-5">
        <div>
          <p className="breadcrumb-title	">User Overview</p>
          <p className=" text-[14px] text-white opacity-70 select-none">
            User / User Overview
          </p>
        </div>
        <Link to={"/create-user"}>
          <button
            onClick={() => liHandler("user create")}
            className="w-[170px] h-[40px] font-semibold text-[16px] myBlueBtn flex justify-center items-center gap-2"
          >
            <BsPlusLg size={"1.3rem"} />
            Create user
          </button>
        </Link>
      </div>
      {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
      <p className="breadcrumb-title mb-5">Staff Overview</p>

      <div className=" flex justify-between items-center mb-[30px]">
        <div className="basis-1/3 h-[34px] border-gray-700 rounded border flex items-center px-2 py-1">
          <BsSearch className=" text-gray-400 me-3" />
          <input
            type="text"
            placeholder="search"
            className=" w-[250px] outline-none bg-transparent text-gray-300 text-sm font-semibold"
          />
        </div>
        <div className=" flex gap-5 items-center">
          <label
            htmlFor=""
            className=" text-[var(--gray-color)] text-[14px] font-normal"
          >
            Sort:{" "}
          </label>
          <select
            placeholder="Export"
            name="sort"
            // value={sortValue}
            // onChange={(e) => setSortValue(e.target.value)}
            className="recent-dropdown "
          >
            {/* <option value="" className="hidden">
              Export
            </option> */}
            <option value="last" className="recent-dropdown">
              Last
            </option>
          </select>
          <label
            htmlFor=""
            className=" text-[var(--gray-color)] text-[14px] font-normal"
          >
            Filter:{" "}
          </label>
          <select
            placeholder="Export"
            name="sort"
            // value={sortValue}
            // onChange={(e) => setSortValue(e.target.value)}
            className="recent-dropdown "
          >
            {/* <option value="" className="hidden">
              Export
            </option> */}
            <option value="all" className="recent-dropdown">
              All Files
            </option>
          </select>
        </div>
      </div>
      {/* stock table start */}
      <table className=" w-full text-gray-200 border border-gray-700 text-sm ">
        <thead>
          <tr className=" border-b border-b-gray-700">
            <th className=" py-4 text-center px-1 uppercase font-medium">No</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Name</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">
              Position
            </th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Email</th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
              Created At
            </th>

            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium"></th>
          </tr>
        </thead>
        <tbody className=" text-gray-100">
          {users?.map((user, index) => {
            return (
              <tr key={user?.id} className=" border-b border-b-gray-700">
                <td className="px-1 text-center  py-4">{index + 1}</td>
                <td className="px-1 text-end py-4 ">{user?.name}</td>
                <td className="px-1 text-end py-4">{user?.role}</td>

                <td className="px-1 py-4 text-end">{user?.email}</td>
                <td className="px-1 py-4 text-end">{user?.created_at}</td>

                <td className="px-1 py-4 text-end">
                  <div className=" pe-20 flex justify-end items-center gap-2 z-20">
                    <Link to={"/banned-user"}>
                      <button className="inline-block bg-gray-700 w-8 h-8 p-1 rounded-full cursor-pointer">
                        <BiMinus
                          size={"1.3rem"}
                          className="text-[var(--secondary-color)]"
                        />
                      </button>
                    </Link>

                    <Link to={"/user-edit"}>
                      <button className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer">
                        <BsPencil
                          size={"0.8rem"}
                          className="text-[var(--secondary-color)]"
                        />
                      </button>
                    </Link>

                    <Link to={"/user-profile"}>
                      <button
                        onClick={() => profileDetailHandler(user)}
                        className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer"
                      >
                        <BsArrowRight
                          size={"1rem"}
                          className="text-[var(--secondary-color)]"
                        />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* stock table end */}

      {/* pagination start */}
      <div>
        <Button.Group className=" border-[--border-color] pt-20 flex justify-end">
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            <MdArrowBackIosNew />
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            1
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            2
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            3
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            <MdArrowForwardIos />
          </Button>
        </Button.Group>
      </div>
      {/* pagination end */}
    </div>
  );
};

export default UserOverview;
