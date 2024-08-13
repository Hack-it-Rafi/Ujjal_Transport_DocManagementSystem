import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddVehicle = () => {
  const navigate = useNavigate();

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    const form = e.target;

    const titleNumber = form.titleName.value;
    const ownerName = form.ownerName.value;
    const type = form.category.value;
    const imageUrl = form.vehicleImage.value;
    const description = form.description.value;

    const taxDocImageUrl = form.taxImage.value;
    const taxDocExpiry = form.taxDate.value;

    const registrationDocImageUrl = form.registrationImage.value;
    const registrationDocExpiry = form.registrationDate.value;

    const fitnessDocImage = form.fitnessImage.value;
    const fitnessDocExpiry = form.fitnessDate.value;

    const routePermitImage = form.routePermitImage.value;
    const routePermitExpiry = form.routePermitDate.value;

    try {
      const [taxDocRes, registrationDocRes, fitnessDocRes, routePermitDocRes] =
        await Promise.all([
          axios.post("http://localhost:8000/api/v1/document/add-document", {
            imageUrl: taxDocImageUrl,
            type: "Tax",
            vehicle: titleNumber,
            dateOfExpiry: taxDocExpiry,
          }),
          axios.post("http://localhost:8000/api/v1/document/add-document", {
            imageUrl: registrationDocImageUrl,
            type: "Registration",
            vehicle: titleNumber,
            dateOfExpiry: registrationDocExpiry,
          }),
          axios.post("http://localhost:8000/api/v1/document/add-document", {
            imageUrl: fitnessDocImage,
            type: "Fitness",
            vehicle: titleNumber,
            dateOfExpiry: fitnessDocExpiry,
          }),
          axios.post("http://localhost:8000/api/v1/document/add-document", {
            imageUrl: routePermitImage,
            type: "RoutePermit",
            vehicle: titleNumber,
            dateOfExpiry: routePermitExpiry,
          }),
        ]);

      const taxDocId = taxDocRes.data.data._id;
      const registrationDocId = registrationDocRes.data.data._id;
      const fitnessDocId = fitnessDocRes.data.data._id;
      const routePermitDocId = routePermitDocRes.data.data._id;

      const vehicle = {
        titleNumber,
        ownerName,
        type,
        description,
        imageUrl,
        taxDoc: taxDocId,
        fitnessDoc: fitnessDocId,
        registrationDoc: registrationDocId,
        routePermitDoc: routePermitDocId,
      };

      console.log(vehicle);

      axios
        .post("http://localhost:8000/api/v1/transport/add-transport", vehicle)
        .then((res) => {
          console.log(res.data.data);
          Swal.fire({
            title: "Vehicle add Successful!",
            text: "Enjoy Exploring!",
            icon: "success",
            confirmButtonText: "Continue",
          });
          navigate("/home/transportList");
        });
    } catch (error) {
      console.error("Error adding documents or vehicle:", error);
    }
  };
  return (
    <div className="pb-10">
      <div className="card bg-base-100 w-full mx-auto max-w-7xl shrink-0 shadow-2xl">
        <div className="text-center pt-10 pb-5">
          <h2 className="text-4xl font-bold ">Add New Vehicle</h2>
        </div>
        <form onSubmit={handleAddVehicle} className="px-10">
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Title Name</span>
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
                <span className="label-text">Owner Name</span>
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
                <span className="label-text">Type</span>
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
                <span className="label-text">Image URL</span>
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
                <span className="label-text">Description</span>
              </label>
              <textarea
                type="text"
                name="description"
                placeholder="description"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="text-center mt-10 pb-3">
            <h2 className="text-3xl font-medium ">Documents</h2>
          </div>

          <div className="flex justify-center gap-4">
            <div className="border-[3px] p-4">
              <div className="text-center pt-3 pb-3">
                <h2 className="text-xl font-medium ">Tax Document</h2>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Tax Image</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Type here"
                  name="taxImage"
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
                  <span className="label-text">Registration Image</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Type here"
                  name="registrationImage"
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
                  <span className="label-text">Fitness Image</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Type here"
                  name="fitnessImage"
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
                  name="fitnessDate"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="border-[3px] p-4">
              <div className="text-center pt-3 pb-3">
                <h2 className="text-xl font-medium ">Route Permit</h2>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Route Permit Image</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Type here"
                  name="routePermitImage"
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
                  name="routePermitDate"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
          <div className="form-control my-6">
            <button className="btn bg-[#FFD576]">Add vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
