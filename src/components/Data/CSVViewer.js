import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import csvtojson from "csvtojson";

import { DataGrid, useGridApiRef, GridToolbarFilterButton, GridToolbarContainer } from "@mui/x-data-grid";

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
  const [isLoading, setIsLoading] = useState(false);
  const apiRef = useGridApiRef();
  const [gridState, setGridState] = useState(null);

  useEffect(() => {
    if (!fileData) {
      setJsonData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      try {
        const text = await fileData.text();
        const jsonArray = await csvtojson().fromString(text);
        setJsonData(jsonArray);
      } catch (error) {
        console.error("Error converting CSV to JSON", error);
        setJsonData(null);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, [fileData]);

  if (isLoading) {
    return <div className="flex flex-col justify-center items-center h-full text-3xl font-bold text-gray-900 font-suit">페이지를 로딩 중입니다...</div>;
  }

  if (!jsonData || jsonData.length === 0) {
    return <div>No data available</div>;
  }
  const columns = Object.keys(jsonData[0]).map((key) => ({
    field: key,
    headerName: key.replace("_", " ").toUpperCase(),
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
    <div className=" overflow-y-auto h-full">
      <div className="top-0 p-4 transform h-full">
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 15, page: 0 },
            },
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
}

export default CSVViewer;
