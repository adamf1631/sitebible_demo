import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button, Alert, Form } from "react-bootstrap";
import { firestore } from "../../firebase";

const AddHardware = () => {
  const locationRef = useLocation();
  let { location } = locationRef.state;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const { id, name, hardware } = location;

  const [device, setDevice] = useState("");
  const [ipAddress, setIPAddress] = useState("");
  const [extIP, setExtIP] = useState("");
  const [serial, setSerial] = useState("");
  const [hardwareLocation, setHardwareLocation] = useState("");
  const [support, setSupport] = useState("");
  const [hardwareCount, setHardwareCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHardware = {
      id: uuidv4(),
      device,
      ipAddress,
      extIP,
      serial,
      hardwareLocation,
      support,
    };
    hardware.push(newHardware);
    setHardwareCount(hardwareCount + 1);
    setDevice("");
    setExtIP("");
    setIPAddress("");
    setSerial("");
    setHardwareLocation("");
    setSupport("");
  };

  const finalSubmit = async () => {
    setLoading(true);
    const hardwareRef = firestore.collection("locations").doc(id);
    const adding = await hardwareRef.update({
      hardware,
    });
    if (!adding) {
      setErr("Your new devices did not update. Hit commit again.");
    }
    setErr("");
    setMessage("Success: Your new hardware devices have been saved.");
    setLoading(false);
    setHardwareCount(0);
  };
  return (
    <>
      <Link to="/">
        <Button className="float-right" variant="link">
          Back to Main Page
        </Button>
      </Link>
      <h4>Add Hardware to: {name}</h4>
      {err && <Alert variant="danger">{err}</Alert>}
      {
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
                Return Your Location
              </Link>
            </>
          )}
        </p>
      }
      {hardwareCount > 0 && (
        <Alert variant="info">
          New Hardwares Added so far: {hardwareCount}
        </Alert>
      )}
      <div className="w-30 justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
          <Form.Label>Device</Form.Label>
          <Form.Control
            type="text"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
          />

          <Form.Label>Int. IP</Form.Label>
          <Form.Control
            type="text"
            value={ipAddress}
            onChange={(e) => setIPAddress(e.target.value)}
          />

          <Form.Label>Ext. IP</Form.Label>
          <Form.Control
            type="text"
            value={extIP}
            onChange={(e) => setExtIP(e.target.value)}
          />

          <Form.Label>Serial</Form.Label>
          <Form.Control
            type="text"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />

          <Form.Label>Name/Location</Form.Label>
          <Form.Control
            type="text"
            value={hardwareLocation}
            onChange={(e) => setHardwareLocation(e.target.value)}
          />
          <Form.Label>Vendor & Support #</Form.Label>
          <Form.Control
            type="text"
            value={support}
            onChange={(e) => setSupport(e.target.value)}
          />

          <Button
            className="mt-2"
            variant="info"
            size="sm"
            type="submit"
            disabled={loading}
          >
            <i className="fas fa-plus-circle"></i> Add New Hardware
          </Button>
        </Form>
        <Button
          className="mt-2"
          variant="success"
          size="sm"
          onClick={finalSubmit}
          disabled={loading}
        >
          <i className="fas fa-plus-circle"></i> Commit All New Hardware
        </Button>
      </div>
    </>
  );
};

export default AddHardware;
