import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Button } from "@mantine/core";
import { useContextCustom } from "../../context/stateContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  addBannedUsers,
  setSearchBannedUser,
} from "../../redux/services/userSlice";
import {
  useGetBannedUsersQuery,
  useRestoreUserMutation,
} from "../../redux/api/userApi";
import Swal from "sweetalert2";
import { useState } from "react";

const BannedUser = () => {
  const [sortValue, setSortValue] = useState("A-Z");

  const { liHandler } = useContextCustom();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { data, refetch } = useGetBannedUsersQuery(token);
  const nav = useNavigate();
  const [restoreUser] = useRestoreUserMutation();
  const bannedUsers = useSelector((state) => state.userSlice.bannedUsers);
  const searchBannedUser = useSelector(
    (state) => state.userSlice.searchBannedUser
  );

  // console.log("ddd", data);
  // console.log("bannedUsers", bannedUsers);
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    dispatch(addBannedUsers(data?.users));
  }, [data]);

  const RestoreHandler = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure to restore the staff?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Restored!", "The staff has been restored.", "success");
        const { data } = await restoreUser({ id, token });
        // console.log("restore Users", data);
        liHandler("staff overview");
        nav("/staff-overview");
      }
    });
  };

  const rows = bannedUsers?.filter((bannedUser) => {
    if (searchBannedUser === "") {
      return bannedUser;
    } else if (
      bannedUser?.name
        .toLowerCase()
        .includes(searchBannedUser?.toLocaleLowerCase())
    ) {
      return bannedUsers;
    }
  });

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      <div className=" flex justify-between items-center mb-5">
        <div>
          <p className="breadcrumb-title	">Banned Staff </p>
          <p className=" text-[14px] text-white opacity-70 select-none">
            Staff / Banned Staff Overview
          </p>
        </div>
      </div>
      {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
      <p className="breadcrumb-title mb-5">Banned Staff Overview</p>

      <div className=" flex justify-between items-center mb-[30px]">
        <div className="basis-1/3 h-[34px] border-gray-700 rounded border flex items-center px-2 py-1">
          <BsSearch className=" text-gray-400 me-3" />
          <input
            type="text"
            placeholder="search"
            value={searchBannedUser}
            onChange={(e) => dispatch(setSearchBannedUser(e.target.value))}
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
          {bannedUsers?.length > 0 ? (
            sortValue == "A-Z" ? (
              rows
                ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((bannedUser, index) => (
                  <tr
                    key={bannedUser?.id}
                    className=" border-b border-b-gray-700 cursor-pointer"
                  >
                    <td className="px-1 text-center  py-4">{index + 1}</td>
                    <td className="px-1 text-end py-4 ">{bannedUser?.name}</td>
                    <td className="px-1 text-end py-4">{bannedUser.role}</td>
                    <td className="px-1 pe-4 py-4 text-end">
                      {bannedUser?.email}
                    </td>
                    <td className="px-1 pe-4 py-4 text-end">
                      {bannedUser?.created_at.substring(0, 10)}
                    </td>
                    <td className="px-1 pe-4 py-4 text-center">
                      <button
                        onClick={(e) => RestoreHandler(e, bannedUser?.id)}
                        className="w-[100px] h-[30px] font-semibold text-[16px] bg-transparent text-[var(--secondary-color)] border-[1px] border-[var(--border-color)] rounded-[5px] "
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              rows
                ?.sort((a, b) => b.name.localeCompare(a.name))
                ?.map((bannedUser, index) => (
                  <tr
                    key={bannedUser?.id}
                    className=" border-b border-b-gray-700 cursor-pointer"
                  >
                    <td className="px-1 text-center  py-4">{index + 1}</td>
                    <td className="px-1 text-end py-4 ">{bannedUser?.name}</td>
                    <td className="px-1 text-end py-4">{bannedUser.role}</td>
                    <td className="px-1 pe-4 py-4 text-end">
                      {bannedUser?.email}
                    </td>
                    <td className="px-1 pe-4 py-4 text-end">
                      {bannedUser?.created_at.substring(0, 10)}
                    </td>
                    <td className="px-1 pe-4 py-4 text-center">
                      <button
                        onClick={(e) => RestoreHandler(e, bannedUser?.id)}
                        className="w-[100px] h-[30px] font-semibold text-[16px] bg-transparent text-[var(--secondary-color)] border-[1px] border-[var(--border-color)] rounded-[5px] "
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))
            )
          ) : (
            <tr>
              <td className="px-1 text-center py-4 " colSpan={6}>
                There is no data now.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* stock table end */}
    </div>
  );
};

export default BannedUser;
