import { CLIENT_ID } from "../Config/config";
import React, {useState, useEffect} from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";
import axiosInstance from "../axios"

const currencies = Object.freeze({
  'USD': '$',
  'EUR': '€'
})

const Checkout = () => {

  const location = useLocation()

  const path = location.pathname.split('/')

  const ID = parseInt(path[path.length-3])
  
  const bidPrice = parseFloat(path[path.length-1])

  const [auctionItemData, setAuctionItemData] = useState({
    loading: true,
    data: []
  })
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false)

  useEffect(() => {
    // TODO: get the auction item and add it to paypal checkout data
    axiosInstance.get('auction/').then((res) => {
      res.data.map((item) => {
        if (item['id'] == ID) {
          setAuctionItemData({
            loading: false,
            data: item
          })
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  },[])

  const {category, currency, description, endDate, get_auctioneer_details, id, name, price, thumbnail} = auctionItemData.data

  // Create a paypal order
  const createOrder = (data, actions) => {

    return actions.order.create({
      purchase_units: [
        {
          description: name,
          amount: {
            currency_code: currency,
            value: parseFloat(bidPrice)
          },
        },
      ],
    }).then((orderID) => {
      setOrderID(orderID);
      return orderID;
    })
  }

   // check Approval
   const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
        const { payer } = details;
        setSuccess(true);
    });
};

//capture likely error
const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
};


  useEffect(() => {
    if (success) {
      alert("Your Bid has been placed successfully");
      axiosInstance.post('/auctions/bids/', {
        item: id,
        bidder: localStorage.getItem('id'),
        bidPrice: bidPrice,
        status: 'Bid'
      })
    }
  },[success]);

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div>
                {auctionItemData.loading == true ? <><h1>Dude</h1></> : <div className="wrapper">
                    <div className="product-img">
                        <img
                            src={thumbnail}
                            alt={auctionItemData.data['name']}
                            height="320"
                            width="300" />
                    </div>
                    <div className="product-info">
                        <div className="product-text">
                            <h1>{name}</h1>
                        </div>
                        <div className="product-price-btn">
                            <p>{currency != 'PLN' ? `${currencies[currency]}${bidPrice}`: `${bidPrice} PLN`}</p>
                            <br></br>
                            <button className='buy-btn' type="submit" onClick={() => setShow(true)}>
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
                }
                <br></br>
                {show ? (
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                ) : null}
            </div>
        </PayPalScriptProvider>
  );
}


export default Checkout;