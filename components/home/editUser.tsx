import { useState } from "react"
import {  validateForm } from "../../utils/helper"
import { UserModel } from "../../utils/types"

const EditUser = ({ onClose, onEdit, user }: any) => {

    const [name, setName] = useState<string>(user.name)
    const [email, setEmail] = useState<string>(user.email)
    const [role, setRole] = useState<string>(user.role)
    const [errors, setErrors] = useState<any>({})


    const _onEdit = () => {
        setErrors({})
        let editData: UserModel = {
            id: user.id,
            name,
            email,
            role
        }
        validateForm(editData, setErrors, onEdit)
    }

    return (
        <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
            <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">

                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Edit User</h1>
                    <div className=" mb-5">
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                        <input id="name" className={`mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm  rounded border  ${errors.name ? "border-rose-600 focus:border-rose-600 " : "border-gray-300 focus:border-indigo-700 "}`} 
                            placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        {errors.name ? <span className="text-rose-600">{errors.name}</span> : null}
                    </div>

                    <div className=" mb-5">
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                        <input id="email" className={`mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm  rounded border  ${errors.email ? "border-rose-600 focus:border-rose-600 " : "border-gray-300 focus:border-indigo-700 "}`} 
                        type={"email"} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        {errors.email ? <span className="text-rose-600">{errors.email}</span> : null}
                    </div>


                    <div className=" mb-5">
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Role</label>
                        <input id="role" className={`mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm  rounded border  ${errors.role ? "border-rose-600 focus:border-rose-600 " : "border-gray-300 focus:border-indigo-700 "}`} 
                        placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
                        {errors.role ? <span className="text-rose-600">{errors.role}</span> : null}
                    </div>


                    <div className="flex items-center justify-start w-full">
                        <button type={"submit"} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={_onEdit}>Submit</button>
                        <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={onClose}>Cancel</button>
                    </div>
                    <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" role="button" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditUser