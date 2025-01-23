import { auth } from "@/firebase/firebaseConfig";
import { useModal } from "./ModalProvider";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

// usable hook to call for the logout modal
export function useLogout() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { openModal, closeModal } = useModal();

  const handleLogout = async () => {
    try {
      closeModal("logout");
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      messageApi.error("Failed to log out.");
      console.error(err);
    }
  };

  const triggerLogoutModal = () => {
    {
      //   console.log("triggerLogoutModal: ", openModal);
    }
    openModal(
      "logout",
      <div className="p-8 bg-gray-800">
        {contextHolder}
        <h2 className="text-xl font-semibold text-white mb-4">
          Confirm Logout
        </h2>
        <p className="text-white mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => closeModal("logout")}
            className="bg-transparent rounded-full text-blue-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2 hover:bg-blue-600/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-transparent rounded-full text-red-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2 hover:bg-red-600/10"
          >
            Logout
          </button>
        </div>
      </div>
    );
  };

  return triggerLogoutModal;
}
