
type CheckIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export default function CheckIcon({ 
  width = 24, 
  height = 24, 
  color = 'currentColor' 
}: CheckIconProps): JSX.Element {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" 
        fill={color} 
      />
    </svg>
  );
}