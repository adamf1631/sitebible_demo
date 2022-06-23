import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Page,
  Text,
  View,
  Document,
  usePDF,
  StyleSheet,
} from "@react-pdf/renderer";
import { Button } from "react-bootstrap";

const DownloadLocation = ({ location }) => {
  const styles = StyleSheet.create({
    title: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: 800,
      marginBottom: 10,
      marginTop: 10,
      textDecoration: "underline",
    },
    inner: {
      textAlign: "center",
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 10,
    },
  });

  const {
    id,
    name,
    address,
    mainPhone,
    internet,
    modem,
    externalIP,
    diocesanNetwork,
    support,
    hardware,
    phones,
    localRange,
    notes,
  } = location;

  const locationDoc = (
    <Document>
      <Page size="A4">
        <View style={styles.title}>
          <Text>{name}</Text>
          <Text>{address}</Text>
          <Text>{mainPhone}</Text>
        </View>
        <View style={styles.inner}>
          <Text>Internet Speed: {internet}</Text>
          <Text>External IP Address: {externalIP}</Text>
          <Text>Diocesan Network: {diocesanNetwork}</Text>
          <Text>Modem Credentials: {modem}</Text>
          <Text>Vendor & Support #: {support}</Text>
          <Text>Local IP Range: {localRange}</Text>
        </View>
        <View style={styles.hardware}>
          <Text style={styles.title}>Hardware:</Text>
          {hardware.map((h) => (
            <View key={uuidv4()} style={styles.inner}>
              <Text>Device: {h.device}</Text>
              <Text>Int. IP: {h.ipAddress}</Text>
              <Text>Ext. IP: {h.extIP ? h.extIP : ""}</Text>
              <Text>Serial: {h.serial}</Text>
              <Text>Location: {h.hardwareLocation}</Text>
              <Text>Support: {h.support}</Text>
            </View>
          ))}
        </View>
        <View style={styles.hardware}>
          <Text style={styles.title}>Phones:</Text>
          {phones.map((p) => (
            <View key={uuidv4()} style={styles.inner}>
              <Text>Phone #: {p.number}</Text>
              <Text>Name/Location: {p.numName}</Text>
              <Text>Provider: {p.provider}</Text>
              <Text>Support: {p.support}</Text>
              <Text>Misc {p.misc}</Text>
            </View>
          ))}
        </View>
        <View style={{ textAlign: "center", marginTop: 20 }}>
          <Text>Additional Notes: {notes}</Text>
        </View>
      </Page>
    </Document>
  );

  const [instance] = usePDF({ document: locationDoc });

  if (instance.loading) return <div>Downloading...</div>;
  if (instance.error) return <div>Error...</div>;

  return (
    <>
      <a href={instance.url} download={`${id}.pdf`}>
        <Button className="m-2" size="sm" variant="success">
          <i className="fas fa-download"></i> Download Location
        </Button>
      </a>
    </>
  );
};

export default DownloadLocation;
