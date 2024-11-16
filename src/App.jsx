import { useEffect, useState } from 'react';
import Countries from './components/Countries';
import './App.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [originalCountries, setOriginalCountries] = useState([]);
  const [isCheckedPopulation, setIsCheckedPopulation] = useState(false);
  const [isCheckedArea, setIsCheckedArea] = useState(false);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [continent, setContinent] = useState('All');
  const [subregion, setSubregion] = useState('Choose region');
  
  const isLoading = fetchStatus === 'loading';
  const isError = fetchStatus === 'error';

  useEffect(() => {
    async function fetchData() {
      try {
        setFetchStatus('loading');
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
        setCountries(data);
        setOriginalCountries(data);
        setFetchStatus('idle');
        console.log(countries);
      } catch(e){
        setFetchStatus('error');
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  function handleAlphaChange(e){
    console.log(e.target.checked);

    if(e.target.checked){
      setCountries([...countries].sort((a, b) => a.name.common.localeCompare(b.name.common)));
    } else {
      setCountries(originalCountries);
    }
  }

  function handlePopulationChange(e){
    console.log(e.target.checked);

    setIsCheckedPopulation(!isCheckedPopulation);
    if (isCheckedArea) {
      setIsCheckedArea(!isCheckedArea);
    }

    if(e.target.checked){
      setCountries([...originalCountries].sort((a, b) => b.population - a.population).slice(0,10));
    } else {
      setCountries(originalCountries);
    }
  }

  function handleAreaChange(e){
    console.log(e.target.checked);

    setIsCheckedArea(!isCheckedArea);
    if (isCheckedPopulation) {
      setIsCheckedPopulation(!isCheckedPopulation);
    }

    if(e.target.checked){
      setCountries([...originalCountries].sort((a, b) => b.area - a.area).slice(0,10))
    } else {
      setCountries(originalCountries);
    }
  }

  function handleContinentChange(e){
    setContinent(e.target.value);
    setSubregion('Choose region'); 

    
    if(e.target.value === 'All'){
      setCountries(originalCountries);
    } else {
      setCountries([...originalCountries].filter(country => country.continents.includes(e.target.value)));
    }
  }

  function handleSubRegionChange(e){
    setSubregion(e.target.value);
    setContinent('All');

    if(e.target.value === 'Choose region'){
      setCountries(originalCountries);
    } else {
      setCountries([...originalCountries].filter(country => country.subregion === (e.target.value)));
    }
  }

  return (
    <div>
      <h1>Countries of the World</h1>
    <div>
    <div className='filter_container'>
        <p>Filter & sort</p>
        <div className='filterInfo_container'>
          <div className='filter'>
            <input type="checkbox" onChange={handleAlphaChange}/> 
            <label>Alpha</label>
          </div>

          <div className='filter'>
            <p>Top 10</p>
            <input 
              type="checkbox" 
              onChange={handlePopulationChange}
              checked={isCheckedPopulation}
            />by population
            <br/>
            <input 
              type="checkbox" 
              onChange={handleAreaChange}
              checked={isCheckedArea}
            /> 
            <label>by area</label>
          </div>

          <div className='filter'>
            <p>By continent</p>
            <select value={continent} onChange={handleContinentChange}>
              <option defaultValue="All">All</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div className='filter'>
            <p>By subregion</p>
            <select value={subregion} onChange={handleSubRegionChange}>
              <option defaultValue="Choose region">Choose region</option>
              <option value="Caribbean">Caribbean</option>
              <option value="Western Europe">Western Europe</option>
              <option value="Western Africa">Western Africa</option>
              <option value="Central Europe">Central Europe</option>
              <option value="Eastern Asia">Eastern Asia</option>
              <option value="Polynesia">Polynesia</option>
              <option value="Northern Africa">Northern Africa</option>
              <option value="Southern Europe">Southern Europe</option>
              <option value="South-Eastern Asia">South-Eastern Asia</option>
              <option value="Eastern Africa">Eastern Africa</option>
              <option value="Southern Africa">Southern Africa</option>
              <option value="North America">North America</option>
              <option value="Middle Africa">Middle Africa</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Southeast Europe">Southeast Europe</option>
              <option value="Western Asia">Western Asia</option>
              <option value="Northern Europe">Northern Europe</option>
              <option value="Melanesia">Melanesia</option>
              <option value="Central Asia">Central Asia</option>
              <option value="Southern Asia">Southern Asia</option>
              <option value="South America">South America</option>
              <option value="Australia and New Zealand">Australia and New Zealand</option>
              <option value="Central America">Central America</option>
              <option value="Eastern Europe">Eastern Europe</option>
            </select>
           </div>
        </div>
      <div>

      </div>
    </div>
   
     
    </div>

    

  

    


      {isLoading ? (
        <p>Loading data...</p>
      ) : isError ? (
        <p>Opps sorry! Error in fetching data</p>
      ) : (
        <Countries data={countries} />
      )}
    </div>
  );
}

export default App;
