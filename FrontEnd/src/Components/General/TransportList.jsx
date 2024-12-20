import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TransportCard from "../Common/TransportCard";
import "react-tabs/style/react-tabs.css";

import DocumentCard from "../Common/DocumentCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const TransportList = () => {
  const axiosSecure = useAxiosSecure();
  const [vehicles, setVehicles] = useState([]);
  const [documents, setDocuments] = useState([]);

  const calculateRemainingDays = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    return daysDiff; // If the date has passed, return 0
  };

  const calculateTotalRemainingDays = (vehicle) => {
    const { fitnessDoc, registrationDoc, routePermitDoc, taxDoc } = vehicle;

    return (
      calculateRemainingDays(fitnessDoc?.dateOfExpiry) +
      calculateRemainingDays(registrationDoc?.dateOfExpiry) +
      calculateRemainingDays(routePermitDoc?.dateOfExpiry) +
      calculateRemainingDays(taxDoc?.dateOfExpiry)
    );
  };

  const handleResponse = (data) => {
    const sortedData = data.sort(
      (a, b) => calculateTotalRemainingDays(a) - calculateTotalRemainingDays(b)
    );
    setVehicles(sortedData);
  };

  const handleAll = () => {
    axiosSecure
      .get("https://api.ujjalflourmills.com/api/v1/transport/")
      .then((res) => {
        handleResponse(res.data.data);
      });
  };

  const handleTruck = () => {
    axiosSecure
      .get("https://api.ujjalflourmills.com/api/v1/transport?type=Truck")
      .then((res) => {
        handleResponse(res.data.data);
      });
  };

  const handlePickup = () => {
    axiosSecure
      .get("https://api.ujjalflourmills.com/api/v1/transport?type=Pickup")
      .then((res) => {
        handleResponse(res.data.data);
      });
  };

  const handleMotorcycle = () => {
    axiosSecure
      .get("https://api.ujjalflourmills.com/api/v1/transport?type=Motorcycle")
      .then((res) => {
        handleResponse(res.data.data);
      });
  };
  const handleOtherDocument = () => {
    axiosSecure
      .get("https://api.ujjalflourmills.com/api/v1/document?type=Other", {
        withCredentials: true,
      })
      .then((res) => {
        setDocuments(res.data.data);
      });
  };

  const handleSearch = (e) => {
    axiosSecure
      .get(
        `https://api.ujjalflourmills.com/api/v1/transport?searchTerm=${e.target.value}`
      )
      .then((res) => {
        handleResponse(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col py-10 justify-center gap-8 px-5">
      <div>
        <Tabs defaultFocus={true}>
          <div className="flex flex-col-reverse md:flex-row md:space-x-2 md:items-center justify-between items-end gap-2 text-xs md:text-base">
            <TabList className="grid grid-cols-3 md:grid-cols-5 justify-between gap-x-4">
              <Tab onFocus={handleAll}>
                <h1>All</h1>
              </Tab>
              <Tab onFocus={handleTruck}>
                <h1>Truck</h1>
              </Tab>
              <Tab onFocus={handlePickup}>
                <h1>Pickup</h1>
              </Tab>
              <Tab onFocus={handleMotorcycle}>
                <h1>Motorcycle</h1>
              </Tab>
              <Tab onFocus={handleOtherDocument}>
                <h1>Other Documents</h1>
              </Tab>
            </TabList>
            <div className="">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
          </div>
          <div className="my-10"></div>
          <TabPanel>
            <div className="flex flex-col gap-10">
              {vehicles.map((vehicle) => (
                <TransportCard
                  key={vehicle._id}
                  vehicle={vehicle}
                ></TransportCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-10">
              {vehicles.map((vehicle) => (
                <TransportCard
                  key={vehicle._id}
                  vehicle={vehicle}
                ></TransportCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-10">
              {vehicles.map((vehicle) => (
                <TransportCard
                  key={vehicle._id}
                  vehicle={vehicle}
                ></TransportCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-10">
              {vehicles.map((vehicle) => (
                <TransportCard
                  key={vehicle._id}
                  vehicle={vehicle}
                ></TransportCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 justify-center items-center sm:grid-cols-2 gap-x-12 gap-y-8 ">
              {documents.map((document) => (
                <DocumentCard
                  key={document._id}
                  document={document}
                ></DocumentCard>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TransportList;
