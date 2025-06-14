import {useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#66FF66', '#FF6666', '#66B2FF', '#FFB266',
  '#B266FF', '#33FFCC', '#FF33CC', '#33CCFF', '#CCFF33',
  '#FFCC33', '#CC33FF', '#33FF66', '#FF3366', '#3366FF'
]; 

const colorTheme = localStorage.getItem("isDark") === "true"


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={12} fontSize="2em" textAnchor="middle" fill={fill}>
        {value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={!colorTheme ? "white" : "black"} className='text-2xl'>{` ${payload.name}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const UserStatistics = ({userFilms}) => {

  const [activeIndex, setActiveIndex] = useState(0);
  
  const dataFilms = {}
  console.log(userFilms)
  const genres = userFilms.map(film => film.genres.map(g => g)).flat()

  genres.forEach(item => {
    const genre = item.genre;
    dataFilms[genre] = (dataFilms[genre] || 0) + 1;
  });

  const arrayFilm = Object.entries(dataFilms).map(([key, value]) => ({name: key, value: value}));

  const handlePieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className=" h-[100%] w-[100%] flex flex-col justify-centet items-center p-2 text-center">
        <p className="text-2xl mb-2">Распределение просмотренных фильмов по жанрам:</p>
        <div style={{ width: '100%', height: '100%' /* или vh, px */ }}>
        <ResponsiveContainer width="100%" height="100%" >
          <PieChart >
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={arrayFilm}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={110}
              fill="#7B1212"
              dataKey="value"
              onMouseEnter={handlePieEnter}
            >
            {arrayFilm.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        </div>
    </div>
  );
};

export default UserStatistics;