const Loading = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-10"
      style={{ background: "rgba(255, 255, 255, 0.7)" }}
    >
      <span className="loading loading-spinner loading-lg text-primary-content"></span>
    </div>
  );
};

export default Loading;
