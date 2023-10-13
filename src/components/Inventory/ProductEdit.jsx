import EditProductInfo from "./EditProductInfo";
import EditProductPrice from "./EditProductPrice";
import EditProductPhotoUpload from "./EditProductPhotoUpload";
import ModalEditProduct from "./ModalEditProduct";
import EditProductInfoPreview from "./EditProductInfoPreview";
import Modal from "../Modal";
import EditProductSelectImg from "./EditProductSelectImg";
import { useContextCustom } from "../../context/stateContext";
import { useGetSingleProductQuery } from "../../redux/api/productApi";
import Cookies from "js-cookie";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addSingleProduct } from "../../redux/services/productSlice";

const ProductEdit = () => {
  // const [item,setItem]=useState();
  // const location=useLocation();
  const { showModal, current, setCurrent, liHandler, pdata } =
    useContextCustom();
  const { id } = useParams();
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  // const { data } = useGetSingleProductQuery({id,token});
  // const singleProduct = useSelector((state) => state.productSlice.singleProduct);
  // console.log('data',data?.data);

  // useEffect(() => {
  //   dispatch(addSingleProduct({ singleProduct: data?.data }));
  // }, [data]);
  // console.log('singleProduct',singleProduct);

  useEffect(() => {
    setCurrent(1);
  },[]);
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
        <Link to={"/products"}>
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
        {current === 2 ? <EditProductPrice  /> : ""}
        {current === 3 ? <EditProductPhotoUpload  /> : ""}
        {current === 3 && showModal ? (
          <Modal
            title={"Select an image"}
            modalView={<EditProductSelectImg />}
          />
        ) : (
          ""
        )}
        {current === 4 ? <EditProductInfoPreview productId={id} /> : ""}
        {current === 4 && showModal ? (
          <Modal title={"Edit Product"} modalView={<ModalEditProduct />} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductEdit;
