import React, { useState } from "react";
import axios from "axios";

interface AnimalFormProps {
  plotId: string;
  farmId: string;
  ownerId: string;
  onAdded: () => void; // callback to refresh or close form
}

const Animal: React.FC<AnimalFormProps> = ({ plotId, farmId, ownerId, onAdded }) => {
  const [animalType, setAnimalType] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalType || quantity === "" || quantity <= 0) {
      alert("Please fill all required fields properly.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`/farms/${farmId}/plots/${plotId}/animals`, {
        ownerId,
        animalType,
        quantity,
        notes,
      });
      alert("Animal added successfully.");
      onAdded();
    } catch (error) {
      alert("Failed to add animal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Animal Type *</label>
        <input
          type="text"
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantity *</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Animal"}
      </button>
    </form>
  );
};

export default Animal;
