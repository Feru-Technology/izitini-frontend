import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import './home.scss';


function GetIdeaSection() {

    return (
        <div className='raw idea-section mt-5'>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-houzlook-com-3356416.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-julie-aagaard-2207894.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-mark-mccammon-1080721.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
export default GetIdeaSection;
