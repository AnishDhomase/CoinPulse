import React from "react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CoinDetails.css";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import CoinChart from "./CoinChart";

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currency, setCurrency] = useState("inr");
  const language = "en";
  const currencySymbol = currency === "inr" ? "₹" : "$";
  const profit = coin.market_data?.price_change_percentage_24h > 0;
  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log("fetch error in getcoin :::", error);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);

  function ActivateButton(e) {
    Array.from(e.target.parentElement.querySelectorAll("button")).map((btn) =>
      btn.classList.remove("active")
    );
    e.target.classList.add("active");
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" coin-detail">
            <div className="coin-info">
              <div className="btn">
                <button className="active"
                  onClick={(e) => {
                    setCurrency("inr");
                    ActivateButton(e);
                  }}
                >
                  inr
                </button>
                <button
                  onClick={(e) => {
                    setCurrency("usd");
                    ActivateButton(e);
                  }}
                >
                  usd
                </button>
              </div>
              <div className="time">
                Last updated on {coin?.last_updated?.slice(0, 10)}
              </div>
              <div className="coin-image">
                <img height={"150px"} src={coin?.image?.large} alt="" />
              </div>
              <div className="coin-name">{coin?.name}</div>
              <div className="coin-price">
                {currencySymbol} {coin?.market_data?.current_price[currency]}
              </div>
              <div className="coin-profit">
                {profit ? (
                  <BiSolidUpArrow color="green" />
                ) : (
                  <BiSolidDownArrow color="red" />
                )}
                {coin?.market_data?.price_change_percentage_24h} %
              </div>
              <div className="market-rank">Rank #{coin?.market_cap_rank}</div>
              <div className="coin-desc">
                <p> {coin?.description?.en?.split(".")[0]} </p>
              </div>
            </div>
            <CoinChart currency={currency} />
          </div>
        </>
      )}
    </>
  );
};

export default CoinDetails;
