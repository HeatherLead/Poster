"use client";
import React, { useState, useEffect } from "react";
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from "country-state-city";
import axios from "axios";
import {
  Box,
  Button,
  CheckboxCards,
  Flex,
  RadioCards,
  Text,
} from "@radix-ui/themes";

import mastercard from "./assets/mastercard.svg";
import gpay from "./assets/gpay.png";
import upi from "./assets/upi.png";

interface Address {
  id: string;
  addressName: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNo: string;
}

const Checkout = () => {
  const [countryData, setCountryData] = useState<ICountry[]>(
    Country.getAllCountries()
  );
  const [stateData, setStateData] = useState<IState[]>([]);
  const [cityData, setCityData] = useState<ICity[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const [country, setCountry] = useState(countryData[100] || {});
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressName, setAddressName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [save, setsave] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get("/api/address");
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    if (country.isoCode) {
      setStateData(State.getStatesOfCountry(country.isoCode));
      setCityData([]);
      setState("");
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      setCityData(City.getCitiesOfState(country.isoCode, state));
    }
  }, [state]);

  useEffect(() => {
    if (selectedAddressId) {
      const selected = addresses.find((addr) => addr.id === selectedAddressId);
      if (selected) {
        setFirstName(selected.firstName);
        setLastName(selected.lastName);
        setAddressName(selected.addressName);
        setPhoneNo(selected.phoneNo);
        setEmail(selected.email);
        setZipCode(selected.zipCode);
        setCountry(
          countryData.find((c) => c.isoCode === selected.country) ||
            countryData[100]
        );
        setState(selected.state);
        setCity(selected.city);
      }
    } else {
      setFirstName("");
      setLastName("");
      setAddressName("");
      setPhoneNo("");
      setEmail("");
      setZipCode("");
      setCountry(countryData[100]);
      setState("");
      setCity("");
    }
  }, [selectedAddressId]);

  const handleRadioChange = (value: string) => {
    setSelectedAddressId(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      firstName,
      lastName,
      country: country.isoCode,
      state,
      city,
      addressName,
      phoneNo,
      email,
      zipCode,
    };

    try {
      const response = await axios.post("/api/address", formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-8 overflow-hidden">
      <div className="flex flex-wrap">
        <div className="w-full md:w-8/12 p-5">
          <div className="flex flex-col justify-end w-full mb-10">
            <Box>
              {addresses && (
                <RadioCards.Root
                  columns={{ initial: "1", sm: "3" }}
                  value={selectedAddressId}
                  onValueChange={handleRadioChange}
                >
                  <RadioCards.Item style={{ cursor: "pointer" }} value="">
                    <Flex direction="column" gapY={"1"} width="100%">
                      <Text size={"3"} weight="bold">
                        None
                      </Text>
                      <Text>clear all</Text>
                    </Flex>
                  </RadioCards.Item>
                  {addresses.map((address, index) => (
                    <RadioCards.Item
                      key={index}
                      value={address.id}
                      style={{ cursor: "pointer" }}
                    >
                      <Flex direction="column" gapY={"1"} width="100%">
                        <Text size={"3"} weight="bold">
                          {address.addressName}
                        </Text>
                        <Text>{address.city}</Text>
                      </Flex>
                    </RadioCards.Item>
                  ))}
                </RadioCards.Root>
              )}
            </Box>
          </div>
          <h1 className="mb-5 text-xl font-bold">Billing details</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex flex-col w-full mt-4">
                <label
                  className="w-full font-medium text-zinc-600"
                  htmlFor="firstName"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="firstName"
                  type="text"
                  className="focus:outline-none px-2 py-3 border mt-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full mt-4">
                <label
                  className="w-full font-medium text-zinc-600"
                  htmlFor="lastName"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="lastName"
                  type="text"
                  className="focus:outline-none px-2 py-3 border mt-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full mt-4">
              <label
                className="w-full font-medium text-zinc-600 mt-5"
                htmlFor="country"
              >
                Country <span className="text-red-500">*</span>
              </label>
              <select
                className="focus:outline-none px-2 py-3 border mt-1"
                name="country"
                id="country"
                value={country.isoCode}
                onChange={(e) => {
                  const selectedCountry = countryData.find(
                    (item) => item.isoCode === e.target.value
                  );
                  if (selectedCountry) {
                    setCountry(selectedCountry);
                  }
                }}
                required
              >
                {countryData.map((item, index) => (
                  <option key={index} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label
                className="w-full font-medium text-zinc-600 mt-5"
                htmlFor="state"
              >
                State <span className="text-red-500">*</span>
              </label>
              <select
                className="focus:outline-none px-2 py-3 border mt-1"
                name="state"
                id="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                required
              >
                <option value="">Select State</option>
                {stateData.map((item, index) => (
                  <option key={index} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label
                className="w-full font-medium text-zinc-600 mt-5"
                htmlFor="city"
              >
                City <span className="text-red-500">*</span>
              </label>
              <select
                className="focus:outline-none px-2 py-3 border mt-1"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select City</option>
                {cityData.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label
                className="w-full font-medium text-zinc-600 mt-5"
                htmlFor="addressName"
              >
                Address Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="addressName"
                type="text"
                className="focus:outline-none px-2 py-3 border mt-1"
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
              />
              <label
                className="w-full font-medium text-zinc-600 mt-5"
                htmlFor="phoneNo"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="phoneNo"
                type="tel"
                className="focus:outline-none px-2 py-3 border mt-1"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <label
                className="w-full font-medium text-zinc-600 mt-5"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="email"
                type="email"
                className="focus:outline-none px-2 py-3 border mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                className="w-full font-medium text-zinc-600 mt-5"
                htmlFor="zipCode"
              >
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="zipCode"
                type="text"
                className="focus:outline-none px-2 py-3 border mt-1"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 mt-6 ">
              <input
                type="checkbox"
                checked={save}
                onChange={() => setsave(!save)}
                className=" cursor-pointer size-4"
                name="saveAddress"
              />
              <label
                htmlFor="saveAddress"
                className="font-medium text-zinc-600"
              >
                Save this information for next time
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 mt-4 font-medium text-white bg-[#74a84a] hover:bg-[#2c541d]"
            >
              {isSubmitting ? "Saving..." : "Save Address"}
            </button>
          </form>
        </div>
        <div className="w-full md:w-4/12 p-5 mt-40">
          <div className=" border p-5 rounded">
            <h1 className=" font-bold text-lg mb-5">Payment Method </h1>
            <Box>
              <RadioCards.Root defaultValue="1" columns={{ initial: "1" }}>
                <RadioCards.Item style={{ cursor: "pointer" }} value="1">
                  <Flex gapX={"9"} align={"center"} width="100%">
                    <img src={mastercard.src} className=" h-16 mr-8" alt="" />
                    <Text>Pay with Mastercard</Text>
                  </Flex>
                </RadioCards.Item>
                <RadioCards.Item style={{ cursor: "pointer" }} value="2">
                  <Flex gapX={"5"} align={"center"} width="100%">
                    <img src={gpay.src} className=" h-16" alt="" />
                    <Text>Pay with Google Pay</Text>
                  </Flex>
                </RadioCards.Item>
                <RadioCards.Item style={{ cursor: "pointer" }} value="3">
                  <Flex gapX={"7"} align={"center"} width="100%">
                    <img src={upi.src} className=" h-16" alt="" />
                    <Text>Pay with UPI</Text>
                  </Flex>
                </RadioCards.Item>
              </RadioCards.Root>
            </Box>

            <button
              className=" text-center w-full py-3 mt-5 bg-[#74a84a] hover:bg-[#2c541d] text-white"
              type="submit"
              disabled={isSubmitting}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
