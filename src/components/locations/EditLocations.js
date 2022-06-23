import React, { useRef, useState } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { firestore } from "../../firebase";
import EditHardware from "./EditHardware";
import EditPhones from "./EditPhones";

const EditLocations = () => {
  const locationRef = useLocation();
  let { location } = locationRef.state;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const {
    id,
    name,
    address,
    mainPhone,
    siteContact,
    internet,
    externalIP,
    diocesanNetwork,
    support,
    modem,
    localRange,
    notes,
  } = location;

  const nameRef = useRef(name);
  const phoneRef = useRef(mainPhone);
  const addressRef = useRef(address);
  const siteContactRef = useRef(siteContact);
  const internetRef = useRef(internet);
  const externalIPRef = useRef(externalIP);
  const diocesanNetworkRef = useRef(diocesanNetwork);
  const supportRef = useRef(support);
  const modemRef = useRef(modem);
  const localIPRef = useRef(localRange);
  const notesRef = useRef(notes);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let editedLocation = {
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
      notes: notesRef.current.value,
    };

    const updateRef = firestore.collection("locations").doc(id);
    const updating = await updateRef.update(editedLocation);
    if (!updating) {
      setErr("Your location was not able to update.");
    }
    setErr("");
    setMessage("Success: Your location was updated.");
    setLoading(false);
  };

  return (
    <>
      <div className="w-100">
        <Link to="/">
          <Button className="float-right mb-2" variant="link">
            Back to Main Page
          </Button>
        </Link>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ width: "90vw" }}
      >
        <div className="edit-main m-4 w-75">
          <h4>Edit {name}</h4>
          {err && <Alert variant="danger">{err}</Alert>}
          {message && (
            <Alert variant="success">
              {message}{" "}
              <Link
                to={{
                  pathname: "/afterEditlocation",
                  state: {
                    location,
                  },
                }}
              >
                Return To Your Location
              </Link>
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label>Location Name</Form.Label>
                <Form.Control
                  defaultValue={name}
                  ref={nameRef}
                  type="text"
                  required
                />
              </Col>
              <Col>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  defaultValue={mainPhone}
                  ref={phoneRef}
                  type="text"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  defaultValue={address}
                  ref={addressRef}
                  type="text"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Site Contact & Phone Number</Form.Label>
                <Form.Control
                  defaultValue={siteContact}
                  ref={siteContactRef}
                  type="text"
                  required
                />
              </Col>
            </Row>
            <Form.Label className="formTitle">Connectivity</Form.Label>
            <Row>
              <Col>
                <Form.Label>Internet Speed</Form.Label>
                <Form.Control
                  defaultValue={internet}
                  ref={internetRef}
                  size="sm"
                  type="text"
                />
              </Col>
              <Col>
                <Form.Label>External IP Address</Form.Label>
                <Form.Control
                  defaultValue={externalIP}
                  ref={externalIPRef}
                  size="sm"
                  type="text"
                />
              </Col>
              <Col>
                <Form.Label>Diocesan Network</Form.Label>
                <Form.Control
                  defaultValue={diocesanNetwork}
                  ref={diocesanNetworkRef}
                  size="sm"
                  type="text"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Vendor & Support #</Form.Label>
                <Form.Control
                  defaultValue={support}
                  ref={supportRef}
                  size="sm"
                  type="text"
                />
              </Col>
              <Col>
                <Form.Label>Modem Credenitals</Form.Label>
                <Form.Control
                  defaultValue={modem}
                  ref={modemRef}
                  size="sm"
                  type="text"
                />
              </Col>
              <Col>
                <Form.Label>Local IP Range</Form.Label>
                <Form.Control
                  defaultValue={localRange}
                  ref={localIPRef}
                  size="sm"
                  type="text"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  defaultValue={notes}
                  ref={notesRef}
                  size="sm"
                  type="textarea"
                  row={2}
                />
              </Col>
            </Row>
            <Button
              className="mt-2"
              variant="info"
              size="sm"
              type="submit"
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
        </div>
        <div className="ml-2 mb-4 w-75">
          <EditHardware id={id} location={location} />
        </div>
        <div className="ml-2 mb-4 w-75">
          <EditPhones id={id} location={location} />
        </div>
        <div className="ml-2 mb-4 w-75"></div>
      </div>
    </>
  );
};

export default EditLocations;
