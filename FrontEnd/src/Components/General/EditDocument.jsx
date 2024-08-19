import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider";
import Swal from "sweetalert2";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const EditDocument = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`https://api.ujjalflourmills.com/api/v1/document/${id}`)
      .then((res) => {
        setDocument(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [axiosSecure, id]);

  const handleUpdateDocument = (e) => {
    e.preventDefault();

    const form = e.target;

    const docId = id;
    const editorEmail = user.email;
    const vehicleName = document.vehicle ? document.vehicle : "Vehicle Nai";
    const imageUrl = form.image.files[0];
    const type = document.type;
    const dateOfExpiry = form.date.value;

    const createFormData = () => {
      const data = new FormData();
      data.append("docId", docId);
      data.append("editorEmail", editorEmail);
      data.append("vehicleName", vehicleName);
      data.append("image", imageUrl);
      data.append("type", type);
      data.append("dateOfExpiry", dateOfExpiry);
      return data;
    };

    axiosSecure
      .post(
        "https://api.ujjalflourmills.com/api/v1/editRequest/add-editRequest",
        createFormData(),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        Swal.fire({
          title: "Edit Successful!",
          text: "Wait for admin's approval!",
          icon: "success",
          confirmButtonText: "Continue",
        });
        form.reset();
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error submitting edit request:", error);
        Swal.fire({
          title: "Error",
          text: "There was an error updating the document. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      });
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="container mx-auto px-4 lg:px-0 mt-10 font-frank">
      <div>
        <div>
          <button onClick={handleBack}>
            <IoArrowBackCircleOutline size={50} />
          </button>
        </div>
      </div>
      <form onSubmit={handleUpdateDocument} className="px-5 md:px-20 pb-20">
        <div className="border-[3px] p-4">
          <div className="text-center pt-3 pb-3">
            <h2 className="text-xl md:text-2xl font-semibold ">
              {document?.type} Document
            </h2>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-medium text-gray-600">
                {document?.type} Image
              </span>
            </label>
            <input
              type="file"
              required
              placeholder="Type here"
              name="image"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-medium text-gray-600">
                Expiry Date
              </span>
            </label>
            <input
              type="date"
              required
              placeholder="Type here"
              name="date"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* Submit */}
        <div className="form-control mt-6">
          <button className="btn bg-[#2B3440] text-white hover:bg-slate-800">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDocument;
