import Link from "next/link";
import React from "react";

const Footer = () => {
    const date = new Date().getFullYear()
  return (
    <div className="flex flex-col text-center py-2 xl:py-4">
      <Link href={"/"}>
        <h1 className="text-2xl">
          LUN<span className="text-primary-100">IH</span>
        </h1>
      </Link>
      <p>copyright &copy; {date}, all rights reserved.</p>
    </div>
  );
};

export default Footer;
