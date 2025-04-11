import {motion} from "framer-motion";

export default function Header() {

  return (
    <motion.div className="flex justify-around items-center p-4 bg-gradient-to-r bg-black h-20 ">
      <motion.div 
      initial={{ opacity: 0, y: 40 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl bg-black text-white font-bold cursor-pointer" 
      >
        Logo
      </motion.div>
      <motion.div
      initial={{ opacity: 0,scale: 0  }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="bg-black text-white rounded-full px-2 py-1 flex  items-center space-x-4 " 
      >
        <ul className="flex space-x-8 ">
          <li className=" cursor-pointer">Home</li>
          <li className="cursor-pointer ">About</li>
          <li className=" cursor-pointer ">Services</li>
          <li className=" cursor-pointer">Contact</li>
        </ul>
      </motion.div>
      <motion.div 
      initial={{ opacity: 0, y: 40 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white px-3 py-1 rounded-full "
      >
        
        <button className="">
          Sign Up
        </button>
      </motion.div>

    </motion.div>
  );
}


{/* <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button> */}
