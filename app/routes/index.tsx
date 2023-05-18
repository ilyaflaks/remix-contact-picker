import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function Index() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute(
      "src",
      "https://api.cloudsponge.com/widget/localhost-only.js"
    );
    head?.appendChild(script);

    return () => {
      head?.removeChild(script);
    };
  }, []);

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
          <a href="#" className="cloudsponge-launch">
            Pick Contacts
          </a>
          <input type="textarea" className="cloudsponge-contacts" />
          <br />
          <a className="cloudsponge-launch" data-cloudsponge-source="gmail">
            Google Contacts
          </a>
          <br />
          <a className="cloudsponge-launch" data-cloudsponge-source="yahoo">
            Yahoo
          </a>
          <br />
          <a className="cloudsponge-launch" data-cloudsponge-source="office365">
            Office 365
          </a>
        </div>
      </Dialog>
      <div>
        <h1>The following works even without cloudsponge.init():</h1>
        <a href="#" className="cloudsponge-launch">
          Pick Contacts
        </a>
        <input type="textarea" className="cloudsponge-contacts" />
        <br />
        <a className="cloudsponge-launch" data-cloudsponge-source="gmail">
          Google Contacts
        </a>
        <br />
        <a className="cloudsponge-launch" data-cloudsponge-source="yahoo">
          Yahoo
        </a>
        <br />
        <a className="cloudsponge-launch" data-cloudsponge-source="office365">
          Office 365
        </a>
      </div>
    </div>
  );
}
