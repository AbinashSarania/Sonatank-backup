import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

const SecurityCompliance = () => {
  // Dummy data for various sections
  const [kycDocuments, setKycDocuments] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [moderationQueue, setModerationQueue] = useState([]);

  useEffect(() => {
    // Dummy KYC documents
    setKycDocuments([
      { id: 1, user: 'John Doe', role: 'Customer', document: 'ID Proof', status: 'Pending' },
      { id: 2, user: 'Jane Smith', role: 'Jeweller', document: 'GST Certificate', status: 'Approved' },
    ]);

    // Dummy approval requests
    setApprovalRequests([
      { id: 1, user: 'Alice Johnson', type: 'Pawn Request', status: 'Pending' },
      { id: 2, user: 'Bob Wilson', type: 'Jewellery Listing', status: 'Pending' },
    ]);

    // Dummy audit logs
    setAuditLogs([
      { id: 1, action: 'Added Jewellery Listing', user: 'John Doe', time: '2 hours ago' },
      { id: 2, action: 'Edited Pawn Transaction', user: 'Jane Smith', time: '5 hours ago' },
    ]);

    // Dummy alerts
    setAlerts([
      { id: 1, message: 'Suspicious activity detected for user: Bob Wilson', type: 'Fraud Alert' },
      { id: 2, message: 'Fake listing flagged for review', type: 'Content Alert' },
    ]);

    // Dummy moderation queue
    setModerationQueue([
      { id: 1, item: 'Listing', content: 'Gold Necklace - 18K', status: 'Pending' },
      { id: 2, item: 'Review', content: 'This is a fake product!', status: 'Pending' },
    ]);
  }, []);

  const handleApproveKyc = (id) => {
    setKycDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: 'Approved' } : doc))
    );
  };

  const handleApproveRequest = (id) => {
    setApprovalRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    );
  };

  const handleModerationAction = (id, action) => {
    setModerationQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: action === 'approve' ? 'Approved' : 'Rejected' } : item
      )
    );
  };

  return (
    <div className="security-compliance px-4 sm:px-6 lg:px-8 py-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Security & Compliance Dashboard</h1>

      {/* KYC Section */}
      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">KYC (Know Your Customer)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-100 text-left text-sm uppercase font-semibold tracking-wide">
                  <th className="py-2 px-4 sm:py-4">User</th>
                  <th className="py-2 px-4 sm:py-4">Role</th>
                  <th className="py-2 px-4 sm:py-4">Document</th>
                  <th className="py-2 px-4 sm:py-4">Status</th>
                  <th className="py-2 px-4 sm:py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {kycDocuments.map((doc) => (
                  <tr key={doc.id} className="border-t">
                    <td className="py-2 px-4 sm:py-4">{doc.user}</td>
                    <td className="py-2 px-4 sm:py-4">{doc.role}</td>
                    <td className="py-2 px-4 sm:py-4">{doc.document}</td>
                    <td className={`py-2 px-4 sm:py-4 ${doc.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {doc.status}
                    </td>
                    <td className="py-2 px-4 sm:py-4">
                      {doc.status === 'Pending' && (
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          onClick={() => handleApproveKyc(doc.id)}
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Approval Workflow Section */}
      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Approval Workflow</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-100 text-left text-sm uppercase font-semibold tracking-wide">
                  <th className="py-2 px-4 sm:py-4">User</th>
                  <th className="py-2 px-4 sm:py-4">Request Type</th>
                  <th className="py-2 px-4 sm:py-4">Status</th>
                  <th className="py-2 px-4 sm:py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {approvalRequests.map((req) => (
                  <tr key={req.id} className="border-t">
                    <td className="py-2 px-4 sm:py-4">{req.user}</td>
                    <td className="py-2 px-4 sm:py-4">{req.type}</td>
                    <td className={`py-2 px-4 sm:py-4 ${req.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {req.status}
                    </td>
                    <td className="py-2 px-4 sm:py-4">
                      {req.status === 'Pending' && (
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          onClick={() => handleApproveRequest(req.id)}
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Audit Logs Section */}
      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Audit Logs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-100 text-left text-sm uppercase font-semibold tracking-wide">
                  <th className="py-2 px-4 sm:py-4">Action</th>
                  <th className="py-2 px-4 sm:py-4">User</th>
                  <th className="py-2 px-4 sm:py-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-t">
                    <td className="py-2 px-4 sm:py-4">{log.action}</td>
                    <td className="py-2 px-4 sm:py-4">{log.user}</td>
                    <td className="py-2 px-4 sm:py-4">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Real-Time Monitoring & Alerts Section */}
      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Real-Time Monitoring & Alerts</h2>
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} className="flex items-center mb-4">
                <FaExclamationCircle className="text-red-500 mr-2" />
                <span>{alert.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Listing and Review Moderation Section */}
      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Listing and Review Moderation</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-100 text-left text-sm uppercase font-semibold tracking-wide">
                  <th className="py-2 px-4 sm:py-4">Item</th>
                  <th className="py-2 px-4 sm:py-4">Content</th>
                  <th className="py-2 px-4 sm:py-4">Status</th>
                  <th className="py-2 px-4 sm:py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {moderationQueue.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-2 px-4 sm:py-4">{item.item}</td>
                    <td className="py-2 px-4 sm:py-4">{item.content}</td>
                    <td className={`py-2 px-4 sm:py-4 ${item.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {item.status}
                    </td>
                    <td className="py-2 px-4 sm:py-4 flex gap-2">
                      {item.status === 'Pending' && (
                        <>
                          <button
                            className="text-blue-600 hover:text-blue-800 transition"
                            onClick={() => handleModerationAction(item.id, 'approve')}
                          >
                            Approve
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 transition"
                            onClick={() => handleModerationAction(item.id, 'reject')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityCompliance;
