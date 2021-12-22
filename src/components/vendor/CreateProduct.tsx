import ImageUpload from "./ImageUpload";

const CreateProduct = () => {
  return (
    <div className="px-4 sm:px-6  lg:px-8 py-8 w-full h-screen  max-w-9xl mx-auto bg-gray-200">
      <div className="font-bold text-3xl text-center">Create a Product</div>
      <form>
        <div className=" w-full mb-3">
          <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Category
          </label>
          <input
            type="email"
            className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
            placeholder="Category"
          />
        </div>
        <div className=" w-full mb-3">
          <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            SubCategory
          </label>
          <input
            type="number"
            className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
            placeholder="SubCategory"
          />
        </div>
        <div className=" w-full mb-3">
          <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Product Name
          </label>
          <input
            type="text"
            className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
            placeholder="Product Name"
          />
        </div>
        <div className=" w-full mb-3">
          <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Product Size
          </label>
          <input
            type="password"
            className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
            placeholder="Product Size"
          />
        </div>
        <div>
          <h3>Pick color</h3>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option>sima</option>
              <option>ingorofani</option>
              <option>Tv</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className=" w-full mb-3">
          <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Quantity
          </label>
          <input
            type="number"
            className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
            placeholder="Quantity"
          />
        </div>
        <div className=" w-full mb-3">
          <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Price unit
          </label>
          <input
            type="number"
            className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
            placeholder="Price unit"
          />
        </div>
        <div className=" w-full mb-3">
          <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Product Description
          </label>
          <input
            type="number"
            className="border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150"
            placeholder="Product Description"
          />
        </div>
        <div>
          {/* <ImageUpload /> */}
        </div>
        <div className="text-center mt-6">
          <button
            className="bg-light-blue text-white active:bg-gray-600 text-sm font-bold uppercase mb-4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
