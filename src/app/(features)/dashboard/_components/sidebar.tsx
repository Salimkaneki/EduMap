'use client'
import React, { useState, useEffect } from 'react';
import { 
  Home, School, Plus, Edit, List, Users,
  FileText, Search, MapPin,
  HelpCircle, Bell, User, ChevronDown, ChevronRight, LogOut
} from 'lucide-react';
import { logoutAdmin, getDashboardData } from '../_services/dashboardService';
import { useRouter, usePathname } from 'next/navigation';
import { DashboardResponse } from '../_models/types';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  type: 'single' | 'section';
  children?: {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
  }[];
};

// 🔹 correction → type indexable
type ExpandedSections = {
  [key: string]: boolean;
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    ecoles: true
  });
  const [adminData, setAdminData] = useState<DashboardResponse['admin'] | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getDashboardData();
        setAdminData(data.admin);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  // Détecter la page active basée sur l'URL
  useEffect(() => {
    if (pathname === '/dashboard') {
      setActiveItem('dashboard');
    } else if (pathname === '/dashboard/school') {
      setActiveItem('ecoles-liste');
    } else if (pathname === '/dashboard/school/register') {
      setActiveItem('ecoles-creer');
    } else if (pathname.startsWith('/dashboard/school/edit/')) {
      setActiveItem('ecoles-modifier');
    } else if (pathname.includes('/users')) {
      setActiveItem('utilisateurs');
    }
  }, [pathname]);

  const handleItemClick = (itemId: string): void => {
    setActiveItem(itemId);
    
    // Navigation logic
    switch (itemId) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'ecoles-liste':
        router.push('/dashboard/school');
        break;
      case 'ecoles-creer':
        router.push('/dashboard/school/register');
        break;
      case 'ecoles-modifier':
        router.push('/dashboard/school');
        break;
      case 'utilisateurs':
        router.push('/dashboard/users');
        break;
      default:
        break;
    }
  };

  const toggleSection = (sectionId: string): void =>
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push('/auth/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to sign-in
      router.push('/auth/sign-in');
    }
  };

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home, type: 'single' },
    {
      id: 'ecoles',
      label: 'Écoles',
      icon: School,
      type: 'section',
      children: [
        { id: 'ecoles-creer', label: 'Créer', icon: Plus },
        { id: 'ecoles-modifier', label: 'Modifier', icon: Edit },
        { id: 'ecoles-liste', label: 'Liste', icon: List }
      ]
    },
    { id: 'utilisateurs', label: 'Utilisateurs', icon: Users, type: 'single' }
  ];

  return (
    <div className="w-64 bg-white flex flex-col h-screen border-r border-gray-100 shadow-sm">
      
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <MapPin className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Edumap</h1>
            <p className="text-xs text-gray-500">Cartographie éducative</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id || (item.children && item.children.some(child => child.id === activeItem));
            const isExpanded = expandedSections[item.id] || false;
            const hasChildren = item.type === 'section';

            return (
              <li key={item.id}>
                <div
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    if (hasChildren) toggleSection(item.id);
                    else handleItemClick(item.id);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      size={18} 
                      className={`${isActive ? 'text-blue-600' : 'text-gray-400'} transition-colors`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {hasChildren && (
                    <div className="transition-transform">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  )}
                </div>

                {/* Submenu */}
                {hasChildren && isExpanded && item.children && (
                  <ul className="mt-1 ml-6 space-y-1 border-l border-gray-100 pl-3">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = activeItem === child.id;
                      
                      return (
                        <li key={child.id}>
                          <div
                            className={`flex items-center space-x-2.5 px-2.5 py-2 rounded-md cursor-pointer transition ${
                              isChildActive 
                                ? 'bg-blue-100 text-blue-600 font-medium' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                            onClick={() => handleItemClick(child.id)}
                          >
                            <ChildIcon size={15} />
                            <span className="text-sm">{child.label}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-800 text-sm">
            <HelpCircle size={18} />
            <span>Aide</span>
          </button>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
              title="Se déconnecter"
            >
              <LogOut size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 relative">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <User className="text-white" size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 text-sm">
              {adminData?.name || 'Admin User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {adminData?.email || 'admin@schoolmapper.com'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
