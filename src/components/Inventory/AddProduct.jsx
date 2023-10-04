import AddProductInfo from "./AddProductInfo";
import AddProductPrice from "./AddProductPrice";
import AddProductPhotoUpload from "./AddProductPhotoUpload";
import ModalCreateProduct from "../ModalCreateProduct";
import AddProductInfoPreview from "./AddProductInfoPreview";
import Modal from "../Modal";
import AddProductSelectImg from "./AddProductSelectImg";
import { useContextCustom } from "../../context/stateContext";
import { useGetProductsQuery } from "../../redux/api/productApi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addProducts } from "../../redux/services/productSlice";
// import { useGetBrandsQuery } from "../../redux/api/brandApi";
import { addBrands } from "../../redux/services/brandSlice";

const AddProduct = () => {
  const { showModal, current, liHandler } = useContextCustom();
  const token = Cookies.get("token");
  // const { data } = useGetBrandsQuery(token);
  const dispatch = useDispatch();
  const brandsList = useSelector((state) => state.brandSlice.brands);

  return (
    <div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">Add Product</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Inventory / Add Product
          </p>{" "}
        </div>
        <Link to={"/product"}>
          <button
            onClick={() => liHandler("products")}
            className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
          >
            Product List
          </button>
        </Link>
      </div>
      {/* Breadcrumg end */}

      <div className=" flex gap-20 justify-start items-stretch">
        {current === 1 ? <AddProductInfo /> : ""}
        {current === 2 ? <AddProductPrice /> : ""}
        {current === 3 ? <AddProductPhotoUpload /> : ""}
        {current === 3 && showModal ? (
          <Modal
            title={"Select an image"}
            modalView={<AddProductSelectImg />}
          />
        ) : (
          ""
        )}
        {current === 4 ? <AddProductInfoPreview /> : ""}
        {current === 4 && showModal ? (
          <Modal title={"Create Product"} modalView={<ModalCreateProduct />} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddProduct;
