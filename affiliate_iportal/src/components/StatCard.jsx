const StatCard = ({ icon: Icon, title, value, subtitle, bgClass, textClass }) => {
  return (
    <div className="bg-white rounded-md shadow p-4 w-full max-w-sm">
      <div className="flex items-center space-x-4 mb-3">
        <div className={`p-3 rounded-md ${bgClass}`}>
          <Icon className={`w-5 h-5 ${textClass}`} />
        </div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
      </div>
      <div className="text-sm font-semibold text-gray-700">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </div>
  );
};
export default StatCard;