import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CompaniesTable = () => {
  const companies = useSelector(state => state.company.allCompanies);
  const searchText = useSelector(state => state.company.searchCompanyByText);

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!filtered.length)
    return <div className="text-center text-gray-500 italic py-6">No companies found.</div>;

  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Created</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map(c => (
          <tr key={c._id} className="border-t">
            <td className="p-3">{c.name}</td>
            <td className="p-3">{new Date(c.createdAt).toLocaleDateString()}</td>
            <td className="p-3">{c.status || "Active"}</td>
            <td className="p-3">
              <Link
                to={`/admin/companies/${c._id}`}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompaniesTable;
