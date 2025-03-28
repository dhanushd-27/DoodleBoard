import { LoginForm } from '@/components/Login/Login';


export default function Login() {

  return (
    // <div className="flex flex-col gap-6">
    //   <div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-2xl">
    //     <h2 className="text-white text-2xl font-bold text-center mb-6">Login</h2>
    //     <form onSubmit={ handleSubmit }>
    //       <div className="mb-4">
    //         <label className="block text-gray-400 mb-2">Email</label>
    //         <input
    //           type="email"
    //           className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-400 mb-2">Password</label>
    //         <input
    //           type="password"
    //           className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" onClick={ handleSubmit }>
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
