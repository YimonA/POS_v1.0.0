import { Link } from "react-router-dom";
import TodaySaleOverview from "./TodaySaleOverview";
import { useContextCustom } from "../context/stateContext";

const Recent = () => {
  const {liHandler}=useContextCustom();
  return (
      <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
        {/* Breadcrumg start */}
        <div className=" flex justify-between items-center ">
          <div>
            <p className="breadcrumb-title	">Recent</p>
            <p className=" text-[14px] text-white opacity-70  select-none">
              Sale / Recent
            </p>
          </div>
          <Link to={"/cashier"}>
            <button
              onClick={() => liHandler("cashier")}
              className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
            >
              Go to Shop
            </button>
          </Link>
        </div>
        {/* Breadcrumg end */}
        <TodaySaleOverview />
      </div>
  );
};

export default Recent;
