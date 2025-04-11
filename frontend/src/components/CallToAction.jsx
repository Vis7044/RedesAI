import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Transform Your Social Media Strategy?
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8">
          Sign up for a free trial and start uncovering valuable insights today.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="grow rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-white hover:bg-gray-100 w-fit mx-auto text-blue-600 py-2 px-4 rounded-sm text-sm sm:text-base"
          >
            Start Free Trial
          </button>
        </form>
      </div>
    </section>
  );
};

export default CallToAction;
