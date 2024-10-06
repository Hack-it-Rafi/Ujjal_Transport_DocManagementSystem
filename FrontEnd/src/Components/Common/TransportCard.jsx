import { GrDocumentStore } from "react-icons/gr";
import { LuClock3 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const TransportCard = ({ vehicle }) => {
  const navigate = useNavigate();
  const {
    _id,
    titleNumber,
    taxDoc,
    fitnessDoc,
    registrationDoc,
    routePermitDoc,
  } = vehicle;

  const calculateRemainingDays = (expiryDate) => {
    if (!expiryDate) return 0; 
    const differenceInTime = new Date(expiryDate) - new Date();
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  };

  const handleVehicleDetail = () => {
    navigate(`/home/transportDetails/${_id}`);
  };

  const taxDocRemainingDays = calculateRemainingDays(taxDoc?.dateOfExpiry);
  const fitnessDocRemainingDays = calculateRemainingDays(fitnessDoc?.dateOfExpiry);
  const registrationDocRemainingDays = calculateRemainingDays(registrationDoc?.dateOfExpiry);
  const routePermitDocRemainingDays = calculateRemainingDays(routePermitDoc?.dateOfExpiry);

  return (
    <div 
      onClick={handleVehicleDetail} 
      className="w-full max-w-xl md:max-w-7xl h-auto mx-auto bg-white rounded-xl border border-orange-600 flex flex-col md:flex-row justify-between items-center p-4 cursor-pointer transition-shadow hover:shadow-lg"
    >
      <div className="w-full md:w-1/3 h-auto flex justify-center items-center mb-4 md:mb-0">
        <p className="text-2xl font-semibold text-center">{titleNumber}</p>
      </div>
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {[{
          doc: registrationDoc,
          daysRemaining: registrationDocRemainingDays,
          label: "Registration"
        }, {
          doc: taxDoc,
          daysRemaining: taxDocRemainingDays,
          label: "Tax"
        }, {
          doc: fitnessDoc,
          daysRemaining: fitnessDocRemainingDays,
          label: "Fitness"
        }, {
          doc: routePermitDoc,
          daysRemaining: routePermitDocRemainingDays,
          label: "Route Permit"
        }].map(({ doc, daysRemaining, label }, index) => (
          <div
            key={index}
            className={`flex items-center justify-around w-full h-12 rounded-lg p-2
              ${daysRemaining <= 0 ? "bg-red-500" :
                daysRemaining <= 15 ? "bg-yellow-400" :
                "bg-[#F3F3E6]"}
            `}
          >
            <div className="flex items-center gap-2 px-3 border rounded-md bg-white">
              <GrDocumentStore />
              <p>{doc?.type || label}</p>
            </div>
            <div className="flex items-center gap-2 px-3 border rounded-md bg-white">
              <LuClock3 />
              <p>{daysRemaining}</p>
            </div>
            <div className={`px-3 py-1 border rounded-md bg-white flex items-center justify-center text-${daysRemaining <= 0 ? "red" : daysRemaining <= 15 ? "yellow" : "green"}-600`}>
              {daysRemaining <= 0 ? "Expired" :
                daysRemaining <= 15 ? "Expiry soon" :
                "On Time"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportCard;
