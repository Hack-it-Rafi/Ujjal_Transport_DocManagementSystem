import axios from "axios";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TransportCard from "../Common/TransportCard";
import "react-tabs/style/react-tabs.css";

const TransportList = () => {
  const [vehicles, setVehicles] = useState([]);

  const handleAll = () => {
    axios.get("http://localhost:8000/api/v1/transports/").then((res) => {
      // console.log(res.data.data);
      setVehicles(res.data.data);
    });
  };
  const handleTruck = () => {
    axios
      .get("http://localhost:8000/api/v1/transports?type=Truck")
      .then((res) => {
        // console.log(res.data.data);
        setVehicles(res.data.data);
      });
  };
  const handlePickup = () => {
    axios
      .get("http://localhost:8000/api/v1/transports?type=Pickup")
      .then((res) => {
        // console.log(res.data.data);
        setVehicles(res.data.data);
      });
  };
  const handleMotorcycle = () => {
    axios
      .get("http://localhost:8000/api/v1/transports?type=Motorcycle")
      .then((res) => {
        // console.log(res.data.data);
        setVehicles(res.data.data);
      });
  };
  const handleSearch = (e) => {
    console.log(e.target.value);
    axios
      .get(`http://localhost:8000/api/v1/transports?searchTerm=${e.target.value}`)
      .then((res) => {
        // console.log(res.data.data);
        setVehicles(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row my-10 justify-center gap-8 px-5">
      <div>
        <Tabs defaultFocus={true}>
          <div className="flex justify-between items-center">
            <div className="flex-1 flex justify-center">
              <TabList className="flex justify-center gap-10">
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "border-b-4 p-2 cursor-pointer"
                      : "cursor-pointer"
                  }
                  onFocus={handleAll}
                >
                  <h1>All</h1>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "border-b-4 p-2 cursor-pointer"
                      : "cursor-pointer"
                  }
                  onFocus={handleTruck}
                >
                  <h1>Truck</h1>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "border-b-4 p-2 cursor-pointer"
                      : "cursor-pointer"
                  }
                  onFocus={handlePickup}
                >
                  <h1>Pickup</h1>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "border-b-4 p-2 cursor-pointer"
                      : "cursor-pointer"
                  }
                  onFocus={handleMotorcycle}
                >
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
