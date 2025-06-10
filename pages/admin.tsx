import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAdmin } from '../contexts/AdminContext';
import { useFirestore } from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { TeamMember, PortfolioCompany } from '../data/content';
import LoginForm from '../components/admin/LoginForm';

export default function AdminPanel() {
  const { user, isAdmin, logout, toggleAdminMode } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'team' | 'portfolio' | 'content'>('team');

  const handleGoToSite = () => {
    toggleAdminMode(); // Enable admin mode
    router.push('/'); // Go to home page
  };
  
  const { 
    data: teamData, 
    loading: teamLoading, 
    addDocument: addTeamMember,
    updateDocument: updateTeamMember,
    deleteDocument: deleteTeamMember 
  } = useFirestore<TeamMember>('team');

  const { 
    data: portfolioData, 
    loading: portfolioLoading,
    addDocument: addPortfolioCompany,
    updateDocument: updatePortfolioCompany,
    deleteDocument: deletePortfolioCompany 
  } = useFirestore<PortfolioCompany>('portfolio');

  // Show login form if not authenticated
  if (!user) {
    return (
      <>
        <Head>
          <title>VBV Admin Login | Version Bravo Ventures</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <LoginForm />
      </>
    );
  }

  // Show success message if admin is logged in
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-kizna-navy flex items-center justify-center">
        <div className="glass-effect bg-kizna-dark/80 p-8 rounded-lg text-center max-w-md">
          <div className="text-kizna-electric text-4xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gradient mb-4">Admin Access Granted</h1>
          <p className="text-gray-300 mb-6">Welcome, {user?.email}! You can now edit the website content.</p>
          <div className="space-y-3">
            <button
              onClick={handleGoToSite}
              className="admin-btn w-full bg-kizna-electric text-kizna-dark font-semibold py-3"
            >
              Enter Admin Mode & Go to Site
            </button>
            <button
              onClick={logout}
              className="admin-btn w-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
            <a 
              href="/"
              className="block text-center text-gray-400 hover:text-kizna-electric transition-colors text-sm mt-4"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin && user) {
    return (
      <div className="min-h-screen bg-kizna-navy flex items-center justify-center">
        <div className="glass-effect bg-kizna-dark/80 p-8 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-gradient mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-4">You need admin privileges to access this page.</p>
          <div className="space-y-3">
            <button
              onClick={logout}
              className="admin-btn w-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
            <a 
              href="/"
              className="block text-center text-gray-400 hover:text-kizna-electric transition-colors text-sm"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>VBV Admin Panel | Version Bravo Ventures</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-kizna-navy">
        {/* Header */}
        <div className="glass-effect bg-kizna-dark/80 p-4 mb-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gradient">VBV Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.email}</span>
              <button
                onClick={logout}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8">
            {[
              { key: 'team', label: 'Team Management', icon: '👥' },
              { key: 'portfolio', label: 'Portfolio Companies', icon: '💼' },
              { key: 'content', label: 'Site Content', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`admin-btn flex items-center space-x-2 ${
                  activeTab === tab.key 
                    ? 'bg-kizna-electric text-kizna-dark neon-glow' 
                    : 'text-kizna-electric'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-effect bg-kizna-dark/80 p-6 rounded-lg"
          >
            {activeTab === 'team' && (
              <TeamManagement 
                data={teamData}
                loading={teamLoading}
                onAdd={addTeamMember}
                onUpdate={updateTeamMember}
                onDelete={deleteTeamMember}
              />
            )}
            
            {activeTab === 'portfolio' && (
              <PortfolioManagement 
                data={portfolioData}
                loading={portfolioLoading}
                onAdd={addPortfolioCompany}
                onUpdate={updatePortfolioCompany}
                onDelete={deletePortfolioCompany}
              />
            )}
            
            {activeTab === 'content' && (
              <ContentManagement />
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

// Team Management Component
function TeamManagement({ data, loading, onAdd, onUpdate, onDelete }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (loading) {
    return <div className="text-center text-gray-300">Loading team data...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gradient">Team Members</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="admin-btn bg-kizna-teal text-white"
        >
          + Add Team Member
        </button>
      </div>

      <div className="grid gap-4">
        {data.map((member: TeamMember & { id: string }) => (
          <div key={member.id} className="glass-effect bg-kizna-dark/60 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-kizna-electric">{member.title}</p>
                <p className="text-gray-300 text-sm mt-1">{member.military}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(member.id)}
                  className="admin-btn text-kizna-electric"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(member.id)}
                  className="admin-btn text-red-400 hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal would go here */}
      {(showAddForm || editingId) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-effect bg-kizna-dark/90 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gradient mb-4">
              {showAddForm ? 'Add Team Member' : 'Edit Team Member'}
            </h3>
            <p className="text-gray-300 mb-4">Form implementation will be added here</p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                }}
                className="admin-btn flex-1"
              >
                Cancel
              </button>
              <button className="admin-btn bg-kizna-electric text-kizna-dark flex-1">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Portfolio Management Component
function PortfolioManagement({ data, loading, onAdd, onUpdate, onDelete }: any) {
  if (loading) {
    return <div className="text-center text-gray-300">Loading portfolio data...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gradient">Portfolio Companies</h2>
        <button className="admin-btn bg-kizna-teal text-white">
          + Add Company
        </button>
      </div>
      <div className="text-gray-300">
        Portfolio management interface will be implemented here
      </div>
    </div>
  );
}

// Content Management Component
function ContentManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gradient mb-6">Site Content</h2>
      <div className="text-gray-300">
        General content management interface will be implemented here
      </div>
    </div>
  );
}