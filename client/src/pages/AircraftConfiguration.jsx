import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Settings, FileText, Package, Wrench, Edit, Download } from 'lucide-react';
import ConfigurationCard from '../components/ConfigurationCard'; 
// Assuming you import your CSS file globally, or here if necessary:
// import '../styles/aircraft-config.css'; 

const majorComponents = [
  { position: 'Engine 2 (RH)', partNo: 'V2527-A5', serialNo: '1500A/860', tsn: '500 / 150', limit: '500 / 800', installedDate: '2023-06-01' },
  { position: 'Engine 1 (LH)', partNo: 'V2527-A5', serialNo: '1500B/800', tsn: '500 / 150', limit: '500 / 800', installedDate: '2023-06-01' },
  { position: 'APU', partNo: 'GTCP131-9A', serialNo: '3700-B9-20', tsn: '2050 / 520', limit: '5,000 / 5,000', installedDate: '2022-05-20' },
  { position: 'Nose Gear', partNo: 'LGR-N200', serialNo: 'NGEAR-789', tsn: '400 / 250', limit: '5,000 / 2,500', installedDate: '2021-08-15' },
];

const modificationData = [
  { reference: 'SB-A023-05-01', status: 'Complied', date: '2023-05-01', workOrder: 'WO-9976' },
  { reference: 'AD-2023-05-01', status: 'Required', date: '-', workOrder: 'WO-9900' },
  { reference: 'SB-2023-25-045', status: 'Required', date: '-', workOrder: 'New Cabin Seats' },
];

const AircraftConfiguration = () => {
    const { tailnumber } = useParams();
    const tailNumber = tailnumber || "AC-PLZ"; 
    const msn = "2654";
    const type = "A320-214";
    const homebase = "Base X";

    const basePath = `/my-aircraft/${tailNumber}`; 
    const navTabs = [
        { name: 'Attachments', path: `${basePath}/attachments` },
        { name: 'Configuration', path: `/aircraft-configuration/${tailNumber}` },
        { name: 'A/C Details', path: `/aircraft-details/${tailNumber}` }, 
        { name: 'Maintenance Tasks', path: `${basePath}/maintenance` },
    ];

    return (
        // Apply main page container class
        <div className="config-page-container">
            
            {/* Page Title and Secondary Nav (Tabs) */}
            <div className="flex items-center space-x-4 mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Aircraft Configuration</h1>
                
                {/* Navigation Tabs (Using Custom Classes) */}
                <div className="config-nav-tabs">
                    {navTabs.map(tab => (
                        <Link
                            key={tab.name}
                            to={tab.path}
                            className={`config-nav-tab ${tab.name === 'Configuration' ? 'active-tab' : ''}`}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </div>
                <span className="text-gray-500 text-sm ml-4">({tailNumber} | MSN {msn})</span>
            </div>

            {/* Apply two-column layout class */}
            <div className="config-two-column-layout">
                
                {/* LEFT COLUMN: Summary Cards */}
                <div className="config-left-column">

                    {/* Aircraft Identity Card */}
                    <ConfigurationCard 
                        title="Aircraft Identity" 
                        icon={<Settings className="w-5 h-5 text-red-600" />}
                        onEdit={() => console.log('Edit Identity')}
                    >
                        <div className="text-sm text-gray-700 space-y-1">
                            <p><strong>Registration:</strong> {tailNumber}</p>
                            <p><strong>Type:</strong> {type}</p>
                            <p><strong>Homebase:</strong> {homebase}</p>
                            <p><strong>Certificate of Airworthiness:</strong> 2023-01-15 (Expires: 2024-01-15)</p>
                            <p><strong>Noise Certificate:</strong> Current</p>
                        </div>
                    </ConfigurationCard>
                    
                    {/* Installed Equipment & Inventory Card */}
                    <ConfigurationCard 
                        title="Installed Equipment & Inventory" 
                        icon={<Package className="w-5 h-5 text-red-600" />}
                        onEdit={() => console.log('Edit Equipment')}
                    >
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>**Avionics:** FMS 2.1, RDR-4000 Weather Radar</li>
                            <li>**Cabin:** 150 PAX (Y150), Fwd Galley, SatCom Wi-Fi</li>
                            <li>**Emergency:** 5 Vests, ELT (SN: 937)</li>
                        </ul>
                    </ConfigurationCard>

                    {/* Modifications & Service Bulletins Card */}
                    <ConfigurationCard 
                        title="Modifications & Service Bulletins" 
                        icon={<Wrench className="w-5 h-5 text-red-600" />}
                        onEdit={() => console.log('Edit Mods')}
                    >
                        <div className="overflow-x-auto">
                            <table className="config-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Reference</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Compliance Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modificationData.map((mod, index) => (
                                        <tr key={index}>
                                            <td className="font-medium text-gray-900">{mod.reference}</td>
                                            <td>
                                                <span className={mod.status === 'Complied' ? 'status-green' : 'status-red'}>
                                                    {mod.status}
                                                </span>
                                            </td>
                                            <td>{mod.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ConfigurationCard>
                </div>

                {/* RIGHT COLUMN: Major Components Table (Tracked Parts) */}
                <div className="config-right-column">
                    <ConfigurationCard 
                        title="Major Components (Tracked Parts)" 
                        icon={<FileText className="w-5 h-5 text-red-600" />}
                        noBorder
                    >
                        {/* Table is wrapped by config-table-container for overall styling */}
                        <div className="config-table-container">
                            <table className="config-table">
                                <thead>
                                    <tr>
                                        {['Position', 'Part No.', 'Serial No.', 'TSN (FH / FC)', 'Life Limit Remaining', 'Installed Date'].map(header => (
                                            <th key={header} scope="col">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {majorComponents.map((component, index) => (
                                        <tr key={index}>
                                            <td className="font-medium text-gray-900">{component.position}</td>
                                            <td>{component.partNo}</td>
                                            <td>{component.serialNo}</td>
                                            <td>{component.tsn}</td>
                                            {/* Apply custom color for the limit remaining column */}
                                            <td className="text-red-600 font-semibold">{component.limit}</td>
                                            <td>{component.installedDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ConfigurationCard>
                </div>
            </div>

            {/* Action Buttons (Bottom Right) */}
            <div className="config-action-button-group">
                <button 
                    onClick={() => console.log('Edit Configuration')}
                    className="config-action-button primary"
                >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Configuration
                </button>
                <button 
                    onClick={() => console.log('Print Report')}
                    className="config-action-button secondary"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Print Report
                </button>
            </div>

        </div>
    );
};

export default AircraftConfiguration;
