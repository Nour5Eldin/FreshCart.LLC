"use client";
import useCartStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const { items } = useCartStore();

  return (
    <Link
      href={"/cart"}
      className="group relative hidden lg:flex items-center gap-2.5 justify-end"
    >
      {/* أيقونة + البادج */}
      <div className="relative">
        <ShoppingBag className="w-5 h-5 group-hover:text-tech_yellow hoverEffect" />
        <span className="absolute -top-1 -right-1 bg-tech_yellow text-tech_dark h-4 w-4 rounded-full text-[10px] font-semibold flex items-center justify-center">
          {items?.length ? items?.length : 0}
        </span>
      </div>

      {/* النص */}
      <div className="flex flex-col">
        <h4 className="text-base font-bold text-tech_white">Cart</h4>
        <p className="text-xs whitespace-nowrap">view cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;

