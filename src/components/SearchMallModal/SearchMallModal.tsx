"use client";
import {
  CategoriesAPIResponse,
  Category,
  Product,
  ProductsAPIResponse,
} from "@/types/RemedyCategories";
import React, { useEffect, useState } from "react";

export default function CategoriesModal({
  setOpenCategoriesOpenModal,
}: {
  setOpenCategoriesOpenModal: (value: boolean) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  useEffect(() => {
    setIsDataFetching(true);
    fetch("https://api.astrosevatalk.com/api/v1/categories")
      .then((response) => response.json())
      .then((data: CategoriesAPIResponse) => {
        setCategories(data.res);
        setIsDataFetching(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong. Try again !!");
        setIsDataFetching(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setIsDataFetching(true);
      fetch(
        `https://api.astrosevatalk.com/api/v1/products?categories=${selectedCategory?._id}`
      )
        .then((response) => response.json())
        .then((data: ProductsAPIResponse) => {
          setProducts(data.res);
          setIsDataFetching(false);
        })
        .catch((error) => {
          console.error(error);
          setIsDataFetching(false);
        });
    }
  }, [selectedCategory?._id]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const selectedFilesArray = Array.from(selectedFiles);
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      const newArray = [...selectedImages, ...imagesArray];
      if (newArray.length <= 5)
        setSelectedImages((images) => [...images, ...imagesArray]);
      else alert("Cannot upload more than 5 files");
    }
  };

  return (
    <div className="absolute top-[25%] left-[30%] h-96 w-[45%] bg-white roundeFd-lg">
      <div
        className="absolute right-4 top-4 cursor-pointer font-extrabold bg-blue-300 p-3 py-2 rounded-md"
        onClick={() => setOpenCategoriesOpenModal(false)}
      >
        X
      </div>
      <div className="flex flex-col p-5 py-8">
        <h1 className="justify-center w-full text-center">
          Search from AstroSevaTalk Mall
        </h1>
        <div className="h-72 mt-5 overflow-y-auto">
          {isDataFetching && (
            <div>
              <div className="animate-pulse p-5 mr-16 lg:mr-60  h-44 border border-red-400 rounded-md mt-4 cursor-pointer">
                <div className="flex flex-row justify-between space-x-8">
                  <div className="w-[50%] h-4 bg-gray-300 rounded-md"></div>
                  <div className="w-[50%] h-4 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            </div>
          )}
          {!selectedCategory &&
            categories.map((value) => {
              return (
                <div
                  className="p-5 mr-16 lg:mr-60  h-44 border border-red-400 rounded-md mt-4 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(value);
                  }}
                >
                  <div className="flex flex-row justify-between">
                    <div className="w-[50%]">{value.name}</div>
                    <div className="w-[50%]">{value.name}</div>
                  </div>
                </div>
              );
            })}
          {!!selectedCategory && !selectedProduct && (
            <div>
              {products.map((value) => {
                return (
                  <div
                    className="p-5 mr-16 lg:mr-60 h-44 border border-red-400 rounded-md mt-4 cursor-pointer"
                    onClick={() => setSelectedProduct(value)}
                  >
                    <div className="flex flex-row justify-between">
                      <div className="w-[50%]">{value.name}</div>
                      <div className="w-[50%]">{value.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {!!selectedCategory && !!selectedProduct && (
            <div className="mt-4 p-3">
              <div>
                <p className="text-center font-bold">Category</p>
                <input
                  type="text"
                  placeholder="Category"
                  className="border border-gray-400 p-2 w-full rounded-md mt-2"
                  disabled
                  value={selectedCategory.name}
                />
              </div>
              <div className="mt-3">
                <p className="text-center font-bold">Product Name</p>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="border border-gray-400 p-2 w-full rounded-md mt-2"
                  disabled
                  value={selectedProduct.name}
                />
              </div>
              <div className="mt-3">
                <p className="text-center font-bold">Performed By</p>
                <input
                  type="text"
                  className="border border-gray-400 p-2 w-full rounded-md mt-2"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-center flex-row space-x-2">
                  {selectedImages.length < 5 && (
                    <div className=" h-6 w-4 p-8 bg-gray-300 flex justify-center items-center">
                      <label className="px-6 py-7">
                        +
                        <input
                          type="file"
                          name="images"
                          className="hidden"
                          onChange={onSelectFile}
                          multiple
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                        />
                      </label>
                    </div>
                  )}
                  {selectedImages.map((image, index) => {
                    return (
                      <div className="relative">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          height={110}
                          width={110}
                        />
                        <div
                          className="absolute top-0 right-0 bg-gray-800 text-white px-2 cursor-pointer"
                          onClick={() => {
                            setSelectedImages((images) => {
                              return images.filter((value) => value != image);
                            });
                          }}
                        >
                          X
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 font-bold text-center">
                  Attachment (Max 5 image allowed)
                </p>
              </div>
              <div className="flex justify-center">
                <button className="justify-center p-2 mt-10 rounded-md w-[70%] text-white bg-gradient-to-b from-[#fb7038] to-[#ff0600]">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
