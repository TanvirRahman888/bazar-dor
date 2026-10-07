"use client";

import { useState } from "react";

const SortDropdown = () => {
  const [sort, setSort] = useState("price-low-high");

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-gray-700"
      >
        সাজান
      </label>

      <select
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-low-high">
          দাম: কম থেকে বেশি
        </option>
        <option value="price-high-low">
          দাম: বেশি থেকে কম
        </option>
      </select>
    </div>
  );
};

export default SortDropdown;