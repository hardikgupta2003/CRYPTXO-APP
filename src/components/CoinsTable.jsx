import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles
} from '@material-ui/core';
import { CoinList } from '../config/api';
import { unstable_HistoryRouter } from 'react-router-dom';
import axios from 'axios';


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();

  const FetchCoinsData = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);
    setCoins(data);
    setLoading(false);
  }
  useEffect(() => {
    FetchCoinsData();

  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles= makeStyles({
    row:{
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    }
  });
  const classes = useStyles();
  const history = unstable_HistoryRouter();

  return (
    <ThemeProvider theme={darkTheme}>

      <Container style={{ textAlign: "center" }}>
        <Typography>
          cryptocurrency Prices By market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%"
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />)
            :
            (<Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["coin","Price","24h change","Market Cap"].map((head)=>{
                    <TableCell
                    style={{
                      color:"black",
                      fontWeight:"700",
                      fontFamily:"Montserrat",
                    }}
                    key={head}
                    align={head === "coin" ? "" : "right"}
                    >
                      {head}
                  </TableCell>
                  })}
                  
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch().map((row)=>{
                  const profit =row.price_change_percentage_24h > 0;
                  return (
                    <TableRow onClick={
                      ()=> history.pushState(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}>

                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>)
          }
        </TableContainer>



      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable