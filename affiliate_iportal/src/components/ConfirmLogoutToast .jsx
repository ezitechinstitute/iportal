import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmLogoutToast = ({ closeToast }) => (
  <div>
    <p>Are you sure you want to logout?</p>
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
          toast.dismiss(); 
        }}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Yes
      </button>
      <button
        onClick={() => toast.dismiss()}
        className="bg-gray-300 px-3 py-1 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
);
export default ConfirmLogoutToast;


