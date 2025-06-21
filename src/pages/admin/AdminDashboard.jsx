// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllUsers, useMakeAdmin } from '../../hooks/admin/useAdminUser';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [appliedFilters, setAppliedFilters] = useState({
        page: 1,
        limit: 10,
        search: '',
        role: '',
        sort: 'desc'
    });

    const [localSearchTerm, setLocalSearchTerm] = useState(appliedFilters.search);
    const [localRole, setLocalRole] = useState(appliedFilters.role);
    const [localSort, setLocalSort] = useState(appliedFilters.sort);

    const { data: userData, isLoading, isError, error } = useAllUsers(appliedFilters);
    const { mutate: promoteUserToAdmin, isPending: isPromoting } = useMakeAdmin();

    useEffect(() => {
        setLocalSearchTerm(appliedFilters.search);
        setLocalRole(appliedFilters.role);
        setLocalSort(appliedFilters.sort);
    }, [appliedFilters]);

    const handleSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleRoleChange = (e) => {
        setLocalRole(e.target.value);
    };

    const handleSortChange = (e) => {
        setLocalSort(e.target.value);
    };

    const handleApplyFilters = () => {
        setAppliedFilters({
            page: 1,
            limit: 10,
            search: localSearchTerm,
            role: localRole,
            sort: localSort
        });
    };

    const handlePageChange = (newPage) => {
        setAppliedFilters(prev => ({
            ...prev,
            page: newPage
        }));
    };

    const handleMakeAdmin = (userId) => {
        if (window.confirm("Are you sure you want to promote this user to admin?")) {
            promoteUserToAdmin(userId);
        }
    };

    const handleViewUser = (userId) => {
        navigate(`/admin/users/${userId}`);
    };

    if (isLoading) {
        return <div className="text-white text-xl flex justify-center items-center min-h-[50vh]">Loading users...</div>;
    }

    if (isError) {
        return <div className="text-red-400 text-xl flex justify-center items-center min-h-[50vh]">Error: {error?.message || "Failed to fetch users."}</div>;
    }

    const users = userData?.data?.users || [];
    // const totalUsers = userData?.data?.total || 0;
    const currentPage = userData?.data?.page || 1;
    const totalPages = userData?.data?.pages || 1;

    return (
        <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-xl text-white font-inter">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-400">Admin Dashboard - User Management</h1>

            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleApplyFilters();
                        }
                    }}
                    className="w-full md:flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out"
                />
                <select
                    value={localRole}
                    onChange={handleRoleChange}
                    className="w-full md:w-1/4 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out"
                >
                    <option value="">All Roles</option>
                    <option value="shop_owner">Shop Owner</option>
                    <option value="admin">Admin</option>
                </select>
                <select
                    value={localSort}
                    onChange={handleSortChange}
                    className="w-full md:w-1/4 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out"
                >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
                <Button
                    onClick={handleApplyFilters}
                    className="w-full md:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-200 ease-in-out"
                >
                    Apply Filters
                </Button>
            </div>

            {users.length === 0 ? (
                <div className="text-center text-gray-400 py-10">No users found matching your criteria.</div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Phone Numbers
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-gray-700 cursor-pointer" 
                                    onClick={() => handleViewUser(user._id)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {user.phoneNumbers.join(', ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
                                        {user.role === 'admin' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                                                <Store className="h-3 w-3 mr-1" /> Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                Shop Owner
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {user.role !== 'admin' && (
                                            <Button
                                                onClick={(e) => { e.stopPropagation(); handleMakeAdmin(user._id); }}
                                                disabled={isPromoting}
                                                className="px-3 py-1 text-xs rounded-md bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
                                            >
                                                {isPromoting ? 'Promoting...' : 'Make Admin'}
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLoading}
                        variant="outline"
                        className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600 rounded-md"
                    >
                        Previous
                    </Button>
                    <span className="text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoading}
                        variant="outline"
                        className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600 rounded-md"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
