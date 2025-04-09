import React from 'react';
import NotificationSettings from '../components/NotificationSettings';

const NotificationSettingsDemo = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Notification Settings</h1>
        <NotificationSettings />
      </div>
    </div>
  );
};

export default NotificationSettingsDemo;
