import React from "react";

const tableHeaders = [
  "Position",
  "Part Number",
  "Serial Number",
  "TSN",
  "CSN",
  "TSR",
  "CSR",
];

const EngineInfoTable = ({ data }) => {
  return (
    <div className="engine-table-card">
      <h3 className="engine-title">Engine Information</h3>
      <div className="engine-table-wrapper">
        <table className="engine-table">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((engine) => (
              <tr key={engine.serialNumber}>
                <td>{engine.position}</td>
                <td>{engine.partNumber}</td>
                <td>{engine.serialNumber}</td>
                <td>{engine.tsn}</td>
                <td>{engine.csn}</td>
                <td>{engine.tsr}</td>
                <td>{engine.csr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EngineInfoTable;