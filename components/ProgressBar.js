
const ProgressBar = () => {
  return (
    <div className="w-full mb-4 absolute top-12 left-0">
      <div className="animate-pulse flex">
        <div className="flex-1">
          <div className="h-1 bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
