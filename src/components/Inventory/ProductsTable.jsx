import { BsArrowRight } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";

const ProductsTable = ({ products }) => {
  const {setPData}=useContextCustom();
  
  return (
    <div>
      <table className=" w-full text-gray-200 border border-gray-700 text-sm ">
        <thead>
          <tr className=" border-b border-b-gray-700">
            <th className=" py-4 text-center px-1 uppercase font-medium">No</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Name</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Brand</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Unit</th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
              Sale Price
            </th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
              Total Stock
            </th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium"></th>
          </tr>
        </thead>
        <tbody className=" text-gray-100">
          {products?.map((product, index) => {
            return (
              <tr
                key={product?.id}
                className=" border-b border-b-gray-700 cursor-pointer"
              >
                <td className="px-1 text-center  py-4">{index + 1}</td>
                <td className="px-1 text-end py-4 ">{product?.name}</td>
                <td className="px-1 text-end py-4">{product.brand_name}</td>
                <td className="px-1 py-4 text-end">{product?.unit}</td>
                <td className="px-1 py-4 text-end">{product?.sale_price}</td>
                <td className="px-1 py-4 text-end">{product?.total_stock}</td>
                <td>
                  <div className="me-20 flex justify-end items-center gap-2 z-20">
                    <button className="inline-block bg-gray-700 w-8 h-8 p-1 rounded-full cursor-pointer">
                      <BsPlusLg
                        size={"1.3rem"}
                        className="text-[var(--secondary-color)]"
                      />
                    </button>
                    <Link to={`/product-edit/${product?.id}`}>
                    <button className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer">
                      <BsPencil
                        size={"0.8rem"}
                        className="text-[var(--secondary-color)]"
                      />
                    </button>
                    </Link>

                    <Link to={"/product-detail"}>
                      <button onClick={()=>setPData(product)} className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer">
                        <BsArrowRight
                          size={"1rem"}
                          className="text-[var(--secondary-color)]"
                        />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
