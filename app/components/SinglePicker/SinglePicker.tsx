import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import googlelogo from "../../../public/images/google-logo.jpeg";
import yahoologo from "../../../public/images/yahoo-logo.jpg";
import office365logo from "../../../public/images/office365-logo.png";
import { useCloudSponge } from "../../context/CloudSpongeContext";

function SinglePicker() {
  const [showContactPicker, setShowContactPicker] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<string>("Nobody");
  const cloudsponge = useCloudSponge();

  useEffect(() => {
    // add the desired afterSubmit behaviour and specify a filter to this callback isn't run on any other scenarios

    //on is a method that accepts an event, a callback and a string to filter by
    //in this case, afterSubmitContacts, func to update state with selected contact and "SinglePicker"
    cloudsponge.on(
      "afterSubmitContacts",
      (contacts, source, owner, ctx) => {
        console.log(
          "anon func of afterSubmitContacts in contact SinglePicker. contacts: ",
          contacts,
          ", source: ",
          source,
          ", owner: ",
          owner,
          ", ctx: ",
          ctx
        );

        const selectedName = contacts[0].fullName()
          ? `${contacts[0].fullName()}`
          : `${contacts[0]
              .selectedEmail()
              .substring(0, contacts[0].selectedEmail().lastIndexOf("@"))}`;
        console.log("selectedName: ", selectedName);
        setSelectedContact(selectedName);
        setShowContactPicker(false);
      },
      "SinglePicker"
    );
  }, []);

  const launchCloudsponge = ({ target }) => {
    // add the desired callbacks as we launch from this component:
    // when launching, optionally pass in the filter parameter to exclude callbacks that don't match
    cloudsponge.launch(target.dataset.cloudspongeSource, "SinglePicker");
    //launch is defined towards the end of context, accepts "source" and "filter" as args
    //this func replaces this code:
    //
    // // const launchCloudsponge = ({ target }) => {
    // //   window.cloudsponge?.launch(target.dataset.cloudspongeSource);
    // // };
    //
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
              alt="Google logo"
              src={googlelogo}
              className="provider-logo"
              onClick={launchCloudsponge}
              data-cloudsponge-source="gmail"
            ></img>

            <img
              alt="Yahoo logo"
              src={yahoologo}
              className="provider-logo"
              onClick={launchCloudsponge}
              data-cloudsponge-source="yahoo"
            ></img>

            <img
              alt="Office365 logo"
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
