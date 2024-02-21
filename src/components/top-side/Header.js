import ServerStatusIndicator from "./ServerStateIndicator";
import beaver from "../../image/logo.jpg";

function Header() {
  return (
    <div className="z-50 h-16 bg-white dark:bg-[rgb(45,47,51)] flex justify-between items-center px-4 w-4/5 fixed rounded-[12px] drop-shadow-lg place-self-center mt-3">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={beaver} className="h-12 mr-3 rounded-full" />
            <span className="self-center text-xl font-extrabold sm:text-2xl whitespace-nowrap text-[rgb(119,119,119)] dark:text-[rgb(196,196,196)]">
              비버.ai
            </span>
          </a>
        </div>
      </div>

      <ServerStatusIndicator />
    </div>
  );
}
export default Header;
