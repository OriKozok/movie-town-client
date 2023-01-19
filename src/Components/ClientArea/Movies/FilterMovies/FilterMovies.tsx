import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import Genre from "../../../../Models/Genre";
import "./FilterMovies.css";

interface filterProps{
    clear: any;
    filterByGenre: any;
    filterByCity: any;
}

//This component represents options for filtering the movies: by city, by genre, or clearing the filtering
function FilterMovies(props: filterProps): JSX.Element {

    const [showByCities, setShowByCities] = useState(true);
    const genres = (Object.keys(Genre) as (keyof typeof Genre)[]).filter(value=> isNaN(Number(value)) === true);//Filtering the Genre enum so it will display 
                                                                                                                //only the strings and not the numbers of the enum

    function getMoviesByCity(evt: { target: { value: string; }; }){//this function receives a string entered by the user and filter the movies' by city using the Movies component function
        props.filterByCity(evt.target.value);
    }

    function getMoviesByGenre(){//this function receives a genre selected by the user and filter the movies' by genre using the Movies component function
        var select = document.getElementById("selectGenre") as HTMLSelectElement;
        props.filterByGenre(select.value);
    }

    function clear(){//this function resets the genre's select element and the city's input element and clear the movies' filters using the Movies component function
        var genresSelect = document.getElementById("selectGenre") as HTMLSelectElement;
        if(genresSelect)
            genresSelect.value = "";
        var cityInput = document.getElementById("enterCity") as HTMLInputElement;
        if(cityInput)
            cityInput.value = "";
        setShowByCities(true);
        props.clear();
    }

    function setToShowByCities(){
        setShowByCities(true);
    }

    function setToShowByGenres(){
        setShowByCities(false);
    }

    return (
        <div className="FilterMovies">
                <ButtonGroup>
                <ToggleButton className="btn-not-seat" value={"showByCities"} onClick={setToShowByCities}>Show By Cities</ToggleButton>
                <ToggleButton className="btn-not-seat" value={"showByGenre"} onClick={setToShowByGenres}>Show By Genre</ToggleButton>
                <ToggleButton className="btn-not-seat" value={"clear"} onClick={clear}>Clear</ToggleButton>
                </ButtonGroup>
            {showByCities ?
                <Container className="d-flex justify-content-center">
                <Form.Control className="w-25 mt-2" placeholder="Enter City" id="enterCity" defaultValue={""} onChange={getMoviesByCity}/></Container>
            :
            <Container className="d-flex justify-content-center">
            <Form.Select className="w-25 mt-2" id="selectGenre" defaultValue={""} onChange={getMoviesByGenre}>
                <option value={""} hidden>Select Genre</option>
                {genres.map(genre=> <option key={genre} value={genre}>{genre.toString()}</option>)}</Form.Select></Container>}
        </div>
    );
}

export default FilterMovies;
