import React from "react";
import User from "./User";
import usegetallusers from "../../context/usegetallusers"; // ✅ Correct import

function Users() {
    const [allusers, loading] = usegetallusers(); // ✅ Correct function call

    // Ensure allusers is an object and extract the array safely
    const userList = allusers?.filteredusers || [];

    console.log("Users List:", userList); // ✅ Debugging

    return (
        <div>
            <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
                Messages
            </h1>
            <div className="py-2 flex-1 overflow-y-auto" style={{ maxHeight: "calc(84vh - 10vh)" }}>
                {loading ? (
                    <p className="text-white px-8 py-2">Loading users...</p>
                ) : userList.length > 0 ? (
                    userList.map((user, index) => (
                        <User key={user._id} user={user} />
                    ))
                ) : (
                    <p className="text-white px-8 py-2">No users found</p>
                )}
            </div>
        </div>
    );
}

export default Users;



