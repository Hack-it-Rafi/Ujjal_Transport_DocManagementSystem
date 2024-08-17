import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddOtherDocument = () => {
  const navigate = useNavigate();

  const handleAddOtherDocument = (e) => {
    e.preventDefault();

    const form = e.target;

    const documentName = form.documentName.value;
    const taxDocImageUrl = form.image.files[0];
    const taxDocExpiry = form.taxDate.value;

    const createFormData = (name, file, dateOfExpiry) => {
      const data = new FormData();
      data.append("name", name);
      data.append("image", file);
      data.append("type", "Other");
      data.append("dateOfExpiry", dateOfExpiry);
      return data;
    };

    axios
      .post(
        "http://localhost:8000/api/v1/document//add-document",
        createFormData(documentName, taxDocImageUrl, taxDocExpiry),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        Swal.fire({
          title: "Upload Successful!",
          text: "Enjoy exploring",
          icon: "success",
          confirmButtonText: "Continue",
        });
        // navigate("/home/transportList");
      })
      .catch((error) => {
        console.error("Error submitting edit request:", error);
        Swal.fire({
          title: "Error",
          text: "There was an error uploading the document. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      });
      
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="container mx-auto px-4 lg:px-0 font-frank">
        <div>
          <div>
            <button onClick={handleBack}>
              <IoArrowBackCircleOutline size={50} />
            </button>
          </div>
        </div>
        <form onSubmit={handleAddOtherDocument} className="px-10">
          <div className="flex justify-center gap-4">
            <div className="border-[3px] p-4">
              <div className="text-center pt-3 pb-3">
                <h2 className="text-xl font-medium ">Other Document</h2>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Document Name
                  </span>
                </label>
                <input
                  type="text"
                  name="documentName"
                  placeholder="Type"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Image</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Expiry Date</span>
                </label>
                <input
                  type="date"
                  name="taxDate"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mt-6 pb-10">
                <button className="btn btn-primary text-white text-xl">
                  Add Vehicle
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOtherDocument;

