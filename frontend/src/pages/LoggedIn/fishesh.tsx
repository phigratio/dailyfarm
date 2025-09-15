import React, { useState } from "react";
import axios from "axios";

interface FishFormProps {
  plotId: string;
  farmId: string;
  ownerId: string;
  onAdded: () => void;
}

const Fishes: React.FC<FishFormProps> = ({ plotId, farmId, ownerId, onAdded }) => {
  const [fishSpecies, setFishSpecies] = useState("");
  const [population, setPopulation] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fishSpecies || population === "" || population <= 0) {
      alert("Please fill all required fields properly.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`/farms/${farmId}/plots/${plotId}/fishes`, {
        ownerId,
        fishSpecies,
        population,
        notes,
      });
      alert("Fish added successfully.");
      onAdded();
    } catch (error) {
      alert("Failed to add fish.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Fish Species *</label>
        <input
          type="text"
          value={fishSpecies}
          onChange={(e) => setFishSpecies(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Population *</label>
        <input
          type="number"
          min={1}
          value={population}
          onChange={(e) => setPopulation(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Fish"}
      </button>
    </form>
  );
};

export default Fishes;
