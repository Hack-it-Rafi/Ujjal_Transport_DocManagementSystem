import axios from "axios";
import Swal from "sweetalert2";

const EditRequestTableRow = ({ editRequest }) => {
  const {
    _id,
    docId,
    editorEmail,
    vehicleName,
    type,
    dateOfExpiry,
    createdAt,
  } = editRequest;
  const formattedDateOfExpiry = new Date(dateOfExpiry)
    .toISOString()
    .split("T")[0];
  const formattedCreatedAt = new Date(createdAt).toISOString().split("T")[0];

  // Fetch the Blob directly
  const fetchImageBlob = async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/editRequest/file/${id}`,
      {
        responseType: "blob",
      }
    );
    return response.data;
  };

  const handleView = async () => {
    const imageBlob = await fetchImageBlob(_id);
    const imageObjectURL = URL.createObjectURL(imageBlob);
    
    if (imageObjectURL) {
      Swal.fire({
        html: `<img src="${imageObjectURL}" alt="Document Image" className="w-full">`,
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch image.",
        icon: "error",
      });
    }
  };

  const handleUpdateDocument = async () => {
    const imageBlob = await fetchImageBlob(_id);
    console.log(imageBlob);

    if (imageBlob) {
      const formData = new FormData();

      formData.append("dateOfExpiry", dateOfExpiry);

      // Create File from Blob
      const imageFile = new File([imageBlob], "updated-image.jpg", {
        type: "image/jpeg",
      });

      formData.append("documentImage", imageFile);

      Swal.fire({
        title: "Are you sure?",
        text: "You are about to update this document!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Update!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(`http://localhost:8000/api/v1/document/${docId}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.status === 200) {
                axios
                  .delete(`http://localhost:8000/api/v1/editRequest/${_id}`)
                  .then((res) => {
                    if (res.status === 200) {
                      window.location.reload();
                    }
                  })
                  .catch((error) => console.error(error));
              }
            })
            .catch((error) => console.error(error));
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch image.",
        icon: "error",
      });
    }
  };

  const handleReject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/v1/editRequest/${_id}`)
          .then((res) => {
            if (res.status === 200) {
              window.location.reload();
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };

  return (
    <tr className="text-lg">
      <td>{formattedCreatedAt}</td>
      <td>{type}</td>
      <th>{formattedDateOfExpiry}</th>
      <td>{vehicleName}</td>
      <td>{editorEmail}</td>
      <td>
        <div className="flex gap-3">
          <button
            onClick={handleView}
            className="btn bg-[#293129a5] text-white"
          >
            👁️
          </button>
          <button
            onClick={handleUpdateDocument}
            className="btn bg-[#0ba91ba5] text-white"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="btn bg-[#ff4545c6] text-white"
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EditRequestTableRow;
