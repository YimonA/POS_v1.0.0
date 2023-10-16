import Navbar from "../components/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { RiDeleteBackLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { useGetProductsQuery } from "../redux/api/productApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addProducts } from "../redux/services/productSlice";
import {
  addToCart,
  removeFromCart,
  addItemsQuantity,
  subtractItemsQuantity,
  addCurrentItem,clearCart
} from "../redux/services/cashierSlice";
import { Link, useNavigate } from "react-router-dom";
import { useVoucherMutation } from "../redux/api/cashierApi";
import SaleCloseGuard from "./SaleCloseGuard";
import { Loader } from "@mantine/core";

const Cashier = () => {
  const nav = useNavigate();
  const [voucher,{isLoading}] = useVoucherMutation();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { data ,isLoading:loading} = useGetProductsQuery(token);
  const products = useSelector((state) => state.productSlice.products);
  const { cartItems, currentItem, currentQty, tax, totalCost, taxCost } =
    useSelector((state) => state.cashierSlice);
  const user = useSelector((state) => state.authSlice.user);

  // console.log("cartItems", cartItems);
  // console.log("currentItem", currentItem);
  // console.log("currentQty", currentQty);
  // console.log("totalCost", totalCost);

  useEffect(() => {
    dispatch(addProducts({ products: data?.data }));
    // console.log("data", data);
    // console.log("products", products);
  }, [data]);

  useEffect(()=>{
dispatch(clearCart());
  },[])
  const cartItemsHandler = (product) => {
    if (product.total_stock >= 1) {
      dispatch(addToCart(product));
    }
  };
  const addCurrentItemHandler = (item) => {
    dispatch(addCurrentItem(item));
  };
  const zeroBtnHandler = () => {
    const str = new String(currentItem.quantity);
    if (str.length > 1 || str[0] !== "1") {
      dispatch(addItemsQuantity("0"));
    }
  };

  function payment() {
    const items = cartItems.map((item) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
      };
    });
    // console.log("cart items", items);

    const content = {
      customer_name: user?.name,
      phone_number: user?.phone_number,
      items: items,
    };
    const strData = JSON.stringify(content);
    return strData;
  }

  const paymentHandler = async () => {
    try {
      const strData = payment();
      const res = await voucher({token,strData});
      if(res?.data?.products) {
          nav("/voucher");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SaleCloseGuard>

    <div className="w-full min-h-screen">
      <div className=" flex justify-center items-stretch ">
        {/* left section start*/}

        <div className=" basis-3/4 bg-[var(--base-color)] min-h-full border-r-[1px] border-[var(--border-color)]">
          <div className="w-full h-[50px] p-5 flex justify-between items-center bg-[--base-color] text-[--secondary-color] border-2 border-[--border-color]">
            {/* left cashier navbar start*/}
            <div className="w-full flex gap-5 justify-between items-center">
              <div className="basis-1/3 flex justify-start items-center gap-5">
                <Link to={"/"}>
                  <h2 className="text-[16px] text-[var(--secondary-color)] font-medium">
                    <BsArrowLeft size={"1.3rem"} />
                  </h2>
                </Link>
                <h2 className="text-[16px] text-[var(--font-color)] font-medium">
                  All
                </h2>
                <h2 className="text-[16px] text-[var(--secondary-color)] font-medium">
                  Drink
                </h2>
              </div>
              <div className="basis-1/3 h-[34px] border-gray-700 rounded border flex items-center px-2 py-1">
                <BsSearch className=" text-gray-400 me-3" />
                <input
                  type="text"
                  placeholder="search"
                  className=" w-[250px] outline-none bg-transparent text-gray-300 text-sm font-semibold"
                />
              </div>
            </div>
            {/* left cashier navbar start*/}

            <div className=" flex gap-2.5 items-center "></div>
          </div>
          {/* product card start*/}
          <div className=" flex flex-wrap gap-10 p-5 py-10 sidebar-height overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-slate-800 ">
            {
            loading ? (
              <div className="w-full h-full flex justify-center items-center gap-2">
                <Loader color="white" size="xs" />
                <span className="text-white">Loading....</span>
              </div>
            ) : (
            products?.map((product) => {
              return (
                <div
                  key={product?.id}
                  onClick={() => cartItemsHandler(product)}
                  className="w-[170px] h-[200px] flex flex-col border-[1px] border-[var(--border-color)] rounded-[5px] cursor-pointer"
                >
                  <img
                    // src={product?.photo}
                    src={`https://h.mmsdev.site/storage/photos/FR9QfU5OmbZlybJUSXFZjaipeVZqxBU7Cr3CKiyw.jpg`}
                    className="w-[170px] h-[120px] object-cover object-center"
                    alt=""
                  />
                  <div className=" pt-2">
                    <p className=" text-[14px] text-[var(--secondary-color)] px-5 font-normal text-right">
                      {product?.name}
                    </p>
                    <p className=" text-[14px] text-white opacity-70 px-5 font-normal text-right">
                      {product?.sale_price} Ks
                    </p>
                    <p className=" text-[14px] text-red-500 opacity-70 px-5 font-bold text-right">
                      {product?.total_stock <= 0 ? "Out of Stock" : ""}
                    </p>
                  </div>
                </div>
              );
            }))}
            {/* product card end*/}
          </div>
        </div>
        {/* left section end*/}

        <div className=" basis-1/4 flex flex-col min-h-full bg-[var(--sidebar-color)]">
          {/* right calculate section start*/}

          <div className="bg-[var(--sidebar-color)] h-full p-1">
            <p className=" font-medium text-[27px] text-[var(--secondary-color)] my-3 ps-5">
              Receive
            </p>
            {/* cart items start */}
            {cartItems.map((item) => {
              return (
                <div
                  key={item?.id}
                  onClick={() => addCurrentItemHandler(item)}
                  className={`flex flex-col w-full py-2 cursor-pointer ${
                    item?.id === currentItem?.id ? "selected-Item" : ""
                  }`}
                >
                  <div className="flex justify-between items-center px-5">
                    <div>
                      <p className=" text-[var(--secondary-color)] text-[16px] font-medium">
                        {item?.name}
                      </p>
                      <p className=" text-[var(--gray-color)] text-[14px] font-normal">
                        {item?.quantity} Qty / Unit Price {item?.sale_price} Ks
                      </p>
                      <p className=" text-[var(--gray-color)] text-[14px] font-normal">
                        Available Stock {item?.total_stock}
                      </p>
                    </div>
                    <p className=" text-[var(--secondary-color)] text-[16px] font-bold">
                      {item?.quantity * item?.sale_price}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* cart items end */}
          </div>
          <div className="w-[200px] ms-auto ">
            <p className=" font-medium text-[16px] text-[var(--secondary-color)] mt-5 px-5 mb-0 text-right">
              Cost: {totalCost.toFixed(2)}
            </p>
            <p className=" font-medium text-[12px] text-[var(--gray-color)] mt-0 px-5 text-right">
              Tax: {tax.toFixed(2)}
            </p>
            <p className=" font-medium text-[16px] text-[var(--secondary-color)] my-5 px-5 text-right">
              Total: {taxCost.toFixed(2)}
            </p>
          </div>
          {/* right calculate section end */}

          {/* calculator start */}
          <div className=" bg-[var(--base-color)]">
            <div className="flex justify-center items-center text-[var(--secondary-color)] w-full">
              <button
                onClick={() => dispatch(addItemsQuantity("1"))}
                className=" calculator-btn"
              >
                1
              </button>
              <button
                onClick={() => dispatch(addItemsQuantity("2"))}
                className=" calculator-btn"
              >
                2
              </button>
              <button
                onClick={() => dispatch(addItemsQuantity("3"))}
                className=" calculator-btn"
              >
                3
              </button>
              <button className=" calculator-btn bg-[var(--secondary-color)] text-[var(--sidebar-color)]">
                QTY
              </button>
            </div>

            <div className="flex justify-center items-center text-[var(--secondary-color)] w-full">
              <button
                onClick={() => dispatch(addItemsQuantity("4"))}
                className=" calculator-btn"
              >
                4
              </button>
              <button
                onClick={() => dispatch(addItemsQuantity("5"))}
                className=" calculator-btn"
              >
                5
              </button>
              <button
                onClick={() => dispatch(addItemsQuantity("6"))}
                className=" calculator-btn"
              >
                6
              </button>
              <button
                onClick={() => dispatch(removeFromCart(currentItem))}
                className=" calculator-btn bg-[var(--secondary-color)] text-[var(--sidebar-color)]"
              >
                Del Item
              </button>
            </div>
            <div className="flex justify-center items-center text-[var(--secondary-color)] w-full">
              <button
                onClick={() => dispatch(addItemsQuantity("7"))}
                className=" calculator-btn"
              >
                7
              </button>
              <button
                onClick={() => dispatch(addItemsQuantity("8"))}
                className=" calculator-btn"
              >
                8
              </button>
              <button
                onClick={() => dispatch(addItemsQuantity("9"))}
                className=" calculator-btn"
              >
                9
              </button>
              <button
                onClick={() => dispatch(subtractItemsQuantity(currentItem))}
                className=" calculator-btn bg-[var(--secondary-color)] text-[var(--sidebar-color)]"
              >
                <RiDeleteBackLine size={"1.3rem"} />
              </button>
            </div>
            <div className="flex justify-center items-center text-[var(--secondary-color)] w-full">
              <button className=" calculator-btn">0/-</button>
              <button
                onClick={() => zeroBtnHandler(currentItem)}
                className=" calculator-btn"
              >
                0
              </button>
              <button className=" calculator-btn">.</button>

              <button className=" calculator-btn bg-[var(--secondary-color)] text-[var(--sidebar-color)] text-[12px] flex flex-col justify-center items-center"></button>
            </div>
            <button
              onClick={paymentHandler}
              className=" w-full h-[60px] border-[1px] border-[var(--border-color)] text-[16px] font-semibold flex justify-center items-center text-[var(--font-color)]"
            >
              {isLoading ? (
                <div className=" flex justify-center items-center gap-2">
                  <Loader color="white" size="xs" />
                  <span>Loading....</span>
                </div>
              ) : (
              'Payment')}
            </button>
          </div>
          {/* calculator end */}
        </div>
      </div>
    </div>
     </SaleCloseGuard>

  );
};

export default Cashier;
