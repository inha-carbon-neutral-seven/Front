import ServerStatusIndicator from "./ServerStateIndicator";
import Button from "@mui/material/Button";
import beaver from "../../image/logo.jpg";

function Header({ param }) {
  const handleButtonClick = (p) => {
    param(p);
  };
  const buttonSx = {
    m: 1,
    color: "white",
    borderColor: "#ffffff00",
    boxShadow: "2",
    ":hover": {
      borderColor: "#a39e9e26",
      color: "white",
      bgcolor: "#a39e9e26",
    },
    ":disabled": {
      borderColor: "gray",
      bgcolor: "gray",
      boxShadow: "none",
    },

    fontFamily: "Pretendard-Regular",
  };

  return (
    <div className="z-50 h-16 bg-gradient-to-r from-beaver-2 to-beaver-1 flex justify-between items-center px-4 w-4/5 fixed rounded-[12px] drop-shadow-lg place-self-center mt-3">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={beaver} className="h-12 mr-3 rounded-full" />
            <span className="self-center text-xl font-extrabold sm:text-2xl whitespace-nowrap text-white">
              비버.ai
            </span>
          </a>
        </div>

        <Button
          sx={buttonSx}
          variant="outlined"
          onClick={() => handleButtonClick(0)}
        >
          대화하기
        </Button>

        <Button
          //disabled={true}
          sx={buttonSx}
          variant="outlined"
          onClick={() => handleButtonClick(1)}
        >
          대시보드
        </Button>
      </div>

      <ServerStatusIndicator />
    </div>
  );
}
export default Header;
