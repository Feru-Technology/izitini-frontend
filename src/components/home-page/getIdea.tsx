import React from 'react';
import "react-multi-carousel/lib/styles.css";
import SimpleImageSlider from "react-simple-image-slider";
import './home.scss';


const images = [
    { url: "https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-houzlook-com-3356416.jpg" },
    { url: "https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-julie-aagaard-2207894.jpg" },
    { url: "https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/design/pexels-mark-mccammon-1080721.jpg" },
];


function GetIdeaSection() {

    return (
        <div className='raw idea-section mt-5'>
            <p className='text-center fs-3'>Get Ideas</p>
            <div className='slide col-12 d-flex justify-content-center'>
                <SimpleImageSlider
                    width={500}
                    height={504}
                    images={images}
                    showBullets={false}
                    showNavs={true}
                />
            </div>

        </div>
    );
}
export default GetIdeaSection;
