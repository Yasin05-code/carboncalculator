export const DuoButton = ({ children, onClick, color = "bg-duo-green", shadow = "border-b-4 border-black/20" }) => (
  <button 
    onClick={onClick}
    className={`${color} ${shadow} text-white font-bold py-3 px-6 rounded-2xl active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wide w-full`}
  >
    {children}
  </button>
);