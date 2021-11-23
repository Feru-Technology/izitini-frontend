import React from 'react';
import './home.scss'
import Carousel from "react-multi-carousel";
import { IoMdConstruct } from "react-icons/io";

function AdSection(props: any) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };
    return (
        <div className='row mt-3 mx-3 ad'>
            <div className='col-3 category'>
                <div className='row text-center border-bottom'>
                    <p className='fs-5 fw-bold text-h'>
                        <IoMdConstruct size={20} /> BUY YOUR PRODUCTS
                    </p>
                </div>
                <div className='row overflow-auto cat'>
                    <p className=" mt-3">
                        Building Materials
                    </p><p className="">
                        Paint
                    </p><p className="">
                        Building Materials
                    </p><p className="">
                        Electricity and lightenings
                    </p><p className="">
                        Bath & Faucet
                    </p><p className="">
                        Steel
                    </p>
                    <p className="">
                        Wood
                    </p>
                    <p className="">
                        Electricity & Lightning
                    </p><p className="">
                        Building Materials
                    </p><p className="">
                        Electricity and lightenings
                    </p><p className="">
                        Bath & Faucet
                    </p><p className="">
                        Steel
                    </p>
                    <p className="">
                        Wood
                    </p>
                    <p className="">
                        Electricity & Lightning
                    </p>
                </div>
            </div>
            <div className='col-9 p-1'>
                <Carousel
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    transitionDuration={3000}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                >
                    <div className='row c p-2'>
                        <div className='col-6'>
                            <img className='image' src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" alt="" />
                        </div>
                        <div className='col-6 text p-1'>
                            <p className='fs-3 fw-bold text-h'>Build Your Dreamed Project With The Best Quality Materials</p>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</p>
                            <div className='text-center'><button type='button' className='btn'>SHOP NOW</button></div>
                        </div>
                    </div>
                    <div className='row c'>
                        <div className='col-6'>
                            <img className='image' src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/innovative-architecture-civil-engineering-plan.png" alt="" />
                        </div>
                        <div className='col-6 text p-1'>
                            <p className='fs-3 fw-bold text-h'>Build Your Dreamed Project With The Best Quality Materials</p>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</p>
                            <div className='text-center'><button type='button' className='btn'>SHOP NOW</button></div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default AdSection;
