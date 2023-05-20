import { useState } from "react";
import useSupplier from "../hooks/contracts/useSupplier";
import useRecords from "../hooks/contracts/useRecords";
import QRCode from "react-qr-code";

const contractAddress = "0x720B5bCE9DaA428Fb8E4Cd311b9a3d7a14e5094d";

export default function RecordBoard() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { supplier } = useSupplier();
  const { records, uploadRecord } = useRecords(contractAddress);
  const handleQRButtonClick = () => {
    setOpen(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">{supplier}</h1>
      <div className="flex">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border border-gray-300 rounded-md px-3 py-2 w-5/6"
          id="outlined-basic"
          placeholder="Message"
        />
        <button
          onClick={async () => {
            await uploadRecord(input);
            setInput("");
          }}
          className="border border-gray-300 rounded-md px-3 py-2 ml-2 w-1/6"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 justify-center">
        {records.map((record, index) => (
          <div
            key={record.recordId}
            className="w-1/2 flex justify-center items-center"
          >
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{record.message}</h2>
                <p>{record.date}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={handleQRButtonClick}
                    className="btn btn-primary"
                  >
                    QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <QRCode value="www.naver.com" />
            <button
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
