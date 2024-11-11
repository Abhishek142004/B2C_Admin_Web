import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import delivery from "../assets/Images/delivery.png";
import partner from "../assets/Images/Partners.png";
import clock from "../assets/Images/Clock.png";
import plus from "../assets/Images/Plus.png";
import deleteb from "../assets/Images/Delete.png";
import deliveryb from "../assets/Images/Delivery- banner.png";
import Leftsidebar from "./Leftsidebar";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import Add_Partner_form from "./Add_Partner_form";
import store from "../redux/store";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchDriverDetails } from "../redux/actions/fetch_detail_action";

// Setting up the custom marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DeliveryInsights = () => {
  const [outlets, setOutlets] = useState([]);

  // Function to fetch outlet data
  async function fetchOutletData() {
    try {
      const response = await fetch(
        "https://b2c-backend-1.onrender.com/api/v1/admin/allOutlet"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch outlet data");
      }

      const data = await response.json();

      // Map the data to match the required structure
      const formattedOutlets = data.outlets.map((outlet) => ({
        id: outlet.id,
        name: outlet.name + (outlet.area ? ` - ${outlet.area}` : ""),
        position: [parseFloat(outlet.lat), parseFloat(outlet.long || 0)], // Default long to 0 if undefined
        description: `Located in ${
          outlet.area || "an unspecified area"
        }. Contact: ${outlet.contact}`,
      }));

      setOutlets(formattedOutlets);
    } catch (error) {
      console.error("Error fetching outlet data:", error);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchOutletData();
  }, []);

  const [showAddPartnerForm, setShowAddPartnerForm] = useState(false);

  const handleAddPartnerClick = () => {
    setShowAddPartnerForm(true);
  };

  const handleCloseForm = () => {
    setShowAddPartnerForm(false);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://b2c-backend-1.onrender.com/api/v1/deliveryPartner/profile/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete partner profile");
      }
      alert("Partner profile deleted successfully");

      // Refresh the page after successful deletion
      window.location.reload();
    } catch (err) {
      // Handle error if delete request fails
      alert("Error deleting partner profile: " + err.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `https://b2c-backend-1.onrender.com/api/v1/admin/approveDelivery/${id}`,
        {
          method: "PATCH", // Assuming it's a POST request; adjust if it's different
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve the partner.");
      }

      // Handle response or notify success
      alert("Partner approved successfully.");

      // Refresh the page or update the list state
      window.location.reload();
    } catch (error) {
      console.error("Error approving partner:", error);
    }
  };

  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const dispatch = useDispatch();
  const {
    data: deliver,
    loading,
    error,
  } = useSelector((state) => state.driverDetailReducer);
  // console.log(deliver);

  useEffect(() => {
    dispatch(fetchDriverDetails());
  }, [dispatch]);

  // Filter partners based on selected region
  const filteredPartners =
    deliver?.drivers.filter((partner) =>
      selectedRegion === "All" ? true : partner.region === selectedRegion
    ) || [];

  // Handle partner selection
  const handlePartnerClick = async (partner) => {
    try {
      // Make the API call to fetch full partner details
      const response = await fetch(
        `https://b2c-backend-1.onrender.com/api/v1/deliveryPartner/profile/${partner.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch partner details");
      }

      const data = await response.json();
      setSelectedPartner(data); // Update state with full partner details
    } catch (err) {
      console(err.message); // Handle error if API call fails
    }
  };

  return (
    <div className="flex min-h-screen min-w-screen  lg:pl-3  round">
      {/* <div>
        <Leftsidebar />
      </div> */}
      <div className=" w-full ">
        <div className="flex flex-col p-4 space-y-6 ">
          {/* Delivery Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700 flex items-center ml-[10px]">
              Delivery
            </h1>
          </div>

          {/* Overview Section */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 md:px-6 ">
            <div className="bg-white shadow-lg h-36 rounded-lg flex justify-between items-center transition-transform duration-300 hover:shadow-lg hover:translate-y-[-5px] ">
              <div className="bg-white shadow-md p-3 lg:p-6 rounded-lg flex justify-between items-center w-full h-full">
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-700">
                    Total Deliveries
                  </h2>
                  <p className="text-xl lg:text-3xl font-bold text-gray-900 mt-2">
                    {deliver?.totalDeliveries || 0}
                  </p>
                </div>
                <img src={delivery} className="w-9 h-9 lg:w-12 lg:h-12" />
              </div>
            </div>

            <div className="bg-white shadow-lg h-36 rounded-lg flex justify-between items-center transition-transform duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="bg-white shadow-md p-3 lg:p-6 rounded-lg flex justify-between  items-center w-full h-full">
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-700">
                    Delivery Partners
                  </h2>
                  <p className="text-xl lg:text-3xl font-bold text-gray-900 mt-2">
                    {deliver?.totalDrivers}
                  </p>
                </div>
                <img src={partner} className="w-9 h-9 lg:w-12 lg:h-12" />
              </div>
            </div>

            <div className="bg-white shadow-lg h-36 rounded-lg flex justify-between items-center transition-transform duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="bg-white shadow-md p-3 lg:p-6 rounded-lg  flex justify-between  items-center w-full h-full">
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-700">
                    Average Delivery Time
                  </h2>
                  <p className="text-xl lg:text-3xl font-bold text-gray-900 mt-2">
                    {"N/A"}
                  </p>
                </div>
                <img src={clock} className="w-9 h-9 lg:w-12 lg:h-12" />
              </div>
            </div>
          </div>

          {/* Delivery Partners Table */}
          <div className="flex flex-col md:flex-row  justify-center items-center min-w-screen md:px-6 items-center">
            {/* Table Section */}
            <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-4 mb-4 md:mb-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-col   space-y-4  items-center ">
                  <div className="flex space-x-2 md:space-x-4">
                    <h2 className="text-base md:text-lg font-semibold text-gray-700">
                      Delivery Partners
                    </h2>
                    <button onClick={handleAddPartnerClick}>
                      <img
                        src={plus}
                        className="h-5 w-5 mr-32 md:h-6 md:w-6 hover:scale-110 cursor-pointer"
                      />
                    </button>
                  </div>
                  {/* Region Dropdown */}
                  <div className="flex items-center ">
                    {/* <div className="md:mr-64">
                      <label
                        className="text-gray-700 mr-1 md:mr-2 text-sm md:text-base"
                        htmlFor="region-select"
                      >
                        Select Region:
                      </label>
                      <select
                        id="region-select"
                        className="border rounded p-1 md:p-2 text-xs md:text-sm"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <option value="All">All</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Jammu">Jammu</option>
                      </select>
                    </div> */}
                    <div className="flex items-center ">
                      <div className="flex items-center mx-2 ml-8 ">
                        <FaCheckCircle
                          className="text-green-500 mx-2"
                          size={18}
                        />
                        Approved
                      </div>
                      <div className="flex items-center mx-2 ">
                        <FaClock className="text-orange-500 mx-2" size={18} />
                        Pending Appproval
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-h-52 overflow-y-auto custom-scrollbar">
                {/* Set max height for scroll */}
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <table className="w-full text-xs md:text-sm text-gray-600">
                    <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
                      {/* Keep header fixed */}
                      <tr className="text-left">
                        <th className="px-2 md:px-4 py-1 md:py-2">Id</th>
                        <th className="px-2 md:px-4 py-1 md:py-2">Name</th>
                        <th className="px-2 md:px-4 py-1 md:py-2">Region</th>
                        <th className="px-2 md:px-4 py-1 md:py-2">Rating</th>
                        <th className="px-2 md:px-4 py-1 md:py-2">
                          Deliveries
                        </th>
                        <th className="px-2 md:px-4 py-1 md:py-2">Approved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPartners.map((partner, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 border-b cursor-pointer "
                          onClick={() => handlePartnerClick(partner)}
                        >
                          <td className="px-2 md:px-4 py-1 md:py-2">
                            {partner.id}
                          </td>
                          <td className="px-2 md:px-4 py-1 md:py-2">
                            {partner.name}
                          </td>
                          <td className="px-2 py-1 md:px-4 md:py-2">
                            {partner.region}
                          </td>
                          <td className="px-2 py-1 md:px-4 md:py-2">
                            {partner.ratings}
                          </td>
                          <td className="px-2 py-1 md:px-4 md:py-2">
                            {partner.totalDeliveries}
                          </td>
                          <td className="px-2 py-1 md:px-4 md:py-2">
                            {partner.approved ? (
                              <FaCheckCircle
                                className="text-green-500 ml-2"
                                size={18}
                              />
                            ) : (
                              <FaClock
                                className="text-orange-500 ml-2"
                                size={18}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-3 z-0 ml-3 ">
              <h2 className="text-base md:text-lg font-semibold text-gray-700 mb-2">
                Location Map
              </h2>
              <div className="h-48 md:h-[270px]">
                <MapContainer
                  center={[12.9141, 77.6411]} // Centered around HSR Layout
                  zoom={12}
                  scrollWheelZoom={true}
                  style={{ height: "100%", width: "100%", zIndex: 1 }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {outlets.map((outlet) => (
                    <Marker key={outlet.id} position={outlet.position}>
                      <Popup>
                        <strong>{outlet.name}</strong>
                        <br />
                        {outlet.description}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Modal Section */}
            <Provider store={store}>
              {showAddPartnerForm && (
                <Add_Partner_form closeForm={handleCloseForm} />
              )}
            </Provider>
          </div>

          {/* Delivery Partner Overview */}
          {selectedPartner && (
            <div className="flex-row md:flex md:space-x-4 justify-center items-center md:px-6 ">
              <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  bg-white shadow-xl rounded-lg text-gray-900 py-2">
                <div class="rounded-t-lg h-32 overflow-hidden">
                  <img
                    class="object-cover object-top w-full"
                    src={deliveryb}
                    alt="Banner"
                  />
                </div>
                <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                  <img
                    class="object-cover object-center h-32"
                    src={selectedPartner.img}
                    alt="Woman looking front"
                  />
                </div>
                <div class="text-center mt-2">
                  <h2 class="font-semibold">
                    {selectedPartner.generalDetails.firstName}
                  </h2>
                  <p class="text-gray-500">
                    {selectedPartner.generalDetails.city}
                  </p>
                </div>
                <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
                  <li class="flex items-center justify-around">
                    <svg
                      class="w-4 fill-current text-blue-900 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <div>Rating: {selectedPartner.ratings}</div>
                  </li>
                  <li class="flex  items-center justify-around">
                    <svg
                      class="w-4 fill-current text-blue-900 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                    </svg>
                    <div>Deliveries: {selectedPartner.totalDeliveries}</div>
                  </li>
                </ul>
                <ul class="px-4 mt-2 space-y-1 text-gray-700 ">
                  <li className="flex space-x-4">
                    <li>Adhaar: {selectedPartner.docDetails.aadharNo}</li>
                    <li>Pan: {selectedPartner.docDetails.panNo}</li>
                  </li>

                  <li>Driving License: {selectedPartner.docDetails.DLNo}</li>
                  <li>
                    Vehice Registeration No:{" "}
                    {selectedPartner.docDetails.vehicleRegistrationNo}
                  </li>
                </ul>
                <div className="mt-4 mb-6 flex space-x-4 items-center justify-center">
                  {selectedPartner.approved ? (
                    <span className="w-1/2 block  rounded-full bg-green-600  font-semibold text-white px-6 py-2">
                      Already Approved
                    </span>
                  ) : (
                    <button
                      className="w-1/2 block  rounded-full bg-blue-800 hover:shadow-lg font-semibold text-white px-6 py-2"
                      onClick={() => handleApprove(selectedPartner.id)}
                    >
                      Approve
                    </button>
                  )}
                  <div>
                    <img
                      src={deleteb}
                      alt="delete driver"
                      className="h-8 w-8 hover:scale-110 cursor-pointer"
                      onClick={() => handleDelete(selectedPartner.id)}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery List */}
              <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-6 md:mt-0 mt-3">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Deliveries
                </h2>
                <div className="max-h-[320px] overflow-y-scroll custom-scrollbar">
                  {/* Set max height for scroll */}
                  <table className="w-full text-left text-xs md:text-sm text-gray-600">
                    <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
                      {/* Keep header fixed */}
                      <tr>
                        <th className="px-2 md:px-4 py-1 md:py-2">Order Id</th>
                        <th className="px-2 md:px-4 py-1 md:py-2">Details</th>
                        <th className="px-2 md:px-4 py-1 md:py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPartner.totalOrders?.orders &&
                      selectedPartner.totalOrders.orders.length > 0 ? (
                        selectedPartner.totalOrders.orders.map(
                          (delivery, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 border-b"
                            >
                              <td className="px-2 md:px-4 py-1 md:py-2">
                                {delivery.id}
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td
                            className="px-2 md:px-4 py-1 md:py-2 text-center"
                            colSpan="100%"
                          >
                            No Orders Delivered Yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInsights;
