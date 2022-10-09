import { Dispatch, SetStateAction } from "react";
import { messages } from "./enums";
import { UserModel } from "./types";

export const _getUsers = async (setUsers: Dispatch<SetStateAction<UserModel[]>>, setAllUsers: Dispatch<SetStateAction<UserModel[]>>) => {
    let users: UserModel[] = []
    try {
        let url = `${process.env.NEXT_PUBLIC_USERS_URL}`
        let response = await fetch(url)
        let usersBody = await response.json()
        for (let index = 0; index < usersBody.length; index++) {
            const element = usersBody[index];
            let user: UserModel = {
                id: element.id,
                name: element.name,
                email: element.email,
                role: element.role
            }
            users.push(user)
        }
        setUsers(users)
        setAllUsers(users)
    } catch (error) {
    }
}


export const _editUser = async (setUsers: Dispatch<SetStateAction<UserModel[]>>, setUserEdit: Dispatch<SetStateAction<UserModel | undefined>>, users: UserModel[], user: UserModel) => {
    users = users.map(d => {
        if (d.id == user.id) {
            d = { ...user }
        }
        return d
    })
    setUsers(users)
    setUserEdit(undefined)
}

export const _deleteUsers = (ids: string[], users: UserModel[],  allUsers: UserModel[], setAllUsers: Dispatch<SetStateAction<UserModel[]>>, setUsers: Dispatch<SetStateAction<UserModel[]>>, callback: any) => {
    
    let usersFilters = [...users].filter(user => {
        if (!ids.includes(user.id)) {
            return user
        }
    })

    let allUsersFilters = [...allUsers].filter(user => {
        if (!ids.includes(user.id)) {
            return user
        }
    })
    setAllUsers(allUsersFilters)
    setUsers(usersFilters)
    callback()
}

export const _deleteWarning = (ids: string[], users: UserModel[], allUsers:   UserModel[], setAllUsers: Dispatch<SetStateAction<UserModel[]>>, setUsers: Dispatch<SetStateAction<UserModel[]>>, setIds: Dispatch<SetStateAction<string[]>>, callback: any) => {
    let status = confirm("Are you sure want to delete item")
    if (status) {
        setIds([])
        _deleteUsers(ids, users, allUsers, setAllUsers, setUsers, callback)
    }
}

export const _updateIds = (id: string, ids: string[], setIds: Dispatch<SetStateAction<string[]>>) => {
    let allIds = [...ids]
    if (!ids.includes(id)) {
        allIds.push(id)
    } else {
        allIds = ids.filter(i => i != id)
    }    
    setIds(allIds)
}


export const validateEmail = (email: string): boolean  => {
    let valid =  String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    return valid ? true : false
}

export const _isLastPage = (page: number, totalPage: number) : boolean => {
    return page == totalPage
}

export const _isFirstPage = (page: number) : boolean => {
    return page == 1
}

export const _getActionPage = (isNext: boolean, page: number, totalPage: number, onPageChange: any) => {
    let actionPage = page
    if (isNext) {
        if (!_isLastPage(page, totalPage)) {
            actionPage = page + 1
        }
    }else{
        if (!_isFirstPage(page)) {
            actionPage = page - 1
        }
    }
    onPageChange(actionPage)
}



export const validateForm = (editData : UserModel, setErrors: Dispatch<any>, onEdit: any) => {
    
    let errorData: any = {}
    if (!editData.name) {
        errorData.name = `Name${messages.fieldRequired}`
    }
    if (!editData.email) {
        errorData.email = `Email${messages.fieldRequired}`
    }
    if (!editData.role) {
        errorData.role = `Role${messages.fieldRequired}`
    }


    let isValidEmail = validateEmail(editData.email)
    if (!isValidEmail && editData.email) {
        errorData.email = `Email${messages.fieldNotValid}`
    }


    if (Object.keys(errorData).length) {
        return setErrors(errorData)
    }

    onEdit(editData)
}

const debounce = (func: any, timeout: number) => {
    let timer : any
    return (...arg: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, arg)
        }, timeout)
    }
}

const _filterUsers = (text: string,  allUsers: UserModel[], setUsers:  Dispatch<SetStateAction<UserModel[]>>) => {
    if (!text) {
        return setUsers(allUsers)
    }
    let filters = allUsers.filter((user) => {
        let name  = user.name.toLowerCase()
        let role  = user.role.toLowerCase()
        let email  = user.email.toLowerCase()
        text = text.toLowerCase()
        if (name.search(text) > -1 || role.search(text) > -1 || email.search(text) > -1) {
            return user
        }

    })
    setUsers(filters)
}

export const _onTextChange = debounce((text: string,  allUsers: UserModel[], setUsers:  Dispatch<SetStateAction<UserModel[]>>) => _filterUsers(text,  allUsers, setUsers), 1000)