const Grid = ({ children, title }) => {
  return (
    <>
      <h2 className="text-2xl py-2 text-center text-white">{title}</h2>
      <div className="flex justify-center ">
        <div className="px-4 " style={{ maxWidth: "1600px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid;
