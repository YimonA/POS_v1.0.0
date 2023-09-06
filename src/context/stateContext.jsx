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

  const [productName, setProductName] = useState('table');
  const [brand, setBrand] = useState('');
  const [unit, setUnit] = useState('single');
  const [productInfo, setProductInfo] = useState('ddd');
  const [stock, setStock] = useState(3);
  const [actualPrice, setActualPrice] = useState(400);
  const [salePrice, setSalePrice] = useState(600);
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

  //for profile data
  const [profileData,setProfileData]=useState({});

  //pagi
  // const [brandPgNum,setBrandPgNum]=useState(1);

  //for user info
  const[uName,setUName]=useState();
  const[uDOB,setUDOB]=useState();
  const[uGender,setUGender]=useState();
  const[uAddress,setUAddress]=useState();
  const[uPosition,setUPosition]=useState();
  const[uEmail,setUEmail]=useState();
  const[uPhone,setUPhone]=useState();
  const[uPassword,setUPassword]=useState();
  const[uConfirmPassword,setUConfirmPassword]=useState();

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
    profileData,setProfileData,

    uName,setUName,uDOB,setUDOB,uGender,setUGender,uAddress,setUAddress,uPosition,setUPosition,uEmail,setUEmail,uPhone,setUPhone,uPassword,setUPassword,uConfirmPassword,setUConfirmPassword
    // brandPgNum,setBrandPgNum
  };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const useContextCustom = () => useContext(StateContext);
