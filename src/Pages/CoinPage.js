import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };


  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function localString(date){
    var utcDate = date  // ISO-8601 formatted date returned from server
    var localDate = new Date(utcDate);
    // return localDate;
    console.log(localDate.toLocaleTimeString());
    console.log(localDate.toLocaleDateString());
    return localDate.toLocaleTimeString();
  }
  function localTIme(date){
    var utcDate = date  // ISO-8601 formatted date returned from server
    var localDate = new Date(utcDate);
    return localDate.toDateString();
  }
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      maxHeight: "90vh",
      overflowY: "scroll",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "green" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20, borderRadius: "50%"}}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              24 Hour High:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.high_24h.inr
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              24 Hour Low:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.low_24h.inr
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Liquidity Score:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {
                coin?.liquidity_score
              }
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Markt Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              {/* Update at: */}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
                {localTIme(coin?.market_data.last_updated)}{" "}
                at {" "}{localString(coin?.market_data.last_updated)} 
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
              <a href={coin?.links.repos_url.github[0]} target="_blank" style={{"borderRadius": "8px", "padding": "8px 15px", "marginTop": "10px", "color": "white", "backgroundColor": "black", "marginRight": "5px"}}><i class="fa-brands fa-github"></i>{"  "} Github</a>
              <a href={coin?.links.subreddit_url} target="_blank" style={{"borderRadius": "8px", "padding": "8px 15px", "marginTop": "10px", "color": "white", "backgroundColor": "#FF4500"}}><i class="fa-brands fa-square-reddit"></i>{"  "}Reddit</a>
              <a href={coin?.links.homepage[0]} target="_blank" style={{"borderRadius": "8px", "padding": "8px 15px", "marginTop": "10px", "marginLeft": "5px", "color": "white", "backgroundColor": "#FF4500"}}><i class="fa-solid fa-circle-check"></i>{"  "}Website</a>
          </span>
          <span style={{ display: "flex" }}>
              {/* <h3>{coin?.tickers[0].market.name}</h3>
              <span><a href={coin?.tickers[0].trade_url}></a></span> */}
              <Typography variant="h5" className={classes.heading} style={{"marginTop": "25px", "textAlign": "center"}}>
              Our Suggested Trading Platfroms
            </Typography>
          </span>
          <hr  style={{"marginTop": "10px", "marginBottom": "10px"}}/>
          <span style={{ display: "flex" }}>
              {/* <h3>{coin?.tickers[0].market.name}</h3>
              <span><a href={coin?.tickers[0].trade_url}></a></span> */}
              <Typography variant="h6" className={classes.heading}>
              Platfrom Name :&nbsp;
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            > {" "}
              {coin?.tickers[0].market.name}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.heading}>
              Trust Level :&nbsp;
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.tickers[0].trust_score.charAt(0).toUpperCase() + coin?.tickers[0].trust_score.slice(1)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.heading}>
              Trading Link :&nbsp;
            </Typography>
            <Typography variant="h6" className={classes.heading}>
              <a href={coin?.tickers[0].trade_url} target="_blank">Link Here</a>
            </Typography>
          </span>
          <hr  style={{"marginTop": "10px", "marginBottom": "10px"}}/>
          <span style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.heading}>
              Platfrom Name :&nbsp;
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            > {" "}
              {coin?.tickers[1].market.name}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.heading}>
              Trust Level :&nbsp;
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.tickers[1].trust_score.charAt(0).toUpperCase() + coin?.tickers[1].trust_score.slice(1)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.heading}>
              Trading Link :&nbsp;
            </Typography>
            <Typography variant="h6" className={classes.heading}>
              <a href={coin?.tickers[1].trade_url} target="_blank">Link Here</a>
            </Typography>
          </span> 
          <hr  style={{"marginTop": "10px", "marginBottom": "10px"}}/>
          <span style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.heading}>
              Platfrom Name :&nbsp;
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            > {" "}
              {coin?.tickers[2].market.name}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.heading}>
              Trust Level :&nbsp;
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.tickers[2].trust_score.charAt(0).toUpperCase() + coin?.tickers[2].trust_score.slice(1)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.heading}>
              Trading Link :&nbsp;
            </Typography>
            <Typography variant="h6" className={classes.heading}>
              <a href={coin?.tickers[2].trade_url} target="_blank">Link Here</a>
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
