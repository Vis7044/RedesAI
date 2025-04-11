import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User } from 'lucide-react';

const UserProfile = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden p-8 rounded-3xl shadow-xl ring-1 ring-gray-700 bg-gradient-to-br from-gray-950 via-black to-gray-900"
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">User Profile</h2>
          <div className="text-xs text-white bg-gray-800/70 px-3 py-1 rounded-full border border-gray-600 shadow-sm">
            Active
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 text-gray-300">
          <div className="flex items-center gap-4">
            <User className="text-gray-400 w-6 h-6" />
            <div>
              <p className="text-sm uppercase text-gray-500">Username</p>
              <p className="text-base font-medium text-white">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-gray-400 w-6 h-6" />
            <div>
              <p className="text-sm uppercase text-gray-500">Email</p>
              <p className="text-base font-medium text-white">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-gray-400 w-6 h-6" />
            <div>
              <p className="text-sm uppercase text-gray-500">Phone</p>
              <p className="text-base font-medium text-white">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
