import Country from './Country';

export default function Countries({ data }) {
    return(
        <div className='country-container'>
            {data.map((country, index) => (
                <Country key={index} country={country} />
            ))}
        </div>
    );
}