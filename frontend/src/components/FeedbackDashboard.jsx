import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getFeedback } from '../api/feedback';


const FeedbackDashboard = () => {
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'timestamp',
    order: 'desc'
  });

  const { data: feedback, isLoading } = useQuery({
    queryKey: ['feedback', filters],
    queryFn: () => getFeedback(filters)
  });

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Feedback Dashboard</h2>
        <div className="filter-group">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="suggestion">Suggestion</option>
            <option value="bug report">Bug Report</option>
            <option value="feature request">Feature Request</option>
          </select>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="timestamp">Date</option>
            <option value="userName">Name</option>
            <option value="category">Category</option>
          </select>

          <select
            name="order"
            value={filters.order}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <table className="feedback-table">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Feedback</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {feedback?.map((item) => (
            <tr key={item._id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {item.userName}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.email}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  item.category === 'bug report' ? 'bg-red-100 text-red-800' :
                  item.category === 'feature request' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.category}
                </span>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">{item.feedbackText}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {format(new Date(item.timestamp), 'MMM d, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackDashboard;