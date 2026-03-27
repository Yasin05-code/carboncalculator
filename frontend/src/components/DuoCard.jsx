import React from 'react';

export const DuoCard = ({ children, title, icon: Icon, color = "border-gray-200" }) => (
  <div className={`bg-white border-2 ${color} rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4`}>
    {Icon && (
      <div className="p-3 bg-gray-50 rounded-2xl">
        <Icon size={32} className="text-gray-600" />
      </div>
    )}
    {title && <h3 className="font-black text-gray-500 uppercase tracking-wider text-sm">{title}</h3>}
    <div className="w-full font-bold text-gray-700">
      {children}
    </div>
  </div>
);

export default DuoCard;