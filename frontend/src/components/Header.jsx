import { motion } from "framer-motion";
import StarBorder from "./StarBorder";
import Dock from "./Dock";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GrServices } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "./SignUpModal";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import { User } from "lucide-react";

const items = [
  {
    icon: <IoHomeOutline size={18} />,
    label: "Home",
    path: "/",
  },
  {
    icon: <CiUser size={18} />,
    label: "About",
    path: "/about",
  },
  {
    icon: <GrServices size={18} />,
    label: "Services",
    path: "/features",
  },
  {
    icon: <CgProfile size={18} />,
    label: "Contact",
    path: "/contact",
  },
];

export default function Header() {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  console.log(user);

  

  return (
    <>
      <motion.div
        className="flex justify-between sm:justify-around  w-full pb-4 items-center p-4 pt-20 bg-gradient-to-r h-20 absolute sm:static z-50"
        style={{
          backgroundImage:
            "radial-gradient( #091D0E 0%,#0c0c0b 40%,  #0f0f0f 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl bg-black text-white font-bold cursor-pointer"
        >
          RedesAI
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0,y: 40 }}
          animate={{ opacity: 1, scale: 1,y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <Dock
            items={items}
            panelHeight={68}
            baseItemSize={50}
            className="text-white bg-black sm:bg-transparent"
            magnification={70}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" text-white px-3 py-1 rounded-full "
        >
          <StarBorder
            as="button"
            className="custom-class"
            color="cyan"
            speed="5s"
            
          >
            {user ? (
              <button
                className="flex items-center gap-2"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <User className="text-gray-400 w-6 h-6" />
                Profile
              </button>
            ) : (
              <button
                className="flex items-center gap-2"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <User className="text-gray-400 w-6 h-6" />
                Sign In
              </button>
            )}
          </StarBorder>
        </motion.div>
      </motion.div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
