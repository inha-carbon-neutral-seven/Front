import * as React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

function CSVViewer({ selectedColumns, handleColumnChange }) {
  const jsonData = useSelector((state) => state.dataVar.jsonData);
  if (!jsonData || jsonData.length === 0) {
    return <div>No data available</div>;
  }

  const columnKeys = Object.keys(jsonData[0]);

  const columns = columnKeys
    .filter((key) => selectedColumns.includes(key) || selectedColumns.length === 0)
    .map((key) => ({
      field: key,
      headerName: key.replace("_", " "),
      width: 250,
    }));

  const rows = jsonData.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <div className="flex-grow flex flex-col bg-white drop-shadow-lg overflow-hidden rounded-[12px] max-h-[60vh]">
      <div className="mb-12 overflow-y-auto">
        <div className="absolute top-0 p-4 transform">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CSVViewer;
