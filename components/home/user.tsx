import { useState } from "react"

const User = ({item, onDeleteStart, onEditStart, onSelect, isAll}: any) => {
    const [isSelected, setIsSelected] = useState(isAll)
    return (
        <tr >
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 mt-5">
                        <input type={"checkbox"} checked={ isSelected} name="id" onChange={() => {setIsSelected(!isSelected);onSelect(item.id)}}></input>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  text-center">
                <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  text-center">
                <p className="text-gray-900 whitespace-no-wrap">
                    {item.email}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  text-center">
                <p className="text-gray-900 whitespace-no-wrap">
                    {item.role}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  text-center">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight cursor-pointer" onClick={() => onEditStart(item)}>
                    <span aria-hidden
                        className="absolute inset-0  opacity-50 rounded-full bg-yellow-400"></span>
                    <span className="relative">Edit</span>
                </span>
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight cursor-pointer"
                    onClick={() => onDeleteStart(item.id)}>
                    <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">Delete</span>
                </span>
            </td>
        </tr>
    )
}

export default User