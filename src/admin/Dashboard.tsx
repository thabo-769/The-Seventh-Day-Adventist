import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { AdminOverview } from './AdminOverview';
import { AdminSermons } from './AdminSermons';
import { AdminEvents } from './AdminEvents';
import { AdminMinistries } from './AdminMinistries';
import { AdminAnnouncements } from './AdminAnnouncements';
import { AdminProgrammes } from './AdminProgrammes';
import { AdminGallery } from './AdminGallery';
import { AdminVisitors } from './AdminVisitors';
import { AdminBibleStudies } from './AdminBibleStudies';
import { AdminPrayers } from './AdminPrayers';
import { AdminMessages } from './AdminMessages';
import { AdminSettings } from './AdminSettings';
import { AdminUsers } from './AdminUsers';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview onNavigate={setActiveTab} />;
      case 'sermons':
        return <AdminSermons />;
      case 'events':
        return <AdminEvents />;
      case 'ministries':
        return <AdminMinistries />;
      case 'announcements':
        return <AdminAnnouncements />;
      case 'programmes':
        return <AdminProgrammes />;
      case 'gallery':
        return <AdminGallery />;
      case 'visitors':
        return <AdminVisitors />;
      case 'biblestudies':
        return <AdminBibleStudies />;
      case 'prayers':
        return <AdminPrayers />;
      case 'messages':
        return <AdminMessages />;
      case 'settings':
        return <AdminSettings />;
      case 'users':
        return <AdminUsers />;
      default:
        return <AdminOverview onNavigate={setActiveTab} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};
