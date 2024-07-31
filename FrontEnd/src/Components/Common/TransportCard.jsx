import { GrDocumentStore } from "react-icons/gr";
import { LuClock3 } from "react-icons/lu";

const TransportCard = ({ vehicle }) => {
  const {
    // _id,
    titleNumber,
    // ownerName,
    // description,
    // type,
    // imageUrl,
    taxDoc,
    fitnessDoc,
    registrationDoc,
    routePermitDoc,
  } = vehicle;

  const calculateRemainingDays = (expiryDate) => {
    const differenceInTime = new Date(expiryDate) - new Date();
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  };

  const taxDocRemainingDays = calculateRemainingDays(taxDoc?.dateOfExpiry);
  const fitnessDocRemainingDays = calculateRemainingDays(fitnessDoc?.dateOfExpiry);
  const registrationDocRemainingDays = calculateRemainingDays(registrationDoc?.dateOfExpiry);
  const routePermitDocRemainingDays = calculateRemainingDays(routePermitDoc?.dateOfExpiry);

  return (
    <div className="w-[1280px] h-[250px] mx-auto bg-white rounded-xl border border-orange-600 flex justify-center items-center">
      <div className="w-2/5 h-full">
        {/* <PiTruckLight /> */}
        <div className="h-full flex justify-center items-center">
          <p className="text-2xl font-semibold">{titleNumber}</p>
        </div>
      </div>
      <div className="w-3/5">
        <div className="m-6 flex flex-col gap-4">
          <doc
            className={`Registration w-full rounded-lg h-11 flex justify-around items-center ${
              registrationDocRemainingDays <= 0
                    ? "bg-[#ff4545e8]"
                    : registrationDocRemainingDays <= 5
                    ? "bg-[#ffca45e8]"
                    : "bg-[#F3F3E6]"
            }`}
          >
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex px-3 justify-between items-center">
              <GrDocumentStore />
              <p>{registrationDoc.type}</p>
            </div>
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex px-3 justify-between items-center">
              <LuClock3 />
              <p>{registrationDocRemainingDays}</p>
            </div>
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex justify-center items-center">
              <p
                className={
                  registrationDocRemainingDays <= 0
                    ? "text-red-600"
                    : registrationDocRemainingDays <= 5
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {(() => {
                  if (registrationDocRemainingDays <= 0) {
                    return "Expired";
                  } else if (registrationDocRemainingDays <= 5) {
                    return "About to expire";
                  } else {
                    return "On Time";
                  }
                })()}
              </p>
            </div>
          </doc>
          <doc
            className={`Tax w-full rounded-lg h-11 flex justify-around items-center ${
              taxDocRemainingDays <= 0
                    ? "bg-[#ff4545e8]"
                    : taxDocRemainingDays <= 5
                    ? "bg-[#ffca45e8]"
                    : "bg-[#F3F3E6]"
            }`}
          >
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex px-3 justify-between items-center">
              <GrDocumentStore />
              <p>{taxDoc.type}</p>
            </div>
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex px-3 justify-between items-center">
              <LuClock3 />
              <p>{taxDocRemainingDays}</p>
            </div>
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex justify-center items-center">
              <p
                className={
                  taxDocRemainingDays <= 0
                    ? "text-red-600"
                    : taxDocRemainingDays <= 5
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {(() => {
                  if (taxDocRemainingDays <= 0) {
                    return "Expired";
                  } else if (taxDocRemainingDays <= 5) {
                    return "About to expire";
                  } else {
                    return "On Time";
                  }
                })()}
              </p>
            </div>
          </doc>
          <doc
            className={`Tax w-full rounded-lg h-11 flex justify-around items-center ${
              fitnessDocRemainingDays <= 0
                    ? "bg-[#ff4545e8]"
                    : fitnessDocRemainingDays <= 5
                    ? "bg-[#ffca45e8]"
                    : "bg-[#F3F3E6]"
            }`}
          >
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex px-3 justify-between items-center">
              <GrDocumentStore />
              <p>{fitnessDoc.type}</p>
            </div>
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex px-3 justify-between items-center">
              <LuClock3 />
              <p>{fitnessDocRemainingDays}</p>
            </div>
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex justify-center items-center">
              <p
                className={
                  fitnessDocRemainingDays <= 0
                    ? "text-red-600"
                    : fitnessDocRemainingDays <= 5
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {(() => {
                  if (fitnessDocRemainingDays <= 0) {
                    return "Expired";
                  } else if (fitnessDocRemainingDays <= 5) {
                    return "About to expire";
                  } else {
                    return "On Time";
                  }
                })()}
              </p>
            </div>
          </doc>
          <doc
            className={`Tax w-full rounded-lg h-11 flex justify-around items-center ${
              routePermitDocRemainingDays <= 0
                    ? "bg-[#ff4545e8]"
                    : routePermitDocRemainingDays <= 5
                    ? "bg-[#ffca45e8]"
                    : "bg-[#F3F3E6]"
            }`}
          >
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex px-3 justify-between items-center">
              <GrDocumentStore />
              <p>{routePermitDoc.type}</p>
            </div>
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex px-3 justify-between items-center">
              <LuClock3 />
              <p>{routePermitDocRemainingDays}</p>
            </div>
            <div className="border border-gray-950 h-6 w-36 bg-white rounded-md flex justify-center items-center">
              <p
                className={
                  routePermitDocRemainingDays <= 0
                    ? "text-red-600"
                    : routePermitDocRemainingDays <= 5
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {(() => {
                  if (routePermitDocRemainingDays <= 0) {
                    return "Expired";
                  } else if (routePermitDocRemainingDays <= 5) {
                    return "About to expire";
                  } else {
                    return "On Time";
                  }
                })()}
              </p>
            </div>
          </doc>
        </div>
      </div>
    </div>
  );
};

export default TransportCard;
