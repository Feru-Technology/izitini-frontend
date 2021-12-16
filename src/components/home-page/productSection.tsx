import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RatingView } from 'react-simple-star-rating'
import './home.scss';


function ProductSection() {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    return (
        <div className='raw product-section mt-5'>
            <p className='text-center fs-4 fw-bolder'>Recent Updates</p>
            <div className='center'>
                <Carousel responsive={responsive}>
                    <div className="card col m-2">
                        <Link to="/product">
                            <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%207.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <li className="fs-5 fw-normal">building materials</li>
                                <li className='fs-6'>By Cimerw</li>
                                <div className='ratings'><RatingView ratingValue={2} /></div>

                                <li className='fs-5 fw-bolder'>50k RFW</li>
                            </div>
                        </Link>
                    </div>
                    <div className="card col m-2">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%207.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">building materials</li>
                            <li className='fs-6'>By Cimerw</li>
                            <div className='ratings'><RatingView ratingValue={2} /></div>

                            <li className='fs-5 fw-bolder'>50k RFW</li>
                        </div>
                    </div>
                    <div className="card col m-2">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%207.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">building materials</li>
                            <li className='fs-6'>By Cimerw</li>
                            <div className='ratings'><RatingView ratingValue={2} /></div>

                            <li className='fs-5 fw-bolder'>50k RFW</li>
                        </div>
                    </div>
                    <div className="card col m-2">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%207.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">building materials</li>
                            <li className='fs-6'>By Cimerw</li>
                            <div className='ratings'><RatingView ratingValue={2} /></div>

                            <li className='fs-5 fw-bolder'>50,000,0009 RFW</li>
                        </div>
                    </div>
                    <div className="card col m-2">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%207.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">building materials</li>
                            <li className='fs-6 fw-li<RatingView ratingValue={2}/>ght'>By Cimerw</li>
                            <div className='ratings'><RatingView ratingValue={2} /></div>

                            <li className='fs-5 fw-bolder'>50k RFW</li>
                        </div>
                    </div>
                    <div className="card col m-2">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%207.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">building materials</li>
                            <li className='fs-6'>By Cimerw</li>
                            <div className='ratings'><RatingView ratingValue={2} /></div>

                            <li className='fs-5 fw-bolder'>50k RFW</li>
                        </div>
                    </div>
                </Carousel>
            </div>

        </div>
    );
}
export default ProductSection;
