import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import Routeguard from "../components/Routeguard";
import PropTypes from "prop-types";

const Dashboard = ({ view }) => {
  
  Dashboard.propTypes = {
    view: PropTypes.any,
  };
  return (
    // <Routeguard>
      <div className=" container-fluid min-h-screen bg-[--base-color]">
        <Navbar />
        <div className=" h-full bg-[--sidebar-color] flex justify-start items-stretch">
          <Sidebar />
          {view}
        </div>
      </div>
    // </Routeguard>
  );
};

export default Dashboard;
