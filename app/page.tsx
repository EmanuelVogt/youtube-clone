"use client";

import Header from "./ui/Header";
import Categories from "./ui/Categories";
import { categories, videos } from "./fake-data";
import { useState } from "react";
import VideoItem from "./ui/VideoItem";

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
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map((video) => (
              <VideoItem key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
