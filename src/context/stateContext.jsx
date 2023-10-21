import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  StateContextProvider.propTypes = {
    children: PropTypes.any,
  };

  const[saleClose,setSaleClose]=useState(false);
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
      // console.log('current',current);
    }
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

//add stock
const[stockProductID,setStockProductID]=useState();

//add brand
const[addBrandPhoto,setAddBrandPhoto]=useState();

// const[editProduct,setEditProduct]=useState();
  const data = {saleClose,setSaleClose,
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

    showBrandAdd,setShowBrandAdd,showBrandModal,setShowBrandModal,

    addBrandPhoto,setAddBrandPhoto,editBrandPhoto,setEditBrandPhoto,

    stockProductID,setStockProductID,
  };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const useContextCustom = () => useContext(StateContext);
