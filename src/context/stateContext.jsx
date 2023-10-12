import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  StateContextProvider.propTypes = {
    children: PropTypes.any,
  };

  const [showModal, setShowModal] = useState();
  const [current, setCurrent] = useState(1);
  // for add product

  const [productName, setProductName] = useState();
  const [brand, setBrand] = useState();
  const [unit, setUnit] = useState('single');
  const [productInfo, setProductInfo] = useState();
  const [stock, setStock] = useState();
  const [actualPrice, setActualPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [photo,setPhoto]=useState(null);

  const nextStepperHandler = (endpoint) => {
    if (current < endpoint) {
      setCurrent(current + 1);
      console.log('current',current);
    }
    
    //else if (current === 4) {
    //   setCurrent(1);
    // }
  };
  // for sidebar

  const [sidebarActived,setSidebarActived]=useState();
  const liHandler = (liname) => {
    setSidebarActived(liname);
  };

//brand add
const [showBrandAdd,setShowBrandAdd]=useState(false);
const [showBrandModal,setShowBrandModal]=useState('image');
const[editBrandPhoto,setEditBrandPhoto]=useState();
  //pagi
  // const [brandPgNum,setBrandPgNum]=useState(1);

  const [UID, setUID] = useState();
  //for user info
  const[uName,setUName]=useState('');
  const[uDOB,setUDOB]=useState('');
  const[uGender,setUGender]=useState('male');
  const[uAddress,setUAddress]=useState('');
  const[uPosition,setUPosition]=useState('');
  const[uEmail,setUEmail]=useState('');
  const[uPhone,setUPhone]=useState('');
  const[uPassword,setUPassword]=useState('');
  const[uConfirmPassword,setUConfirmPassword]=useState('');
  const[uPhoto,setUPhoto]=useState('');

  const[editUName,setEditUName]=useState('');
  const[editUDOB,setEditUDOB]=useState('');
  const[editUGender,setEditUGender]=useState('male');
  const[editUAddress,setEditUAddress]=useState('');
  const[editUPosition,setEditUPosition]=useState('');
  const[editUEmail,setEditUEmail]=useState('');
  const[editUPhone,setEditUPhone]=useState('');
  const[editUPassword,setEditUPassword]=useState('');
  const[editUConfirmPassword,setEditUConfirmPassword]=useState('');
  const[editUPhoto,setEditUPhoto]=useState('');

  //for product detail
  const[pdata,setPData]=useState();

  const [editName, setEditName] = useState();
  const [editBrand, setEditBrand] = useState();
  const [editUnit, setEditUnit] = useState();
  const [editProductInfo, setEditProductInfo] = useState();
  const [editStock, setEditStock] = useState();
  const [editSalePrice, setEditSalePrice] = useState();
  const [editActualPrice, setEditActualPrice] = useState();
  const [editPhoto,setEditPhoto]=useState(null);

//add stock
const[stockProductID,setStockProductID]=useState();

//add brand
const[addBrandPhoto,setAddBrandPhoto]=useState();

// const[editProduct,setEditProduct]=useState();
  const data = {
    UID, setUID,

    productName,
    setProductName,
    brand,
    setBrand,
    unit,
    setUnit,
    productInfo,
    setProductInfo,
    stock,
    setStock,
    actualPrice,setActualPrice,salePrice,setSalePrice,photo,setPhoto,showModal,setShowModal,nextStepperHandler,current,setCurrent,liHandler,sidebarActived,setSidebarActived,

    uName,setUName,uDOB,setUDOB,uGender,setUGender,uAddress,setUAddress,uPosition,setUPosition,uEmail,setUEmail,uPhone,setUPhone,uPassword,setUPassword,uConfirmPassword,setUConfirmPassword,uPhoto,setUPhoto,

    editUName,setEditUName,editUDOB,setEditUDOB,editUGender,setEditUGender,editUAddress,setEditUAddress,editUPosition,setEditUPosition,editUEmail,setEditUEmail,editUPhone,setEditUPhone,editUPassword,setEditUPassword,editUConfirmPassword,setEditUConfirmPassword,editUPhoto,setEditUPhoto,

    pdata,setPData,
    // editProduct,setEditProduct,
    editName,
    setEditName,
    editBrand,
    setEditBrand,
    editUnit,
    setEditUnit,
    editProductInfo,
    setEditProductInfo,
    editStock,
    setEditStock,
    editActualPrice,setEditActualPrice,
    editSalePrice,
    setEditSalePrice,editPhoto,setEditPhoto,
    showBrandAdd,setShowBrandAdd,showBrandModal,setShowBrandModal,
    // brandPgNum,setBrandPgNum
    addBrandPhoto,setAddBrandPhoto,editBrandPhoto,setEditBrandPhoto,

    stockProductID,setStockProductID,
  };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const useContextCustom = () => useContext(StateContext);
