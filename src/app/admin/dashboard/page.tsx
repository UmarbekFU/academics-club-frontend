'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';

// Lazy load admin components for code splitting
const AdminDashboard = lazy(() => import('./AdminDashboard'));

interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  program: string;
  message?: string;
  status: string;
  createdAt: string;
}

// Loading component
function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading admin dashboard...</p>
      </div>
    </div>
  );
}

// Main admin dashboard component with code splitting
export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await adminApi.getApplications();
      if (response.data.success) {
        setApplications(response.data.data);
      } else {
        setError('Failed to fetch applications');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { status?: number } };
        if (axiosError.response?.status === 401) {
          router.push('/admin/login');
        } else {
          setError('Failed to fetch applications');
        }
      } else {
        setError('Failed to fetch applications');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const response = await adminApi.updateApplication(id, { status });
      if (response.data.success) {
        setApplications(prev => 
          prev.map(app => app.id === id ? { ...app, status } : app)
        );
      }
    } catch (err: unknown) {
      console.error('Failed to update application:', err);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      const response = await adminApi.deleteApplication(id);
      if (response.data.success) {
        setApplications(prev => prev.filter(app => app.id !== id));
      }
    } catch (err: unknown) {
      console.error('Failed to delete application:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await adminApi.logout();
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
      router.push('/admin/login');
    }
  };

  if (loading) {
    return <AdminLoading />;
  }

  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminDashboard
        applications={applications}
        error={error}
        onUpdateStatus={updateApplicationStatus}
        onDelete={deleteApplication}
        onLogout={handleLogout}
      />
    </Suspense>
  );
}