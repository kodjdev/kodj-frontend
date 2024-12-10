import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="text-white p-5 text-center  pb-20 flex-shrink-0">
      <p>
        &copy; 2024 <span className="font-bold text-blue-400 ">KO'DJ </span>{" "}
        Develeoper Community. All rights reserved.
      </p>
      <p className="mt-4">Terms of Service | Privacy Policy</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="https://t.me/+0fApPXUN5WNjNjg9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram className="w-6 h-6" />
        </a>
        <a
          href="https://twitter.com/kodjdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="w-6 h-6" />
        </a>
        <a
          href="https://www.instagram.com/kodj_uz/?igsh=MWd0N3I4dTlsemQzcQ%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/company/ko-dj/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
        <a
          href="https://github.com/kodjdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
