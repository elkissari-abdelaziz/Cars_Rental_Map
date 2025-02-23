import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "@/config/store/actions/userActions";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Swal from "sweetalert2";


const UsersManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter ? user.role === roleFilter : true;

    return matchesSearch && matchesRole;
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#313848] mb-6 text-center">Users Management</h1>
      <hr className="mb-6 border-gray-300" />

      <Card className="shadow-lg bg-[#e2e2e2] border-[#4a3856] p-4">
        <CardHeader>
          <CardTitle className="text-xl text-[#4a3856]">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 border border-[#4a3856] focus:ring-[#4a3856] p-2 rounded-md"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-1/4 border border-[#4a3856] p-2 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-[#4a3856] focus:outline-none"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
              <thead className="bg-[#313848] text-white">
                <tr>
                  <th className="p-3 text-center">#</th>
                  <th className="p-3 text-center">Name</th>
                  <th className="p-3 text-center">Email</th>
                  <th className="p-3 text-center">Role</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors border-t text-center">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            user.role === "admin" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button
                          variant="destructive"
                          className="px-3 py-1"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-red-500 font-bold">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;
