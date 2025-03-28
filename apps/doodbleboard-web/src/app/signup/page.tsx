import SignupForm from "@/components/Signup/Signup";

export default function Signup() {

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    //     <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
    //         <input
    //           type="text"
    //           id="username"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
    //         <input
    //           type="email"
    //           id="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //         onSubmit={ handleSubmit }
    //       >
    //         Signup
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}
