import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import googlelogo from "../../public/images/google-logo.jpeg";
import yahoologo from "../../public/images/yahoo-logo.jpg";
import office365logo from "../../public/images/office365-logo.png";

export default function Index() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [contactPicked, setContactPicked] = useState<string>("None so far");

  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute(
      "src",
      "https://api.cloudsponge.com/widget/localhost-only.js"
    );
    script.onload = () => {
      // after the script loads, cloudsponge should be defined and we can initialize our options now
      window.cloudsponge?.init({
        rootNodeSelector: "#cloudsponge-widget-container",
      });
    };
    head?.appendChild(script);

    return () => {
      head?.removeChild(script);
    };
  }, []);

  // Call cloudsponge.launch, passing in the data-cloudsponge-source attribute if present
  const launchCloudsponge = ({ target }) => {
    window.cloudsponge?.launch(target.dataset.cloudspongeSource);
  };

  const inputValue = useRef();

  return (
    <div className="text-center">
      {/* <Button
        label="Click"
        icon="pi pi-plus"
        onClick={(e) => setCount(count + 1)}
      ></Button>
      <div className="text-2xl text-900 mt-3">{count}</div> */}
      <Button
        label="Show Dialog"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Contact Picker"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div>
          <div className="picker-top">
            <a href="#" onClick={launchCloudsponge}>
              Pick Contacts:
            </a>
            <input
              type="textarea"
              className="cloudsponge-contacts"
              ref={inputValue}
            />
            <Button
              label="Done"
              icon="pi pi-check"
              className="done-btn"
              onClick={() => {
                setContactPicked(inputValue.current.value);
                setVisible(false);
              }}
            />
          </div>
          {
            // We use the launchCloudsponge onClick handler here because these links are only visible after
            // the Dialog is shown so cloudsponge didn't attach a click handler to them.
          }
          <br />
          <div className="logos">
            <img
              src={googlelogo}
              className="provider-logo"
              onClick={launchCloudsponge}
              data-cloudsponge-source="gmail"
            ></img>
            <img
              src={yahoologo}
              className="provider-logo"
              onClick={launchCloudsponge}
              data-cloudsponge-source="yahoo"
            ></img>
            <img
              src={office365logo}
              className="provider-logo"
              onClick={launchCloudsponge}
              data-cloudsponge-source="office365"
            ></img>
          </div>
        </div>
      </Dialog>
      <div>
        <h1 className="landing-header">
          Click the button above to open the contact picker
        </h1>
        <h1>Contact picked:</h1>
        <h1>{contactPicked}</h1>
      </div>
    </div>
  );
}
