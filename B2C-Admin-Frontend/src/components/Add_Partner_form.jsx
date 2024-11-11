import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitDriverForm } from "../redux/actions/driverAction"; // Import action
import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";

// Page 1: Personal Information
const PersonalInformation = ({ formData, setFormData, nextPage }) => {
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File uploaded:", file);
      setFormData({ ...formData, img: file });
      setPhotoUploaded(true);
    }
  };

  const updateLanguages = (languageKnown) => {
    setFormData((prev) => {
      const currentLanguages = prev.languageKnown.split(",").filter(Boolean); // Split current string into an array
      if (currentLanguages.includes(languageKnown)) {
        // Remove language if it exists
        return {
          ...prev,
          languageKnown: currentLanguages
            .filter((lang) => lang !== languageKnown)
            .join(","),
        };
      } else {
        // Add language if it doesn't exist
        return {
          ...prev,
          languageKnown: [...currentLanguages, languageKnown].join(","),
        };
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Driver Registration Form</h2>
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Father's Name"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.fathersName}
            onChange={(e) =>
              setFormData({ ...formData, fathersName: e.target.value })
            }
          />
          <input
            type="date"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
          <input
            type="text"
            placeholder="Primary Mobile Number"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Secondary Mobile Number"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.secondaryNumber}
            onChange={(e) =>
              setFormData({ ...formData, secondaryNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Blood Group"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.bloodGroup}
            onChange={(e) =>
              setFormData({ ...formData, bloodGroup: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <input
          type="text"
          placeholder="Complete Address"
          className="border border-gray-300 rounded w-full p-1 md:p-2"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <label className="block">Languages You Know:</label>
        <div className="space-x-2">
          <label>
            <input
              type="checkbox"
              checked={formData.languageKnown.split(",").includes("English")}
              onChange={() => updateLanguages("English")}
            />
            English
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.languageKnown.split(",").includes("Hindi")}
              onChange={() => updateLanguages("Hindi")}
            />
            Hindi
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.languageKnown.split(",").includes("Kannada")}
              onChange={() => updateLanguages("Kannada")}
            />
            Kannada
          </label>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="mr-2">
            {photoUploaded ? (
              <FaCheckCircle className="text-green-500 h-6 w-6" />
            ) : (
              <FaQuestionCircle className="text-red-500 h-6 w-6" />
            )}
          </div>
          <label
            htmlFor="photo-upload"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
          >
            Upload Photo
          </label>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </div>

        <button
          type="button"
          className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600"
          onClick={() => {
            if (photoUploaded) {
              nextPage();
            } else {
              alert("Photo field must not be empty");
            }
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

// Page 2: Personal Documents
const PersonalDocuments = ({ formData, setFormData, nextPage, prevPage }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Personal Documents</h3>
      <div className="space-y-4">
        <div>
          <label>Aadhaar Number:</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.aadharNo}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only digits and restrict length to 12
              if (/^\d{0,12}$/.test(value)) {
                setFormData({ ...formData, aadharNo: value });
              }
            }}
            maxLength="12"
          />
        </div>

        <div>
          <label>PAN Number:</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.panNo}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              // Allow only alphanumeric characters and limit to 10 characters
              if (/^[A-Z0-9]{0,10}$/.test(value)) {
                setFormData({ ...formData, panNo: value });
              }
            }}
            maxLength="10"
          />
        </div>

        <div>
          <label>Vehicle Registration Number:</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.vehicleRegistrationNo}
            onChange={(e) =>
              setFormData({
                ...formData,
                vehicleRegistrationNo: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Driving License Number:</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.DLNo}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              // Allow only uppercase alphanumeric characters and limit to 16 characters
              if (/^[A-Z0-9]{0,16}$/.test(value)) {
                setFormData({ ...formData, DLNo: value });
              }
            }}
            maxLength="16"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={prevPage}
          >
            Back
          </button>
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Page 4: Bank Account Details
const BankDetails = ({ formData, setFormData, submitForm, prevPage }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Bank Account Details</h3>
      <div>
        <label>Acc Holder Name:</label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-1 md:p-2"
          value={formData.accHolderName}
          onChange={(e) =>
            setFormData({ ...formData, accHolderName: e.target.value })
          }
        />
      </div>
      <div>
        <label>Bank Name:</label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full p-1 md:p-2"
          value={formData.bankName}
          onChange={(e) =>
            setFormData({ ...formData, bankName: e.target.value })
          }
        />
      </div>
      <div className="space-y-4">
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.accNo}
            onChange={(e) =>
              setFormData({ ...formData, accNo: e.target.value })
            }
          />
        </div>
        <div>
          <label>Branch Name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.branchName}
            onChange={(e) =>
              setFormData({ ...formData, branchName: e.target.value })
            }
          />
        </div>
        <div>
          <label>IFSC Code:</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-1 md:p-2"
            value={formData.ifscCode}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              // Allow only uppercase alphanumeric characters and limit to 11 characters
              if (/^[A-Z0-9]{0,11}$/.test(value)) {
                setFormData({ ...formData, ifscCode: value });
              }
            }}
            maxLength="11"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={prevPage}
          >
            Back
          </button>
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={submitForm}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessMessage = () => {
  const { loading, success, error } = useSelector((state) => state.driverForm); // Access Redux state
  return (
    <div className="text-center">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Delivery Partner Added succesfully</p>
      )}
    </div>
  );
};

// Main Form Component
const DriverRegistrationForm = ({ closeForm }) => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fathersName: "",
    dob: "",
    phone: "",
    secondaryNumber: "",
    bloodGroup: "",
    city: "",
    address: "",
    languageKnown: "",
    img: null,
    aadharNo: "",
    panNo: "",
    vehicleRegistrationNo: "",
    DLNo: "",
    accHolderName: "",
    bankName: "",
    accNo: "",
    branchName: "",
    ifscCode: "",
  });

  const dispatch = useDispatch();

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => prevPage - 1);

  const submitForm = () => {
    console.log(formData);
    dispatch(submitDriverForm(formData)); // Dispatch Redux action
    nextPage(); // Move to success page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-xs md:max-w-md relative">
        {page === 1 && (
          <PersonalInformation
            formData={formData}
            setFormData={setFormData}
            nextPage={nextPage}
          />
        )}
        {page === 2 && (
          <PersonalDocuments
            formData={formData}
            setFormData={setFormData}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
        {page === 3 && (
          <BankDetails
            formData={formData}
            setFormData={setFormData}
            submitForm={submitForm}
            prevPage={prevPage}
          />
        )}
        {page === 4 && <SuccessMessage />}
        <button
          className="mt-4 text-red-500 hover:underline"
          onClick={closeForm}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DriverRegistrationForm;
