import React, { FC, ReactNode, ButtonHTMLAttributes } from "react";
import { Button } from "react-bootstrap";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  size?: "sm" | "lg";
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  onClick,
  size = "lg",
  ...props
}) => (
  <Button
    size={size}
    variant="light"
    className="fw-bold border-white bg-white"
    onClick={onClick}
    {...props}
  >
    {children}
  </Button>
);

export default CustomButton;
