import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FcAlarmClock } from "react-icons/fc";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useAdmin from "../Hooks/useAdmin";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const TransportDetails = () => {
  const axiosSecure = useAxiosSecure();
  const [vehicles, setVehicle] = useState(null);
  const [taxDocImage, setTaxDocImage] = useState(null);
  const [registrationDocImage, setRegistrationDocImage] = useState(null);
  const [fitnessDocImage, setFitnessDocImage] = useState(null);
  const [routePermitDocImage, setRoutePermitDocImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAdmin] = useAdmin();

  useEffect(() => {
    axiosSecure
      .get(`https://api.ujjalflourmills.com/api/v1/transport/${id}`)
      .then((res) => {
        setVehicle(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch vehicle data:", err);
      });
  }, [axiosSecure, id]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const fetchImage = async (docId) => {
          const response = await axiosSecure.get(
            `https://api.ujjalflourmills.com/api/v1/document/file/${docId}`,
            { responseType: "blob" }
          );
          return URL.createObjectURL(response.data);
        };

        const taxImage = vehicles?.taxDoc?._id
          ? await fetchImage(vehicles.taxDoc._id)
          : null;
        const registrationImage = vehicles?.registrationDoc?._id
          ? await fetchImage(vehicles.registrationDoc._id)
          : null;
        const fitnessImage = vehicles?.fitnessDoc?._id
          ? await fetchImage(vehicles.fitnessDoc._id)
          : null;
        const routePermitImage = vehicles?.routePermitDoc?._id
          ? await fetchImage(vehicles.routePermitDoc._id)
          : null;

        setTaxDocImage(taxImage);
        setRegistrationDocImage(registrationImage);
        setFitnessDocImage(fitnessImage);
        setRoutePermitDocImage(routePermitImage);
      } catch (error) {
        console.error("Error fetching document or image:", error);
      }
    };

    if (vehicles) {
      fetchDocuments();
    }
  }, [axiosSecure, vehicles]);

  if (!vehicles) {
    return <div>Loading...</div>;
  }

  const documents = [
    {
      id: vehicles?.taxDoc?._id,
      imageUrl: taxDocImage,
      type: vehicles?.taxDoc?.type,
      dateOfExpiry: vehicles?.taxDoc?.dateOfExpiry,
    },
    {
      id: vehicles?.registrationDoc?._id,
      imageUrl: registrationDocImage,
      type: vehicles?.registrationDoc?.type,
      dateOfExpiry: vehicles?.registrationDoc?.dateOfExpiry,
    },
    {
      id: vehicles?.fitnessDoc?._id,
      imageUrl: fitnessDocImage,
      type: vehicles?.fitnessDoc?.type,
      dateOfExpiry: vehicles?.fitnessDoc?.dateOfExpiry,
    },
    {
      id: vehicles?.routePermitDoc?._id,
      imageUrl: routePermitDocImage,
      type: vehicles?.routePermitDoc?.type,
      dateOfExpiry: vehicles?.routePermitDoc?.dateOfExpiry,
    },
  ];

  const validDocuments = documents.filter((document) => document.id);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

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

  const handleDocumentEdit = (did) => {
    navigate(`/home/editDocument/${did}`);
  };

  const handleView = async (Url) => {
    if (Url) {
      Swal.fire({
        html: `<img src="${Url}" alt="Document Image" className="w-full">`,
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch image.",
        icon: "error",
      });
    }
  };

  const DocumentCard = ({ document }) => {
    const colorClass = getColor(document.dateOfExpiry);
    return (
      <div
        className={`bg-white rounded-lg drop-shadow-sm border-2 ${colorClass}`}
      >
        <div className="h-1/2 flex w-full justify-center items-center py-5">
          <button
            onClick={() => handleView(document.imageUrl)}
            className="btn bg-[#293129a5] text-white"
          >
            View Document
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mt-2 space-y-2 p-6">
          <h2 className="text-xl text-black md:text-3xl font-semibold">
            {document.type}
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleUpdateVehicle = () => {
    let titleNumberInput,
      ownerNameInput,
      typeInput,
      descriptionInput,
      imageUrlInput;

    Swal.fire({
      title: "Update vehicle",
      html: `
        <input type="text" id="titleNumber" class="swal2-input" placeholder="titleNumber">
        <input type="ownerName" id="ownerName" class="swal2-input" placeholder="ownerName">
        <input type="text" id="type" class="swal2-input" placeholder="type">
        <input type="description" id="description" class="swal2-input" placeholder="description(Default:Ujjal123)">
        <input type="imageUrl" id="imageUrl" class="swal2-input" placeholder="imageUrl">
        
      `,
      confirmButtonText: "Update vehicle",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup();
        titleNumberInput = popup.querySelector("#titleNumber");
        ownerNameInput = popup.querySelector("#ownerName");
        typeInput = popup.querySelector("#type");
        descriptionInput = popup.querySelector("#description");
        imageUrlInput = popup.querySelector("#imageUrl");
      },
      preConfirm: () => {
        const titleNumber = titleNumberInput.value
          ? titleNumberInput.value
          : vehicles.titleNumber;
        const ownerName = ownerNameInput.value
          ? ownerNameInput.value
          : vehicles.ownerName;
        const type = typeInput.value ? typeInput.value : vehicles.type;
        const description = descriptionInput.value
          ? descriptionInput.value
          : vehicles.description;

        const imageUrl = imageUrlInput.value
          ? imageUrlInput.value
          : vehicles.imageUrl;

        // if (!titleNumber || !ownerName || !type) {
        //   Swal.showValidationMessage(`Please fill out all required fields`);
        //   return false;
        // }

        return { titleNumber, ownerName, type, description, imageUrl };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { titleNumber, ownerName, type, description, imageUrl } =
          result.value;

        const transport = {
          titleNumber,
          ownerName,
          type,
          description,
          imageUrl,
        };

        axiosSecure
          .patch(
            `https://api.ujjalflourmills.com/api/v1/transport/${id}`,
            transport
          )
          .then(() => {
            Swal.fire("Success!", "Vehicle has been updated.", "success").then(
              () => {
                window.location.reload();
              }
            );
          })
          .catch((error) => {
            Swal.fire("Error!", "There was an error in local.", "error");
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 mt-10 font-frank">
      <div>
        <button onClick={handleBack}>
          <IoArrowBackCircleOutline size={50} />
        </button>
      </div>
      <div className="flex w-full flex-col md:flex-row gap-8 items-center">
        <img
          src={vehicles.imageUrl}
          alt="Transport Image"
          className="md:w-1/2 px-10 md:px-20"
        />
        <div className="space-y-7 w-full md:w-1/2">
          <h3 className="text-3xl md:text-5xl font-semibold text-[#791B1B]">
            {vehicles.titleNumber}
          </h3>
          <h2 className="flex gap-2 text-xl md:text-3xl">
            <div className="font-semibold">Owner:</div>
            <div>{vehicles.ownerName}</div>
          </h2>
          <h2 className="w-full">
            <div className="text-xl md:text-3xl font-semibold">Notes:</div>
            <div className="max-w-2xl text-justify bg-gray-50 w-full p-3 pb-20 mt-2 rounded-lg ">
              {vehicles.description}
            </div>
          </h2>
        </div>
      </div>
      <div className="w-full py-10">
        {isAdmin == "admin" && (
          <div className="flex justify-center">
            <button
              onClick={handleUpdateVehicle}
              className="btn bg-[#0ba91ba5] text-white"
            >
              Update Vehicle
            </button>
          </div>
        )}
      </div>
      <div className="h-0.5 w-auto mt-8 bg-black"></div>
      <div className="flex flex-col justify-center items-center space-y-2">
        <h3 className="text-3xl md:text-4xl font-bold mt-20 text-center text-[#791B1B]">
          Documents
        </h3>
        <div className="h-0.5 w-28 bg-gray-400"></div>
      </div>
      <div className="grid grid-cols-1 py-10 justify-center items-center sm:grid-cols-2 gap-x-12 gap-y-8 lg:px-44">
        {validDocuments.map((document, index) => (
          <DocumentCard key={index} document={document} />
        ))}
      </div>
    </div>
  );
};

export default TransportDetails;
