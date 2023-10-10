import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

const SaleTinyBarChart = ({ wdata,tag }) => {
  SaleTinyBarChart.propTypes = {
    wdata: PropTypes.array,
    tag:PropTypes.string
  };
  const data = wdata;
  // console.log("wdata", wdata);

  return (
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
        {tag==="weekely"?
        <>
        <XAxis dataKey="dayName"/>
        <YAxis dataKey="total" /></>:''}

        {tag==="monthly"?
        <>
        <XAxis dataKey="month"/>
        <YAxis dataKey="total" /></>:''}

        {tag==="yearly"?
        <>
        <XAxis dataKey="year"/>
        <YAxis dataKey="total" /></>:''}
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8AB4F8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SaleTinyBarChart;
        //dayName
