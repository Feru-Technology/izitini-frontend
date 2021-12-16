import "./singlePage.css"
import React from "react"
import { AiFillStar } from "react-icons/all"
import { tabItems } from "../../data/tabItems"
import { imgs } from "../../data/itemPhoto"

const TabItemComponent = ({
    title = "",
    onItemClicked = () => { },
    isActive = true,
}) => {
    return (
        <ul className={isActive ? "tabitem" : ""} onClick={onItemClicked}>
            <li className="nav-link fw-bold text-black fs-4">{title}</li>
        </ul>
    )
}

const SinglePage = () => {
    const [active, setActive] = React.useState(0)

    return (
        <>
            <div className="container-fluid">
                {/* picture and product name and details */}
                <div className="container-fluid mx-auto" id="p">
                    <div className="container p-5 mx-auto">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="d-flex flex-shrink-1">
                                    <div>
                                        {imgs.map(({ id, pic }) => (
                                            <div key={id} className="d-flex flex-direction-column gap-2">
                                                <img
                                                    src={pic}
                                                    className="border mr-2"
                                                    width="75"
                                                    alt="..."
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex-fill fillflex-shrink-1">
                                        <img
                                            src="https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A="
                                            object-fit="false"
                                            width='100%'
                                            alt="product pic"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-5 ">
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
                        <ul className="nav nav-fill" style={{ color: "#000" }}>
                            {tabItems.map(({ id, title }) => (
                                <TabItemComponent
                                    key={title}
                                    title={title}
                                    onItemClicked={() => setActive(id)}
                                    isActive={active === id}
                                />
                            ))}
                        </ul>
                    </div>
                    <hr />
                    {/* details  */}
                    <div className="container">
                        <div>
                            {tabItems.map(({ id, content }) => {
                                return active === id ? content : ""
                            })}
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePage
