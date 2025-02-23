import React from "react";
import { cn } from "@/lib/utils"; 
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-[#4a3856] text-white text-center p-4 shadow-md"
      )}
    >
      <p className="mb-0">&copy; {year} Car Rental. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
