import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FcAlarmClock } from "react-icons/fc";

const TransportDetails = () => {
  const [vehicles, setVehicle] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/transport/${id}`)
      .then((res) => {
        setVehicle(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch vehicle data:", err);
      });
  }, [id]); // Use useEffect to avoid repeated API calls

  if (!vehicles) {
    // Render loading state while data is being fetched
    return <div>Loading...</div>;
  }

  const vehicle = {
    imageUrl: "https://morth.nic.in/sites/default/files/all_india_transport.jpg",
    name: vehicles.titleNumber,
    owner: vehicles.ownerName,
    description: vehicles.description,
  };

  const documents = [
    {
      id: vehicles.taxDoc._id,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdD06FAJ1tlsxJbJ2RwHVWYS0iMgtrqnUDZw&s",
      type: vehicles.taxDoc.type,
      dateOfExpiry: vehicles.taxDoc.dateOfExpiry,
    },
    {
      id: vehicles.registrationDoc._id,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXTFM7CLdq05bKWroFmdCw5rzjLXZNeGF0WA&s",
      type: vehicles.registrationDoc.type,
      dateOfExpiry: vehicles.registrationDoc.dateOfExpiry,
    },
    {
      id: vehicles.fitnessDoc._id,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZzp5QcvoRMAhLZY16SLJRU2ms6iA586OLww&s",
      type: vehicles.fitnessDoc.type,
      dateOfExpiry: vehicles.fitnessDoc.dateOfExpiry,
    },
    {
      id: vehicles.routePermitDoc._id,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKVEKum8Zf6s1tLVDtEEDy3Apq0Cc3MmYCQ&s",
      type: vehicles.routePermitDoc.type,
      dateOfExpiry: vehicles.routePermitDoc.dateOfExpiry,
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatus = (dateString) => {
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
      return "green-500";
    } else if (status === "About to Expire") {
      return "yellow-600";
    } else {
      return "red-600";
    }
  };

  const handleDocumentEdit = (id) => {
    navigate(`/home/editDocument/${id}`);
  }

  const DocumentCard = ({ document }) => {
    const color = getColor(document.dateOfExpiry);
    return (
      <div
        className={`bg-white rounded-lg drop-shadow-sm border-2 border-${color}`}
      >
        <div className="h-1/2 flex relative items-center justify-center">
          <img src={document.imageUrl} alt="Document" className="z-10 h-48" />
          <div className="absolute flex text-2xl lg:text-3xl rounded-lg font-koulen text-white hover:text-gray-300 bg-black opacity-50 h-full w-full justify-center items-center z-20">
            <div className="z-30 border-2 p-2 rounded-lg">
              VIEW IMAGE
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-2 space-y-2 p-6">
          <h2 className="text-xl md:text-3xl font-semibold">{document.type}</h2>
          <div className="flex gap-2 items-center">
            <FcAlarmClock className="text-2xl" />
            <p className="md:text-xl ">{formatDate(document.dateOfExpiry)}</p>
          </div>
          <p className={`md:text-xl text-${color}`}>
            {getStatus(document.dateOfExpiry)}
          </p>
          <button onClick={() => handleDocumentEdit(document.id)} className="btn font-koulen bg-[#F3F3E6] border-[#791B1B] text-xl text-[#672a2a] font-semibold ">
            UPDATE
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 mt-20 font-frank">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={vehicle.imageUrl}
          alt="Transport Image"
          className="md:w-1/2 h-72 rounded-lg"
        />
        <div className="space-y-7">
          <h3 className="text-3xl md:text-5xl font-semibold text-[#791B1B]">
            {vehicle.name}
          </h3>
          <h2 className="flex gap-2 text-xl md:text-3xl">
            <div className="font-semibold">Owner:</div>
            <div>{vehicle.owner}</div>
          </h2>
          <h2 className="">
            <div className="text-xl md:text-3xl font-semibold">
              Description:
            </div>
            <div className="max-w-2xl text-justify text-lg md:text-xl">
              {vehicle.description}
            </div>
          </h2>
        </div>
      </div>
      <div className="h-0.5 w-auto mt-8 bg-black"></div>
      <div className="flex flex-col justify-center items-center space-y-2">
        <h3 className="text-3xl md:text-4xl font-bold mt-20 text-center text-[#791B1B]">
          Documents
        </h3>
        <div className="h-0.5 w-28 bg-gray-400"></div>
      </div>
      <div className="grid grid-cols-1 py-10 justify-center items-center sm:grid-cols-2 gap-x-12 gap-y-8 lg:px-44">
        {documents.map((document, index) => (
          <DocumentCard key={index} document={document} />
        ))}
      </div>
    </div>
  );
};

export default TransportDetails;
