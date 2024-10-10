import React, { useState, useEffect } from "react";

const DisputeResolution = () => {
  const [ongoingDisputes, setOngoingDisputes] = useState([]);
  const [resolvedDisputes, setResolvedDisputes] = useState([]);

  useEffect(() => {
    // Dummy data for ongoing and resolved disputes
    setOngoingDisputes([
      {
        id: 1,
        user: "Alice Johnson",
        issue: "Delayed Shipment",
        status: "Open",
      },
      {
        id: 2,
        user: "Bob Wilson",
        issue: "Product Not as Described",
        status: "Open",
      },
    ]);

    setResolvedDisputes([
      {
        id: 1,
        user: "Charlie Brown",
        issue: "Received Damaged Product",
        resolution: "Refund Issued",
      },
      {
        id: 2,
        user: "David Smith",
        issue: "Incorrect Item Shipped",
        resolution: "Replacement Sent",
      },
    ]);
  }, []);

  const handleResolveDispute = (id) => {
    const disputeToResolve = ongoingDisputes.find((d) => d.id === id);
    setOngoingDisputes((prev) => prev.filter((dispute) => dispute.id !== id));
    setResolvedDisputes((prev) => [
      ...prev,
      {
        id: resolvedDisputes.length + 1,
        user: disputeToResolve.user,
        issue: disputeToResolve.issue,
        resolution: "Resolved",
      },
    ]);
  };

  return (
    <div className="dispute-resolution p-4 sm:p-6 lg:p-8 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Dispute & Resolution Dashboard
      </h1>

      {/* Ongoing Disputes Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ongoing Disputes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">User</th>
                <th className="py-2 px-4 border-b text-left">Issue</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {ongoingDisputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{dispute.user}</td>
                  <td className="py-2 px-4 border-b">{dispute.issue}</td>
                  <td
                    className={`py-2 px-4 border-b text-${
                      dispute.status === "Open" ? "yellow-500" : "green-500"
                    }`}
                  >
                    {dispute.status}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition"
                      onClick={() => handleResolveDispute(dispute.id)}
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Resolved Disputes Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Resolved Disputes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">User</th>
                <th className="py-2 px-4 border-b text-left">Issue</th>
                <th className="py-2 px-4 border-b text-left">Resolution</th>
              </tr>
            </thead>
            <tbody>
              {resolvedDisputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{dispute.user}</td>
                  <td className="py-2 px-4 border-b">{dispute.issue}</td>
                  <td className="py-2 px-4 border-b text-green-600">
                    {dispute.resolution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Actions Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Actions</h2>
        <ul className="list-disc pl-5">
          <li>Monitor ongoing disputes closely.</li>
          <li>Ensure timely resolutions for customer satisfaction.</li>
          <li>Gather feedback from users post-resolution.</li>
        </ul>
      </section>
    </div>
  );
};

export default DisputeResolution;
