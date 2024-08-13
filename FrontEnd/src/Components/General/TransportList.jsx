import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TransportCard from "../Common/TransportCard";
import "react-tabs/style/react-tabs.css";
import axios from "axios";


const TransportList = () => {
  const [vehicles, setVehicles] = useState([]);

const calculateRemainingDays = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
  return daysDiff > 0 ? daysDiff : 0; // If the date has passed, return 0
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
  axios.get("http://localhost:8000/api/v1/transport/").then((res) => {
    handleResponse(res.data.data);
  });
};

const handleTruck = () => {
  axios
    .get("http://localhost:8000/api/v1/transport?type=Truck")
    .then((res) => {
      handleResponse(res.data.data);
    });
};

const handlePickup = () => {
  axios
    .get("http://localhost:8000/api/v1/transport?type=Pickup")
    .then((res) => {
      handleResponse(res.data.data);
    });
};

const handleMotorcycle = () => {
  axios
    .get("http://localhost:8000/api/v1/transport?type=Motorcycle")
    .then((res) => {
      handleResponse(res.data.data);
    });
};

const handleSearch = (e) => {
  axios
    .get(`http://localhost:8000/api/v1/transport?searchTerm=${e.target.value}`)
    .then((res) => {
      handleResponse(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row py-10 justify-center gap-8 px-5">
      <div>
        <Tabs defaultFocus={true}>
          <div className="flex justify-between items-center">
            <div className="flex-1 flex justify-center navbar-center">
              <TabList className="flex justify-center gap-3 menu menu-horizontal">
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
              </TabList>
            </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default TransportList;
