import React, { useState } from "react";

const SearchBar = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="d-none d-md-block rounded">
            <div className="d-flex align-items-center rounded border px-2">
                {/* Search Icon - Click to toggle input field */}
                <div
                    className="px-2"
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                    style={{ cursor: "pointer" }}
                >
                    <i className="bx bx-search-alt fw-bold mt-2"></i>
                </div>

                {/* Search Input - Expands when icon is clicked */}
                <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    id="searchInput"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        borderRadius: "8px",
                        width: isSearchVisible ? "200px" : "0px",
                        opacity: isSearchVisible ? 1 : 0,
                        transition: "width 0.3s ease-in-out, opacity 0.3s ease-in-out",
                        padding: isSearchVisible ? "5px 10px" : "0",
                        overflow: "hidden"
                    }}
                />
            </div>
        </div>
    );
};

export default SearchBar;
