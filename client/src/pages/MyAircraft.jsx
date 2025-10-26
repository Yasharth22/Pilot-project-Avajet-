import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AircraftAccountModal from "../components/AircraftAccountModal";
import AddAircraftModal from "../components/AddAircraftModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal"; // 👈 New Import
import "../assets/style.css";

// Key for local storage
const AIRCRAFT_STORAGE_KEY = 'camo_aircraft_list';

// BASE DATA DEFINED OUTSIDE THE COMPONENT FUNCTION
const defaultAircraftData = [
    { 
        tail: "AC-PLZ", msn: "2654", model: "A320-214", 
        maintenance: "A320-214 | S5I, 12", base: "Base X", 
        flightHours: "52787:28", flightCycles: "32623", 
        apuHours: "23517:00", apuCycles: "24588", 
        status: "Serviceable", serviceability: "Unserviceable" 
    },
];

const MyAircraft = () => {
    const navigate = useNavigate();
    const [expandedRow, setExpandedRow] = useState(null);

    // Main state for all aircraft data, safely loaded from Local Storage
    const [aircraftList, setAircraftList] = useState(() => {
        try {
            const savedList = localStorage.getItem(AIRCRAFT_STORAGE_KEY);
            return savedList ? JSON.parse(savedList) : defaultAircraftData;
        } catch (error) {
            console.error("Error loading data from local storage:", error);
            return defaultAircraftData;
        }
    });

    // Effect to save aircraft list to Local Storage whenever it changes
    useEffect(() => {
        localStorage.setItem(AIRCRAFT_STORAGE_KEY, JSON.stringify(aircraftList));
    }, [aircraftList]);

    // State for Modals and Search
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [selectedAircraftTail, setSelectedAircraftTail] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); 
    
    // 🆕 State for the custom Delete Confirmation Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // State to hold the data of the row being considered for deletion
    const [deleteCandidate, setDeleteCandidate] = useState(null); 

    // Handlers for Add Aircraft Modal
    const handleOpenAddModal = () => setIsAddModalOpen(true);
    const handleCloseAddModal = () => setIsAddModalOpen(false);

    // Function to add new aircraft from modal form
    const handleAddAircraft = (newAircraft) => {
        const newEntry = { ...newAircraft };
        setAircraftList(prevList => [...prevList, newEntry]);
    };
    
    // 🗑️ New: Handler to trigger the custom modal (replaces window.confirm)
    const handleOpenDeleteModal = (indexToDelete, tailNumber) => {
        setDeleteCandidate({ index: indexToDelete, tail: tailNumber });
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteCandidate(null);
    };

    // 🗑️ New: Final deletion logic, executed by the custom modal's "Delete" button
    const handleDeleteAircraftConfirm = () => {
        if (!deleteCandidate) return;

        const indexToDelete = deleteCandidate.index;
        setAircraftList(prevList => 
            // Filter out the item at the specified index
            prevList.filter((_, index) => index !== indexToDelete)
        );
        // Close the expanded row and the modal
        setExpandedRow(null); 
        handleCloseDeleteModal();
    };
    
    // 🗑️ MODIFIED: The function called by the table's trash icon
    const handleDeleteAircraft = (indexToDelete, tailNumber) => {
        handleOpenDeleteModal(indexToDelete, tailNumber);
    };
    
    // Existing handlers
    const toggleRow = (rowIndex) => {
        const newExpandedRow = expandedRow === rowIndex ? null : rowIndex;
        setExpandedRow(newExpandedRow);
        
        if (newExpandedRow !== null && aircraftList[newExpandedRow]) {
            setSelectedAircraftTail(aircraftList[newExpandedRow].tail); 
        } else {
            setSelectedAircraftTail(null);
        }
    };

    const handleOpenAccountModal = (tailNumber) => {
        setSelectedAircraftTail(tailNumber);
        setIsAccountModalOpen(true);
        setExpandedRow(null); 
    };

    const handleCloseAccountModal = () => {
        setIsAccountModalOpen(false);
    };

    const handleModuleClick = (route, label, tailNumber) => {
        if (label === "Aircraft Account") {
            handleOpenAccountModal(tailNumber);
            return;
        }
        
        if (route) {
            navigate(route);
        }
    };

    // Module Button data
    const moduleButtons = [
        { label: "Attachments", icon: "📎" },
        { label: "A/C Detail", icon: "🛩️", route: "/aircraft-details" },
        { label: "Configuration", icon: "⚙️", route: "/configuration" },
        { label: "Maintenance Tasks", icon: "⏱️", route: "/maintenance-tasks" },
        { label: "Aircraft Defects", icon: "⚠️", route: "/aircraft-defects" },
        { label: "TechLog Configuration", icon: "📝", route: "/techlog-configuration" },
        { label: "TechLog", icon: "🛠️", route: "/techlog-details" },
        { label: "Aircraft Flights", icon: "✈️", route: "/flights" },
        { label: "Daily Utilization", icon: "📊", route: "/daily-utilization" },
        { label: "Check Work Pack", icon: "📋", route: "/aircraft-check-workpack" },
        { label: "Aircraft Account", icon: "💳", route: "" }, 
        { label: "Oil Uplifts Setup", icon: "🛢️", route: "/oil-uplifts-setup" },
    ];

    const firstHalf = moduleButtons.slice(0, 6);
    const secondHalf = moduleButtons.slice(6);
    
    // Filtered list logic for search
    const filteredAircraftList = aircraftList.filter(aircraft =>
        Object.values(aircraft).some(val => 
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    return (
        <div className="aircraft-container">
            
            {/* Header: Search and Add Button */}
            <div className="aircraft-header-controls">
                
                {/* Search Bar */}
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search aircraft..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control input-search"
                    />
                </div>

                {/* Add New Aircraft Button */}
                <button 
                    onClick={handleOpenAddModal} 
                    className="btn btn-primary theme-accent-bg add-new-aircraft-btn"
                >
                    ADD NEW AIRCRAFT
                </button>

            </div>
            
            {/* Table Wrapper */}
            <div className="aircraft-table-wrapper compact">
                <table className="aircraft-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            {[
                                "Tail Number", "MSN Number", "Model", "Maintenance Program / Revision",
                                "Base", "Flight Hours", "Flight Cycles", "APU Hours", "APU Cycles",
                                "Status", "System Serviceability", "Actions",
                            ].map((h) => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAircraftList.map((aircraft, i) => ( 
                            <React.Fragment key={i}>
                                <tr className="aircraft-row">
                                    <td><input type="checkbox" /></td>
                                    <td>{aircraft.tail}</td>
                                    <td>{aircraft.msn}</td>
                                    <td>{aircraft.model}</td>
                                    <td>{aircraft.maintenance}</td>
                                    <td>{aircraft.base}</td>
                                    <td>{aircraft.flightHours}</td>
                                    <td>{aircraft.flightCycles}</td>
                                    <td>{aircraft.apuHours}</td>
                                    <td>{aircraft.apuCycles}</td>
                                    {/* Status coloring */}
                                    <td className={`status-${aircraft.status === 'Serviceable' ? 'green' : 'red'}`}>{aircraft.status}</td>
                                    <td className={`status-${aircraft.serviceability === 'Serviceable' ? 'green' : 'red'}`}>{aircraft.serviceability}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={() => toggleRow(i)} className="expand-btn">
                                                {expandedRow === i ? "▲" : "▼"}
                                            </button>
                                            <button className="edit-btn">✏️</button>
                                            {/* 🎯 LINK DELETE BUTTON TO THE NEW HANDLER */}
                                            <button 
                                                onClick={() => handleDeleteAircraft(i, aircraft.tail)} 
                                                className="delete-btn"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {expandedRow === i && (
                                    <tr>
                                        <td colSpan={13} className="expanded-cell">
                                            <div className="module-section">
                                                <div className="module-grid">
                                                    {firstHalf.map((btn, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleModuleClick(btn.route, btn.label, aircraft.tail)} 
                                                            className="module-btn"
                                                        >
                                                            <span>{btn.icon}</span> {btn.label}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="module-grid">
                                                    {secondHalf.map((btn, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleModuleClick(btn.route, btn.label, aircraft.tail)}
                                                            className="module-btn"
                                                        >
                                                            <span>{btn.icon}</span> {btn.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <span>1–{Math.min(filteredAircraftList.length, 5)} of {filteredAircraftList.length}</span>
                <div className="pagination-controls">
                    <span>Rows per page:</span>
                    <select>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                    <span>1/{Math.ceil(filteredAircraftList.length / 5)}</span>
                    <button>◀️</button>
                    <button>▶️</button>
                </div>
            </div>

            {/* Render Modals */}
            <AddAircraftModal
                isOpen={isAddModalOpen} 
                onClose={handleCloseAddModal} 
                onAddAircraft={handleAddAircraft} 
            />

            <AircraftAccountModal
                isOpen={isAccountModalOpen} 
                onClose={handleCloseAccountModal} 
                aircraftTailNumber={selectedAircraftTail || 'N/A'} 
            />
            
            {/* 🆕 Render the NEW custom confirmation modal */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen} 
                onClose={handleCloseDeleteModal} 
                onConfirm={handleDeleteAircraftConfirm} 
                aircraftTail={deleteCandidate ? deleteCandidate.tail : ''}
            />
        </div>
    );
};

export default MyAircraft;