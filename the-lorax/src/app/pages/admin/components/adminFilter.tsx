import React, { useState, useEffect } from 'react';
import "../adminDashboard.css";
import fetchUserData from '../../../../data/users';
import { User } from '../../../../types/user'
import Filter from "./filter";
import edit from '../../../../images/buttons/3-dots.svg';

export default function AdminFilter() {
    const [userData, setUserData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<keyof User | null>(null);
    const usersPerPage = 15;

    // Fetch the user data when the component mounts
    useEffect(() => {
        const getData = async () => {
            const data = await fetchUserData();
            setUserData(data);
        };
        getData();
    }, []);

    // Sort the data based on the selected sort key
    const sortedData = React.useMemo(() => {
        if (sortKey) {
            return [...userData].sort((a, b) => {
                const aValue = a[sortKey] ?? '';
                const bValue = b[sortKey] ?? '';

                if (aValue === undefined || aValue === '') return 1;
                if (bValue === undefined || bValue === '') return -1;

                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            });
        }
        return userData;
    }, [userData, sortKey]);

    // Calculate the index range for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedData.slice(indexOfFirstUser, indexOfLastUser);

    // Handle page changes
    const handleNextPage = () => {
        if (currentPage < Math.ceil(userData.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle sorting when clicking on the filter buttons
    const handleSort = (key: keyof User) => {
        setSortKey(key);
    };

    return (
        <div className="admin-body">
            <Filter onSort={handleSort} />

            <div className="admin-filter">
                <div className="admin-filter-header">
                    <span className="admin-filter-column">Edit</span>
                    <span className="admin-filter-column">Username</span>
                    <span className="admin-filter-column">Email</span>
                    <span className="admin-filter-column">Full Name</span>
                    <span className="admin-filter-column">Data Permissions</span>
                    <span className="admin-filter-column">User Permissions</span>
                </div>

                <div className="admin-filter-container">
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                            <div key={user.username} className="admin-filter-row">
                                <span className="admin-filter-column">
                                    <img src={edit} alt="Three Icon" className="three-dots-icon" ></img>
                                </span>
                                <span className="admin-filter-column">{user.username}</span>
                                <span className="admin-filter-column">{user.email}</span>
                                <span className="admin-filter-column">{user.full_name}</span>
                                <span className="admin-filter-column">{user.data_permissions ? "Yes" : "No"}</span>
                                <span className="admin-filter-column">{user.user_permissions ? "Yes" : "No"}</span>
                            </div>
                        ))
                    ) : (
                        <p>No users found</p>
                    )}
                </div>

                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage}</span>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(userData.length / usersPerPage)}>Next</button>
                </div>
            </div>
        </div>
    );
}
