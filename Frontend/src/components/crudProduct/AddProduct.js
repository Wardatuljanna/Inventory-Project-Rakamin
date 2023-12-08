import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';
import { MdError } from 'react-icons/md';
import { jwtDecode } from 'jwt-decode';

const AddProduct = () => {
  const [versionId, setVersionId] = useState("");
  const [productName, setProductName] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [qty, setQty] = useState("");
  const [errorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // Track whether the form is submitted
  const navigate = useNavigate();

  const isStaff = jwtDecode(localStorage.getItem('token')).data.role === 'Staff';

  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Set the form as submitted
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.error("Token is missing or invalid");
        return;
      }
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "https://backend-inventory-project-production.up.railway.app/products",
        {
          versionId: versionId,
          productName: productName,
          keterangan: keterangan,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2000
      });

      navigate("/product");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage || 'Check your data again!',
        });
      }
    }
  };

  return (
    <section className="bg-[#ffffff] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center ">
        <div className="max-w-xl mx-auto w-full">
          <form
            className=" rounded shadow-lg bg-slate-100 px-5 pt-6 pb-8 mb-4"
            onSubmit={createProduct}
          >
            <h2 className='font-semibold text-3xl text-center text-gray-900 mb-8'>Add Product</h2>
            <div className="mb-4 ">
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="version"
              >
                Version
              </label>
              <select
                className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-300"
                id="version"
                value={versionId}
                onChange={(e) => setVersionId(e.target.value)}
              >
                <option value="" disabled selected>Select Verison</option>
                <option value="1">Playstation 1</option>
                <option value="2">Playstation 2</option>
                <option value="3">Playstation 3</option>
                <option value="4">Playstation 4</option>
                <option value="5">Playstation 5</option>
              </select>
              {submitted && !versionId && <p className="text-red-500">Version is required</p>}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="product"
              >
                Product
              </label>
              <input
                className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-300"
                id="product"
                type="text"
                placeholder="Product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {submitted && !productName && <p className="text-red-500">Product is required</p>}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-300"
                id="stock"
                type="text"
                placeholder="Stock"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
                {submitted && !qty && <p className="text-red-500">Stock is required</p>}
            </div>

            {!isStaff && (
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="keterangan"
              >
                Status
              </label>
              <select
                className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-300"
                id="version"
                value={keterangan}
                onChange={(e) => setketerangan(e.target.value)}
              >
                <option value="" disabled selected>Select Keterangan</option>
                <option value="Check">Check</option>
                <option value="Uncheck">Uncheck</option>
              </select>
              {submitted && !keterangan && <p className="text-red-500">Keterangan is required</p>}
            </div>
            )}

            {errorMessage && (
              <div role="alert" className="text-white text-md font-light alert alert-warning my-5">
              <p className='flex justify-center items-center text-white text-sm'> <MdError /> {errorMessage}</p>
              </div>
            )}

            <div className="flex items-center justify-center">
              <button
                className="btn w-full btn-accent font-semibold"
                type="submit"
              >
                Create
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
            <button
              className="btn w-full btn-primary font-semibold"
              onClick={() => navigate('/product')}
            >
              Back to Products
            </button>
          </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
