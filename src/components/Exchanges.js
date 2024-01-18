import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import Loader from "./Loader";
import "./Exchanges.css";
import { Link} from "react-router-dom";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  useEffect(() => {
    try {
      const url = "https://api.coingecko.com/api/v3/exchanges";
      const getExchangesData = async () => {
        const res = await axios.get(url);
        console.log(res.data);
        setExchanges(res.data);
        setLoading(false);
      };
      getExchangesData();
    } catch (err) {
      console.log("err in exchanges ::: ", err);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header activeMember="home"/>
          <h2 className="title">Trending Coins</h2>
          <div className="cryptos">
            {exchanges.map((item, i) => {
              return (
                <Link to={`/coins/${item.id}`}
                style={{ color: "white", textDecoration: "none" }}>
                <div key={i} className="ex-cards">
                  <div className="image">
                    <img height={"60px"} src={item?.image} alt="" />
                  </div>
                  <div className="name">{item?.name}</div>
                  <div className="price">
                    {item?.trade_volume_24h_btc?.toFixed(0)}
                  </div>
                  <div className="rank">{item?.trust_score_rank}</div>
                </div>
                </Link>  
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
