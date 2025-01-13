import { GoGoal } from "react-icons/go";

export function Mission() {
  return (
    <>
      <div className="mt-16 bg-gray-700 p-10 rounded-3xl text-gray-200">
        <h3 className="text-3xl font-bold text-blue-400 mb-4">Why Join Us?</h3>
        <p className="text-gray-400 text-lg leading-relaxed mb-6">
          At KO&apos;DJ, we believe in the power of collaboration and
          innovation. Our events are more than just meetups; they are platforms
          for transformative learning, meaningful connections, and
          groundbreaking ideas.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed">
          By participating in KO&apos;DJ events, you&apos;re not just attending
          an event—you&apos;re becoming part of a movement to elevate
          Uzbekistan&apos;s tech community to new heights. Let’s create, learn,
          and grow together.
        </p>
      </div>
      <div className="bg-gray-700 p-8 rounded-3xl shadow-lg mt-12 mb-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">
          <GoGoal className="inline-block text-3xl mr-2 mb-2" />
          Our Mission
        </h2>
        <p className="text-gray-400">
          Our mission is to create a platform for collaboration, learning, and
          inspiration. We believe in the power of community and innovation to
          drive positive change. Join us as we work together to make a
          difference.
        </p>
      </div>
    </>
  );
}
