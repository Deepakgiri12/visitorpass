import { QrReader } from "react-qr-reader";
import axios from "axios";

export default function Scan() {

  const handleScan = async (result) => {

    if (result) {

      await axios.post(
        "http://localhost:5000/api/check/scan",
        { passId: result.text },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

    }

  };

  return (
    <div>
      <h2>Scan Visitor Pass</h2>

      <QrReader
        onResult={(result) => {
          if (result) handleScan(result);
        }}
      />

    </div>
  );
}