import ServerStatusIndicator from "./ServerStateIndicator";
import beaver from "../../image/logo.jpg";

function Header() {
  return (
    <div className="z-50 h-16 bg-[rgb(217,148,132)] dark:bg-[rgb(45,47,51)] justify-between flex items-center w-full rounded-[12px] drop-shadow-lg">
      <div className="flex items-center space-x-4">
        <a href="/" className="flex items-center">
          <img src={beaver} className="h-12 mx-3 rounded-full" />
          <span className="self-center text-xl font-extrabold sm:text-2xl whitespace-nowrap text-[rgb(242,242,242)] dark:text-[rgb(217,148,132)]">비버.ai</span>
        </a>
      </div>
      <div>
        <ServerStatusIndicator />
      </div>
    </div>
  );
}
export default Header;
