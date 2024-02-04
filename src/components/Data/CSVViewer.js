import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import csvtojson from "csvtojson";

import { DataGrid } from "@mui/x-data-grid";

function CSVViewer() {
  const fileData = useSelector((state) => state.dataVar.fileData);
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!fileData) {
      console.log("No file provided");
      return;
    }

    const reader = new FileReader();

    // 파일을 읽는데 성공하면 csv를 json으로 변환한다.
    reader.onload = async (e) => {
      console.log("FileReader onload triggered");
      const csvText = e.target.result;

      try {
        const jsonArray = await csvtojson().fromString(csvText);
        console.log("CSV to JSON conversion successful:", jsonArray);
        dispatch(setJsonData(jsonArray));
      } catch (error) {
        console.error("Error converting CSV to JSON", error);
        setError("Error converting CSV to JSON");
      }
    };
    console.log("json data", jsonData);
    reader.readAsText(fileData);
  }, [fileData, dispatch]);
  if (!jsonData || jsonData.length === 0) {
    return <div>No data available</div>;
  }

  const columnKeys = Object.keys(jsonData[0]);

  const columns = columnKeys.map((key) => ({
    field: key,
    headerName: key.replace("_", " "),
    width: 250,
  }));

  const rows = jsonData.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
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
  );
}

export default CSVViewer;
