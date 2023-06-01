import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import googlelogo from "../../../public/images/google-logo.jpeg";
import yahoologo from "../../../public/images/yahoo-logo.jpg";
import office365logo from "../../../public/images/office365-logo.png";

function SinglePicker() {
  const [showContactPicker, setShowContactPicker] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<string>("Nobody");

  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute(
      "src",
      "https://api.cloudsponge.com/widget/localhost-only.js"
    );
    script.onload = () => {
      window.cloudsponge?.init({
        rootNodeSelector: "#cloudsponge-widget-container",
        beforeDisplayContacts: (c) => {
          console.log("beforeDisplayContacts in contact picker");
        },

        afterSubmitContacts: (contact) => {
          console.log(
            "%%%%%%%%%  afterSubmitContacts in contact SinglePicker %%%%%%%%%%"
          );

          const selectedName = contact[0].fullName()
            ? `${contact[0].fullName()}`
            : `${contact[0]
                .selectedEmail()
                .substring(0, contact[0].selectedEmail().lastIndexOf("@"))}`;
          console.log("selectedName: ", selectedName);
          setSelectedContact(selectedName);
          setShowContactPicker(false);
        },
      });
    };

    head?.appendChild(script);

    return () => {
      head?.removeChild(script);
    };
  }, []);

  const launchCloudsponge = ({ target }) => {
    window.cloudsponge?.launch(target.dataset.cloudspongeSource);
  };

  return (
    <div className="single-picker">
      <div>
        <br />
        <Button
          label="Open Single Picker"
          onClick={() => {
            setShowContactPicker(true);
          }}
        ></Button>
        <h1>Single Contact Picked: </h1>
        <h1>{selectedContact}</h1>
      </div>

      <Dialog
        visible={showContactPicker}
        modal={true}
        onHide={() => setShowContactPicker(false)}
      >
        <br />
        <div>
          <h1 className="addressbook-header">Address Book</h1>
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

        <br />
      </Dialog>

      <br />
    </div>
  );
}

export default SinglePicker;
