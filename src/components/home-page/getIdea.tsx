import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './home.scss';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        // slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        // slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        // slidesToSlide: 1 // optional, default to 1.
    }
};


function GetIdeaSection(props: any) {


    return (
        <div className='raw idea-section mt-5'>
            <p className='text-center fs-4 fw-bolder'>Get Ideas</p>
            <div className='card-slide'>
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
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-daria-shevtsova-1029803.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">Dining Room</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-houzlook-com-3356416.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">saloon</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-julie-aagaard-2207894.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">Bathroom</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-mark-mccammon-2724749.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">Dining Room</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-julie-aagaard-2207894.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">building materials5</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-max-vakhtbovych-6969870.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">Dining Room</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-tamil-king-3214064.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">building materials</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-vecislavas-popa-1643383.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">Saloon</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-victoria-borodinova-3315291.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">Bathroom</li>

                        </div>
                    </div>
                    <div className="m-1">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-mark-mccammon-1080721.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <li className="fs-5 fw-normal">building materials</li>

                        </div>
                    </div>
                </Carousel>
            </div>

        </div>
    );
}
export default GetIdeaSection;
