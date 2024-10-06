import React from "react";
import { questions } from "./questionData";

const Questions = ({ formData, openModal }) => {
  return (
    <div className="p-4 space-y-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className="p-4 bg-gray-200 rounded-md shadow-sm cursor-pointer"
          onClick={() => openModal(question.id)}
        >
          <p>{question.label}</p>
          <p className="text-sm text-gray-500">{formData[question.id]}</p>
        </div>
      ))}
    </div>
  );
};

export default Questions;
