import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

function DataToTable() {
  // 이 컴포넌트에서 사용할 data 변수.
  const jsonData = useSelector((state) => state.dataVar.jsonData);

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
