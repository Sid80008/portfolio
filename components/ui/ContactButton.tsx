export const LiquidButton = () => (
  <div className="relative">
    <button className="px-12 py-6 bg-white text-black rounded-full font-bold hover:scale-110 transition-transform cursor-none" data-cursor="hover">
      GET IN TOUCH
    </button>
    <svg className="hidden">
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      </filter>
    </svg>
  </div>
);
