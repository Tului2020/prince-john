import { websocketClient } from "polygon.io";

// const stocksWS = websocketClient("api key").getStocksWebsocket();

// stocksWs.on("message", raw => {
//   const message = JSON.parse(raw);
//   switch (message.ev) {
//     case "T":
//       // your trade message handler
//       break;
//   }
// });

// console.log(stocksWS.send({ action: "subscribe", params: "T.MSFT" }));