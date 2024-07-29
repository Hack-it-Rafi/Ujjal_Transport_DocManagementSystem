import axios from "axios";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TransportCard from "../Common/TransportCard";

const TransportList = () => {
  const [vehicles, setVehicles] = useState([]);

  const handleAll = () => {
    axios
      .get(
        "http://localhost:8000/api/v1/transports/"
      )
      .then((res) => {
        console.log(res.data.data);
        setVehicles(res.data.data);
      });
  };
  const handleTruck = () => {
    axios
      .get(
        "https://my-market-place-server.vercel.app/categoryJobs?category=Digital%20Marketing"
      )
      .then((res) => {
        console.log(res.data);
        setVehicles(res.data);
      });
  };
  const handlePickup = () => {
    axios
      .get(
        "https://my-market-place-server.vercel.app/categoryJobs?category=Graphics%20Design"
      )
      .then((res) => {
        console.log(res.data);
        setVehicles(res.data);
      });
  };
  const handleMotorcycle = () => {
    axios
      .get(
        "https://my-market-place-server.vercel.app/categoryJobs?category=Graphics%20Design"
      )
      .then((res) => {
        console.log(res.data);
        setVehicles(res.data);
      });
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row my-10 justify-center gap-8 px-5">
      <div>
        <Tabs defaultFocus={true}>
          <div>
            <TabList className="flex justify-center gap-10">
              <Tab onFocus={handleAll}>
                <h1 className="">All</h1>
              </Tab>
              <Tab onFocus={handleTruck}>
                <h1 className="">Truck</h1>
              </Tab>
              <Tab onFocus={handlePickup}>
                <h1 className="">Pickup</h1>
              </Tab>
              <Tab onFocus={handleMotorcycle}>
                <h1 className="">Motorcycle</h1>
              </Tab>
            </TabList>
          </div>
          <div className="my-10"></div>
          <TabPanel>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vehicles.map((vehicle) => (
                <TransportCard key={vehicle._id} vehicle={vehicle}></TransportCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* {vehicles.map((job) => (
                <TransportCard key={job._id} job={job}></TransportCard>
              ))} */}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* {vehicles.map((job) => (
                <TransportCard key={job._id} job={job}></TransportCard>
              ))} */}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* {vehicles.map((job) => (
                <TransportCard key={job._id} job={job}></TransportCard>
              ))} */}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TransportList;
