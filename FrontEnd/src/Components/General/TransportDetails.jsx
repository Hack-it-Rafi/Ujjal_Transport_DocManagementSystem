
const TransportDetails = () => {
    const vehicle = {
        imageUrl: "/bike.png",
        name: "Dhaka Metro LA 18-1608",
        owner: "Md. Delwar Hossain",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "
    }

    const documents = [
        {
            imageUrl: "https://img.indiafilings.com/learn/wp-content/uploads/2018/12/12004804/Image-11-Odisha-Vehicle-Tax.jpg",
            type: "Tax Token",
            dateOfExpiry: "2026-12-31"
        },
        {
            imageUrl: "https://img.indiafilings.com/learn/wp-content/uploads/2018/12/12004804/Image-11-Odisha-Vehicle-Tax.jpg",
            type: "Registration Token",
            dateOfExpiry: "2024-08-15"
        },
        {
            imageUrl: "https://img.indiafilings.com/learn/wp-content/uploads/2018/12/12004804/Image-11-Odisha-Vehicle-Tax.jpg",
            type: "Route Permit",
            dateOfExpiry: "2026-12-31"
        },
        {
            imageUrl: "https://img.indiafilings.com/learn/wp-content/uploads/2018/12/12004804/Image-11-Odisha-Vehicle-Tax.jpg",
            type: "Fitness Token",
            dateOfExpiry: "2023-12-31"
        }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
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

    const DocumentCard = ({ document }) => {
        const color = getColor(document.dateOfExpiry);
        return (
            <div className={`bg-white p-6 rounded-xl drop-shadow-sm border-2 border-${color}`}>
                <div className="h-1/2 flex relative">
                    <img src={document.imageUrl} alt="Document" className="z-0" />
                    <div className="absolute flex text-2xl lg:text-3xl p-6 border-2 border-white rounded-lg font-koulen text-white hover:text-gray-300 bg-black opacity-50 h-full w-full justify-center items-center z-20">VIEW IMAGE</div>
                </div>
                <div className="flex flex-col justify-center items-center mt-2 space-y-2">
                    <h2 className="text-xl md:text-3xl font-semibold">{document.type}</h2>
                    <div className="flex gap-2">
                        <img src="/clock.svg" alt="clock" className="w-5" />
                        <p className="md:text-xl">{formatDate(document.dateOfExpiry)}</p>
                    </div>
                    <p className={`md:text-xl text-${color}`}>{getStatus(document.dateOfExpiry)}</p>
                    <button className="btn font-koulen bg-[#F3F3E6] border-black text-xl font-semibold ">UPDATE</button>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 lg:px-0 mt-20 font-frank">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <img src={vehicle.imageUrl} alt="Transport Image" className="md:w-1/2 rounded-lg" />
                <div className="space-y-7">
                    <h3 className="text-3xl md:text-5xl font-semibold text-[#791B1B]">{vehicle.name}</h3>
                    <h2 className="flex gap-2 text-xl md:text-3xl">
                        <div className="font-semibold">Owner:</div>
                        <div>{vehicle.owner}</div>
                    </h2>
                    <h2 className="">
                        <div className="text-xl md:text-3xl font-semibold">Description:</div>
                        <div className="max-w-2xl text-justify text-lg md:text-xl">{vehicle.description}</div>
                    </h2>
                </div>
            </div>
            <div className="h-0.5 w-auto mt-8 bg-black"></div>
            <div className="flex flex-col justify-center items-center space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold mt-20 text-center text-[#791B1B]">Documents</h3>
                <div className="h-0.5 w-28 bg-gray-400"></div>
            </div>
            <div className="grid grid-cols-1 mt-10 justify-center items-center sm:grid-cols-2 gap-x-12 gap-y-8 lg:px-44">
                {documents.map((document, index) => (
                    <DocumentCard key={index} document={document} />
                ))}
            </div>
        </div>
    );
};

export default TransportDetails;