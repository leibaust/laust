import { useState } from "react";
import faqData from "../../data/faqData";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full md:max-w-md mx-auto p-4 bg-tertiary shadow-xl mr-5">
      {faqData.map((item, index) => (
        <div key={index}>
          <button
            className="w-full text-left py-4 flex justify-between items-center"
            onClick={() => toggleFaq(index)}
          >
            <h3>{item.question}</h3>
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-2">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Faq;
