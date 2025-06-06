import React, { useState ,useRef} from "react";
import { axiosInstance } from "../lib/axios.js";
import { Link } from "react-router-dom";
const Question = () => {
    const fileInputRef = useRef(null);
    const excelInputRef = useRef(null); // for Excel input

const handleExcelClick = () => {
  if (excelInputRef.current) {
    excelInputRef.current.click();
  }
};

const handleExcelUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    await axiosInstance.post("/questions/upload-excel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    alert("Questions uploaded successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to upload Excel file.");
  }
};
  const [form, setForm] = useState({
    section: "",
    batch: "",
    question: "",
    options: ["", "", "", ""],
    correct: "",
  });
  const [image, setImage] = useState(null);

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

    const formData = new FormData();
    formData.append("section", form.section);
    formData.append("batch", form.batch);
    formData.append("question", form.question);
    formData.append("correct", form.correct);
    formData.append("options", JSON.stringify(formattedOptions));
    if (image) formData.append("image", image);

    try {
      await axiosInstance.post("/questions/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Question added successfully!");
      // reset form
      setForm({
        section: "",
        batch: "",
        question: "",
        options: ["", "", "", ""],
        correct: "",
        
      });
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      alert("Failed to add question.");
      console.error(err);
    }
  };

  return (
    <>
    <button className='Excel-button' onClick={handleExcelClick}>📥 Upload Excel</button>
  <input
    type="file"
    ref={excelInputRef}
    onChange={handleExcelUpload}
    accept=".xlsx, .xls"
    style={{ display: "none" }}
  />
    <div className="Question-container">
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
       <select
          value={form.section}
          onChange={(e) => setForm({ ...form, section: e.target.value })}
        >
          <option value="">Select Section</option>
          <option value="Basic Programming">Basic Programming</option>
          <option value="Verbal and Reasoning">Verbal and Reasoning</option>
          <option value="Aptitude">Aptitude</option>
        </select>


        <select
          value={form.batch}
          onChange={(e) => setForm({ ...form, batch: e.target.value })}
        >
          <option value="">Select Batch</option>
          <option value="2022-26">2022-26</option>
          <option value="2023-27">2023-27</option>
          <option value="2024-28">2024-28</option>
          <option value="2025-29">2025-29</option>
        </select>

        <textarea
          placeholder="Enter your question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          ref={fileInputRef}
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
    </div>
    </>
  );
};

export default Question;
