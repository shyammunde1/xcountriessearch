import axios from "axios";
import { useEffect, useState } from "react";
import "./CountrySearch.css";

const CountrySearch = () => {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setCountries(response.data);
    } catch (error) {
      console.log("fetch the country data error:", error);
    }
  };
  //   console.log(countries);

  useEffect(() => {
    fetchData();
  }, []);

  const Tile = ({ flagUrl, name, altFlag }) => {
    return (
      <>
        <div className="countryCard">
          <img
            src={flagUrl}
            alt={altFlag}
            style={{ width: "100px", height: "100px" }}
          />
          <p>{name}</p>
        </div>
      </>
    );
  };

  const searchCountrieHandler = (e) => {
    //to do
    setSearchCountry(e.target.value);
  };

  const apiFilterCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search Countries"
        style={{ width: "400px" }}
        value={searchCountry}
        onChange={searchCountrieHandler}
      />
      <div className="container">
        {apiFilterCountry.map((country) => (
          <Tile
            key={country.flags.png}
            flagUrl={country.flags.png}
            name={country.name.common}
            altFlag={country.flags.alt}
          />
        ))}
      </div>
    </>
  );
};

export default CountrySearch;
