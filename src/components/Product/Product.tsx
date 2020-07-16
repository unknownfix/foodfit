import React, { useState } from "react";
import StyledProduct from "./StyledProduct";

interface Props {
  item: {
    name: string;
    protein: number;
    fat: number;
    carbs: number;
    weight?: number;
  };
  showNutrition?: boolean;
}

const Product: React.FC<Props> = ({ item, children, showNutrition = true }) => {
  const kcal = Math.round(item.protein * 4 + item.fat * 9 + item.carbs * 4);

  return (
    <StyledProduct>
      <span className="name">{item.name}</span>
      {showNutrition && (
        <span className="nutritions">
          <span className="nutrition">
            <span>protein</span>
            <span>{item.protein}</span>
          </span>
          <span className="nutrition">
            <span>fat</span>
            <span>{item.fat}</span>
          </span>
          <span className="nutrition">
            <span>carbs</span>
            <span>{item.carbs}</span>
          </span>
        </span>
      )}
      {item.weight && <span className="weight">{item.weight}g</span>}
      <span className="cal">
        {item.weight ? Math.round((kcal / 100) * item.weight) : kcal} kcal
      </span>
      {children}
    </StyledProduct>
  );
};

interface AddProps {
  handleCreate: () => void;
}
const ProductAddAction: React.FC<AddProps> = ({ handleCreate }) => {
  return (
    <span className="action">
      <span className="menu" onClick={handleCreate}>
        Add
      </span>
    </span>
  );
};

interface UDProps {
  handleEdit: () => void;
  handleDelete: () => void;
}
const ProductUDAction: React.FC<UDProps> = ({ handleEdit, handleDelete }) => {
  const [showActions, setShowActions] = useState<boolean>(false);

  const onDelete = () => {
    // TODO create custom confirm
    if (window.confirm("You really want to delete this?")) {
      handleDelete();
    }
  };

  return (
    <span className={`action ${showActions ? "touched" : ""}`}>
      <span className="menu" onClick={() => setShowActions(true)}>
        Action
      </span>
      <span className="menu--actions">
        <span onClick={handleEdit}>Edit</span>
        <span onClick={onDelete}>Delete</span>
      </span>
    </span>
  );
};

export default Product;
export { ProductAddAction, ProductUDAction };
