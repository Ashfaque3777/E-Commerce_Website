import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../config";

export default function UpdateProduct() {
  let { id } = useParams();
  let navigation = useNavigate();
  let [loading, setLoading] = useState(true);
  let [isSubmitting, setIsSubmitting] = useState(false);

  let [data, setData] = useState({
    productType: "",
    productBrand: "",
    productPrice: "",
    productRating: "",
  });

  let { productType, productBrand, productPrice, productRating } = data;

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function getProductById() {
    setLoading(true);
    let result = await axios.get(
      `${API}/api/getProductById/${id}`
    );
    setData(result.data[0]);
    setLoading(false);
  }

  useEffect(() => {
    getProductById();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!productType || !productBrand || !productPrice || !productRating) {
      alert("All fields are required");
      return;
    }

    if (isNaN(productPrice) || isNaN(productRating)) {
      alert("Price and Rating should be numbers");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.put(`${API}/api/updateProduct/${id}`, data);
      toast.success("Product updated successfully");
      setIsSubmitting(false);
      navigation("/admin");
    } catch (error) {
      toast.error("Failed to update product");
    }
  }

  return (
    <section>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Update Product
              </h2>
              <form
                action="#"
                method="POST"
                className="mt-8"
                onSubmit={handleSubmit}
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Product Type{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="product type"
                        id="name"
                        name="productType"
                        value={productType}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Product Brand{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="product brand"
                        id="email"
                        name="productBrand"
                        value={productBrand}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Product Price{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="product price"
                        id="password"
                        name="productPrice"
                        value={productPrice}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Product Rating{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="product rating"
                        id="password"
                        name="productRating"
                        value={productRating}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update item"}{" "}
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
              alt=""
            />
          </div>
        </div>
      )}
    </section>
  );
}
