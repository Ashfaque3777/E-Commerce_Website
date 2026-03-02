import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../config";

export default function ViewProduct() {
  let { id } = useParams();
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);

  let [data, setData] = useState([]);

  async function getProductById() {
    try {
      setLoading(true);
      let result = await axios.get(
        `${API}/api/getProductById/${id}`
      );
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load product details");
    }
  }

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        data.map((data) => (
          <div
            className="relative h-[400px] w-[300px] lg:w-[400px] rounded-md"
            key={data.id}
          >
            <img
              src={
                `${API}/uploads/${data.image}` || "placeholder-image-url"
              }
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-left">
              <h1 className="text-lg font-semibold text-white">
                ID :- {data.id}
              </h1>
              <h1 className="text-lg font-semibold text-white">
                Type :- {data.productType}
              </h1>
              <h1 className="text-lg font-semibold text-white">
                Brand :- {data.productBrand}
              </h1>
              <h1 className="text-lg font-semibold text-white">
                Price :- {data.productPrice}
              </h1>
              <h1 className="text-lg font-semibold text-white">
                Rating :- {data.productRating}
              </h1>
              <Link
                to="/admin"
                className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white hover:underline hover:text-gray-300"
              >
                Back &rarr;
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
