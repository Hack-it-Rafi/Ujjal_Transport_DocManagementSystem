import Swal from "sweetalert2";
import { FcAlarmClock } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const DocumentCard = ({ document }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const getStatus = (dateString) => {
    if (!dateString) return "Unknown";
    const currentDate = new Date();
    const expiryDate = new Date(dateString);
    const timeDifference = expiryDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference > 30) {
      return "On Time";
    } else if (daysDifference <= 30 && daysDifference >= 0) {
      return "About to Expire";
    } else {
      return "Expired";
    }
  };

  const fetchImage = async (docId) => {
    try {
      const response = await axiosSecure.get(
        `http://localhost:8000/api/v1/document/file/${docId}`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const getColor = (dateString) => {
    const status = getStatus(dateString);
    if (status === "On Time") {
      return "border-green-500 text-green-500";
    } else if (status === "About to Expire") {
      return "border-yellow-600 text-yellow-600";
    } else {
      return "border-red-600 text-red-600";
    }
  };

  const colorClass = getColor(document.dateOfExpiry);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleView = async () => {
    const imageUrl = await fetchImage(document._id);
    if (imageUrl) {
      Swal.fire({
        html: `<img src="${imageUrl}" alt="Document Image" className="w-full">`,
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch image.",
        icon: "error",
      });
    }
  };

  const handleDocumentEdit = (did) => {
    navigate(`/home/editDocument/${did}`);
  };

  return (
    <div
      className={`bg-white rounded-lg drop-shadow-sm border-2 ${colorClass}`}
    >
      <div className="h-1/2 flex w-full justify-center items-center py-5">
        <button onClick={handleView} className="btn bg-[#293129a5] text-white">
          View Document
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mt-2 space-y-2 p-6">
        <h2 className="text-xl text-black md:text-3xl font-semibold">
          {document.name}
        </h2>
        <div className="flex items-center gap-2">
          <FcAlarmClock />
          <p className="md:text-xl">{formatDate(document.dateOfExpiry)}</p>
        </div>
        <p className={`md:text-xl ${colorClass}`}>
          {getStatus(document.dateOfExpiry)}
        </p>
        <button
          onClick={() => handleDocumentEdit(document.id)}
          className="btn font-koulen bg-[#F3F3E6] border-black text-xl font-bold"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
