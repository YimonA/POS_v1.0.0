import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from "prop-types";

const SaleTinyBarChart = ({ wdata }) => {
  SaleTinyBarChart.propTypes = {
    wdata: PropTypes.array,
  };
  const data = wdata;
  console.log("wdata", wdata);

  return (
    // <ResponsiveContainer width="100%" height="100%">
    //   <BarChart width={150} height={40} data={data}>
    //     <Bar dataKey="total" fill="#8ab4f8" />
    //   </BarChart>
    // </ResponsiveContainer>

    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dayName" />
          <YAxis dataKey="total" />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default SaleTinyBarChart;
