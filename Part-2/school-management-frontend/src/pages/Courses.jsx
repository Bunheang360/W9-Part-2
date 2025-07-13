import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api";

export default function Courses() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      const page = searchParams.get("page") || 1;
      const limit = searchParams.get("limit") || 10;

      try {
        const res = await API.get(`/courses?page=${page}&limit=${limit}`);
        
        // Handle different response structures
        if (res.data) {
          setData(res.data.data || res.data || []);
          setMeta({
            page: res.data.page || parseInt(page),
            totalPages: res.data.totalPages || 1
          });
        } else {
          setData([]);
          setMeta({ page: parseInt(page), totalPages: 1 });
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError(err.response?.data?.message || "Failed to fetch courses");
        setData([]);
        setMeta({ page: parseInt(page), totalPages: 1 });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchParams]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {loading && (
        <div className="text-center py-8">
          <div className="text-gray-600">Loading courses...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No courses found.
        </div>
      )}

      {!loading && data.length > 0 && (
        <>
          <div className="space-y-4">
            {data.map((course) => (
              <div key={course.id} className="border p-4 rounded shadow bg-white">
                <h2 className="text-lg font-semibold text-gray-800">
                  {course.title || course.name || 'Untitled Course'}
                </h2>
                <p className="text-sm text-gray-700">{course.description || 'No description available'}</p>
                {course.Teacher && (
                  <p className="text-sm text-blue-600 mt-2">
                    Teacher: {course.Teacher.name}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              disabled={!meta || meta.page <= 1}
              onClick={() =>
                setSearchParams({ page: Number(meta?.page || 1) - 1, limit: 10 })
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="text-sm text-gray-600">
              Page {meta?.page || 1} of {meta?.totalPages || 1}
            </span>
            
            <button
              disabled={!meta || meta.page >= meta.totalPages}
              onClick={() =>
                setSearchParams({ page: Number(meta?.page || 1) + 1, limit: 10 })
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
