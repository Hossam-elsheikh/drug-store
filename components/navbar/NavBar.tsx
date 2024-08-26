import React from "react";

import Icons from "./Icons";
import CategoriesBar from "./CategoriesBar";
import SearchMed from "./Search";
import LogoAndSearch from "./LogoAndSearch";

const NavBar = () => {
    return (
        <div className="flex flex-col sticky top-0 z-50">
            <div className="flex items-center justify-between gap-6 border-2 px-5 py-2 bg-white">
                <LogoAndSearch />
                <div className="flex items-center gap-5">
                    <Icons />
                </div>
            </div>
          
         
            {/* SearchMed visible on smaller screens */}
            <div className="block sm:hidden">
                <SearchMed />
            </div>
            <CategoriesBar />
        </div>
    );
};

export default NavBar;
