import React from 'react'
import Row from './Row';
import './App.css';
import requests from './requests';
import Banner from './Banner.js'
import './Banner.css'
import Nav from './Nav';
import  './Nav.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner></Banner>
     
     <Row 
      title= "Netflix Originals" 
      fetchUrl = {requests.fetchNewflixOriginals}
      isLargeRow></Row>
     <Row title= "Trending Now" fetchUrl = {requests.fetchTrending}></Row>
     <Row title= "Top Rated" fetchUrl = {requests.fetchTopRated}></Row>
     <Row title= "Action Movies" fetchUrl = {requests.fetchActionMovies}></Row>
     <Row title= "Comedy Movies" fetchUrl = {requests.fetchComedyMovies}></Row>
     <Row title= "Horror Movies" fetchUrl = {requests.fetchHorrorMovies}></Row> 
     <Row title= "Documentaries" fetchUrl = {requests.fetchDocumentaries}></Row>
    </div>
  );
}

export default App;
