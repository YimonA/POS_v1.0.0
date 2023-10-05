import {BsPlusLg} from 'react-icons/bs';
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useContextCustom } from "../../context/stateContext";
import StockOverview from "./StockOverview";
import { useEffect } from 'react';

const Stock = () => {
  const {showStockAdd, setShowStockAdd,liHandler } = useContextCustom();
  useEffect(()=>{
    console.log('setShowStockAdd',showStockAdd)
  },[showStockAdd])

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20 relative">
      <div className=" flex justify-between items-center mb-5">
        <div>
          <p className="breadcrumb-title	">Stock Control</p>
          <p className=" text-[14px] text-white opacity-70 select-none">
            Inventory / Stock Control
          </p>
        </div>

        
      </div>
      {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
      <StockOverview 
      // stocks={stocks}
      />
    </div>
  );
};

export default Stock;
