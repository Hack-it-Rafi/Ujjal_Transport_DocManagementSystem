const AddVehicle = () => {
  const handleAddVehicle = (e) => {
    console.log(e);
  };
  return (
    <div className="card bg-base-100 max-w-7xl mx-auto shrink-0 shadow-2xl">
      <div className="text-center pt-10 pb-5">
        <h2 className="text-4xl font-bold ">Add New Vehicle</h2>
      </div>
      <form className="card-body">
        <div className="form-control">
          <div className="flex gap-4 md:gap-10">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title Number</span>
              </label>
              <input
                type="text"
                required
                placeholder="Type here"
                name="title"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Owner</span>
              </label>
              <input
                type="text"
                required
                placeholder="Type here"
                name="ownerName"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
        <div className="form-control">
          <div className="flex gap-4 md:gap-10">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Vehicle Type</span>
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                required
                placeholder="Type here"
                name="image"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
