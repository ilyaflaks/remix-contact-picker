import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
// import googlelogo from "../../public/images/google-logo.jpeg";
// import yahoologo from "../../public/images/yahoo-logo.jpg";
//import office365logo from "../../public/images/office365-logo.png";
import SinglePicker from "../components/SinglePicker/SinglePicker";
import MultiplePicker from "../components/MultiplePicker/MultiplePicker";

export default function Index() {
  return (
    <div className="text-center">
      <SinglePicker />
      <MultiplePicker />
    </div>
  );
}
