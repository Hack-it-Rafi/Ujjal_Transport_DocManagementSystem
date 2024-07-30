import axios from "axios";
import { useEffect, useState } from "react";
import EditRequestTableRow from "./EditRequestTableRow";

const EditRequestList = () => {
  const [editRequests, setEditRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/editRequest")
      .then((res) => {
        setEditRequests(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="w-full flex justify-center">
      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-2xl font-serif font-bold">
              <th>Created</th>
              <th>Document Name</th>
              <th>Vehicle Name</th>
              <th>Editor Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {editRequests
              .filter((editRequest) => !editRequest.isDeleted)
              .map((editRequest) => (
                <EditRequestTableRow
                  key={editRequest._id}
                  editRequest={editRequest}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditRequestList;
