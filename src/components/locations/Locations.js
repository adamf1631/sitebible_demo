import React, { useState, useEffect } from "react";
import { Button, Alert, Card, ListGroup } from "react-bootstrap";
import { useAuth } from "../../contexts/authContext";
import { Link, useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";

const Locations = () => {
  const [err, setErr] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const locationsRef = firestore.collection("locations");
  const [locations] = useCollectionData(locationsRef, {
    idField: "id",
  });

  async function handleLogout() {
    setErr("");

    try {
      await logout();
      history.push("/Login");
    } catch {
      setErr("Logout has failed, please try again.");
    }
  }

  const locatonCardBGColor = (category) => {
    switch (category) {
      case "CC":
        return "bg-info";
      case "CEM":
        return "bg-success";
      case "DOH":
        return "bg-warning";
      case "DOC":
        return "bg-danger";
      default:
        return "bg-light";
    }
  };

  return (
    <div style={{ width: "100vw" }}>
      <div className="main-title w-100 d-flex justify-content-around align-items-center mt-2 mb-4">
        <h4>Welcome {currentUser.email}</h4>
        {err && <Alert variant="danger">{err}</Alert>}
        <Link to="/addlocation">
          <Button size="md" variant="primary">
            <i className="fas fa-plus-circle"></i> Add a New Location
          </Button>
        </Link>
        <div className="d-flex flex-column">
          <Button variant="info" size="sm" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Button>
          <a
            href="https://www.google.com/maps/d/u/0/viewer?mid=1WMgUI7Xzo5CBa_RSExEDZ-WfD-fOIOdq&ll=39.68531513139116%2C-74.95551619809426&z=8"
            target="_blank"
            rel="noreferrer"
            className="m-2"
          >
            Google Map Locations
          </a>
        </div>
      </div>

      <div>
        <SearchForm locations={locations} />
      </div>

      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {locations &&
          locations
            .sort((a, b) => {
              if (a.category > b.category) {
                return 1;
              } else if (a.category < b.category) {
                return -1;
              }
              const textA = a.name.toUpperCase();
              const textB = b.name.toUpperCase();
              if (textA < textB) {
                return -1;
              } else if (textA > textB) {
                return 1;
              } else {
                return 0;
              }
            })
            .map((location, i) => (
              <div
                style={{
                  wordWrap: "break-word",
                }}
                className="w-15 d-flex flex-column m-2"
                key={i.toString()}
              >
                <Card
                  className={`${locatonCardBGColor(
                    location.category
                  )} text-white`}
                >
                  <Card.Body className="text-center">
                    <Card.Title>
                      <span>{location.category}</span> | {location.name}
                    </Card.Title>
                    <Card.Subtitle>
                      <address>{location.address}</address>
                    </Card.Subtitle>
                    <Card.Text>{location.mainPhone}</Card.Text>
                    <ListGroup className="bg-light text-center">
                      <ListGroup.Item>
                        <Link
                          to={{
                            pathname: "/location",
                            state: {
                              location,
                            },
                          }}
                        >
                          <Button variant="link" size="sm" className="m-1">
                            <i className="far fa-eye"></i> View Location
                          </Button>
                        </Link>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Link
                          to={{
                            pathname: "/editlocation",
                            state: {
                              location,
                            },
                          }}
                        >
                          <Button variant="link" size="sm" className="m-1">
                            <i className="fas fa-edit"></i> Edit this Location
                          </Button>
                        </Link>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Link
                          to={{
                            pathname: "/addhardware",
                            state: {
                              location,
                            },
                          }}
                        >
                          <Button variant="link" size="sm" className="m-1">
                            <i className="fas fa-server"></i> Add Hardware
                          </Button>
                        </Link>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Link
                          to={{
                            pathname: "/addphones",
                            state: {
                              location,
                            },
                          }}
                        >
                          <Button variant="link" size="sm" className="m-1">
                            <i className="fas fa-phone-volume"></i> Add Phones
                          </Button>
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
            ))}
      </div>
    </div>
  );
};

const SearchForm = ({ locations }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const findLocation = () => {
      if (search) {
        const results =
          locations &&
          locations.filter((location) =>
            location.name.toLowerCase().includes(search)
          );
        setSearchResults(results);
      } else {
        setSearchResults(null);
      }
    };
    return findLocation();
  }, [search, locations]);

  const locatonCardBGColor = (category) => {
    switch (category) {
      case "CC":
        return "bg-info";
      case "CEM":
        return "bg-success";
      case "DOH":
        return "bg-warning";
      case "DOC":
        return "bg-danger";
      default:
        return "bg-light";
    }
  };

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-start align-items-center w-100">
        <div className="form-group search-form m-2">
          <label className="m-1">Search Locations</label>
          <input
            type="text"
            placeholder="Search by name"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </div>
        <div className="w-100 m-2 d-flex justify-content-center">
          {searchResults &&
            searchResults.map((location) => (
              <div
                style={{ wordWrap: "break-word" }}
                className="d-flex flex-column m-4"
                key={location.id}
              >
                <Card
                  style={{ width: "18rem" }}
                  className={`${locatonCardBGColor(
                    location.category
                  )} text-white p-1`}
                >
                  <Card.Body>
                    <Card.Title>
                      <span>{location.category}</span> | {location.name}
                    </Card.Title>
                    <Card.Subtitle>
                      <address>{location.address}</address>
                    </Card.Subtitle>
                    <Card.Text>{location.mainPhone}</Card.Text>
                    <ul>
                      <li>
                        <Link
                          className="text-white"
                          to={{
                            pathname: "/location",
                            state: {
                              location,
                            },
                          }}
                        >
                          View Location
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-white"
                          to={{
                            pathname: "/editlocation",
                            state: {
                              location,
                            },
                          }}
                        >
                          Edit this Location
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-white"
                          to={{
                            pathname: "/addhardware",
                            state: {
                              location,
                            },
                          }}
                        >
                          Add Hardware
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-white"
                          to={{
                            pathname: "/addphones",
                            state: {
                              location,
                            },
                          }}
                        >
                          Add Phones
                        </Link>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Locations;
