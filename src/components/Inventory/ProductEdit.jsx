import EditProductInfo from "./EditProductInfo";
import EditProductPrice from "./EditProductPrice";
import EditProductPhotoUpload from "./EditProductPhotoUpload";
import ModalCreateProduct from "../ModalCreateProduct";
import EditProductInfoPreview from "./EditProductInfoPreview";
import Modal from "../Modal";
import EditProductSelectImg from "./EditProductSelectImg";
import { useContextCustom } from "../../context/stateContext";
import { useGetProductsQuery } from "../../redux/api/productApi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addProducts } from "../../redux/services/productSlice";


const ProductEdit = () => {
  const { showModal, current, liHandler,pData } = useContextCustom();
  const token = Cookies.get("token");
  const { data } = useGetProductsQuery(token);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productSlice.products);
  // console.log('ddd',data?.data);
  // console.log("cu", current);
  // console.log('products',products);

  useEffect(() => {
    dispatch(addProducts({ products: data?.data }));
  }, [data]);

  return (
<div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">Edit Product</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Inventory / Products / Edit Product
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
        {current === 1 ? <EditProductInfo /> : ""}
        {current === 2 ? <EditProductPrice /> : ""}
        {current === 3 ? <EditProductPhotoUpload /> : ""}
        {current === 3 && showModal ? (
          <Modal
            title={"Select an image"}
            modalView={<EditProductSelectImg />}
          />
        ) : (
          ""
        )}
        {current === 4 ? <EditProductInfoPreview /> : ""}
        {/* {current === 4 && showModal ? (
          <Modal title={"Create Product"} modalView={<ModalCreateProduct />} />
        ) : (
          ""
        )} */}
      </div>
    </div>  )
}

export default ProductEdit