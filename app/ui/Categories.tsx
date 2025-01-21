"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const TRANSLATE_AMOUNT = 200;
const DRAG_THRESHOLD = 5;

type Props = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export default function Categories({
  categories,
  selectedCategory,
  onSelect,
}: Props) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startTranslate, setStartTranslate] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { clientWidth, scrollWidth } = entry.target as HTMLDivElement;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(translate + clientWidth < scrollWidth);
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;

      if (Math.abs(deltaX) > DRAG_THRESHOLD && !hasMoved) {
        setHasMoved(true);
      }

      const newTranslate = startTranslate - deltaX;

      if (containerRef.current) {
        const maxScroll =
          containerRef.current.scrollWidth - containerRef.current.clientWidth;
        if (newTranslate < 0) {
          setTranslate(0);
        } else if (newTranslate > maxScroll) {
          setTranslate(maxScroll);
        } else {
          setTranslate(newTranslate);
        }
      }
    }

    function handleMouseUp() {
      setIsDragging(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, hasMoved, startX, startTranslate]);

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.clientX);
    setStartTranslate(translate);
  }

  function scrollLeft() {
    setTranslate((prev) => {
      const newTranslate = prev - TRANSLATE_AMOUNT;
      return newTranslate < 0 ? 0 : newTranslate;
    });
  }

  function scrollRight() {
    if (!containerRef.current) return;
    const maxScroll =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;
    setTranslate((prev) => {
      const newTranslate = prev + TRANSLATE_AMOUNT;
      return newTranslate > maxScroll ? maxScroll : newTranslate;
    });
  }

  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden relative select-none"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div
        className={`flex whitespace-nowrap gap-3 ${
          isDragging ? "" : "transition-transform"
        } w-[max-content]`}
        style={{
          transform: `translateX(-${translate}px)`,
        }}
      >
        {categories.map((category, index) => (
          <Button
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            key={index}
            onClick={(e) => {
              if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              onSelect(category);
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={scrollLeft}
          >
            <LuChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={scrollRight}
          >
            <LuChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
