"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import burgerImg from "@/assets/burger.jpg";
import curryImg from "@/assets/curry.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import macncheeseImg from "@/assets/macncheese.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import schnitzelImg from "@/assets/schnitzel.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";
import classes from "./image-slideshow.module.css";

const images = [
  { id: "burger", image: burgerImg, alt: "A delicious, juicy burger" },
  { id: "curry", image: curryImg, alt: "A delicious, spicy curry" },
  { id: "dumplings", image: dumplingsImg, alt: "Steamed dumplings" },
  { id: "macncheese", image: macncheeseImg, alt: "Mac and cheese" },
  { id: "pizza", image: pizzaImg, alt: "A delicious pizza" },
  { id: "schnitzel", image: schnitzelImg, alt: "A delicious schnitzel" },
  {
    id: "tomato-salad",
    image: tomatoSaladImg,
    alt: "A delicious tomato salad",
  },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
