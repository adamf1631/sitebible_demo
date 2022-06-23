import React, { useState } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";

const EditPhones = ({ id, location }) => {
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  const { phones } = location;

  const deletePhone = async (phoneID) => {
    let newPhoneArray = phones.filter((p) => p.id !== phoneID);
    const updateRef = firestore.collection("locations").doc(id);
    const updating = await updateRef.update({ phones: newPhoneArray });
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
        <i className="fas fa-phone-alt"></i> Phone Edit
      </h3>
      {err}
      {message}
      {phones &&
        phones
          .sort((a, b) => {
            if (a.provider < b.provider) {
              return -1;
            }
            if (a.provider > b.provider) {
              return 1;
            }
            return 0;
          })
          .map((phone) => (
            <Container fluid key={phone.id}>
              <Row className="w-100 m-2">
                <Col
                  style={{
                    textAlign: "center",
                    borderBottom: "solid thin #cecece",
                    marginBottom: 9,
                  }}
                >
                  {phone.number}
                </Col>
                <Col
                  style={{
                    textAlign: "center",
                    borderBottom: "solid thin #cecece",
                    marginBottom: 9,
                  }}
                >
                  {phone.numName}
                </Col>
                <Col
                  style={{
                    textAlign: "center",
                    borderBottom: "solid thin #cecece",
                    marginBottom: 9,
                  }}
                >
                  {phone.provider}
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
                    phone={phone}
                    phoneID={phone.id}
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
                    onClick={() => deletePhone(phone.id)}
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

export default EditPhones;

const EditModal = ({ location, phone, phoneID, locationID }) => {
  const [modal, setModal] = useState(false);
  const [numName, setNumName] = useState(phone.numName || "");
  const [number, setNumber] = useState(phone.number || "");
  const [provider, setProvider] = useState(phone.provider || "");
  const [support, setSupport] = useState(phone.support || "");
  const [misc, setMisc] = useState(phone.misc || "");
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  const changeModal = () => {
    setModal(!modal);
  };

  const submitEdit = async () => {
    let editedPhone = {
      id: phoneID,
      numName,
      number,
      provider,
      misc,
      support,
    };
    let newPhone = await location.phones
      .filter((p) => p.id !== phoneID)
      .concat(editedPhone);

    const updateRef = firestore.collection("locations").doc(locationID);
    const updating = await updateRef.update({ phones: newPhone });
    if (!updating) {
      setErr("Your phone was not updated due to an error.");
      setMessage("");
    }
    setErr("");
    setMessage("Success: Your phone was updated.");
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
          <h5>{err}</h5>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name/Location</Form.Label>
              <Form.Control
                type="text"
                value={numName}
                onChange={(e) => setNumName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone #</Form.Label>
              <Form.Control
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Provider</Form.Label>
              <Form.Control
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
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
            <Form.Group>
              <Form.Label>Misc</Form.Label>
              <Form.Control
                type="text"
                value={misc}
                onChange={(e) => setMisc(e.target.value)}
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
