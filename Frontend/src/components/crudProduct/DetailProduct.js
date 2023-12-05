import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

const DetailProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const response = await axios.get("http://localhost:5000/products/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <Navbar />
            <div className="columns mt-5 is-centered">
                {products.map((product, index) => (
                    <div key={index} className="column is-one-third">
                        <div className="card">
                            <div className="card-content">
                                <p className="title">{product.version}</p>
                                <p className="subtitle">Version: {product.name_version}</p>
                                <p>User: {product.name_user}</p>
                                <p>Stock: {product.stock}</p>
                                <p>Created At: {product.createdAt}</p>
                            </div>
                            <footer className="card-footer">
                                <Link to={`detail/${product.id}`} className="card-footer-item">View Details</Link>
                                <a href="#" onClick={() => deleteProduct(product.id)} className="card-footer-item has-text-danger">Delete</a>
                                <Link to={`edit/${product.id}`} className="card-footer-item">Edit</Link>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DetailProduct;
