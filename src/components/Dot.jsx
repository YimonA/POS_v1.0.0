const Dot = () => {
  return (
    <span className="relative inline-block w-[9px] h-[9px] border border-[--border-color] rounded-full bg-[--border-color] mr-2 p-1">
      <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 inline-block w-[3px] h-[3px] border rounded-full bg-[--secondary-color] "></span>
    </span>
  );
};

export default Dot;
