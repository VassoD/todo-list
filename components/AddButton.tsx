import React from "react";
import styled from "styled-components"; // Import styled from styled-components

interface ButtonProps {
  onClick: () => void;
}

const Button = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function AddButton({ onClick }: ButtonProps) {
  return <Button onClick={onClick}>Add</Button>;
}

export default AddButton;
