import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";

export default function Dashboard() {
  const { auth } = useAuth();
  const [summary, setSummary] = useState({
    courses: 0,
    students: 0,
    teachers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [coursesRes, studentsRes, teachersRes] = await Promise.all([
          API.get("/courses?page=1&limit=1"),
          API.get("/students?page=1&limit=1"),
          API.get("/teachers?page=1&limit=1"),
        ]);

        setSummary({
          courses: coursesRes.data.total || 0,
          students: studentsRes.data.total || 0,
          teachers: teachersRes.data.total || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard summary:", err);
      } finally {
        setLoading(false);
      }
    };

    if (auth) {
      fetchCounts();
    }
  }, [auth]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        {auth && (
          <p className="text-gray-600 mt-2">
            Welcome back, <span className="font-semibold">{auth.name || auth.email}</span>!
          </p>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Loading dashboard data...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SummaryCard title="Courses" count={summary.courses} href="/courses" />
          <SummaryCard
            title="Students"
            count={summary.students}
            href="/students"
          />
          <SummaryCard
            title="Teachers"
            count={summary.teachers}
            href="/teachers"
          />
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, count, href }) {
  return (
    <Link
      to={href}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </Link>
  );
}
