import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddVehicle = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    const form = e.target;

    const titleNumber = form.titleName.value;
    const ownerName = form.ownerName.value;
    const type = form.category.value;
    const imageUrl = form.vehicleImage.value;
    const description = form.description.value;

    const taxDocImageUrl = form.taxImage.files[0];
    const taxDocExpiry = form.taxDate.value;

    const registrationDocImageUrl = form.registrationImage.files[0];
    const registrationDocExpiry = form.registrationDate.value;

    const fitnessDocImage = form.fitnessImage.files[0];
    const fitnessDocExpiry = form.fitnessDate.value;

    const routePermitImage = form.routePermitImage.files[0];
    const routePermitExpiry = form.routePermitDate.value;

    const createFormData = (file, type, dateOfExpiry) => {
      const data = new FormData();
      data.append("image", file);
      data.append("type", type);
      data.append("vehicle", titleNumber);
      data.append("dateOfExpiry", dateOfExpiry);
      return data;
    };

    try {
      const promises = [];

      // Conditionally post each document only if input is provided
      if (taxDocImageUrl && taxDocExpiry) {
        promises.push(
          axiosSecure.post(
            "https://api.ujjalflourmills.com/api/v1/document/add-document",
            createFormData(taxDocImageUrl, "Tax", taxDocExpiry),
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
        );
      }

      if (registrationDocImageUrl && registrationDocExpiry) {
        promises.push(
          axiosSecure.post(
            "https://api.ujjalflourmills.com/api/v1/document/add-document",
            createFormData(
              registrationDocImageUrl,
              "Registration",
              registrationDocExpiry
            ),
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
        );
      }

      if (fitnessDocImage && fitnessDocExpiry) {
        promises.push(
          axiosSecure.post(
            "https://api.ujjalflourmills.com/api/v1/document/add-document",
            createFormData(fitnessDocImage, "Fitness", fitnessDocExpiry),
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
        );
      }

      if (routePermitImage && routePermitExpiry) {
        promises.push(
          axiosSecure.post(
            "https://api.ujjalflourmills.com/api/v1/document/add-document",
            createFormData(routePermitImage, "RoutePermit", routePermitExpiry),
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
        );
      }

      // Wait for all document creation requests to complete
      const results = await Promise.all(promises);

      // Get document IDs if available
      const documentIds = results.map((res) => res.data.data._id);

      const vehicle = {
        titleNumber,
        ownerName,
        type,
        description,
        imageUrl,
        taxDoc: documentIds[0] || null,
        fitnessDoc: documentIds[2] || null,
        registrationDoc: documentIds[1] || null,
        routePermitDoc: documentIds[3] || null,
      };

      await axiosSecure.post(
        "https://api.ujjalflourmills.com/api/v1/transport/add-transport",
        vehicle
      );

      Swal.fire({
        title: "Vehicle added successfully!",
        text: "Enjoy Exploring!",
        icon: "success",
        confirmButtonText: "Continue",
      });

      navigate("/home/transportList");
    } catch (error) {
      console.error("Error adding documents or vehicle:", error);
    }
  };

  return (
    <div className="pb-10">
      <div className="card bg-gray-50 w-full mx-auto max-w-7xl shrink-0 shadow-2xl">
        <div className="text-center pt-10 pb-5">
          <h2 className="text-5xl font-bold ">Add New Vehicle</h2>
        </div>
        <form onSubmit={handleAddVehicle} className="px-10">
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-semibold">Title Name</span>
              </label>
              <input
                type="text"
                name="titleName"
                placeholder="vehicle title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-semibold">Owner Name</span>
              </label>
              <input
                type="text"
                name="ownerName"
                placeholder="owner name"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-semibold">Type</span>
              </label>
              <select
                required
                name="category"
                className="select select-bordered w-full "
              >
                <option disabled selected>
                  Select Category
                </option>
                <option>Truck</option>
                <option>Pickup</option>
                <option>Motorcycle</option>
              </select>
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-semibold">Image URL</span>
              </label>
              <input
                type="text"
                name="vehicleImage"
                placeholder="image"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Notes</span>
              </label>
              <textarea
                type="text"
                name="description"
                placeholder="note"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="text-center mt-10 pb-3">
            <h2 className="text-3xl font-medium ">Documents</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-4">
            <div className="border-[3px] p-4">
              <div className="text-center pt-3 pb-3">
                <h2 className="text-xl font-medium ">Tax Document</h2>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Tax Image</span>
                </label>
                <input
                  type="file"
                  name="taxImage"
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
            </div>
            <div className="border-[3px] p-4">
              <div className="text-center pt-3 pb-3">
                <h2 className="text-xl font-medium ">Registration Document</h2>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Registration Image
                  </span>
                </label>
                <input
                  type="file"
                  name="registrationImage"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Expiry Date</span>
                </label>
                <input
                  type="date"
                  name="registrationDate"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="border-[3px] p-4">
              <div className="text-center pt-3 pb-3">
                <h2 className="text-xl font-medium ">Fitness Documents</h2>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Fitness Image
                  </span>
                </label>
                <input
                  type="file"
                  name="fitnessImage"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Expiry Date</span>
                </label>
                <input
                  type="date"
                  name="fitnessDate"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="border-[3px] p-4">
              <div className="text-center pt-3 pb-3">
                <h2 className="text-xl font-medium ">Route Permit Documents</h2>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Route Permit Image
                  </span>
                </label>
                <input
                  type="file"
                  name="routePermitImage"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Expiry Date</span>
                </label>
                <input
                  type="date"
                  name="routePermitDate"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>

          <div className="form-control mt-6 pb-10">
            <button className="btn btn-primary bg-amber-400 border-0 text-white text-xl">
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
