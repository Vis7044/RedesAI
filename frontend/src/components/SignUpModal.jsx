import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";

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
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleToggle = () => setIsRegister(!isRegister);
  const handleChange = (e) => {
    const { name, email, password } = e.target;
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(formData);

  const handleAuth = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      if (isRegister) {
        const res = await axiosInstance.post("/auth/register", formData);
        if (res.success) {
          setIsRegister(false);
        }
      } else {
        const res = await axiosInstance.post("/auth/login", formData);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg w-96"
            variants={modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {isRegister ? "Register" : "Sign In"}
            </h2>

            <form className="space-y-4" onSubmit={handleAuth}>
              {isRegister && (
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isRegister ? "Register" : "Sign In"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
              <button
                onClick={handleToggle}
                className="ml-1 text-blue-600 underline"
              >
                {isRegister ? "Sign In" : "Register"}
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
