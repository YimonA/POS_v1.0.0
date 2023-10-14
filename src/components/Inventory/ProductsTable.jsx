import { BsArrowRight } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useDeleteProductMutation } from "../../redux/api/productApi";

const ProductsTable = ({ products, sortV }) => {
  const { setPData, setCurrent } = useContextCustom();
  const nav = useNavigate();
  const token = Cookies.get("token");
  const [deleteProduct] = useDeleteProductMutation();

  const deleteProductHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        const { data } = await deleteProduct({ id, token });
      }
    });
  };
  const productDetailHandler = (id) => {
    nav(`/product-detail/${id}`);
  };
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
          {sortV === "low-price"
            ? products
                ?.sort((a, b) => a.sale_price - b.sale_price)
                ?.map((product, index) => {
                  return (
                    <tr
                      key={product?.id}
                      className=" border-b border-b-gray-700 cursor-pointer"
                    >
                      <td className="px-1 text-center  py-4">{index + 1}</td>
                      <td className="px-1 text-end py-4 ">{product?.name}</td>
                      <td className="px-1 text-end py-4">
                        {product.brand_name}
                      </td>
                      <td className="px-1 py-4 text-end">{product?.unit}</td>
                      <td className="px-1 py-4 text-end">
                        {product?.sale_price}
                      </td>
                      <td className="px-1 py-4 text-end">
                        {product?.total_stock}
                      </td>
                      <td>
                        <div className="me-20 flex justify-end items-center gap-2 z-20">
                          <button
                            onClick={() => deleteProductHandler(product?.id)}
                            className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer"
                          >
                            <ImBin
                              size={"1rem"}
                              className="text-[var(--secondary-color)]"
                            />
                          </button>
                          <button
                            onClick={() => productDetailHandler(product?.id)}
                            className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer"
                          >
                            <BsArrowRight
                              size={"1rem"}
                              className="text-[var(--secondary-color)]"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
            : products
                ?.sort((a, b) => b.sale_price-a.sale_price)
                ?.map((product, index) => {
                  return (
                    <tr
                      key={product?.id}
                      className=" border-b border-b-gray-700 cursor-pointer"
                    >
                      <td className="px-1 text-center  py-4">{index + 1}</td>
                      <td className="px-1 text-end py-4 ">{product?.name}</td>
                      <td className="px-1 text-end py-4">
                        {product.brand_name}
                      </td>
                      <td className="px-1 py-4 text-end">{product?.unit}</td>
                      <td className="px-1 py-4 text-end">
                        {product?.sale_price}
                      </td>
                      <td className="px-1 py-4 text-end">
                        {product?.total_stock}
                      </td>
                      <td>
                        <div className="me-20 flex justify-end items-center gap-2 z-20">
                          <button
                            onClick={() => deleteProductHandler(product?.id)}
                            className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer"
                          >
                            <ImBin
                              size={"1rem"}
                              className="text-[var(--secondary-color)]"
                            />
                          </button>
                          <button
                            onClick={() => productDetailHandler(product?.id)}
                            className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer"
                          >
                            <BsArrowRight
                              size={"1rem"}
                              className="text-[var(--secondary-color)]"
                            />
                          </button>
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
