"use client";

import Header from "./ui/Header";
import Categories from "./ui/Categories";
import { categories } from "./fake-data";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="max-h-screen flex flex-col">
      <Header />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <div>Sidebar</div>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <Categories
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={handleSelectCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
