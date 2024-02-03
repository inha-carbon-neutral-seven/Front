import CSVViewer from "./CSVViewer";
import { useState } from "react";
import { useSelector } from "react-redux";

import { FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import DashScreen from "./DashScreen";

export default function DashBoard() {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const handleColumnChange = (event) => {
    const columnName = event.target.value;
    setSelectedColumns((prev) => (event.target.checked ? [...prev, columnName] : prev.filter((col) => col !== columnName)));
  };
  const jsonData = useSelector((state) => state.dataVar.jsonData);
  const columnKeys = jsonData && jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
  const checkboxes = (
    <FormGroup row>
      {columnKeys.map((key) => (
        <FormControlLabel
          key={key}
          control={<Checkbox checked={selectedColumns.includes(key)} onChange={handleColumnChange} value={key} />}
          label={key.replace("_", " ")}
        />
      ))}
    </FormGroup>
  );
  return (
    <div className="flex-grow flex flex-col bg-white w-full h-full drop-shadow-lg max-h-[90vh] rounded-[12px] overflow-scroll">
      <div className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-sm font-medium">Total Revenue</span>
              <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-sm font-medium">Subscriptions</span>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+180.1% from last month</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-sm font-medium">Sales</span>
              <CreditCardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+19% from last month</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-sm font-medium">Active Now</span>
              <ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+201 since last hour</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">{checkboxes}</div>
        <DashScreen />
        <CSVViewer selectedColumns={selectedColumns} handleColumnChange={handleColumnChange} />
      </div>
    </div>
  );
}
const Button = ({ className, size, variant, children }) => {
  return <button className={`button ${className} ${size} ${variant}`}>{children}</button>;
};
function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
