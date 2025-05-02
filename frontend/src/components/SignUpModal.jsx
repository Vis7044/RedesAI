import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/UserContextProvider";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};

export default function AuthModal({ showModal, setShowModal }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

  const handleToggle = () => setIsRegister(!isRegister);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const res = await axiosInstance.post("/auth/register", formData);
        if (res.success) {
          setIsRegister(false);
        }
      } else {
        const res = await axiosInstance.post("/auth/login", formData);
        if (res.data.success) {
          setUser(res.data.user);
          setShowModal(false);
        }
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="relative bg-zinc-900 text-white w-full max-w-md p-6 md:p-8 rounded-2xl shadow-2xl border border-zinc-700"
            variants={modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-zinc-400 hover:text-white text-2xl"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">
              {isRegister ? "Register" : "Sign In"}
            </h2>
            {error && (
              <div className="text-red-400 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleAuth}>
              {isRegister && (
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-medium py-3 rounded-lg shadow-md"
              >
                {isRegister ? "Register" : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-400">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
              <button
                onClick={handleToggle}
                className="ml-1 text-blue-400 hover:text-blue-500 underline transition"
              >
                {isRegister ? "Sign In" : "Register"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
