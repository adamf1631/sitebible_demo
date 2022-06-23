import React, { useState } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";

const EditHardware = ({ id, location }) => {
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  const { hardware } = location;

  const deleteHardware = async (hardwareID) => {
    let newHardwareArray = hardware.filter((h) => h.id !== hardwareID);
    const updateRef = firestore.collection("locations").doc(id);
    const updating = await updateRef.update({ hardware: newHardwareArray });
    if (!updating) {
      setErr("Your hardware was not deleted due to an error.");
      setMessage("");
    }
    setErr("");
    setMessage("Success: Your hardware was deleted.");
  };

  return (
    <>
      <h3>
        <i className="fas fa-server"></i> Hardware Edit
      </h3>
      {err}
      {message}
      {hardware &&
        hardware
          .sort((a, b) => {
            if (a.device < b.device) {
              return -1;
            }
            if (a.device > b.device) {
              return 1;
            }
            return 0;
          })
          .map((hard) => (
            <Container fluid key={hard.id}>
              <Row className="w-100 m-2">
                <Col
                  style={{
                    textAlign: "center",
                    borderBottom: "solid thin #cecece",
                    marginBottom: 9,
                  }}
                >
                  {hard.device}
                </Col>
                <Col
                  style={{
                    textAlign: "center",
                    borderBottom: "solid thin #cecece",
                    marginBottom: 9,
                  }}
                >
                  {hard.ipAddress}
                </Col>
                <Col
                  style={{
                    textAlign: "center",
                    borderBottom: "solid thin #cecece",
                    marginBottom: 9,
                  }}
                >
                  {hard.hardwareLocation}
                </Col>
                <Col
                  style={{
                    textAlign: "center",
                    borderBottom: "solid thin #cecece",
                    marginBottom: 9,
                  }}
                >
                  <EditModal
                    location={location}
                    locationID={id}
                    hardware={hard}
                    hardwareID={hard.id}
                  />
                </Col>
                <Col
                  style={{
                    textAlign: "center",
                    borderBottom: "solid thin #cecece",
                    marginBottom: 9,
                  }}
                >
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteHardware(hard.id)}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </Col>
              </Row>
            </Container>
          ))}
    </>
  );
};

export default EditHardware;

const EditModal = ({ location, hardware, hardwareID, locationID }) => {
  const [modal, setModal] = useState(false);
  const [device, setDevice] = useState(hardware.device || "");
  const [ipAddress, setIPAddress] = useState(hardware.ipAddress || "");
  const [extIP, setExtIP] = useState(hardware.extIP || "");
  const [serial, setSerial] = useState(hardware.serial || "");
  const [hardwareLocation, setHardwareLocation] = useState(
    hardware.hardwareLocation || ""
  );
  const [support, setSupport] = useState(hardware.support || "");
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  const changeModal = () => {
    setModal(!modal);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    let editedHardware = {
      id: hardwareID,
      device,
      ipAddress,
      extIP,
      serial,
      hardwareLocation,
      support,
    };
    let newHardware = await location.hardware
      .filter((h) => h.id !== hardwareID)
      .concat(editedHardware);

    const updateRef = firestore.collection("locations").doc(locationID);
    const updating = await updateRef.update({ hardware: newHardware });
    if (!updating) {
      setErr("Your hardware was not updated due to an error.");
      setMessage("");
    }
    console.log(location);
    setErr("");
    setMessage("Success: Your hardware was updated.");
  };

  return (
    <div className="mainModal">
      <Button onClick={changeModal} variant="warning" size="sm">
        <i className="fas fa-edit"></i>
      </Button>
      <Modal show={modal}>
        <Modal.Header>
          <Button
            onClick={changeModal}
            className="float-right"
            variant="outline-secondary"
            size="sm"
          >
            <i className="far fa-times-circle"></i>
          </Button>
          <p>
            {message && (
              <>
                {message}
                <Link
                  to={{
                    pathname: "/afterEditLocation",
                    state: {
                      location,
                    },
                  }}
                >
                  Return To Your Location
                </Link>
              </>
            )}
          </p>
          <p>{err}</p>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Device</Form.Label>
              <Form.Control
                type="text"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Int. IP</Form.Label>
              <Form.Control
                type="text"
                value={ipAddress}
                onChange={(e) => setIPAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ext. IP</Form.Label>
              <Form.Control
                type="text"
                value={extIP || ""}
                onChange={(e) => setExtIP(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Serial</Form.Label>
              <Form.Control
                type="text"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name/Location</Form.Label>
              <Form.Control
                type="text"
                value={hardwareLocation}
                onChange={(e) => setHardwareLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Vendor & Support #</Form.Label>
              <Form.Control
                type="text"
                value={support}
                onChange={(e) => setSupport(e.target.value)}
              />
            </Form.Group>
            <Button
              className="m-2"
              onClick={submitEdit}
              variant="primary"
              size="sm"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
