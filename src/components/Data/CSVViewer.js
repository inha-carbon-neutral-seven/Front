import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import csvtojson from "csvtojson";

import { DataGrid, useGridApiRef, GridToolbarFilterButton, GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function CustomToolbar({ onExport, onRestore }) {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function CSVViewer() {
  const fileData = useSelector((state) => state.dataVar.fileData);
  const [jsonData, setJsonData] = useState(null);
  const apiRef = useGridApiRef();
  const dispatch = useDispatch();
  const [gridState, setGridState] = useState(null);

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
        dispatch(setJsonData(jsonArray));
      } catch (error) {
        console.error("Error converting CSV to JSON", error);
      }
    };
    reader.readAsText(fileData);
  }, [fileData, dispatch]);

  if (!jsonData || jsonData.length === 0) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(jsonData[0]).map((key) => ({
    field: key,
    headerName: key.replace("_", " "),
    width: 250,
  }));

  const rows = jsonData.map((item, index) => ({
    id: index,
    ...item,
  }));

  const handleExportState = () => {
    const currentState = apiRef.current.exportState();
    setGridState(currentState);
  };

  const handleRestoreState = () => {
    if (gridState) {
      apiRef.current.restoreState(gridState);
    }
  };

  return (
    <div className="mb-12 overflow-y-auto">
      <div className="top-0 p-4 transform">
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          components={{
            Toolbar: () => <CustomToolbar onExport={handleExportState} onRestore={handleRestoreState} />,
          }}
          initialState={
            gridState || {
              pagination: {
                pageSize: 10,
              },
            }
          }
        />
      </div>
    </div>
  );
}

export default CSVViewer;
