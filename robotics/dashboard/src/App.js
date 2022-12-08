import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container } from "react-bootstrap";
import React, { PureComponent, useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

function App() {
  const [database, setdatabase] = useState([]);

  useEffect(async () => {
    const newdatabase = await axios
      .get("/api/realtimedata")
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        return err;
      });
    newdatabase.sort(function (a, b) {
      return +(a.datetime > b.datetime) - 0.5;
    });
    setdatabase(newdatabase);
    console.log(newdatabase);
  }, []);

  const data = [
    {
      name: "Page A",
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      pv: 4300,
      amt: 2100,
    },
  ];

  const data1 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  return (
    <div className="App">
      <div className="bar">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <strong> Moolalah Dashboard </strong>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className="main">
        <div className="graph">
          <AreaChart
            width={800}
            height={520}
            data={data}
            margin={{
              top: 40,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <text x={800 / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
              <tspan fontSize="20">Amount of Water Intake</tspan>
            </text>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" activeDot={{ r: 8 }} />
          </AreaChart>
        </div>
        <div className="water">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie dataKey="value" isAnimationActive={false} data={data1} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="point">point</div>
      </div>
    </div>
  );
}

export default App;
