import { useContextCustom } from "../../context/stateContext";

const EditProductStepper = () => {
  const { current } = useContextCustom();

  return (
    <div className="h-full flex justify-start items-start">
      <div className="h-[80%] px-3 flex flex-col justify-between items-center">
        <div
          className={`${current === 1 ? "current-step" : ""} ${
            current === 2 || current === 3 ? "prev-step" : ""
          } ${current === 4 ? "prev-step" : ""} step-circle`}
        >
          1
        </div>
        <span className=" inline-block h-[25%] w-[2px] bg-[var(--border-color)]"></span>
        <div
          className={`${current === 1 ? "next-step" : ""} ${
            current === 2 ? "current-step" : ""
          }  ${current === 3 ? "prev-step" : ""} ${
            current === 4 ? "prev-step" : ""
          }  step-circle`}
        >
          2
        </div>
        <span className=" inline-block h-[25%] bg-[var(--border-color)] w-[2px]"></span>
        <div
          className={`${current === 1 || current === 2 ? "next-step" : ""} ${
            current === 3 ? "current-step" : ""
          } ${current === 4 ? "prev-step" : ""}  step-circle`}
        >
          3
        </div>
      </div>
      <div className="h-[80%] flex flex-col justify-between items-start">
        <p className=" step-text pt-3">Information</p>
        <p className=" step-text">Price</p>
        <p className=" step-text pb-3">Photo</p>
      </div>
    </div>
  );
};

export default EditProductStepper;
