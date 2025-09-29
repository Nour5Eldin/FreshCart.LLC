"use client";

import { Category } from "@/sanity.types";
import Container from "./Container";
import Title from "./Title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChartArea, FileQuestion, Laptop, Settings, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  categories: Category[];
}

const data = [
  {
    title: "Laptop Finder",
    description: "Find Your Laptop Easily",
    icon: <Laptop className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Raise a Complain",
    description: "Share your experience",
    icon: <ChartArea className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Online Support",
    description: "Get Online Support",
    icon: <FileQuestion className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Service Center",
    description: "Repair Your Device",
    icon: <Settings className="w-5 h-5 md:w-6 md:h-6" />,
  },
];

const HomeCategories = ({ categories }: Props) => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCats(categories);
    }
    setLoading(false);
  }, [categories]);

  return (
    <Container className="w-full mt-10 lg:mt-20 rounded-md">
      {/* أول جزء ثابت */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
        {data?.map((item) => (
          <div
            key={item?.title}
            className="flex items-center justify-center md:justify-baseline gap-3 md:gap-5 bg-white p-3 rounded-md border border-tech_blue/20 hover:border-tech_blue hoverEffect"
          >
            <span className="bg-tech_blue text-white p-2 rounded-full">
              {item?.icon}
            </span>
            <div>
              <h3 className="font-semibold text-sm md:text-base tracking-wide">
                {item?.title}
              </h3>
              <p className="text-sm hidden lg:inline-flex">
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* عنوان */}
      <div className="text-center space-y-1.5 mb-5 md:mb-10">
        <Title className="text-xl">Featured Categories</Title>
        <p className="text-sm font-medium md:text-base">
          Get Your Desired Product from Featured Category!
        </p>
      </div>

      {/* الكاتيجوريز */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-tech_blue" />
          <p className="ml-2">Loading categories...</p>
        </div>
      ) : cats?.length > 0 ? (
        <div className="mt-5 grid grid-cols-4 md:grid-cols-8 gap-2.5">
          {cats.map((category) => (
            <div
              key={category?._id}
              className="bg-white p-5 flex flex-col items-center gap-3 group rounded-lg border border-transparent hover:border-tech_blue hoverEffect"
            >
              {category?.image && (
                <div className="overflow-hidden w-10 h-10 md:w-12 md:h-12">
                  <Link href={`/category/${category?.slug?.current}`}>
                    <Image
                      src={urlFor(category?.image).url()}
                      alt="categoryImage"
                      width={500}
                      height={500}
                      className="w-full h-full"
                    />
                  </Link>
                </div>
              )}
              <p className="text-xs md:text-sm font-semibold text-center line-clamp-1">
                {category?.title}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-gray-500 font-medium">
          No Categories Available
        </p>
      )}
    </Container>
  );
};

export default HomeCategories;
