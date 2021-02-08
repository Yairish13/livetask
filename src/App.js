import React from "react";
import TableComp from "./Table";

function App() {

const style = {
  textAlign: 'center',
}
  return <div>
    <h1 style={style}>Live Currencies Rates</h1>
    <TableComp />
  </div>;
}



export default App;
