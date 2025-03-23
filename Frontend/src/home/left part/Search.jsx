import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import usegetallusers from '../../context/usegetallusers.jsx';
import useconversation from '../../zustand/useconversation.js';
import toast from 'react-hot-toast';

function Search() {
    const [search, setSearch] = useState("");
    const [allUsers] = usegetallusers();
    const { setselectedconversation } = useconversation();
    console.log("Users List:", allUsers, Array.isArray(allUsers));

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!search) return;
    
        // Extract array from object (if needed)
        const usersArray = Array.isArray(allUsers.filteredusers) 
            ? allUsers.filteredusers 
            : [];

    
        const conversation = usersArray.find((user) =>
            user.fullname.toLowerCase().includes(search.toLowerCase())
        );
    
        if (conversation) {
            setselectedconversation(conversation);
            setSearch("");
        } else {
           toast.error("User not found");
        }
    };
    

    return (
        <div className='h-[10vh]'>
            <div className='px-6 py-4'>
                <form onSubmit={handlesubmit}>
                    <div className='flex space-x-3'>
                        <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
                            <input 
                                type="text"
                                className="grow outline-none bg-transparent"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>
                        <button type="submit">
                            <FaSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;

