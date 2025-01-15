import React from 'react'

const CallToAction = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Social Media Strategy?</h2>
        <p className="text-xl text-blue-100 mb-8">Sign up for a free trial and start uncovering valuable insights today.</p>
        <form className="max-w-md mx-auto flex gap-4">
          <input type="email" placeholder="Enter your email" className="flex-grow rounded-lg pl-2 active:outline-none" />
          <button type="submit" className="bg-white hover:bg-gray-100 text-blue-600 py-2 px-4 rounded">
            Start Free Trial
          </button>
        </form>
      </div>
    </section>
  )
}

export default CallToAction
