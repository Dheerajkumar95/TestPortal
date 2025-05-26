// dasboard.jsx
import React, { useState } from "react";
import { axiosInstance } from "../lib/axios.js";

const dasboard = () => {
  const [form, setForm] = useState({
    section: "",
    question: "",
    options: ["", "", "", ""],
    correct: "",
  });

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = value;
    setForm({ ...form, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedOptions = form.options.map((text, index) => ({
      id: String.fromCharCode(97 + index), // a, b, c, d
      text,
    }));

    const payload = {
      section: form.section,
      question: form.question,
      options: formattedOptions,
      correct: form.correct,
    };

    await axiosInstance.post("/questions/add", payload);
    alert("Question added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Section"
        value={form.section}
        onChange={(e) => setForm({ ...form, section: e.target.value })}
      />
      <textarea
        placeholder="Enter your question"
        value={form.question}
        onChange={(e) => setForm({ ...form, question: e.target.value })}
      />
      {form.options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Option ${String.fromCharCode(65 + i)}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
        />
      ))}
      <input
        type="text"
        placeholder="Correct option (a/b/c/d)"
        value={form.correct}
        onChange={(e) => setForm({ ...form, correct: e.target.value })}
      />
      <button type="submit">Add Question</button>
    </form>
  );
};

export default dasboard;
