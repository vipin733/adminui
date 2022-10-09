const UserHeader = ({ids= [], isAll = false, onDelete, onSelectAll}: any) => {
    return (
        <thead>
            <tr>
                <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-left text-xs font-semibold text-gray-600 uppercase  tracking-wider">
                    <input type={"checkbox"} style={{ marginLeft: "14px" }} name="all" checked={isAll} onChange={() => onSelectAll(!isAll)}></input>
                    <span style={{ marginLeft: "14px" }}>{isAll ? "Un Select All" : "Select All"}</span>
                    {ids.length > 0 ? <span
                        className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight cursor-pointer"
                        onClick={() => onDelete()}
                    >
                        <span aria-hidden
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                        <span className="relative">Delete</span>
                    </span> : null}

                </th>
                <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                </th>
                <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                </th>
                <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                </th>
                <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                </th>
            </tr>
        </thead>
    )
}

export default UserHeader