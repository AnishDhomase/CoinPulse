import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loader from "./Loader";
import "./CoinChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinChart = ({ currency }) => {
  const [chartData, setChartData] = useState([]);
  const { id } = useParams();
  const [days, setDays] = useState(1);
  const CoinChartData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setChartData(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CoinChartData();
  }, [currency, id, days]);

  const myData = {
    labels: chartData.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: ` Price in Past ${days} Days in ${currency} `,
        data: chartData.map((value) => value[1]),
        borderColor: "#5f8cff",
        borderWidth: "1",
      },
    ],
  };

  function ActivateButton(e) {
    Array.from(e.target.parentElement.querySelectorAll("button")).map((btn) =>
      btn.classList.remove("active")
    );
    e.target.classList.add("active");
  }

  return (
    <>
      {chartData.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <Line
            data={myData}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
            style={{ marginTop: "5rem", width: "40rem" }}
          />

          <div className="btn chartBtn" style={{ marginTop: "30px" }}>
            <button className="active" onClick={(e) => {
                setDays(1);
                ActivateButton(e);
                }}> Past 24 hours</button>
            <button onClick={(e) => {
                setDays(30);
                ActivateButton(e);
                }}>
              Past 1 Month
            </button>
            <button onClick={(e) => {
                setDays(365);
                ActivateButton(e);
                }}>Past 1 Year</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinChart;
