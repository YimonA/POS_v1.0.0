// import { useContextCustom } from "../context/stateContext";
import { BiMenu } from "react-icons/bi";
import {PiMoonStarsFill} from "react-icons/pi"
import {BiUserCircle} from "react-icons/bi"
import {BiSolidBellRing} from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom";
import { useContextCustom } from "../context/stateContext";

const Navbar = () => {
const nav=useNavigate()
const {liHandler}=useContextCustom();
const staffHandler=()=>{
  liHandler('my account')
  nav('/my-profile')
}

  return (
    <div className="container-fluid h-[45px] p-5 flex justify-between items-center bg-[--base-color] text-[--secondary-color] border-2 border-[--border-color]">
      <div className=" flex gap-1 items-center">
        <Link to={'/'}>
        <BiMenu
          size={"2rem"}
        />        </Link>

        <h2 className="text-title-logo">MMS</h2>
      </div>
      <div className=" flex gap-2.5 items-center ">
        <BiSolidBellRing size={"1.5rem"}/>
        <PiMoonStarsFill size={"1.7rem"}/>
        <button onClick={staffHandler}>

        <BiUserCircle size={"1.7rem"}/>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
