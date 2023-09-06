import Navbar from "../components/Navbar";
import { BsSearch } from "react-icons/bs";
import { useGetProductsQuery } from "../redux/api/productApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addProducts } from "../redux/services/productSlice";

const Cashier = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { data } = useGetProductsQuery(token);
  const products = useSelector((state) => state.productSlice.products);

  useEffect(() => {
    dispatch(addProducts({ products: data?.data }));
    console.log("data", data);
    console.log("products", products);
  }, [data]);

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className=" flex justify-center items-stretch sidebar-height">
        {/* left section start*/}

        <div className=" basis-3/4 bg-[var(--base-color)] h-full border-r-[1px] border-[var(--border-color)]">
          <div className="w-full h-[50px] p-5 flex justify-between items-center bg-[--base-color] text-[--secondary-color] border-2 border-[--border-color]">
            {/* left cashier navbar start*/}
            <div className="w-full flex gap-5 justify-between items-center">
              <div className="basis-1/3 flex justify-start items-center gap-5">
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
          <div className=" flex flex-wrap gap-10 p-5">
            {products?.map((product) => {
              return (
                <div
                  key={product?.id}
                  className="w-[170px] h-[180px] flex flex-col border-[1px] border-[var(--border-color)] rounded-[5px] "
                >
                  <img
                    src={product?.photo}
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
                  </div>
                </div>
              );
            })}
            {/* product card end*/}
          </div>
        </div>
        {/* left section end*/}

        <div className=" basis-1/4 flex flex-col h-full bg-[var(--sidebar-color)]">
          {/* right calculate section start*/}

          <div className="bg-[var(--sidebar-color)] h-full">
            <p className=" font-medium text-[27px] text-[var(--secondary-color)] mt-5 ps-5">
              Receive
            </p>
            <div className="flex flex-col w-full py-5">
              <div className="flex justify-between items-center px-5">
                <div>
                  <p className=" text-[var(--secondary-color)] text-[16px] font-medium">
                    Orange
                  </p>
                  <p className=" text-[var(--gray-color)] text-[14px] font-normal">
                    1 Qty 2000 Ks
                  </p>
                </div>
                <p className=" text-[var(--secondary-color)] text-[16px] font-bold">
                  2000
                </p>
              </div>
            </div>
          </div>
          <div className="w-[200px] ms-auto ">
            <p className=" font-medium text-[16px] text-[var(--secondary-color)] mt-5 px-5 mb-0 text-right">
              Cost: 30000
            </p>
            <p className=" font-medium text-[12px] text-[var(--gray-color)] mt-0 px-5 text-right">
              Tax: 30000
            </p>
            <p className=" font-medium text-[16px] text-[var(--secondary-color)] my-5 px-5 text-right">
              Total: 30000
            </p>
          </div>
          {/* right calculate section end */}

          {/* calculator start */}
          <div className=" bg-[var(--base-color)]">
            <div className="flex justify-center items-center text-[var(--secondary-color)] w-full">
              <button className=" calculator-btn">1</button>
              <button className=" calculator-btn">2</button>
              <button className=" calculator-btn">3</button>
              <button className=" calculator-btn bg-[var(--secondary-color)] text-[var(--sidebar-color)]">
                QTY
              </button>
            </div>

            <div className="flex justify-center items-center text-[var(--secondary-color)] w-full">
              <button className=" calculator-btn">4</button>
              <button className=" calculator-btn">5</button>
              <button className=" calculator-btn">6</button>
              <button className=" calculator-btn bg-[var(--secondary-color)] text-[var(--sidebar-color)]">
                DIS
              </button>
            </div>
            <div className="flex justify-center items-center text-[var(--secondary-color)] w-full">
              <button className=" calculator-btn">7</button>
              <button className=" calculator-btn">8</button>
              <button className=" calculator-btn">9</button>
              <button className=" calculator-btn bg-[var(--secondary-color)] text-[var(--sidebar-color)]">
                PRICE
              </button>
            </div>
            <div className="flex justify-center items-center text-[var(--secondary-color)] w-full">
              <button className=" calculator-btn">0/-</button>
              <button className=" calculator-btn">0</button>
              <button className=" calculator-btn">.</button>
              <button className=" calculator-btn bg-[var(--secondary-color)] text-[var(--sidebar-color)]">
                cross
              </button>
            </div>
            <button className=" w-full h-[60px] border-[1px] border-[var(--border-color)] text-[16px] font-semibold flex justify-center items-center text-[var(--font-color)]">
              Payment
            </button>
          </div>
          {/* calculator end */}
        </div>
      </div>
    </div>
  );
};

export default Cashier;
