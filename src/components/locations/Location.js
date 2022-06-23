import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation, Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import DownloadLocation from "./DownloadLocation";

import { firestore, storage } from "../../firebase";

const Location = () => {
  const [modemView, setModemView] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(true);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const locationRef = useLocation();
  let { location, mode } = locationRef.state;
  let {
    id,
    name,
    address,
    mainPhone,
    siteContact,
    internet,
    hardware,
    phones,
    externalIP,
    diocesanNetwork,
    support,
    modem,
    localRange,
    notes,
  } = location;

  const [hardwareArray] = useState(hardware);
  const [phonesArray] = useState(phones);

  const deleteLocation = async (e) => {
    e.preventDefault();
    const deleteRef = await firestore.collection("locations").doc(id).delete();
    if (!deleteRef) {
      setErr("Your location could not be deleted.");
    }
    setErr("");
    setMessage("Success: Your location was deleted.");
  };

  const modemChangeHandler = () => {
    setModemView(!modemView);
  };

  const colorMode = () => {
    if (mode) {
      return "table-light";
    } else {
      return "table-dark";
    }
  };

  const showModem = modemView ? "text" : "password";
  return (
    <>
      <div
        style={{
          width: "75vw",
          marginBottom: "80px",
        }}
        className="d-flex justify-content-center flex-column align-items-start"
      >
        <div className="w-100">
          <Link to="/">
            <Button className="float-right mb-2" variant="link">
              Back to Main Page
            </Button>
          </Link>
        </div>
        <div className="w-100">
          <DownloadLocation location={location} />
          <AddDocument location={location} />
        </div>
        <div className="w-100">
          {err && <Alert variant="danger">{err}</Alert>}
          {message && (
            <Alert variant="success">
              {message} <Link to="/">Return to Locations</Link>
            </Alert>
          )}
          <div
            style={{
              fontWeight: "800",
              fontSize: 24,
              margin: "30px 14px",
            }}
            className="w-100 main-info d-flex flex-row align-items-stretch justify-content-between"
          >
            <div>
              <p>Location:</p> {name}
            </div>
            <div>
              <p>Main Address:</p> {address}
            </div>
            <div>
              <p>Main Phone:</p> {mainPhone}
            </div>
            <div>
              <p>Site Contact:</p> {siteContact}
            </div>
          </div>
          <table className={`table ${colorMode()} text-centered`}>
            <thead>
              <tr>
                <th>Internet Speed</th>
                <th>External IP Address</th>
                <th>Diocesan Network</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{internet}</td>
                <td>
                  <Link
                    to={`//${externalIP}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {externalIP}
                  </Link>
                </td>
                <td>{diocesanNetwork}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>Vendor & Support #</th>
                <th>Modem Credentials</th>
                <th>Local IP Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{support}</td>
                <td>
                  <input type={showModem} defaultValue={modem} />
                  <Button variant="link" onClick={modemChangeHandler}>
                    <i className="far fa-eye"></i>
                  </Button>
                </td>
                <td>{localRange}</td>
              </tr>
            </tbody>
          </table>
          <table className={`table ${colorMode()} text-centered`}>
            <thead>
              <tr>
                <th>Device</th>
                <th>Int. IP</th>
                <th>Ext. IP</th>
                <th>Serial</th>
                <th>Location</th>
                <th>Vendor & Support</th>
              </tr>
            </thead>
            <tbody>
              {hardwareArray &&
                hardwareArray
                  .sort((a, b) => {
                    if (a.device < b.device) {
                      return -1;
                    }
                    if (a.device > b.device) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((h) => (
                    <tr key={h.id}>
                      <td>{h.device}</td>
                      <td>
                        <Link
                          to={`//${h.ipAddress}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {h.ipAddress}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`//${h.ipAddress}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {h.extIP ? h.extIP : ""}
                        </Link>
                      </td>
                      <td>{h.serial}</td>
                      <td>{h.hardwareLocation}</td>
                      <td>{h.support}</td>
                    </tr>
                  ))}
            </tbody>
            <thead>
              <tr>
                <th>Phone #</th>
                <th>Name/Location</th>
                <th>Provider</th>
                <th>Vendor & Support #</th>
                <th>Misc</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {phonesArray &&
                phonesArray
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
                    <tr key={phone.id}>
                      <td>{phone.number}</td>
                      <td>{phone.numName}</td>
                      <td>{phone.provider}</td>
                      <td>{phone.support}</td>
                      <td>{phone.misc}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="w-100 main-info d-flex justify-content-center mb-4">
            <p className="text-muted">Additional Notes: </p>
            <h6>{notes}</h6>
          </div>
          <div className="w-100">
            <LocationFiles location={location} />
          </div>
        </div>
        <Form.Check
          className="m-4"
          label="Select this to delete this location"
          type="checkbox"
          onChange={() => setDeleteBtn(!deleteBtn)}
        />
        <div className="w-100">
          <Button
            disabled={deleteBtn}
            size="sm"
            className="m-4"
            variant="danger"
            onClick={(e) => {
              if (
                window.confirm(
                  "Are you sure you want to delete this location permently?"
                )
              ) {
                deleteLocation(e);
              }
            }}
          >
            <i className="far fa-trash-alt"></i> Delete Location Permanently
          </Button>
        </div>
      </div>
    </>
  );
};

const AddDocument = ({ location }) => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  const { id } = location;

  const toggleModal = () => {
    setErr("");
    setMessage("");
    setModal(!modal);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file.name.match(/.(pdf|PDF|xlsx|docx|doc|jpeg|jpg)$/i)) {
      setMessage("");
      setErr("You must upload a PDF, WORD Doc, Excel Document or jpg image.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const fileName = file.name;
    const fileExt = fileName.split(".").pop();
    const hash = uuidv4();
    const hashedFile = `${hash}.${fileExt}`;
    const fileNameStorageRef = firestore.collection("files");
    let fileRef = {
      locationID: id,
      hashedFileName: hashedFile,
      originalFileName: fileName,
    };
    setErr("");
    try {
      const storageRef = await storage.ref(`${hashedFile}`).put(file);
      if (!storageRef) {
        setErr("There was an issue uploading your document, please try again.");
      }
      const fileNameStored = await fileNameStorageRef.add(fileRef);
      if (!fileNameStored) {
        setErr("File name not stored.");
      }
      setErr("");
      setMessage("Success: Your document has been uploaded.");
    } catch (e) {
      console.log({ msg: e.message });
    }
  };

  return (
    <>
      <Button
        size="sm"
        className="float-right text-white"
        variant="warning"
        onClick={toggleModal}
      >
        <i className="fas fa-cloud-upload-alt"></i> Add a Document
      </Button>

      <Modal show={modal}>
        <Modal.Header>Add Document to: {location.name}</Modal.Header>

        <Modal.Body>
          {err && <Alert variant="danger">{err}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={uploadFile}>
            <Form.Control
              type="file"
              accept="application/pdf, image/jpeg, image/jpg, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="submit"
              className="text-white m-2"
              variant="warning"
              size="sm"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={toggleModal}
            variant="secondary"
            size="sm"
            className="m-3"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const LocationFiles = ({ location }) => {
  const { id } = location;
  const locationsIDRef = firestore.collection("files");
  const query = locationsIDRef.where("locationID", "==", `${id}`);
  const [files] = useCollectionData(query, { idField: "fileid" });

  const downloadFile = (f) => {
    storage
      .ref(f)
      .getDownloadURL()
      .then(function (url) {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          link.setAttribute("href", url);
          link.setAttribute("target", "_blank");
          link.setAttribute("download", "download");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
  };

  const deleteFile = async (name, fileid) => {
    try {
      await storage.ref(name).delete();
      await firestore.collection("files").doc(fileid).delete();
    } catch (e) {
      console.log({ msg: e.message });
    }
  };

  const fileList =
    files &&
    files.map((file, i) => (
      <Alert variant="success" key={i}>
        <Button
          variant="link"
          onClick={(f) => downloadFile(file.hashedFileName)}
        >
          {file.originalFileName}
        </Button>
        <span className="float-right">
          <Button
            variant="danger"
            onClick={(e) => deleteFile(file.hashedFileName, file.fileid)}
          >
            &times;
          </Button>
        </span>
      </Alert>
    ));

  return (
    <>
      {files && files.length === 0 ? (
        <Alert variant="secondary">This location has no files.</Alert>
      ) : (
        <>
          <h4>Files for this location:</h4>
          {fileList}
        </>
      )}
    </>
  );
};

export default Location;
