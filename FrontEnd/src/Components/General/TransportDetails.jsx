
const TransportDetails = () => {
    const vehicle = {
        imageUrl: "/bike.png",
        name: "Dhaka Metro LA 18-1608",
        owner: "Md. Delwar Hossain",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "
    }

    const documents = [
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQ4PApluyVGCFp7F05UMkE2-be8fnoxMAEA&s",
            type: "Tax Token",
            dateOfExpiry: "2026-12-31"
        },
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQ4PApluyVGCFp7F05UMkE2-be8fnoxMAEA&s",
            type: "Tax Token",
            dateOfExpiry: "2026-12-31"
        },
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQ4PApluyVGCFp7F05UMkE2-be8fnoxMAEA&s",
            type: "Tax Token",
            dateOfExpiry: "2026-12-31"
        }
    ];
    const DocumentCard = ({ document }) => (
        <div className="">
            {/* <img src={document.imageUrl} alt="" /> */}
        </div>
    );
    console.log(vehicle);

    return (
        <div className="container mx-auto px-4 lg:px-0 mt-20 font-frank">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <img src={vehicle.imageUrl} alt="Transport Image" className="md:w-1/2 rounded-lg"/>
                <div className="space-y-7">
                    <h3 className="text-3xl md:text-5xl font-semibold text-[#791B1B]">{vehicle.name}</h3>
                    <h2 className="flex gap-2 text-xl md:text-3xl">
                        <div className="font-semibold">Owner:</div>
                        <div>{vehicle.owner}</div>
                    </h2>
                    <h2 className="">
                        <div className="text-xl md:text-3xl font-semibold">Description:</div>
                        <div className="max-w-2xl text-justify text-lg md:text-xl mt-1">{vehicle.description}</div>
                    </h2>
                </div>
            </div>
            <div className="h-0.5 w-auto mt-8 bg-black">
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((document, index) => (
                    <DocumentCard key={index} document={document} />
                ))}
            </div>
        </div>
    );
};

export default TransportDetails;