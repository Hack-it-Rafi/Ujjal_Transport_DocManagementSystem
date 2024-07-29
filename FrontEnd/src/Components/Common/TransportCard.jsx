import { PiTruckLight } from "react-icons/pi";

const TransportCard = ({ vehicle }) => {
  const {
    _id,
    titleNumber,
    ownerName,
    description,
    type,
    imageUrl,
    taxDoc,
    fitnessDoc,
    registrationDoc,
    routePermitDoc,
  } = vehicle;

  console.log(titleNumber);
  return (
    <div className="w-[1280px] h-[200px] mx-auto bg-white rounded-xl border-orange-600 ">
      <div className="w-2/5 h-full">
        {/* <PiTruckLight /> */}
        <div className="h-full flex justify-center items-center">
            <p className="text-2xl font-semibold">{titleNumber}</p>
        </div>
      </div>
      <div className="w-3/5"></div>
    </div>
  );
};

export default TransportCard;
