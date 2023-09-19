import {BsPlusLg} from 'react-icons/bs';
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useContextCustom } from "../../context/stateContext";
import StockOverview from "./StockOverview";

const Stock = () => {
  const { liHandler } = useContextCustom();
  

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      <div className=" flex justify-between items-center mb-5">
        <div>
          <p className="breadcrumb-title	">Stock Control</p>
          <p className=" text-[14px] text-white opacity-70 select-none">
            Inventory / Stock Control
          </p>
        </div>

        <button className="w-[170px] h-[40px] font-semibold text-[16px] myBlueBtn flex items-center justify-center gap-2">
          <BsPlusLg size={"1.3rem"} />
          Add Stock
        </button>
      </div>
      {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
      <StockOverview stocks={stocks}/>

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

export default Stock;
