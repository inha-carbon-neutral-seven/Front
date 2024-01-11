import * as React from "react";
import { ExampleData } from "./Chart/ChartExample";
import { DataGrid } from "@mui/x-data-grid";

function DataToTable({ jsonData }) {
  // Make sure jsonData is not undefined or null
  if (!jsonData || jsonData.length === 0) {
    return <div>No data available</div>;
  }

  // Create columns from jsonData keys
  const columns = Object.keys(jsonData[0]).map((key) => ({
    field: key,
    headerName: key.replace("_", " "),
    width: 150,
  }));

  // Use jsonData as rows
  const rows = jsonData.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <div className="flex-grow flex flex-col bg-white dark:bg-gray-800 w-full h-full drop-shadow-lg overflow-auto max-h-[90vh] rounded-[12px]">
      <div className="mb-12 overflow-y-auto">
        <div className="absolute top-0 transform">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DataToTable;
