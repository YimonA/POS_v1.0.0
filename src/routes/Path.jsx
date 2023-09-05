import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../components/Home";
import Login from "../pages/Login";
import Error from "../pages/Error";

import Media from "../components/Media/Media";
import MediaImgDetail from '../components/Media/MediaImgDetail';

import Account from "../components/Profile/Account";

import EditAccount from "../components/User/EditAccount";
import UserOverview from '../components/User/UserOverview';
import CreateUser from '../components/User/CreateUser';
import BannedUser from "../components/User/BannedUser"

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

// import Products from "../components/Products";
// import StockControl from "../components/StockControl";
// import ManageBrands from "../components/ManageBrands";
// import Cashier from "../components/Cashier";

const Path = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard view={<Home />} />} />
        <Route path="/*" element={<Error />} />

        {/* media routes start*/}
        <Route path="/media/media-grid" element={<MediaImgDetail />} />
        <Route path="/media" element={<Dashboard view={<Media />} />} />
        {/* media routes start*/}

        {/* sale routes start*/}

        <Route
          path="/user-profile"
          element={<Dashboard view={<Account />} />}
        />
        <Route
          path="/user-edit"
          element={<Dashboard view={<EditAccount />} />}
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
          path="/product-edit"
          element={<Dashboard view={<ProductEdit />} />}
        />
        <Route path="/stock-control" element={<Dashboard view={<Stock />} />} />
        <Route path="/brand" element={<Dashboard view={<Brand />} />} />
        {/* inventory routes start*/}
        {/* sale routes start*/}

        <Route path="/recent" element={<Dashboard view={<Recent />} />} />
        {/* sale routes start*/}

         {/*
        <Route
          path="/stock"
          element={<Dashboard view={<StockList />} />}
        />
        <Route
          path="/sale"
          element={<Dashboard view={<Sale />} />}
        />
                */}

        {/* finance routes start*/}
        <Route path="/finance-daily" element={<Dashboard view={<Daily />} />} />
        <Route
          path="/finance-daily"
          element={<Dashboard view={<Daily />} />}
        />
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