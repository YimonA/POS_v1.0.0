import { BarChart, Bar,ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'S',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'M',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'T',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'W',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'T',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'S',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const SaleTinyBarChart = () => {

  return (
<ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="uv" fill="#8ab4f8" />
        </BarChart>
      </ResponsiveContainer>  )
}

export default SaleTinyBarChart