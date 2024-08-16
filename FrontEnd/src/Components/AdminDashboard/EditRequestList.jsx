import { useEffect, useState } from "react";
import EditRequestTableRow from "./EditRequestTableRow";
import axios from "axios";

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
          <thead className="bg-[#F5F5F5]">
            <tr className="text-2xl font-serif font-bold">
              <th className="border-2 border-b-[#FFD576]">Created</th>
              <th className="border-2 border-b-[#FFD576]">Document Name</th>
              <th className="border-2 border-b-[#FFD576]">Expiry Date</th>
              <th className="border-2 border-b-[#FFD576]">Vehicle Name</th>
              <th className="border-2 border-b-[#FFD576]">Editor</th>
              <th className="border-2 border-b-[#FFD576]">Action</th>
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
