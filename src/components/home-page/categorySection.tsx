import React from 'react';
import './home.scss'
function CategorySection() {
    return (
        <div className='raw category-section mt-5'>
            <p className=''> Buy by category</p>
            <div className="card col">
                <img src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Artboard%20%E2%80%93%202.png" className="card-img-top" alt="..." />
                <div className="card-body border-top">
                    <p className="card-text">building materials</p>
                </div>
            </div>
        </div>
    );
}

export default CategorySection;
