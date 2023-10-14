import { BsArrowRight } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  useBannedUsersMutation,
  useGetUsersQuery,
} from "../../redux/api/userApi";
import { useEffect } from "react";
import { addUsers, setSearchTerm } from "../../redux/services/userSlice";
import Swal from "sweetalert2";
import { useState } from "react";

const UserOverview = () => {
  const [sortValue, setSortValue] = useState("A-Z");

  const { liHandler } = useContextCustom();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { data } = useGetUsersQuery(token);
  const [bannedUsers] = useBannedUsersMutation();
  const nav = useNavigate();
  const users = useSelector((state) => state.userSlice.users);
  const searchTerm = useSelector((state) => state.userSlice.searchTerm);

  useEffect(() => {
    dispatch(addUsers(data?.users));
  }, [data]);

  const bannedHandler = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure to ban the staff?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, ban!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Banned!", "The staff has been banned.", "success");
        const { data } = await bannedUsers({ id, token });
        // console.log("banuser", data);
        setTimeout(() => {
          liHandler("staff banned");
          nav("/banned-staff");
        }, 1000);
      }
    });
  };

  const staffDetailHandler = (user) => {
    nav(`/staff-profile/${user?.id}`);
  };

  const rows = users?.filter((user) => {
    if (searchTerm === "") {
      return user;
    } else if (
      user?.name.toLowerCase().includes(searchTerm?.toLocaleLowerCase())
    ) {
      return users;
    }
  });

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      <div className=" flex justify-between items-center mb-5">
        <div>
          <p className="breadcrumb-title	">Staff Overview</p>
          <p className=" text-[14px] text-white opacity-70 select-none">
            Staff / Staff Overview
          </p>
        </div>
      </div>
      {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
      <p className="breadcrumb-title mb-5">Staff Overview</p>

      <div className=" flex justify-between items-center mb-[30px]">
        <div className="basis-1/3 h-[34px] border-gray-700 rounded border flex items-center px-2 py-1">
          <BsSearch className=" text-gray-400 me-3" />
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className=" w-[250px] outline-none bg-transparent text-gray-300 text-sm font-semibold"
          />
        </div>
        <div className=" flex gap-5 items-center">
          <label
            htmlFor=""
            className=" text-[var(--gray-color)] text-[14px] font-normal"
          >
            Sort:
          </label>
          <select
            placeholder="Export"
            name="sort"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="recent-dropdown "
          >
            <option value="A-Z" className="recent-dropdown">
              A-Z
            </option>
            <option value="Z-A" className="recent-dropdown">
              Z-A
            </option>
          </select>
          <label
            htmlFor=""
            className=" text-[var(--gray-color)] text-[14px] font-normal"
          >
            Filter:
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
          {sortValue === "A-Z"
            ? rows
                ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((user, index) => (
                  <tr key={user?.id} className=" border-b border-b-gray-700">
                    <td className="px-1 text-center  py-4">{index + 1}</td>
                    <td className="px-1 text-end py-4 ">{user?.name}</td>
                    <td className="px-1 text-end py-4">{user?.role}</td>
                    <td className="px-1 py-4 text-end">{user?.email}</td>
                    <td className="px-1 py-4 text-end">
                      {user?.created_at.substring(0, 10)}
                    </td>
                    <td className="px-1 py-4 text-end">
                      <div className=" pe-20 flex justify-end items-center gap-2 z-20">
                        <button
                          onClick={(e) => bannedHandler(e, user?.id)}
                          className="inline-block bg-gray-700 w-8 h-8 p-1 rounded-full cursor-pointer"
                        >
                          <BiMinus
                            size={"1.3rem"}
                            className="text-[var(--secondary-color)]"
                          />
                        </button>

                        <button
                          onClick={() => staffDetailHandler(user)}
                          className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer"
                        >
                          <BsArrowRight
                            size={"1rem"}
                            className="text-[var(--secondary-color)]"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            : rows
                ?.sort((a, b) => b.name.localeCompare(a.name))
                ?.map((user, index) => (
                  <tr key={user?.id} className=" border-b border-b-gray-700">
                    <td className="px-1 text-center  py-4">{index + 1}</td>
                    <td className="px-1 text-end py-4 ">{user?.name}</td>
                    <td className="px-1 text-end py-4">{user?.role}</td>
                    <td className="px-1 py-4 text-end">{user?.email}</td>
                    <td className="px-1 py-4 text-end">
                      {user?.created_at.substring(0, 10)}
                    </td>
                    <td className="px-1 py-4 text-end">
                      <div className=" pe-20 flex justify-end items-center gap-2 z-20">
                        <button
                          onClick={(e) => bannedHandler(e, user?.id)}
                          className="inline-block bg-gray-700 w-8 h-8 p-1 rounded-full cursor-pointer"
                        >
                          <BiMinus
                            size={"1.3rem"}
                            className="text-[var(--secondary-color)]"
                          />
                        </button>

                        <button
                          onClick={() => staffDetailHandler(user)}
                          className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer"
                        >
                          <BsArrowRight
                            size={"1rem"}
                            className="text-[var(--secondary-color)]"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
          }
        </tbody>
      </table>
      {/* stock table end */}
    </div>
  );
};

export default UserOverview;
