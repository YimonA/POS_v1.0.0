import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
import { MdOutlineLogout } from "react-icons/md";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { TbClipboardList } from "react-icons/tb";
import { PiStorefrontDuotone } from "react-icons/pi";
import { FiHome } from "react-icons/fi";
import { PiUserSquareBold } from "react-icons/pi";
import { HiOutlineDocumentReport } from "react-icons/hi";

import { Accordion } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import Dot from "./Dot";
import { useLogoutMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/services/authSlice";
import Cookies from "js-cookie";
import { useContextCustom } from "../context/stateContext";
import { TfiStatsUp } from "react-icons/tfi";
// import { BrandingWatermarkOutlined } from "@mui/icons-material";

const Sidebar = () => {
  // const theme = useMantineTheme();
  // const getColor = (color) =>
  //   theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  const { setCurrent, liHandler, sidebarActived } = useContextCustom();

  const token = Cookies.get("token");
  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const addProductHandler = () => {
    setCurrent(1);
    liHandler("add product");
  };

  const logoutHandler = async () => {
    liHandler("logout");
    const data = await logout(token);
    dispatch(removeUser());
    if (data) {
      nav("/login");
    }
    console.log(data);
  };

  return (
    <div className=" w-[300px] sidebar-height border-r-[1px] border-r-[--border-color] z-20 ">
      <ul className=" ">
        <Link to={"/"} onClick={() => liHandler("overview")}>
          <li className=" li-bg ">
            <FiHome
              className=" mr-4 text-[var(--secondary-color)]"
              size={"1.5rem"}
            />
            <p
              className={`${
                sidebarActived === "overview"
                  ? "text-[var(--font-color)]"
                  : "text-[var(--secondary-color)]"
              }`}
            >
              Overview
            </p>
          </li>
        </Link>
        <Accordion variant="contained">
          {/* sale start */}
          <Accordion.Item value="photos">
            <Accordion.Control
              className="accordion-bg  "
              icon={
                <PiStorefrontDuotone
                  className="text-[var(--secondary-color)]"
                  size={"1.8rem"}
                />
              }
            >
              <p className="text-base font-['Montserrat'] font-medium">Sale</p>
            </Accordion.Control>

            <Link to={"/cashier"} onClick={() => liHandler("cashier")}>
              <Accordion.Panel className="accordion-bg li-text w-full">
                <p
                  className={`${
                    sidebarActived === "cashier"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium w-full`}
                >
                  <Dot className="z-20" />
                  Cashier
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/recent"} onClick={() => liHandler("recent")}>
              <Accordion.Panel className="accordion-bg li-text ">
                <p
                  className={`${
                    sidebarActived === "recent"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Recent
                </p>
              </Accordion.Panel>
            </Link>
          </Accordion.Item>
          {/* sale end */}

          {/* inventory start */}
          <Accordion.Item value="print">
            <Accordion.Control
              className="accordion-bg "
              icon={
                <TbClipboardList
                  className="text-[var(--secondary-color)]"
                  size={"1.8rem"}
                />
              }
            >
              <p className="text-base font-['Montserrat'] font-medium">
                Inventory
              </p>
            </Accordion.Control>
            <Link to={"/products"} onClick={() => liHandler("products")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "products"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Products
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/add-product"} onClick={addProductHandler}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "add product"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Add Product
                </p>
              </Accordion.Panel>
            </Link>
            <Link
              to={"/stock-control"}
              onClick={() => liHandler("stock control")}
            >
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "stock control"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Stock Control
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/brand"} onClick={() => liHandler("brand")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "brand"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Manage Brand
                </p>
              </Accordion.Panel>
            </Link>
          </Accordion.Item>
          {/* inventory end */}

          {/* report start */}
          <Accordion.Item value="report">
            <Accordion.Control
              className="accordion-bg "
              icon={
                <HiOutlineDocumentReport
                  className="text-[var(--secondary-color)]"
                  size={"1.8rem"}
                />
              }
            >
              <p className="text-base font-['Montserrat'] font-medium">
                Report
              </p>
            </Accordion.Control>
            <Link to={"/stock"} onClick={() => liHandler("stock")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "stock"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Stock
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/sale"} onClick={() => liHandler("sale")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "sale"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Sale
                </p>
              </Accordion.Panel>
            </Link>
          </Accordion.Item>
          {/* report end */}

          {/* Finance start */}
          <Accordion.Item value="finance">
            <Accordion.Control
              className="accordion-bg "
              icon={
                <TfiStatsUp
                  className="text-[var(--secondary-color)]"
                  size={"1.5rem"}
                />
              }
            >
              <p className="text-base font-['Montserrat'] font-medium">
                Finance
              </p>
            </Accordion.Control>
            <Link to={"/finance-daily"} onClick={() => liHandler("daily")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "daily"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Daily
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/finance-monthly"} onClick={() => liHandler("monthly")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "monthly"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Monthly
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/finance-yearly"} onClick={() => liHandler("yearly")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "yearly"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Yearly
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/finance-custom"} onClick={() => liHandler("custom")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "custom"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Custom
                </p>
              </Accordion.Panel>
            </Link>
          </Accordion.Item>
          {/* Finance end */}

          {/* user start */}
          <Accordion.Item value="user">
            <Accordion.Control
              className="accordion-bg "
              icon={
                <PiUserCirclePlusBold
                  className="text-[var(--secondary-color)]"
                  size={"1.8rem"}
                />
              }
            >
              <p className="text-base font-['Montserrat'] font-medium">User</p>
            </Accordion.Control>
            <Link
              to={"/user-overview"}
              onClick={() => liHandler("user overview")}
            >
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "user overview"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Overview
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/create-user"} onClick={() => liHandler("user create")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "user create"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Create User
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/user-edit"} onClick={() => liHandler("edit")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "edit"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Edit User
                </p>
              </Accordion.Panel>
            </Link>
            <Link to={"/banned-user"} onClick={() => liHandler("user banned")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "user banned"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  Banned User
                </p>
              </Accordion.Panel>
            </Link>
          </Accordion.Item>
          {/* user end */}
        </Accordion>

        {/* media start */}
        <Link to={"/media"} onClick={() => liHandler("media")}>
          <li className=" li-bg ">
            <FilterOutlinedIcon
              className=" mr-3 text-[var(--secondary-color)]"
              size={"1.8rem"}
            />
            <p
              className={`${
                sidebarActived === "media"
                  ? "text-[var(--font-color)]"
                  : "text-[var(--secondary-color)]"
              }`}
            >
              Media
            </p>
          </li>
        </Link>
        {/* media end */}

        {/* profile start */}
        <Accordion>
          <Accordion.Item value="camera">
            <Accordion.Control
              className="accordion-bg "
              icon={
                <PiUserSquareBold
                  className="text-[var(--secondary-color)]"
                  size={"1.8rem"}
                />
              }
            >
              <p className="text-base font-['Montserrat'] font-medium">
                Profile
              </p>
            </Accordion.Control>
            <Link to={"/user-profile"} onClick={() => liHandler("my account")}>
              <Accordion.Panel className="accordion-bg li-text">
                <p
                  className={`${
                    sidebarActived === "my account"
                      ? "text-[var(--font-color)]"
                      : "text-[var(--secondary-color)]"
                  } text-sm font-['Montserrat'] font-medium `}
                >
                  <Dot className="z-20" />
                  My Account
                </p>
              </Accordion.Panel>
            </Link>
            
          </Accordion.Item>
        </Accordion>
        {/* profile end */}

        {/* logout start */}
        <li className=" li-bg" onClick={logoutHandler}>
          <MdOutlineLogout
            className=" mr-2 text-[var(--secondary-color)]"
            size={"1.8rem"}
          />
          <p
            className={`${
              sidebarActived === "logout"
                ? "text-[var(--font-color)]"
                : "text-[var(--secondary-color)]"
            }`}
          >
            Logout
          </p>
        </li>
        {/* logout start */}
      </ul>
    </div>
  );
};

export default Sidebar;

//${showSidebar? "sm:w-[50%] md:w-[270px]":"w-0 -translate-x-[300px]"}
