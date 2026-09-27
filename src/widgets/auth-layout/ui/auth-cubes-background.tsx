import { Box } from '@chakra-ui/react';

const CUBE_PATHS = [
  // top-left large
  { x: -40, y: 80, scale: 1.6, opacity: 0.45 },
  // mid-left
  { x: 40, y: 320, scale: 1.1, opacity: 0.35 },
  // behind card left
  { x: 180, y: 200, scale: 1.35, opacity: 0.4 },
  // behind card right
  { x: 720, y: 160, scale: 1.5, opacity: 0.4 },
  // bottom-right
  { x: 980, y: 420, scale: 1.7, opacity: 0.45 },
  // mid-right small
  { x: 900, y: 80, scale: 0.9, opacity: 0.3 },
  // bottom-left
  { x: 120, y: 520, scale: 1.2, opacity: 0.35 },
  // top-right
  { x: 1100, y: 240, scale: 1.3, opacity: 0.38 },
];

function WireCube({
  x,
  y,
  scale,
  opacity,
}: {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}) {
  const size = 120 * scale;
  return (
    <g
      transform={`translate(${x} ${y})`}
      opacity={opacity}
      stroke="#c5cad3"
      strokeWidth={1.25}
      fill="none"
      strokeLinejoin="round"
    >
      {/* isometric cube */}
      <path
        d={`M ${size * 0.5} 0
            L ${size} ${size * 0.25}
            L ${size * 0.5} ${size * 0.5}
            L 0 ${size * 0.25}
            Z`}
      />
      <path
        d={`M 0 ${size * 0.25}
            L ${size * 0.5} ${size * 0.5}
            L ${size * 0.5} ${size}
            L 0 ${size * 0.75}
            Z`}
      />
      <path
        d={`M ${size} ${size * 0.25}
            L ${size * 0.5} ${size * 0.5}
            L ${size * 0.5} ${size}
            L ${size} ${size * 0.75}
            Z`}
      />
    </g>
  );
}

export function AuthCubesBackground() {
  return (
    <Box
      position="absolute"
      inset="0"
      pointerEvents="none"
      aria-hidden
      zIndex="0"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {CUBE_PATHS.map((cube, index) => (
          <WireCube key={index} {...cube} />
        ))}
      </svg>
    </Box>
  );
}
