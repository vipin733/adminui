import type { NextPage } from 'next'
import Layout from "../components/layout"
import { _deleteWarning, _editUser, _getUsers, _onTextChange, _updateIds } from '../utils/helper'
import { useEffect, useState } from 'react'
import { UserModel } from '../utils/types'
import Pagination from '../components/home/pagination'
import EditUser from '../components/home/editUser'
import User from '../components/home/user'
import UserHeader from '../components/home/userHead'
import SearchIbput from '../components/home/searchInput'

const Home: NextPage = () => {

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
      let currentUsers =  showUsers(currentPage, users)
      for (let index = 0; index < currentUsers.length; index++) {
        const element = currentUsers[index]
        allIds.push(element.id)
      }
    }
    let key = userCMPKey + 1
    setUserCMPKey(key)
    setIds(allIds)
    setIsAll(isAllSelect)
  }

  const _afterDelete = () => {
    let key = userCMPKey + 1
    setUserCMPKey(key)
    setIds([])
    setIsAll(false)
  }

  const showUsers = (page: number, users: UserModel[]): UserModel[] => {
    let skipItems = (page - 1) * 10
    let usersFilters: UserModel[] = []
    if (skipItems > -1) {
      usersFilters = users.slice(skipItems, 10 + skipItems)
    }
    return usersFilters
  }

  return (
    <Layout>

      <SearchIbput onChnage={(text: string) => _onTextChange(text, allUsers, setUsers)}/>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          {
            editUser ? <EditUser
              user={editUser}
              onSelectId={(id: string) => _updateIds(id, ids, setIds)}
              onEdit={(user: UserModel) => _editUser(setUsers, setUserEdit, users, user)}
              onClose={() => setUserEdit(undefined)} /> : null
          }

          <table className="min-w-full leading-normal">

            <UserHeader
              isAll={isAll}
              ids={ids}
              onDelete={() => _deleteWarning(ids,  users, allUsers, setAllUsers, setUsers, setIds, _afterDelete)}
              onSelectAll={(status: boolean) => _onSelectAll(status)} />

            <tbody key={userCMPKey.toString()}>
              {
                showUsers(currentPage, users).map((item) => {
                  return (
                    <User
                      ids={ids}
                      key={item.id}
                      item={item}
                      isAll={isAll}
                      onDeleteStart={(id: string) => _deleteWarning([id], users, allUsers, setAllUsers, setUsers, setIds, _afterDelete)}
                      onEditStart={(user: UserModel) => setUserEdit(user)}
                      onSelect={(id: string) => _updateIds(id, ids, setIds)}
                    />
                  )
                })
              }
            </tbody>
          </table>
          <Pagination currentPage={currentPage} allUsers={users} onPageChange={(page: number) => setCurrentPage(page)} />
        </div>
      </div>
    </Layout>
  )
}

export default Home
