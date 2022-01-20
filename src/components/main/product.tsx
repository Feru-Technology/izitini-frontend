import React, { useEffect, useState } from 'react'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillStar } from "react-icons/all"
import { Navbar } from './navbar'
import { HeartIcon } from '@heroicons/react/outline'
import { useParams } from 'react-router-dom'

import {
    getProduct,
    product as currentProduct,
    productFailed
} from '../../redux/products/product.slice'
const Product = () => {

    // redux
    const dispatch = useDispatch();


    // Get ID from URL
    const params = useParams();

    const { id } = params


    // redux
    // const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProduct());
        fetch(dispatch, currentProduct, productFailed, `/product/${id}`)
    }, [dispatch, id])

    const { isLoading, product } = useSelector((state: RootState) => state.product);

    console.log('==================================================');
    console.log(product);

    const data = [
        {
            image: 'https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A=',

        },
        {
            image: 'https://media.istockphoto.com/photos/detail-of-broken-pipe-picture-id1074493878',

        },
        {
            image: 'https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A=',

        },
        {
            image: 'https://media.istockphoto.com/photos/sprinkler-installation-in-a-field-of-park-picture-id1043550948',

        },
        {
            image: 'https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A=',

        },
        {
            image: 'https://media.istockphoto.com/photos/rusty-burst-pipe-in-baku-botanic-garden-picture-id500598328',

        },
    ]

    // const images = product?.productImages

    const [displayImage, setDisplayImage] = useState(data[0].image);
    const [style, setStyle] = useState<null | String>(null)

    // const addToCart = 

    return (
        <>

            < Navbar />
            {isLoading ? (<h1>loading...</h1>)
                : <div className="container-fluid">
                    {/* picture and product name and details */}
                    <div className="fluid mx-auto" id="p">
                        <div className="px-5 container md:px12 lg:px-24 mx-auto">
                            <div className="md:flex">
                                <div className="md:w-2/3">
                                    <div className="md:flex">

                                        <div className="sr-only md:not-sr-only">
                                            {data.map((image) => (<div className="my-1 hover:border-black
                                        "
                                                onPointerOver={() => setDisplayImage(image.image)}
                                            >
                                                <img
                                                    src={image.image}
                                                    className="border mr-2 w-16 lg:w-20"
                                                    alt="..."
                                                />
                                            </div>)
                                            )}

                                        </div>

                                        <div className="">
                                            <img
                                                src={displayImage}
                                                object-fit="false"
                                                className=" max-h-96 justify-right"
                                                alt="product pic"
                                            />
                                        </div>

                                        <div className="md:sr-only flex">
                                            {data.map((image) => (<div className="my-1 hover:border-black"
                                                onPointerOver={() => setDisplayImage(image.image)}
                                            >
                                                <img
                                                    src={image.image}
                                                    className="border mr-2 w-20"
                                                    alt="..."
                                                />
                                            </div>)
                                            )}

                                        </div>
                                    </div>

                                    {/* tabs and details */}
                                    <div className="sr-only md:not-sr-only container">
                                        {/* tabs */}
                                        <div className="">
                                            <ul className="flex space-x-2 lg:space-x-5 justify-center
                                        md:font-medium md:-text-base
                                        lg:font-bold lg:text-lg lg:space-x-12">
                                                <li>Description</li>
                                                <li>Specification</li>
                                                <li>Review</li>
                                                <li>Shipping & Return Policy</li>
                                            </ul>
                                        </div>
                                        <hr />
                                        {/* details  */}
                                        <div className="container">
                                            <div>
                                                <p>test 1</p>
                                                <p>test 2</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/3">
                                    <div className='text-sm md:text-base space-y-3'>
                                        <h2 className="text-xl font-bold dm:text-2xl lg:text-3xl">{product?.name}</h2>
                                        <p>{product?.shop.name}</p>
                                        <p></p>
                                        <span className="flex text-xl md:text-3xl lg:text-4xl"
                                            style={{ color: "#ff9900" }}
                                        >
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
                                            <span className='ml-3 text-black text-base md:text-2xl'> (28)</span>
                                        </span>
                                        <p className="text-base font-bold md:text-lg">{product?.shop.name}</p>
                                        <p>read to ship in Kigali</p>
                                        <p>{product?.price} in the store</p>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the dummy text ever since
                                            the 1500s, when an unknown
                                        </p>
                                        <div className="md:flex md:space-x-3 lg:space-x-5">
                                            <div className='md:w-1/2'>
                                                <div className="w-full">
                                                    <select
                                                        className='w-full h-9 rounded border-2 bg-white px-3'
                                                        aria-label="multiple select example"
                                                    >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='flex mt-3 space-x-3 text-base
                                        md:w-1/2 md:space-x-0 md:mt-0'>
                                                <div className="w-1/3 md:sr-only">
                                                    <button
                                                        className="flex btn bg-color border-2 border-dark-blue text-dark-blue
                                                    w-full h-9 rounded bg-dark-white items-center justify-center font-medium"
                                                    >
                                                        <span></span>
                                                        <HeartIcon className="h-4 w-auto" aria-hidden="true" />
                                                        save
                                                    </button>
                                                </div>
                                                <div className="w-2/3 md:w-full">
                                                    <button
                                                        className="btn bg-color text-white w-full h-9 rounded bg-dark-blue font-medium"
                                                    >
                                                        Add to cart
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* tabs and details */}
                                <div className="md:sr-only">
                                    {/* tabs */}
                                    <div className="">
                                        <ul className="flex space-x-5 justify-center font-bold text-lg">
                                            <li>Description</li>
                                            <li>Products Specification</li>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Product
