import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../components/Home";
// const Dashboard = React.lazy(() => import("../pages/Dashboard"));
import Login from "../pages/Login";
import Error from "../pages/Error";

import Media from "../components/Media/Media";
import MediaImgDetail from "../components/Media/MediaImgDetail";

import MyAccount from "../components/Profile/MyAccount";

import EditAccount from "../components/User/EditAccount";
import UserOverview from "../components/User/UserOverview";
import CreateUser from "../components/User/CreateUser";
import BannedUser from "../components/User/BannedUser";
import UserAccount from "../components/User/UserAccount";

import AddProduct from "../components/Inventory/AddProduct";
import Products from "../components/Inventory/Products";
import ProductDetail from "../components/Inventory/ProductDetail";
import ProductEdit from "../components/Inventory/ProductEdit";
import Stock from "../components/Inventory/Stock";
import Brand from "../components/Inventory/Brand";

// import Shop from "../pages/Shop";
import Cashier from "../pages/Cashier";
import ShopList from "../components/ShopList";
import Recent from "../components/Recent";

import Daily from "../components/Finance/Daily";
import Monthly from "../components/Finance/Monthly";
import Yearly from "../components/Finance/Yearly";
import Custom from "../components/Finance/Custom";

import SaleReport from "../components/Report/SaleReport";
import StockReport from "../components/Report/StockReport";
import StockEdit from "../components/Inventory/StockEdit";

// import Products from "../components/Products";
// import StockControl from "../components/StockControl";
// import ManageBrands from "../components/ManageBrands";
// import Cashier from "../components/Cashier";

const Path = () => {
  return (
    <div>
      <Routes>
        {/* <Route
          path="/"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Dashboard view={<Home />} />
            </React.Suspense>
          }
        /> */}
        <Route
          path="/"
          element={
              <Dashboard view={<Home />} />
          }
        />
        <Route path="/*" element={<Error />} />

        {/* media routes start*/}
        <Route path="/media/media-grid" element={<MediaImgDetail />} />
        <Route path="/media" element={<Dashboard view={<Media />} />} />
        {/* media routes start*/}

        {/* sale routes start*/}

        <Route
          path="/my-profile"
          element={<Dashboard view={<MyAccount />} />}
        />

        {/* profile routes start*/}

        {/* sale routes start*/}
        {/* <Route path="/cashier" element={<Shop />} /> */}
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/shop-list" element={<Dashboard view={<ShopList />} />} />
        {/* sale routes start*/}

        {/* user routes start*/}

        <Route
          path="/user-overview"
          element={<Dashboard view={<UserOverview />} />}
        />
        <Route
          path="/user-edit/:id"
          element={<Dashboard view={<EditAccount />} />}
        />
        <Route
          path="/user-profile/:id"
          element={<Dashboard view={<UserAccount />} />}
        />
        <Route
          path="/create-user"
          element={<Dashboard view={<CreateUser />} />}
        />
        <Route
          path="/banned-user"
          element={<Dashboard view={<BannedUser />} />}
        />
        {/* user routes start*/}

        {/* inventory routes start*/}
        <Route
          path="/add-product"
          element={<Dashboard view={<AddProduct />} />}
        />
        <Route path="/products" element={<Dashboard view={<Products />} />} />
        <Route
          path="/product-detail"
          element={<Dashboard view={<ProductDetail />} />}
        />
        <Route
          path="/product-edit/:id"
          element={<Dashboard view={<ProductEdit />} />}
        />
        <Route path="/stock-control" element={<Dashboard view={<Stock />} />} />
        <Route
          path="/stock-edit/:id"
          element={<Dashboard view={<StockEdit />} />}
        />
        <Route path="/brand" element={<Dashboard view={<Brand />} />} />
        {/* <Route path="/brand-edit/:id" element={<Dashboard view={<BrandEdit />} />} /> */}
        {/* inventory routes start*/}
        {/* sale routes start*/}

        <Route path="/recent" element={<Dashboard view={<Recent />} />} />
        {/* sale routes start*/}

        <Route
          path="/report-stock"
          element={<Dashboard view={<StockReport />} />}
        />

        <Route
          path="/report-sale"
          element={<Dashboard view={<SaleReport />} />}
        />

        {/* finance routes start*/}
        <Route path="/finance-daily" element={<Dashboard view={<Daily />} />} />
        <Route path="/finance-daily" element={<Dashboard view={<Daily />} />} />
        <Route
          path="/finance-monthly"
          element={<Dashboard view={<Monthly />} />}
        />
        <Route
          path="/finance-yearly"
          element={<Dashboard view={<Yearly />} />}
        />
        <Route
          path="/finance-custom"
          element={<Dashboard view={<Custom />} />}
        />
        {/* finance routes end*/}

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Path;
