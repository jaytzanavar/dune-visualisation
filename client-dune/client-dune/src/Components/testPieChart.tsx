

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0096FF', '#00D49F', '#FFBBFF', '#FF80FF', '#F088FE', '#20249F', '#BBBB28', '#FF0042', '#0FF6FF', '#DDD49F', '#FFBBFF', '#DADAAA'];

const CustomTooltip = ({ active, payload }: { active: any, payload: any }) => {

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex-col flex-wrap bg-white/25 justify-center items-center">
        <p className="label">{`Staker ${payload[0].name} `}</p>
        <p className='label'>{`Total ${payload[0].value} SDEX token stake`}</p>

      </div>
    );
  }

  return null;
};

export default function Chart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry: any, index: any) => (
            <Cell key={`cell-${index + entry}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
