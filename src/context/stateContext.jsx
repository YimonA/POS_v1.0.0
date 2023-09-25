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
  const [unit, setUnit] = useState();
  const [productInfo, setProductInfo] = useState();
  const [stock, setStock] = useState(3);
  const [actualPrice, setActualPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [photo,setPhoto]=useState(null);

  const nextStepperHandler = (endpoint) => {
    if (current < endpoint) {
      setCurrent(current + 1);
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

  //pagi
  // const [brandPgNum,setBrandPgNum]=useState(1);

  //for user info
  const[uName,setUName]=useState('Ma Ma');
  const[uDOB,setUDOB]=useState('2/2/1990');
  const[uGender,setUGender]=useState('female');
  const[uAddress,setUAddress]=useState('ygn');
  const[uPosition,setUPosition]=useState('staff');
  const[uEmail,setUEmail]=useState('mama@gmail.com');
  const[uPhone,setUPhone]=useState('098888889');
  const[uPassword,setUPassword]=useState('mama1234');
  const[uConfirmPassword,setUConfirmPassword]=useState('mama1234');
  const[uPhoto,setUPhoto]=useState('https://h.mmsdev.site/storage/photos/7lmPwtTkHZlfeEsRyzd1e73S0x5LFDoysKWeZifU.jpg');

  //for product detail
  const[pdata,setPData]=useState();

  const [editProductName, setEditProductName] = useState();
  const [editBrand, setEditBrand] = useState();
  const [editUnit, setEditUnit] = useState();
  const [editProductInfo, setEditProductInfo] = useState();
  const [editStock, setEditStock] = useState(3);
  // const [actualPrice, setActualPrice] = useState();
  const [editSalePrice, setEditSalePrice] = useState();
  const [editPhoto,setEditPhoto]=useState(null);

//add stock
const[stockProductID,setStockProductID]=useState();

const[editProduct,setEditProduct]=useState();
  const data = {
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

    pdata,setPData,
    // editProduct,setEditProduct,
    editProductName,
    setEditProductName,
    editBrand,
    setEditBrand,
    editUnit,
    setEditUnit,
    editProductInfo,
    setEditProductInfo,
    editStock,
    setEditStock,
    // actualPrice,setActualPrice,
    editSalePrice,
    setEditSalePrice,editPhoto,setEditPhoto,
    showBrandAdd,setShowBrandAdd,
    // brandPgNum,setBrandPgNum

    stockProductID,setStockProductID,
  };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const useContextCustom = () => useContext(StateContext);
