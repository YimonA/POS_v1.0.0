import React from "react";

const ProductsGrid = ({ products }) => {
  return (
    <div>
      {/* product card start*/}
      <div className=" flex flex-wrap gap-10 p-5">
        {products?.map((product, index) => {
          return (
            <div
              key={product?.id}
              className="w-[200px] h-[300px] flex flex-col  "
            >
              <img
                src={product?.photo}
                className="w-[200px] h-[200px] object-cover object-center"
                alt=""
              />
              <div className=" border-[1px] border-[var(--border-color)] rounded-[5px] pt-2">
                <p className=" text-[14px] text-[var(--secondary-color)] px-5 font-normal text-right">
                  {product?.name}
                </p>
                <p className=" text-[14px] text-[var(--gray-color)] px-5 font-normal text-right">
                  {product?.sale_price} Ks
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* product card end*/}
    </div>
  );
};

export default ProductsGrid;
