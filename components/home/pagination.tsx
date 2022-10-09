import { _getActionPage, _isFirstPage, _isLastPage } from "../../utils/helper"

const Pagination = ({currentPage = 1, allUsers = [], onPageChange} : any) => {

    let totalPage = Math.ceil(allUsers.length/10)

    return (
        <div
            className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <span className="text-xs xs:text-sm text-gray-900">
                Showing {currentPage} to {totalPage} of {allUsers.length} Users
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <button
                    onClick={() => _getActionPage(false, currentPage, totalPage, onPageChange)}
                    disabled={_isFirstPage(currentPage)}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                </button>
                <button
                    disabled={_isLastPage(currentPage, totalPage)}
                    onClick={() => _getActionPage(true, currentPage, totalPage, onPageChange)}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination