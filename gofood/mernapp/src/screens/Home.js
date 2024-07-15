import React, { useState, useEffect, } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const[search,setSearch]= useState([])
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id="carousel">
    <div className="carousel-caption" style={{zIndex:"10"}} >
    <div className="d-flex justify-content-center" >
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      <button className="btn btn-outline-success text-white bg-success"   type="submit">Search</button>
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXbdIZXEzq_oSQnNVmmN4sNPAPyJFIcTxUnA&s" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86X_FCr5NI8bsDoyoJ-JWvfgyo-5zdhnZFg&s" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK9IhH_yzBbMSlEk43Vh-Ms-3nP7yUuPRaSA&s" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></div>
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              <div className="row">
                {foodItem.length !== 0
                  ? foodItem
                      .filter((item) => item.CategoryName === data.CategoryName && String(item.name).toLowerCase().includes(String(search).toLowerCase()))
                      .map((filteredItem) => (
                        <div key={filteredItem._id} className="col-12 col-md-6 col-lg-4 mb-3">
                          <Card
                            foodItem={filteredItem}
                            options={filteredItem.options[0]}
                           
                          />
                        </div>
                      ))
                  : ""}
              </div>
            </div>
          ))
        ) : (
          "Loading..."
        )}
      </div>
      <div><Footer /></div>
    </div>
  );
}
