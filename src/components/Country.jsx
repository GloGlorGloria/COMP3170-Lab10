export default function Country ({country}){

    const currency = country.currencies ? country.currencies : {};
    const currencyCode = Object.keys(currency)[0]; 
    const { name, symbol } = currency[currencyCode] || {}; 
    const languages = country.languages ? country.languages : {};
    const languageCode = Object.keys(languages)[0]; 

    return(
        <div className="country-card">
            <div className="country-title"> 
                <div>
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
                </div>
                <p>{country.name.common}</p>
            </div>
            <div className="country-info">
                <div>
                    <p><span className="info-title">Official name:</span> <span>{country.name.official}</span></p>
                    <p><span className="info-title">Capital: </span> <span>{country.capital}</span></p>
                    <p><span className="info-title">Population: </span> <span>{new Intl.NumberFormat().format(country.population)}</span></p>
                    <p><span className="info-title">Languages: </span> <span>{languages[languageCode]}</span></p>
                    <p><span className="info-title">Currency: </span> <span>{name} ({symbol})</span></p>
                    <p><span className="info-title">Area (mi²): </span> <span>{new Intl.NumberFormat().format(country.area)}</span></p>
                    <p><span className="info-title">Sub-region: </span> <span>{country.subregion}</span></p>
                    <p><span className="info-title">Continents: </span> <span>{country.continents}</span></p>
                    {/* <p><span className="info-title">Borders: </span> <span>{country.borders}</span></p> */}
                    <a href={country.maps.googleMaps} target="_blank">Show on Google Maps</a>
                    
                </div>
                   
            </div>
        </div>    
    );
}