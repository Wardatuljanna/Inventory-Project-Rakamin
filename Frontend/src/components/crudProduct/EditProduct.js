import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from '../Navbar';
import { jwtDecode } from 'jwt-decode';

const EditProduct = () => {
  const [version, setVersion] = useState("");
  const [product, setProduct] = useState("");
  const [stock, setQty] = useState("");
  const [productData, setProductData] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [log, setLog] = useState("");
  const [setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);
  // eslint-disable-next-line no-unused-vars
  const isStaff = jwtDecode(localStorage.getItem('token')).data.role === 'Staff';

  const handleEdit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token is missing or invalid");
        return;
      }
  
      await axios.put(
        `http://backend-inventory-project-production.up.railway.app/products/${id}`,
        {
          versionId: version,
          productName: product,
          qty: stock,
          keterangan: keterangan,
          logs: log,
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
      setMsg('');
      navigate("/product");
    } catch (error) {
        console.error(error);
    }
  };

  const getProductById = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://backend-inventory-project-production.up.railway.app/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from getProductById:", response.data);

      setVersion(response.data.versionId);
      setProduct(response.data.productName);
      setKeterangan(response.data.keterangan);
      setQty(response.data.qty);
      setLog(response.data.log); 
      setProductData(response.data);
    } catch (error) {
      console.error("Error in getProductById:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff]">
      <Navbar/>
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-xl mx-auto w-full">
          <form onSubmit={handleEdit} className="bg-slate-100 shadow-lg rounded px-5 pt-6 pb-8 mb-4">
          <h2 className='font-semibold text-3xl text-center text-gray-900 mb-8'>Edit Product</h2>
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
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              >
                <option value="" disabled>Select Version</option>
                <option value="1">Playstation 1</option>
                <option value="2">Playstation 2</option>
                <option value="3">Playstation 3</option>
                <option value="4">Playstation 4</option>
                <option value="5">Playstation 5</option>
              </select>
            </div>
            <div className="field ">
              <label className="block text-gray-600 text-sm font-bold mb-2">Product</label>
              <div className="control ">
                <input
                  type="text"
                  className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-300"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Product"
                />
              </div>
            </div>
            <div className="field">
              <label className="block text-gray-600 text-sm font-bold mb-2">Total Qty: {productData.totalQty}</label>
              <div className="control">
                <input
                  type="text"
                  className="rounded-lg w-full bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-300"
                  value={stock}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Qty"
                />
                {submitted && !stock && <p className="text-red-500">Qty is required</p>}
              </div>
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
                id="keterangan"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              >
                <option value="" disabled>Select Keterangan</option>
                <option value="Check">Check</option>
                <option value="Uncheck">Uncheck</option>
              </select>
            </div>
            )}
            <div className="field">
              <button type="submit" className="btn w-full btn-accent font-semibold">
                Update
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
    </div>
  );
};

export default EditProduct;
