import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider";
import Swal from "sweetalert2";

const EditDocument = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/document/${id}`)
      .then((res) => {
        setDocument(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleUpdateDocument = (e) => {
    e.preventDefault();

    const form = e.target;

    const docId = id;
    const editorEmail = user.email;
    const vehicleName = document.vehicle?document.vehicle:"Vehicle Nai";
    const imageUrl = form.image.value;
    const type = document.type;
    const dateOfExpiry = form.date.value;

    const editData = {
      docId,
      editorEmail,
      vehicleName,
      imageUrl,
      type,
      dateOfExpiry,
    };

    console.log(editData);

    axios
      .post(
        "http://localhost:8000/api/v1/editRequest/add-editRequest",
        editData
      )
      .then((res) => {
        console.log(res.data.data);
        Swal.fire({
          title: "Edit Successful!",
          text: "Wait for admin's approval!",
          icon: "success",
          confirmButtonText: "Continue",
        });
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
  return (
    <div>
      <form onSubmit={handleUpdateDocument} className="px-5 md:px-20 pb-20">
        <div className="border-[3px] p-4">
          <div className="text-center pt-3 pb-3">
            <h2 className="text-xl font-medium ">{document?.type} Document</h2>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">{document?.type} Image</span>
            </label>
            <input
              type="text"
              required
              placeholder="Type here"
              name="image"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Expiry Date</span>
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
