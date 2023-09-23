import React from "react";
import styled from "styled-components"; // Import styled from styled-components

interface ButtonProps {
  onDelete?: () => void;
}

const Button = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

function DeleteButton({ onDelete }: ButtonProps) {
  return <Button onClick={onDelete}>Delete</Button>;
}

export default DeleteButton;
