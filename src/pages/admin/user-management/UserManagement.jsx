import { useEffect } from "react";
import useDashboard from "../../../hooks/useDashboard";
import { SyncLoader, BeatLoader } from "react-spinners";
import useHandleDelete from "../../../hooks/useHandleDelete";
import toast from "react-hot-toast";
import useHandleUpdate from "../../../hooks/useHandleUpdate";
import { FaTrashAlt, FaLockOpen, FaLock } from "react-icons/fa";
const UserManagement = () => {
  const { userState, fetchUsers, handleChange, selectedIds, setSelectedIds } =
    useDashboard();
  const { deleteState, handleDelete } = useHandleDelete();
  const { updateState, handleUpdate } = useHandleUpdate();
  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteHandler = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select user", { duration: 2000 });
      return;
    }
    try {
      await handleDelete(selectedIds);
      toast.success("Deleted Successfully");
      setSelectedIds([]);
      fetchUsers();
    } catch (error) {}
  };
  const updateHandler = async (status) => {
    if (selectedIds.length === 0) {
      toast.error("Please select user", { duration: 2000 });
      return;
    }
    const payload = { selectedIds, status };
    try {
      await handleUpdate(payload);
      setSelectedIds([]);
      fetchUsers();
    } catch (error) {
      if (updateState.errorMessage) {
        toast.error(updateState.errorMessage, { duration: 2000 });
      }
      console.log(error);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        <div className="flex gap-x-3 py-3 w-9/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <button
            className="p-2 w-30 text-gray-700 bg-red-400 rounded flex items-center justify-center"
            onClick={() => updateHandler("blocked")}
          >
            Block <FaLock className="ml-2" />
          </button>
          <button
            className="p-2 px-5 text-gray-700 bg-sky-400 rounded"
            onClick={() => updateHandler("active")}
          >
            <FaLockOpen />
          </button>
          <button
            className="p-2 px-5 text-gray-700 bg-red-400 rounded"
            onClick={deleteHandler}
          >
            <FaTrashAlt />
          </button>
        </div>
        <table className="w-9/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input
                  type="checkbox"
                  name="selectAll"
                  checked={userState.users.every((item) => item.isChecked)}
                  onChange={handleChange}
                />
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Last Login Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {userState.users.length > 0 &&
              userState.users.map((user) => (
                <tr
                  key={user.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      name={user.id}
                      checked={user?.isChecked}
                      onChange={handleChange}
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.logInTime &&
                      new Date(user.logInTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{user.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center my-4">
          <SyncLoader loading={userState.loading} size={12} />
          <BeatLoader loading={deleteState.loading} size={12} />
          <BeatLoader loading={updateState.loading} size={12} />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
