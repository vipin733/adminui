import { Fragment, useEffect, useState } from "react"
import { _deleteUsers, _deleteWarning, _editUser, _getUsers, _updateIds } from "../../utils/helper"
import { UserModel } from '../../utils/types';
import EditUser from "./editUser";
import Pagination from "./pagination";
import User from "./user";

const Users = () => {

    const [allUsers, setAllUsers] = useState<(UserModel[])>([])
    const [users, setUsers] = useState<(UserModel[])>([])
    const [editUser, setUserEdit] = useState<UserModel>()
    const [ids, setIds] = useState<string[]>([])
    const [isAll, setIsAll] = useState<boolean>(false)
    const [userCMPKey, setUserCMPKey] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)


    useEffect(() => {
        _getUsers(setUsers, setAllUsers)
    }, [])

    const _onSelectAll = (isAllSelect: boolean) => {
        let allIds = []
        if (isAllSelect) {
            for (let index = 0; index < users.length; index++) {
                const element = users[index]
                allIds.push(element.id)
            }
        }
        let key = userCMPKey + 1
        setUserCMPKey(key)
        setIds(allIds)
        setIsAll(isAllSelect)
    }

    return (
        <Fragment>

            {
                editUser ? <EditUser
                    user={editUser}
                    onSelectId={(id: string) => _updateIds(id, ids, setIds)}
                    onEdit={(user: UserModel) => _editUser(setUsers, setUserEdit, users, user)}
                    onClose={() => setUserEdit(undefined)} /> : null
            }

            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-left text-xs font-semibold text-gray-600 uppercase  tracking-wider">
                            <input type={"checkbox"} style={{ marginLeft: "14px" }} name="all" checked={isAll} onChange={() => _onSelectAll(!isAll)}></input>
                            <span style={{ marginLeft: "14px" }}>{isAll ? "Un Select All" : "Select All"}</span>
                            {ids.length > 1 ? <span
                                className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight cursor-pointer"
                                onClick={() => _deleteWarning(ids, users, setUsers, setIds)}
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
                <tbody key={userCMPKey.toString()}>

                    {
                        users.map((item) => {
                            return (
                                <User
                                    ids={ids}
                                    key={item.id}
                                    item={item}
                                    isAll={isAll}
                                    onDeleteStart={(id: string) => _deleteWarning([id], users, setUsers, setIds)}
                                    onEditStart={(user: UserModel) => setUserEdit(user)}
                                    onSelect={(id: string) => _updateIds(id, ids, setIds)}
                                />
                            )
                        })
                    }

                </tbody>
            </table>
            <Pagination currentPage={currentPage} allUsers={allUsers}/>
        </Fragment>
    )
}

export default Users