import React, { useEffect, useState, useRef } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import googlelogo from "../../../public/images/google-logo.jpeg";
import yahoologo from "../../../public/images/yahoo-logo.jpg";
import office365logo from "../../../public/images/office365-logo.png";

import { useCloudSponge } from "../../context/CloudSpongeContext";

function MultiplePicker() {
  const [showMultiplePicker, setShowMultiplePicker] = useState<boolean>(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const cloudsponge = useCloudSponge();
  useEffect(() => {
    const afterSubmit = (contacts, source, owner, ctx) => {
      console.log(
        "%%%%%%%%%  afterSubmitContacts in Multiple Picker %%%%%%%%%%"
      );

      const nameArray = contacts.map((c) =>
        //if the contact does not have the name property populated, return email before '@'
        c.fullName()
          ? `${c.fullName()}`
          : `${c
              .selectedEmail()
              .substring(0, c.selectedEmail().lastIndexOf("@"))}`
      );
      setSelectedContacts((prev) => [...prev, ...nameArray]);
      console.log("selectedContacts: ", selectedContacts);
      setShowMultiplePicker(false);
    };
    // add the desired afterSubmit behaviour and specify a filter to this callback isn't run on any other scenarios
    cloudsponge.on("afterSubmitContacts", afterSubmit, "MultiplePicker");
  }, []);

  const launchCloudsponge = ({ target }) => {
    // when launching, optionally pass in the filter parameter to exclude callbacks that don't match
    cloudsponge.launch(target.dataset.cloudspongeSource, "MultiplePicker");
  };

  return (
    <div className="single-picker">
      <div>
        <br />
        <Button
          label="Open Multiple Picker"
          onClick={() => {
            setShowMultiplePicker(true);
          }}
        ></Button>
        <h1>Multiple Contacts Picked: </h1>
        <h1>
          {selectedContacts.map((cont, idx) => {
            return (
              <div key={idx}>
                <h3>{cont}</h3>
              </div>
            );
          })}
        </h1>
      </div>

      <Dialog
        visible={showMultiplePicker}
        modal={true}
        onHide={() => setShowMultiplePicker(false)}
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

export default MultiplePicker;
