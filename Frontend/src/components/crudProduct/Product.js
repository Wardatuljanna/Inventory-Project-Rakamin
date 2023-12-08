import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../../style/index.css';
import Swal from 'sweetalert2';
import { FaEdit, FaNewspaper, FaTrash } from 'react-icons/fa';
import { IoScan } from "react-icons/io5";
import QRCode from 'qrcode';

const itemsPerPage = 8;

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('version');
    const [searchTerm, setSearchTerm] = useState('');

    const isStaff = jwtDecode(localStorage.getItem('token')).data.role === 'Staff';

    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const response = await axios.get('https://backend-inventory-project-production.up.railway.app/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setCurrentPage(1); 
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.productName.toLowerCase().includes(searchTerm) ||
            product.Version.nameVersion.toLowerCase().includes(searchTerm) ||
            product.User.name.toLowerCase().includes(searchTerm)
        );
    });

    const productQty = (qty) => {
        let total = 0;
        qty.forEach((data) => (total += data.qty));
        return total;
    };

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
    });

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not found. User may not be authenticated.');
                return;
            }

            const result = await swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No, cancel!',
                confirmButtonText: 'Yes, delete it!',
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                await axios.delete(`https://backend-inventory-project-production.up.railway.app/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));

                swalWithBootstrapButtons.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: 'Cancelled',
                    text: 'Your file is safe :)',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };



    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        applySorting(event.target.value);
    };

    const applySorting = (option) => {
        let sortedProducts = [...products];

        if (option === 'version') {
            sortedProducts.sort((a, b) => a.Version.nameVersion.localeCompare(b.Version.nameVersion));
        } else if (option === 'date') {
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (option === 'status') {
            sortedProducts.sort((a, b) => b.keterangan.localeCompare(a.keterangan));
        }

        setProducts(sortedProducts);
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const visibleProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // eslint-disable-next-line no-unused-vars
    const printQRCode = (qrCodeData) => {
        const qrCodeContainer = document.createElement('div');
        QRCode.toCanvas(qrCodeContainer, qrCodeData);

        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print QR Code</title>
                </head>
                <body>
                    <img src="${qrCodeContainer.firstChild.toDataURL('image/png')}" />
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const showProductDetails = (product) => {
        const qrCodeData = JSON.stringify({
            Name: product.productName,
            Version: product.Version.nameVersion,
            User: product.User.name,
            Stock: productQty(product.Logs),
            Description: product.keterangan,
            CreatedAt: new Date(product.createdAt).toLocaleDateString(),
        });

        QRCode.toDataURL(qrCodeData)
            .then(url => {
                Swal.fire({
                    title: 'Product Details',
                    html: `
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="grid grid-cols-2 gap-4">
                    <div class="mb-4">
                    <p class="text-lg font-bold text-gray-800">Name</p>
                    <p class="text-gray-600">${product.productName}</p>
                </div>
                <div class="mb-4">
                    <p class="text-lg font-bold text-gray-800">User</p>
                    <p class="text-gray-600">${product.User.name}</p>
                </div>
                <div class="mb-4">
                    <p class="text-lg font-bold text-gray-800">Version</p>
                    <p class="text-gray-600">${product.Version.nameVersion}</p>
                </div>
                <div class="mb-4">
                    <p class="text-lg font-bold text-gray-800">Status</p>
                    <p class="text-gray-600">${product.keterangan}</p>
                </div>
                <div class="mb-4">
                    <p class="text-lg font-bold text-gray-800">Created At</p>
                    <p class="text-gray-600">${new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="text-center flex justify-between items-center">
                <button id="printButton" class="bg-blue-500 text-white px-5 py-2 rounded-md m-auto">
                    Print
                </button>
            </div>
                    </div>
                </div>
            `,
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'Cancel',
                    customClass: {},
                    onClose: () => {
                        console.log('SweetAlert2 closed');
                    },
                });

                document.getElementById('printButton').addEventListener('click', () => {
                    printQRCodeImage(url);
                    window.print();
                });
            })
            .catch(error => {
                console.error('Error generating QR code:', error);
            });

        function printQRCodeImage(qrCodeImageUrl) {
            const qrCodeImage = new Image();
            qrCodeImage.src = qrCodeImageUrl;
            qrCodeImage.onload = function () {
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                        <html>
                            <head>
                                <title>QR Code</title>
                            </head>
                            <body>
                                <img src="${qrCodeImageUrl}" alt="QR Code" onload="window.print();" />
                            </body>
                        </html>
                    `);

                printWindow.onafterprint = function () {
                    printWindow.close();
                };
            };
        }

    };

    const showProductQR = (product) => {
        const qrCodeData = JSON.stringify({
            Name: product.productName,
            Version: product.Version.nameVersion,
            User: product.User.name,
            Stock: productQty(product.Logs),
            Description: product.keterangan,
            CreatedAt: new Date(product.createdAt).toLocaleDateString(),
        });

        QRCode.toDataURL(qrCodeData)
            .then(url => {
                Swal.fire({
                    title: 'QR code',
                    html: `
                <div class="mb-4 justify-center">
                <div class="flex justify-center items-center">
                    <img id="qrCodeImage" src="${url}" alt="QR Code" />
                </div>
            </div>
            <div class="text-center flex justify-between items-center">
                <button id="printButton" class="bg-blue-500 text-white px-5 py-2 rounded-md m-auto">
                    Print
                </button>
            </div>
                    </div>
                </div>
            `,
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'Cancel',
                    customClass: {},
                    onClose: () => {
                        console.log('SweetAlert2 closed');
                    },
                });

                document.getElementById('printButton').addEventListener('click', () => {
                    printQRCodeImage(url);
                    window.print();
                });
            })
            .catch(error => {
                console.error('Error generating QR code:', error);
            });

        function printQRCodeImage(qrCodeImageUrl) {
            const qrCodeImage = new Image();
            qrCodeImage.src = qrCodeImageUrl;
            qrCodeImage.onload = function () {
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                        <html>
                            <head>
                                <title>QR Code</title>
                            </head>
                            <body>
                                <img src="${qrCodeImageUrl}" alt="QR Code" onload="window.print();" />
                            </body>
                        </html>
                    `);

                printWindow.onafterprint = function () {
                    printWindow.close();
                };
            };
        }

    };

    return (
        <section className="bg-cover bg-center bg-[#ffffff]">
            <Navbar />
            <div className="container mx-auto py-8 h-screen">
                <div className="flex items-center justify-between mb-4">
                    <Link to={`add`} className="bg-[#363062] hover:bg-[#484275] text-white hover:text-white font-normal py-3 px-4 rounded inline-block">
                        Add New
                    </Link>
                    <div className="flex items-center space-x-4">
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="select select-bordered text-sm bg-white text-black font-normal"
                        >
                            <option value="version">Version</option>
                            <option value="date">Date</option>
                            <option value="status">Status</option>
                        </select>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="border rounded px-3 py-3 focus:outline-none bg-white text-black"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21 21l-5.2-5.2" />
                                    <circle cx="10" cy="10" r="8" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto rounded">
                        <thead className="bg-[#50577A]">
                            <tr>
                                <th className="px-4 py-2 text-white">Name</th>
                                <th className="px-4 py-2 text-white">Version</th>
                                <th className="px-4 py-2 text-white">User</th>
                                <th className="px-4 py-2 text-white">Stock</th>
                                <th className="px-4 py-2 text-white">Status</th>
                                <th className="px-4 py-2 text-white">Created At</th>
                                <th className="px-4 py-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleProducts.length > 0 ? (
                                visibleProducts.map((product, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        <td className="border px-4 py-2">{product.productName}</td>
                                        <td className="border px-4 py-2">{product.Version.nameVersion}</td>
                                        <td className="border px-4 py-2">{product.User.name}</td>
                                        <td className="border px-4 py-2">{productQty(product.Logs)}</td>
                                        <td className="border px-4 py-2">
                                            {product.keterangan === 'Check' ? (
                                                <div className=" bg-[#40af39] text-center text-white font-bold py-2 px-4 rounded">
                                                    {product.keterangan}
                                                </div>
                                            ) : (
                                                <div className="bg-[#c73535] text-center text-white font-bold py-2 px-4 rounded">
                                                    {product.keterangan}
                                                </div>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">{new Date(product.createdAt).toLocaleString()}</td>
                                        <td className="border px-4 py-2">

                                            <button
                                                onClick={() => showProductDetails(product)}
                                                className="btn btn-success text-white font-normal mx-2"
                                            >
                                                <FaNewspaper />
                                            </button>

                                            <button
                                                onClick={() => showProductQR(product)}
                                                className="btn btn-accent text-white font-normal mx-2"
                                            >
                                                <IoScan />
                                            </button>
                                            {!isStaff && (

                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="btn btn-error text-white font-normal mx-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
                                            <Link to={`edit/${product.id}`} className="btn btn-info text-white font-normal mx-2">
                                                <FaEdit />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-white">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {/* Pagination Controls */}
                <div className="mt-4 flex justify-end">
                    <nav className="pagination">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <a
                                key={index}
                                className={`pagination-link ${currentPage === index + 1 ? 'is-current' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default Product;
