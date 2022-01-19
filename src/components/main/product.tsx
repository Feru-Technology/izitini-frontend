import React, { useEffect, useState } from 'react'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillStar } from "react-icons/all"
import { Navbar } from './navbar'

// import {
//     fetchingProduct,
//     storeProduct,
//     productFailed
// } from '../../redux/product/storeProduct.slice '
const Product = () => {

    // redux
    // const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(fetchingProduct());
    //     fetch(dispatch, storeProduct, productFailed, `/product/shop/${store_id}`)
    // }, [dispatch, store_id])

    // const { isLoading, product } = useSelector((state: RootState) => state.storeProduct);

    return (
        <>

            < Navbar />
            <div className="container-fluid">
                {/* picture and product name and details */}
                <div className="fluid mx-auto" id="p">
                    <div className="container p-5 mx-auto">
                        <div className="flex">
                            <div className="w-2/3">
                                <div className="flex">

                                    <div>

                                        <div className="d-flex flex-direction-column gap-2">
                                            <img
                                                src="https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A="
                                                className="border mr-2"
                                                width="75"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="d-flex flex-direction-column gap-2">
                                            <img
                                                src="https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A="
                                                className="border mr-2"
                                                width="75"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="d-flex flex-direction-column gap-2">
                                            <img
                                                src="https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A="
                                                className="border mr-2"
                                                width="75"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="d-flex flex-direction-column gap-2">
                                            <img
                                                src="https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A="
                                                className="border mr-2"
                                                width="75"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="d-flex flex-direction-column gap-2">
                                            <img
                                                src="https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A="
                                                className="border mr-2"
                                                width="75"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="d-flex flex-direction-column gap-2">
                                            <img
                                                src="https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A="
                                                className="border mr-2"
                                                width="75"
                                                alt="..."
                                            />
                                        </div>
                                    </div>

                                    <div className="">
                                        <img
                                            src="https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A="
                                            object-fit="false"
                                            width='50%'
                                            alt="product pic"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <div className="d-flex flex-column flex-grow-1">
                                    <h2 className="fw-bold">Product Name</h2>
                                    <p>name of the store</p>
                                    <span className="fs-2" style={{ color: "#ff9900" }}>
                                        <i>
                                            <AiFillStar />
                                        </i>
                                        <i>
                                            <AiFillStar />
                                        </i>
                                        <i>
                                            <AiFillStar />
                                        </i>
                                        <i>
                                            <AiFillStar />
                                        </i>
                                        <i>
                                            <AiFillStar />
                                        </i>
                                    </span>
                                    (28)
                                    <p className="fw-bold fs-2">25,000 RWF</p>
                                    <p>xx in the store</p>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the dummy text ever since
                                        the 1500s, when an unknown
                                    </p>
                                    <div className="d-flex flex-md-row gap-5 align-items-center">
                                        <div className="w-452">
                                            <select
                                                className="form-select form-select-md"
                                                aria-label="multiple select example"
                                                style={{ width: "130px" }}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                        <div className="">
                                            <button
                                                className="btn bg-color text-white"
                                                style={{
                                                    width: "130px",
                                                    backgroundColor: "#004896",
                                                    marginRight: "",
                                                }}
                                            >
                                                Add cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* tabs and details */}
                <div className="container">
                    {/* tabs */}
                    <div className="">
                        <ul className="flex" style={{ color: "#000" }}>
                            <li>Description</li>
                            <li>Technical & specification</li>
                            <li>Review</li>
                            <li>Shipping & Return</li>
                        </ul>
                    </div>
                    <hr />
                    {/* details  */}
                    <div className="container">
                        <div>
                            <p>test 1</p>
                            <p>test 2</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product
