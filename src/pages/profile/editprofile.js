import React, { useState, useEffect } from "react";
import Sweet_Modal from "../../components/Common/react_modal";
import { SetModelId } from "../../redux/actions/modalAction";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { api } from "../../services/api";
const LocationForm = () => {
  const state = useSelector((state) => state.authData);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [picture, setPicture] = useState([]);
  var modal_id = useSelector((state) => state.model.id);
  var [common_data, setcommon_data] = useState({
    address: state.user.address,
    first: state.user.first_name,
    last: state.user.last_name,
    email: state.user.email,
    phone_no: state.user.phone_no,
    birthday: state.user.birthday,
    gender: state.user.gender,
    date_joined: state.user.date_joined,
    id: state.user.id,
    pin_code: state.user.pin_code,
    state: state.user.state,
    country: state.user.country,
    city: state.user.city,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(config.apiEndpoint + "/api/locations/");
      const data = await response.json();
      setCountries(data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await fetch(
        config.apiEndpoint + `/api/locations/states/?country=${country}`
      );
      const data = await response.json();
      setStates(data.states);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await fetch(
        config.apiEndpoint + `/api/locations/cities/?state=${state}`
      );
      const data = await response.json();
      setCities(data.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (selectedOption) => {
    const countryId = selectedOption.value;
    setSelectedCountry(countryId);
    fetchStates(countryId);

    setcommon_data((prevState) => ({
      ...prevState,
      country: selectedOption.label, // Assuming the country label is used for the value
    }));
  };

  const handleStateChange = (selectedOption) => {
    const stateId = selectedOption.value;
    setSelectedState(stateId);
    fetchCities(stateId);

    setcommon_data((prevState) => ({
      ...prevState,
      state: selectedOption.label, // Assuming the state label is used for the value
    }));
  };

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPicture(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleCityChange = (selectedOption) => {
    const cityId = selectedOption.value;
    setSelectedCity(cityId);

    setcommon_data((prevState) => ({
      ...prevState,
      city: selectedOption.label, // Assuming the city label is used for the value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (common_data.phone_no.length < 10) {
      alert("Phone No. should be 10 digits");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(common_data.email)) {
      alert("Please enter a valid email address");
      return;
    }

    console.log(picture);
    api({
      api: "/api/userview/",
      method: "post",
      body: { common: common_data, post: 1, image: picture },
    })
      .then((data) => {
        // Handle the response from the server
        console.log("Form submitted successfully:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
    // Send the form data to the server
  };

  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.name,
    label: state.name,
  }));

  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  return (
    <div>
      <input
        type="button"
        className="profile-edit-btn"
        name="btnAddMore"
        value="edit Profile"
        onClick={() => dispatch(SetModelId("111"))}
      />
      {modal_id === "111" && (
        <Sweet_Modal show={true} title="edit Profile">
          <div className="container">
            <div className="row">
              <label className="control-label col-md-2 font-weight-bold">
                First Name:
              </label>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={common_data.first}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      first: e.target.value,
                    });
                  }}
                  className="form-control"
                  required
                />
              </div>
              <label className="control-label col-md-2 font-weight-bold">
                Last Name:
              </label>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={common_data.last}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      last: e.target.value,
                    });
                  }}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                Image:
              </label>
              <div className="col-md-8">
                <input
                  type="file"
                  className="form-control"
                  accept=".jpg, .jpeg, .png"
                  onChange={onChangePicture}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                Email ID:
              </label>
              <div className="col-md-8">
                <input
                  type="email"
                  placeholder="Email ID"
                  value={common_data.email}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      email: e.target.value,
                    });
                  }}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                Phone No:
              </label>
              <div className="col-md-8">
                <input
                  type="number"
                  placeholder="Phone No."
                  value={common_data.phone_no}
                  onChange={(e) => {
                    const phoneNumber = e.target.value.slice(0, 10); // Restrict to maximum 10 digits
                    setcommon_data({
                      ...common_data,
                      phone_no: phoneNumber,
                    });
                  }}
                  maxLength={10} // Set maximum length to 10
                  minLength={10} // Set minimum length to 10
                  pattern="\d{10}"
                  className="form-control"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                Date of Birthday:
              </label>
              <div className="col-md-8">
                <input
                  type="date"
                  placeholder="Date of Birthday"
                  value={common_data.birthday}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      birthday: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                Address:
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  placeholder="Address"
                  value={common_data.address}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      address: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                Country:
              </label>
              <div className="col-md-8">
                <Select
                  placeholder="Select Country"
                  options={countryOptions}
                  value={countries.find(
                    (country) => country.value === selectedCountry
                  )}
                  onChange={handleCountryChange}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                State:
              </label>
              <div className="col-md-6">
                <Select
                  options={stateOptions}
                  value={states.find((state) => state.value === selectedState)}
                  onChange={handleStateChange}
                  placeholder="Select State"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                City:
              </label>
              <div className="col-md-6">
                <Select
                  options={cityOptions}
                  value={cities.find((city) => city.value === selectedCity)}
                  onChange={handleCityChange}
                  placeholder="Select City"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <label className="control-label col-md-3 font-weight-bold">
                Pin Code:
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Pin Code"
                  value={common_data.pin_code}
                  onChange={(e) => {
                    setcommon_data({
                      ...common_data,
                      pin_code: e.target.value,
                    });
                  }}
                  className="form-control"
                />
              </div>
            </div>
            <br />
            <center>
              <button
                className="btn btn-primary btn-sm m-1"
                onClick={handleSubmit}
                type="submit">
                Submit
              </button>
            </center>
          </div>
        </Sweet_Modal>
      )}
    </div>
  );
};

export default LocationForm;
