import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation, Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, Form, Alert, Modal } from "react-bootstrap";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   usePDF,
//   StyleSheet,
// } from "@react-pdf/renderer";
import { firestore, storage } from "../../firebase";

const AfterEditLocation = () => {
  const locationRef = useLocation();
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const [modemView, setModemView] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(true);
  const [hardwareArray, setHardwareArray] = useState([]);
  const [phonesArray, setPhonesArray] = useState([]);
  let { location, mode } = locationRef.state;
  const { id } = location;
  const [singleLocation, getSingleLocation] = useState({});

  useEffect(() => {
    const getsingleLocation = async () => {
      const editedLocationRef = await firestore.collection("locations");
      const info = await editedLocationRef.doc(id).get();
      await getSingleLocation(info.data());
      await setHardwareArray(info.data().hardware);
      await setPhonesArray(info.data().phones);
    };
    getsingleLocation();
  }, [id]);

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
              <p>Location:</p> {singleLocation.name}
            </div>
            <div>
              <p>Main Address:</p> {singleLocation.address}
            </div>
            <div>
              <p>Main Phone:</p> {singleLocation.mainPhone}
            </div>
            <div>
              <p>Site Contact:</p> {singleLocation.siteContact}
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
                <td>{singleLocation.internet}</td>
                <td>
                  <Link
                    to={`//${singleLocation.externalIP}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {singleLocation.externalIP}
                  </Link>
                </td>
                <td>{singleLocation.diocesanNetwork}</td>
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
                <td>{singleLocation.support}</td>
                <td>
                  <input type={showModem} defaultValue={singleLocation.modem} />
                  <Button variant="link" onClick={modemChangeHandler}>
                    <i className="far fa-eye"></i>
                  </Button>
                </td>
                <td>{singleLocation.localRange}</td>
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
            <p>{singleLocation.notes}</p>
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

export default AfterEditLocation;

// const AfterEditDownloadLocation = ({ info, id }) => {
//   const [pdfInfo, setPdfInfo] = useState({});

//   useEffect(() => {
//     setPdfInfo(info);
//   }, [info]);

//   const styles = StyleSheet.create({
//     title: {
//       textAlign: "center",
//       fontSize: 16,
//       fontWeight: 800,
//       marginBottom: 10,
//       marginTop: 10,
//       textDecoration: "underline",
//     },
//     inner: {
//       textAlign: "center",
//       fontSize: 14,
//       fontWeight: 500,
//       marginBottom: 10,
//     },
//   });

//   const SingleLocationDoc = (
//     <Document>
//       <Page size="A4">
//         <View style={styles.title}>
//           <Text>{pdfInfo.name}</Text>
//           <Text>{pdfInfo.address}</Text>
//           <Text>{pdfInfo.mainPhone}</Text>
//         </View>
//         <View style={styles.inner}>
//           <Text>Internet Speed: {pdfInfo.internet}</Text>
//           <Text>External IP Address: {pdfInfo.externalIP}</Text>
//           <Text>Diocesan Network: {pdfInfo.diocesanNetwork}</Text>
//           <Text>Modem Credentials: {pdfInfo.modem}</Text>
//           <Text>Vendor & Support #: {pdfInfo.support}</Text>
//           <Text>Local IP Range: {pdfInfo.localRange}</Text>
//         </View>
//         <View style={styles.hardware}>
//           <Text style={styles.title}>Hardware:</Text>
//           {pdfInfo.hardware &&
//             pdfInfo.hardware.map((h) => (
//               <View key={uuidv4()} style={styles.inner}>
//                 <Text>Device: {h.device}</Text>
//                 <Text>Int. IP: {h.ipAddress}</Text>
//                 <Text>Ext. IP: {h.extIP ? h.extIP : ""}</Text>
//                 <Text>Serial: {h.serial}</Text>
//                 <Text>Location: {h.hardwareLocation}</Text>
//                 <Text>Support: {h.support}</Text>
//               </View>
//             ))}
//         </View>
//         <View style={styles.hardware}>
//           <Text style={styles.title}>Phones:</Text>
//           {pdfInfo.phones &&
//             pdfInfo.phones.map((p) => (
//               <View key={uuidv4()} style={styles.inner}>
//                 <Text>Phone #: {p.number}</Text>
//                 <Text>Name/Location: {p.numName}</Text>
//                 <Text>Provider: {p.provider}</Text>
//                 <Text>Support: {p.support}</Text>
//                 <Text>Misc {p.misc}</Text>
//               </View>
//             ))}
//         </View>
//         <View style={{ textAlign: "center", marginTop: 20 }}>
//           <Text>Additional Notes: {pdfInfo.notes}</Text>
//         </View>
//       </Page>
//     </Document>
//   );

//   const [instance] = usePDF({ document: SingleLocationDoc });

//   if (instance.loading) return <div>Downloading...</div>;
//   if (instance.error) return <div>Error...</div>;

//   console.log("pdf ifo", pdfInfo);

//   return (
//     <>
//       <a href={instance.url} download={`${id}.pdf`}>
//         <Button className="m-2" size="sm" variant="success">
//           <i className="fas fa-download"></i> Download Location
//         </Button>
//       </a>
//     </>
//   );
// };

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
