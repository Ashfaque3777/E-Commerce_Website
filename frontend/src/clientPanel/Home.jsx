import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../config";

export default function Home() {
  let [data, setData] = useState([]);
  let [inp, setInp] = useState("");
  let navigation = useNavigate();
  let { setCartList, auth } = useContext(userContext);

  async function allData() {
    let result = await axios.get(`${API}/api/getProduct`);
    setData(result.data);
  }

  useEffect(() => {
    allData();
    getCart();
  }, [auth]);

  async function filterShoes() {
    let result = await axios.get(`${API}/api/getProduct`);
    let final = result.data.filter((item) => item.productType == "Shoes");
    setData(final);
  }

  async function filterShirt() {
    let result = await axios.get(`${API}/api/getProduct`);
    let final = result.data.filter((item) => item.productType == "Shirt");
    setData(final);
  }

  async function filterbtwtwo() {
    let result = await axios.get(`${API}/api/getProduct`);
    let final = result.data.filter(
      (item) => item.productPrice >= 1000 && item.productPrice <= 2000
    );
    setData(final);
  }

  async function filterbtwfive() {
    let result = await axios.get(`${API}/api/getProduct`);
    let final = result.data.filter(
      (item) => item.productPrice >= 2000 && item.productPrice <= 5000
    );
    setData(final);
  }

  async function filterbtwten() {
    let result = await axios.get(`${API}/api/getProduct`);
    let final = result.data.filter(
      (item) => item.productPrice >= 5000 && item.productPrice <= 10000
    );
    setData(final);
  }

  async function handleCart(data) {
    if (auth.user) {
      let userName = auth.user.email.split("@")[0];
      await axios.post(`${API}/api/saveCart/${userName}`, data);
      toast.success("Your item is added...");
      getCart();
    } else {
      navigation("/clientRegister");
    }
  }

  async function getCart() {
    if (auth.user) {
      let userName = auth.user.email.split("@")[0];
      let result = await axios.get(
        `${API}/api/getCart/${userName}`
      );
      setCartList(result.data.length);
    }
  }

  async function handleInp() {
    let result = await axios.get(
      `${API}/api/searchProduct/${inp}`
    );
    setData(result.data);
  }

  useEffect(() => {
    if (inp == "") {
      allData();
    }
    handleInp();
  }, [inp]);

  return (
    <>
      <aside className="flex fixed h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xl font-semibold uppercase text-white">
                Search By Brand
              </label>

              <form className="max-w-md mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    onChange={(e) => setInp(e.target.value)}
                    id="default-search"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Types, Brands..."
                    required
                  />
                </div>
              </form>
              {/* <button
                onClick={handleInp}
                className="text-white bg-gray-600 p-1 text-sm rounded font-semi-bold"
              >
                Search
              </button> */}
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xl font-semibold uppercase text-white">
                Filter By Type
              </label>
              <button
                onClick={allData}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="#"
              >
                <span className="mx-2 text-sm font-medium">All</span>
              </button>
              <button
                onClick={filterShoes}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="#"
              >
                <span className="mx-2 text-sm font-medium">Shoes</span>
              </button>
              <button
                onClick={filterShirt}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="#"
              >
                <span className="mx-2 text-sm font-medium">Shirt</span>
              </button>
            </div>

            <div className="space-y-3 ">
              <label className="px-3 text-xl font-semibold uppercase text-white">
                Filter By Price
              </label>
              <button
                onClick={filterbtwtwo}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="#"
              >
                <span className="mx-2 text-sm font-medium">1000-2000 Rs</span>
              </button>
              <button
                onClick={filterbtwfive}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="#"
              >
                <span className="mx-2 text-sm font-medium">2000-5000 Rs</span>
              </button>
              <button
                onClick={filterbtwten}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="#"
              >
                <span className="mx-2 text-sm font-medium">5000-10000 Rs</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      <div className="card absolute left-[300px] top-[80px] justify-evenly flex gap-[20px] flex-wrap">
        {data.map((data) => (
          <div
            className="relative h-[400px] w-[300px] rounded-md"
            key={data.id}
          >
            <img
              src={`${API}/uploads/${data.image}`}
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-left">
              <h1 className="text-lg font-semibold text-white">
                Product Type:{" "}
                <span className="font-bold text-xl uppercase">
                  {data.productType}
                </span>
              </h1>
              <h1 className="text-lg font-semibold text-white">
                Product Brand:{" "}
                <span className="font-bold text-xl uppercase">
                  {data.productBrand}
                </span>
              </h1>
              <h1 className="text-lg font-semibold text-white">
                Product Price:{" "}
                <span className="font-bold text-xl uppercase">
                  {data.productPrice}
                </span>
              </h1>
              <h1 className="text-lg font-semibold text-white">
                Product Rating:{" "}
                <span className="font-bold text-xl uppercase">
                  {data.productRating}
                </span>
              </h1>
              <button
                onClick={() => handleCart(data)}
                className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
