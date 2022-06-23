import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Alert, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";

const AddLocation = () => {
  const categoryRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const siteContactRef = useRef();
  const internetRef = useRef();
  const externalIPRef = useRef();
  const diocesanNetworkRef = useRef();
  const supportRef = useRef();
  const modemRef = useRef();
  const localIPRef = useRef();
  const deviceRef1 = useRef();
  const ipAddressRef1 = useRef();
  const extIPAddress1 = useRef();
  const serialRef1 = useRef();
  const hardwareLocationRef1 = useRef();
  const hardwareSupport = useRef();
  const numberRef1 = useRef();
  const numNameRef1 = useRef();
  const providerRef1 = useRef();
  const phoneSupport = useRef();
  const miscRef1 = useRef();
  const notesRef = useRef();
  const dummy = useRef();
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationsRef = firestore.collection("locations");
    setLoading(true);
    if (
      deviceRef1.current.value === "" &&
      ipAddressRef1.current.value === "" &&
      extIPAddress1.current.value === "" &&
      serialRef1.current.value === "" &&
      hardwareLocationRef1.current.value === "" &&
      hardwareSupport.current.value === ""
    ) {
      let newLocationData = {
        category: categoryRef.current.value,
        name: nameRef.current.value,
        mainPhone: phoneRef.current.value,
        address: addressRef.current.value,
        siteContact: siteContactRef.current.value,
        internet: internetRef.current.value,
        externalIP: externalIPRef.current.value,
        diocesanNetwork: diocesanNetworkRef.current.value,
        support: supportRef.current.value,
        modem: modemRef.current.value,
        localRange: localIPRef.current.value,
        hardware: [],
        phones: [
          {
            id: uuidv4(),
            number: numberRef1.current.value,
            numName: numNameRef1.current.value,
            provider: providerRef1.current.value,
            misc: miscRef1.current.value,
            support: phoneSupport.current.value,
          },
        ],
        notes: notesRef.current.value,
      };
      let storingNewLocation = await locationsRef.add(newLocationData);
      if (!storingNewLocation) {
        setErr("There was an error saving your new location.");
      }
      setMessage("Success: Your new location has been added.");
      setLoading(false);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    } else if (
      numberRef1.current.value === "" &&
      numNameRef1.current.value === "" &&
      providerRef1.current.value === "" &&
      phoneSupport.current.value === "" &&
      miscRef1.current.value === ""
    ) {
      let newLocationData = {
        category: categoryRef.current.value,
        name: nameRef.current.value,
        mainPhone: phoneRef.current.value,
        address: addressRef.current.value,
        siteContact: siteContactRef.current.value,
        internet: internetRef.current.value,
        externalIP: externalIPRef.current.value,
        diocesanNetwork: diocesanNetworkRef.current.value,
        support: supportRef.current.value,
        modem: modemRef.current.value,
        localRange: localIPRef.current.value,
        hardware: [
          {
            id: uuidv4(),
            device: deviceRef1.current.value,
            ipAddress: ipAddressRef1.current.value,
            extIP: extIPAddress1.current.value,
            serial: serialRef1.current.value,
            hardwareLocation: hardwareLocationRef1.current.value,
            support: hardwareSupport.current.value,
          },
        ],
        phones: [],
        notes: notesRef.current.value,
      };
      let storingNewLocation = await locationsRef.add(newLocationData);
      if (!storingNewLocation) {
        setErr("There was an error saving your new location.");
      }
      setMessage("Success: Your new location has been added.");
      setLoading(false);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    } else {
      let newLocationData = {
        category: categoryRef.current.value,
        name: nameRef.current.value,
        mainPhone: phoneRef.current.value,
        address: addressRef.current.value,
        siteContact: siteContactRef.current.value,
        internet: internetRef.current.value,
        externalIP: externalIPRef.current.value,
        diocesanNetwork: diocesanNetworkRef.current.value,
        support: supportRef.current.value,
        modem: modemRef.current.value,
        localRange: localIPRef.current.value,
        hardware: [
          {
            id: uuidv4(),
            device: deviceRef1.current.value,
            ipAddress: ipAddressRef1.current.value,
            extIP: extIPAddress1.current.value,
            serial: serialRef1.current.value,
            hardwareLocation: hardwareLocationRef1.current.value,
            support: hardwareSupport.current.value,
          },
        ],
        phones: [
          {
            id: uuidv4(),
            number: numberRef1.current.value,
            numName: numNameRef1.current.value,
            provider: providerRef1.current.value,
            support: phoneSupport.current.value,
            misc: miscRef1.current.value,
          },
        ],
        notes: notesRef.current.value,
      };
      let storingNewLocation = await locationsRef.add(newLocationData);
      if (!storingNewLocation) {
        setErr("There was an error saving your new location.");
      }
      setMessage("Success: Your new location has been added.");
      setLoading(false);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="w-100 mt-2 mb-3">
        <Link to="/">Return to Locations</Link>
      </div>
      <div ref={dummy}></div>
      <h4>Add A New Location:</h4>
      {err && <Alert variant="danger">{err}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form className="mb-4 mt-3" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>Location Category</Form.Label>
            <Form.Control ref={categoryRef} size="sm" as="select">
              <option>CC</option>
              <option>CEM</option>
              <option>DOH</option>
              <option>DOC</option>
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Location Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Col>
          <Col>
            <Form.Label>Phone</Form.Label>
            <Form.Control ref={phoneRef} type="text" required />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Address</Form.Label>
            <Form.Control ref={addressRef} type="text" required />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Site Contact & Phone Number</Form.Label>
            <Form.Control ref={siteContactRef} type="text" required />
          </Col>
        </Row>
        <Form.Label className="formTitle">Connectivity</Form.Label>
        <Row>
          <Col>
            <Form.Label>Internet Speed</Form.Label>
            <Form.Control ref={internetRef} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>External IP Address</Form.Label>
            <Form.Control ref={externalIPRef} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Diocesan Network</Form.Label>
            <Form.Control ref={diocesanNetworkRef} size="sm" type="text" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Vendor & Support #</Form.Label>
            <Form.Control ref={supportRef} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Modem Credenitals</Form.Label>
            <Form.Control ref={modemRef} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Local IP Range</Form.Label>
            <Form.Control ref={localIPRef} size="sm" type="text" />
          </Col>
        </Row>
        <Form.Label className="formTitle">Hardware</Form.Label>
        <Row>
          <Col>
            <Form.Label>Device</Form.Label>
            <Form.Control ref={deviceRef1} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Int. IP Address</Form.Label>
            <Form.Control ref={ipAddressRef1} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Ext. IP Address</Form.Label>
            <Form.Control ref={extIPAddress1} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Serial</Form.Label>
            <Form.Control ref={serialRef1} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Location</Form.Label>
            <Form.Control ref={hardwareLocationRef1} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Vendor & Support #</Form.Label>
            <Form.Control ref={hardwareSupport} size="sm" type="text" />
          </Col>
        </Row>
        <Form.Label className="formTitle">Telco</Form.Label>
        <Row>
          <Col>
            <Form.Label>Phone #</Form.Label>
            <Form.Control ref={numberRef1} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Name/Location</Form.Label>
            <Form.Control ref={numNameRef1} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Provider</Form.Label>
            <Form.Control ref={providerRef1} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Vendor & Support #</Form.Label>
            <Form.Control ref={phoneSupport} size="sm" type="text" />
          </Col>
          <Col>
            <Form.Label>Misc</Form.Label>
            <Form.Control ref={miscRef1} size="sm" type="text" />
          </Col>
        </Row>
        <Form.Label>Additional Notes</Form.Label>
        <Form.Control ref={notesRef} as="textarea" rows="2" />
        <Button
          className="mt-2"
          variant="info"
          size="lg"
          type="submit"
          disabled={loading}
        >
          <i className="fas fa-plus-circle"></i> Add
        </Button>
      </Form>
    </>
  );
};

export default AddLocation;
