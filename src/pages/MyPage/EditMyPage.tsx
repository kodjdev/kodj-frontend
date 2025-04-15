import { BackButton } from "@/components/Button/BackButton";

export default function EditMyPage() {
  return (
    <>
      <div className="pt-2 pl-4 sm:pl-10">
        <BackButton size="md" onClick={() => console.log("going back")} />
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Edit My Profile</h1>
        {/* <div className="w-full max-w-lg mt-8">
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-lg font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full p-4 bg-gray-100 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-4 bg-gray-100 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              className="w-full p-4 bg-gray-100 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-lg font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-4 bg-gray-100 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div> */}
      </div>
    </>
  );
}
