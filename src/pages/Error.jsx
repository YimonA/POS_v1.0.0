import Img404 from "/404-svg.svg";

const Error = () => {
    return (
      <div className="container-fluid h-screen flex justify-center items-center bg-[var(--sidebar-color)]">
        <img src={Img404} className=" object-cover object-center" alt="" />
      </div>
    );
  };
  
  export default Error;
  