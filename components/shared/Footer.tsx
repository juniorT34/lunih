import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
    const date = new Date().getFullYear()
  return (
    <div className=" w-full mx-auto py-2 xl:py-4">
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>copyright &copy; {date} LUNIH. All rights reserved.</p>
        </div>
      </div>
  );
};

export default Footer;
