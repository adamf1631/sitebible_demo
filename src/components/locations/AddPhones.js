import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation, Link } from "react-router-dom";
import { Button, Alert, Form } from "react-bootstrap";
import { firestore } from "../../firebase";

const AddHardware = () => {
  const locationRef = useLocation();
  let { location } = locationRef.state;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const { id, name, phones } = location;

  const [number, setNumber] = useState("");
  const [numName, setNumName] = useState("");
  const [provider, setProvider] = useState("");
  const [support, setSupport] = useState("");
  const [misc, setMisc] = useState("");
  const [phoneCount, setPhoneCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPhones = {
      id: uuidv4(),
      number,
      numName,
      provider,
      support,
      misc,
    };
    phones.push(newPhones);
    setPhoneCount(phoneCount + 1);
    setNumber("");
    setNumName("");
    setProvider("");
    setSupport("");
    setMisc("");
  };

  const finalSubmit = async () => {
    setLoading(true);
    const phoneRef = firestore.collection("locations").doc(id);
    const adding = await phoneRef.update({
      phones,
    });
    if (!adding) {
      setErr("Your new devices did not update. Hit commit again.");
    }
    setErr("");
    setMessage("Success: Your new hardware devices have been saved.");
    setLoading(false);
    setPhoneCount(0);
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
      {phoneCount > 0 && (
        <Alert variant="info">New Phones Added so far: {phoneCount}</Alert>
      )}
      <div className="w-30 justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <Form.Label>Name/Location</Form.Label>
          <Form.Control
            type="text"
            value={numName}
            onChange={(e) => setNumName(e.target.value)}
          />

          <Form.Label>Provider</Form.Label>
          <Form.Control
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />

          <Form.Label>Vendor & Support #</Form.Label>
          <Form.Control
            type="text"
            value={support}
            onChange={(e) => setSupport(e.target.value)}
          />

          <Form.Label>Misc</Form.Label>
          <Form.Control
            type="text"
            value={misc}
            onChange={(e) => setMisc(e.target.value)}
          />

          <Button
            className="mt-2"
            variant="info"
            size="sm"
            type="submit"
            disabled={loading}
          >
            <i className="fas fa-plus-circle"></i> Add a New Phone Number
          </Button>
        </Form>
        <Button
          className="mt-2"
          variant="success"
          size="sm"
          onClick={finalSubmit}
          disabled={loading}
        >
          <i className="fas fa-plus-circle"></i> Commit All New Phone Numbers
        </Button>
      </div>
    </>
  );
};

export default AddHardware;
