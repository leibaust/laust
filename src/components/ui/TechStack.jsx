import { DiJqueryLogo } from "react-icons/di";
import {
  FaCss3Alt,
  FaFigma,
  FaGit,
  FaHtml5,
  FaReact,
  FaSass,
  FaShopify,
  FaWordpress,
} from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io";
import { RiPhpFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobexd,
  SiWoo,
} from "react-icons/si";

function TechStack() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold rotate-270 sm:rotate-0">STACK</h2>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 ml-4 my-auto">
        <FaHtml5 className="text-2xl" />
        <FaCss3Alt className="text-2xl" />
        <IoLogoJavascript className="text-2xl" />
        <FaReact className="text-2xl" />
        <RiPhpFill className="text-2xl" />
        <FaFigma className="text-2xl" />
        <FaWordpress className="text-2xl" />
        <DiJqueryLogo className="text-2xl" />
        <RiTailwindCssFill className="text-2xl" />
        <FaSass className="text-2xl" />
        <GrMysql className="text-2xl" />
        <SiWoo className="text-2xl" />
        <FaShopify className="text-2xl" />
        <FaGit className="text-2xl" />
        <SiAdobeillustrator className="text-2xl" />
        <SiAdobephotoshop className="text-2xl" />
        <SiAdobexd className="text-2xl" />
        <SiAdobeaftereffects className="text-2xl" />
        <SiAdobepremierepro className="text-2xl" />
      </div>
    </div>
  );
}

export default TechStack;
