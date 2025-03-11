import { useState } from "react";
import faqData from "../../data/faqData";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {faqData.map((item, index) => (
        <div key={index} className="border-b border-gray-300">
          <button
            className="w-full text-left py-4 flex justify-between items-center"
            onClick={() => toggleFaq(index)}
          >
            <h3>{item.question}</h3>
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </button>
          {openIndex === index && (
            <div className="py-2">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
