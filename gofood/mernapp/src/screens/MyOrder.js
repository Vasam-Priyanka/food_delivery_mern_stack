import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch("http://localhost:5000/api/myorderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
        })
            .then(async (res) => {
                let response = await res.json();
                console.log(response); // Debugging statement
                setOrderData(response);
            })
            .catch((error) => {
                console.error('Error fetching order data:', error);
            });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.orderData ? (
                        orderData.orderData.order_data.slice(0).reverse().map((item, index) => {
                            // Ensure item is an array before mapping
                            if (Array.isArray(item)) {
                                return item.map((arrayData, idx) => {
                                    return (
                                        <div key={idx}>
                                            {arrayData.Order_date ? (
                                                <div className='m-auto mt-5'>
                                                    {orderData.orderData.order_data[index] = arrayData.Order_date}
                                                    <hr />
                                                </div>
                                            ) : (
                                                <div className='col-12 col-md-6 col-lg-3'>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>{arrayData.qty}</span>
                                                                <span className='m-1'>{arrayData.size}</span>
                                                                <span className='m-1'>{orderData.orderData.order_data[index]}</span>
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                    ₹{arrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                });
                            } else {
                                return null;
                            }
                        })
                    ) : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
