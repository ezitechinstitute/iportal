const Loading = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="relative">
      {/* Outer ring */}
      <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
      {/* Inner ring */}
      <div
        className="absolute top-2 left-2 w-12 h-12 border-4 border-gray-100 rounded-full animate-spin border-t-blue-400"
        style={{ animationDirection: 'reverse' }}
      ></div>
    </div>
    <div className="text-center">
      <p className="text-gray-600 font-medium">{text}</p>
      <p className="text-sm text-gray-500 mt-1">Please wait while we load your data</p>
    </div>
  </div>
);

export default Loading;
