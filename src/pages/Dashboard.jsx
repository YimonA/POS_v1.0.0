import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Routeguard from "../components/Routeguard";
import PropTypes from "prop-types";

const Dashboard = ({ view }) => {
  
  Dashboard.propTypes = {
    view: PropTypes.any,
  };
  return (
    <Routeguard>
      <div className=" container-fluid min-h-screen bg-[var(--base-color)]">
        <Navbar />
        <div className=" min-h-full bg-[var(--sidebar-color)] flex items-stretch">
          <Sidebar />
          {view}
        </div>
      </div>
    </Routeguard>
  );
};

export default Dashboard;
