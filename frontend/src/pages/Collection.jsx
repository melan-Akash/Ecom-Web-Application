import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sort, setSort] = useState("relevant");

  // CATEGORY SELECT
  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory(prev => prev.filter(item => item !== val));
    } else {
      setCategory(prev => [...prev, val]);
    }
  };

  // SUB CATEGORY SELECT
  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory(prev => prev.filter(item => item !== val));
    } else {
      setSubCategory(prev => [...prev, val]);
    }
  };

  // FILTER + SORT
  const applyFilter = () => {
    let copied = [...products];

    // CATEGORY FILTER
    if (category.length > 0) {
      copied = copied.filter((item) => category.includes(item.category));
    }

    // SUBCATEGORY FILTER
    if (subCategory.length > 0) {
      copied = copied.filter((item) => subCategory.includes(item.subCategory));
    }

    // SORTING
    if (sort === "low-high") {
      copied.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      copied.sort((a, b) => b.price - a.price);
    }

    // Relevant = default order (no sorting)
    setFilterProducts(copied);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, sort]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* LEFT FILTERS */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

        {/* CATEGORY */}
        <div className={`border border-gray-300 pl-5 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700 font-light">
            <label className="flex gap-2">
              <input type="checkbox" value="Men" onChange={toggleCategory} /> Men
            </label>
            <label className="flex gap-2">
              <input type="checkbox" value="Women" onChange={toggleCategory} /> Women
            </label>
            <label className="flex gap-2">
              <input type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
            </label>
          </div>
        </div>

        {/* SUBCATEGORY */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700 font-light">
            <label className="flex gap-2">
              <input type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear
            </label>
            <label className="flex gap-2">
              <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear
            </label>
            <label className="flex gap-2">
              <input type="checkbox" value="Winterwear" onChange={toggleSubCategory} /> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTION"} />

          {/* SORT DROPDOWN */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
