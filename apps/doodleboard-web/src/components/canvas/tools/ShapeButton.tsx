import React from 'react';
import Image from 'next/image';
import { ShapeType } from '@/store/shape/shapeSlice';

interface ShapeButtonProps {
  shape: ShapeType;
  selected: boolean;
  icon: string;
  iconFilled: string;
  alt: string;
  width: number;
  height: number;
  onClick: (shape: ShapeType) => void;
}

const ShapeButton: React.FC<ShapeButtonProps> = ({
  shape,
  selected,
  icon,
  iconFilled,
  alt,
  width,
  height,
  onClick,
}) => {
  return (
    <li
      onClick={() => onClick(shape)}
      className={`p-3 rounded-xl ${selected ? 'bg-subtle/80' : 'hover:bg-muted/20'} hover:cursor-pointer`}
    >
      <Image
        src={selected ? iconFilled : icon}
        alt={alt}
        width={width}
        height={height}
        priority={true}
      />
    </li>
  );
};

export default ShapeButton; 