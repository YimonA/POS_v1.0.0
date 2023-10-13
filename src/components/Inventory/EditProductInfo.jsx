import { useContextCustom } from "../../context/stateContext";
import AddProductStepper from "./EditProductStepper";
import { BsArrowRightShort } from "react-icons/bs";
import Cookies from "js-cookie";
import { useGetBrandsQuery } from "../../redux/api/logoApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addBrands } from "../../redux/services/logoSlice";
import { editProductBrandID, editProductName, editProductTStock, editProductUnit ,editProductInfo} from "../../redux/services/productSlice";

const EditProductInfo = () => {
  const { nextStepperHandler } = useContextCustom();
  
  const token = Cookies.get("token");
  const { data } = useGetBrandsQuery(token);

  const dispatch = useDispatch();
  const brands = useSelector((state) => state.logoSlice.brands);
  const editProduct = useSelector((state) => state.productSlice.editProduct);

  useEffect(() => {
    dispatch(addBrands({ brands: data?.data }));
  }, [data]);

  return (
    <div className=" ">
      <form
        action=""
        className=" flex gap-20 justify-start items-stretch bg-[--base-color]"
      >
        <div className=" flex flex-col gap-5 px-14 py-10 w-[680px] h-fit bg-[var(--sidebar-color)]">
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              defaultValue={editProduct?.name}
              onChange={(e) => dispatch(editProductName(e.target.value))}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Brand
            </label>
            <select
              name="brand"
              value={editProduct?.brand_name}
              onChange={(e) => dispatch(editProductBrandID(e.target.value))}
              className="brand-dropdown brand-select "
            >
              {brands?.map((brand) => {
                return (
                  <option
                    key={brand?.id}
                    value={brand?.id}
                    className="brand-dropdown"
                  >
                    {brand?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Stock
            </label>
            <input
              type="text"
              defaultValue={editProduct?.total_stock}
              onChange={(e) => dispatch(editProductTStock(Number(e.target.value)))}
              placeholder=""
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>{" "}
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Unit
            </label>
            <select
              name="unit"
              value={editProduct?.unit}
              onChange={(e) => dispatch(editProductUnit(e.target.value))}
              className="brand-dropdown "
            >
              <option value="single" className="brand-dropdown brand-option">
                single
              </option>
              <option value="dozen" className="brand-dropdown brand-option">
                dozen
              </option>
            </select>
          </div>
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              More Info
            </label>
            <textarea
              defaultValue={editProduct?.more_information}
              onChange={(e) => dispatch(editProductInfo(e.target.value))}
              placeholder=""
              className="w-[380px] h-[100px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
        </div>
        <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
          <AddProductStepper />
          <button
            onClick={()=>nextStepperHandler(4)}
            className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
          >
            Next <BsArrowRightShort size={"1.5rem"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductInfo;
