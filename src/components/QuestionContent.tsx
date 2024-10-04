import OptionButton from "@/components/OptionButton";

const QuestionContent = ({ question, onOptionClick, replaceDynamicValues }) => (
    <>
        <h1 className="text-2xl font-bold text-black">{replaceDynamicValues(question.question)}</h1>
        <div className="flex flex-col gap-5 pt-[30px]">
            {question.options.map((option) => (
                <OptionButton
                    key={option}
                    option={option}
                    selected={question.selected === option}
                    onClick={() => onOptionClick(option)}
                />
            ))}
        </div>
    </>
);

export default QuestionContent