import React, { useState } from "react";
import { axiosInstance } from "../lib/axios.js";

const Dasboard = () => {
  const [form, setForm] = useState({
    section: "",
    question: "",
    options: ["", "", "", ""],
    correct: "",
  });
  const [image, setImage] = useState(null); // for holding image file

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = value;
    setForm({ ...form, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedOptions = form.options.map((text, index) => ({
      id: String.fromCharCode(97 + index),
      text,
    }));

    const formData = new FormData();
    formData.append("section", form.section);
    formData.append("question", form.question);
    formData.append("correct", form.correct);
    formData.append("options", JSON.stringify(formattedOptions)); // serialize options
    if (image) formData.append("image", image);

    await axiosInstance.post("/questions/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Question added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
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

export default Dasboard;
