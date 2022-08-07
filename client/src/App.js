//import Web3 from 'web3';
// import { CONTACT_ABI, CONTACT_ADDRESS } from './config';
import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles'
import { ethers } from 'ethers';
import { parseEther, formatEther } from '@ethersproject/units';
import Auction from './contracts/Auction.json';
import { AppBar, IconButton, Toolbar, Collapse, Box, Slider, Typography} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react'
import configuration from '../src/contracts/Auction.json'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    marginTop: '100px',
    margin: '0 auto',
    width: '50%',
    textAlign: 'center',
  },
  appbar: {
    background: '#010314',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  inputComponent: {
      height: '30px',
      width:  '71px',
      border: '1px solid #D3D4D0',
      borderRadius: '5px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 1px 0 0 rgba(170,170,170,0.01)'
  },
  inputText: {
      color: 'rgba(0,0,0,0.87)',
      fontSize: '16px',
      letterSpacing: '0.5px',
      lineHeight: '28px',
      textAlign: 'center',
  },
  colorText: {
    color: '8E4646',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  submitButtons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    color: 'secondary',
    alignItems: 'center',
    width: 1,
    },
    submitButton: {
    width: 1,
    textAlign: 'center',
    color: 'secondary',
    },
}))

const AuctionContractAddress = '0xBdD00476B67D0c5E20cE23cc0849ea18Fd816103';
const emptyAddress = '0x0000000000000000000000000000000000000000';

//fetch the values to display on the slider
function valuetext(value: number) {
 return `${value}%`;
}
const minDistance = 10;

function App() {
 // use the styles
 const classes = useStyles()
 // Use hooks to manage component state
 const { ethers } = require("ethers");
 const [account, setAccount] = useState('');
 const [amount, setAmount] = useState(0);
 const [myBid, setMyBid] = useState(0);
 const [isOwner, setIsOwner] = useState(false);
 const [highestBid, setHighestBid] = useState(0);
 const [highestBidder, setHighestBidder] = useState('');
 const [startTime, setStartTime] = useState('');
 const [endDate, setEndDate] = useState(new Date());


 // values for the slider
 const [value, setValue] = React.useState([20, 37]);

 const handleChange = (event, newValue) => {
   setValue(newValue);
 };

 // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
 async function initializeProvider() {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   return new ethers.Contract(AuctionContractAddress, Auction.abi, signer);
 }

 // Displays a prompt for the user to select which accounts to connect from Ganache
 async function requestAccount() {
   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
   setAccount(account[0]);
 }

  // Displays start time - new from Clarissa
  async function requestStartTime() {
    const current = new Date();
    setStartTime(current.toLocaleDateString());
  }

 async function fetchHighestBid() {
   if (typeof window.ethereum !== 'undefined') {
     const contract = await initializeProvider();
     try {
       const highestBid = await contract.fetchHighestBid();
       const { bidAmount, bidder } = highestBid;

     // Convert bidAmount from Wei to Ether and round value to 4 decimal places
        setHighestBid(parseFloat(formatEther(bidAmount.toString())).toPrecision(4));
        setHighestBidder(bidder.toLowerCase());
     } catch (e) {
       console.log('error fetching highest bid: ', e);
     }
   }
 }

 async function fetchMyBid() {
   if (typeof window.ethereum !== 'undefined') {
     const contract = await initializeProvider();
     try {
       const myBid = await contract.bids(account);
       setMyBid(parseFloat(formatEther(myBid.toString())).toPrecision(4));
     } catch (e) {
       console.log('error fetching my bid: ', e);
     }
   }
 }

 async function fetchOwner() {
   if (typeof window.ethereum !== 'undefined') {
     const contract = await initializeProvider();
     try {
       const owner = await contract.getOwner();
       setIsOwner(owner.toLowerCase() === account);
     } catch (e) {
       console.log('error fetching owner: ', e);
     }
   }
 }

 async function submitBid(event) {
   event.preventDefault();
   if (typeof window.ethereum !== 'undefined') {
     const contract = await initializeProvider();
     try {
       // User inputs amount in terms of Ether, convert to Wei before sending to the contract.
       const wei = parseEther(amount);
       await contract.makeBid({ value: wei });
       // Wait for the smart contract to emit the LogBid event then update component state
       contract.on('LogBid', (_, __) => {
         fetchMyBid();
         fetchHighestBid();
       });
     } catch (e) {
       console.log('error making bid: ', e);
     }
   }
 }

 async function withdraw() {
   if (typeof window.ethereum !== 'undefined') {
     const contract = await initializeProvider();
     // Wait for the smart contract to emit the LogWithdrawal event and update component state
     contract.on('LogWithdrawal', (_) => {
       fetchMyBid();
       fetchHighestBid();
     });
     try {
       await contract.withdraw();
     } catch (e) {
       console.log('error withdrawing fund: ', e);
     }
   }
 }

 useEffect(() => {
   requestAccount();
 }, []);

 useEffect(() => {
   if (account) {
     fetchOwner();
     fetchMyBid();
     fetchHighestBid();
   }
 }, [account]);

 return (
  <div className={classes.root} id="header" >
   <AppBar className={classes.appbar} elevation={0} style={{ background: '#010314' }}>
       <Toolbar className={classes.appbarWrapper}>
          <img src={require('./Trixo.png')} width="70"/>
          <h1></h1>
          <h1>Trixo</h1>
       </Toolbar>
   </AppBar>s
   <div >
     {isOwner ? (
       <button type="button" onClick={withdraw}>
         Withdraw
       </button>
     ) : (
       ""
     )}
     <div
       style={{
         textAlign: 'center',
         marginTop: '10px',
         paddingBottom: '10px',
       }}>
       <h3>Connected Account: {account}</h3>
       <h4>When do you need your car again?</h4>
       <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '8vh'}}>
           <Stack component="form" noValidate spacing={3}>
             <TextField
               id="datetime-local"
               label="End time for next session"
               type="datetime-local"
               defaultValue="2017-05-24T10:30"
               sx={{ width: 250 }}
               inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
               InputProps={classes.inputText}
               className={classes.inputComponent}
             />
           </Stack>
       </div>
        <Box sx={{ width: 300 }}>
          <Typography id="range-slider" gutterBottom>
            <h4>Set your desired and minimum battery charge.</h4>
          </Typography>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </Box>
       <h4>Estimated Session Savings: {myBid}</h4>
       <h4>Estimated Charging Cost: {myBid}</h4>
       <h4>My Bid for Pooled Capacity: {myBid}</h4>
       <h4>Highest Bid Amount for Pooled Capacity: {highestBid}</h4>
       <h4>
         Auction Highest Bidder:{' '}
         {highestBidder === emptyAddress
           ? 'null'
           : highestBidder === account
           ? 'Lotta'
           : highestBidder}
       </h4>
       {!isOwner ? (
         <form onSubmit={submitBid}>
           <input
             value={amount}
             onChange={(event) => setAmount(event.target.value)}
             name="Pooled Capacity" // Enter Bid Amount
             type="number"
             placeholder="Enter Pooled Capacity " // Enter Bid Amount
           />
         </form>
       ) : (
         ""
       )}
       <p></p>
       <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '8vh'}}>
           <Stack direction="row" spacing={2}>
             <Button variant="outlined" color="error">Cancel</Button>
             <Button className={classes.submitButton} variant='outlined' color='primary' type="submit">
                Submit
             </Button>
           </Stack>
       </div>
     </div>
   </div>
   </div>
 );
}

export default App;