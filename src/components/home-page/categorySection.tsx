import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './home.scss';


function CategorySection() {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='raw category-section mt-5'>
            <p className='text-center fs-4 fw-bolder'> Buy by category</p>
            <div className='center'>
                <Carousel responsive={responsive}>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                    <div className="card col">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                        <div className="card-body border-top">
                            <p className="card-text">building materials</p>
                        </div>
                    </div>
                </Carousel>
            </div>

        </div>
    );
}
export default CategorySection;
