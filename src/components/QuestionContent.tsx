import OptionButton from "@/components/OptionButton";
import {Question} from "@/pages/question/[questionnaire]/[id]";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {memo} from "react";

const QuestionContent = ({question, onOptionClick, replaceDynamicValues}: {
    question: Question,
    onOptionClick: (option: string) => void,
    replaceDynamicValues: (option: string) => string
}) => {
    const answers = useSelector((state: RootState) => state.survey.answers);

    return (

        <>
            <h1 className="text-2xl font-bold text-black">{replaceDynamicValues(question.question)}</h1>
            <div className="flex flex-col gap-5 pt-[30px]">
                {question.options.map((option) => (
                    <OptionButton
                        key={option}
                        option={option}
                        selected={answers[question.id] === option}
                        onClick={() => onOptionClick(option)}
                    />
                ))}
            </div>
        </>
    )
};

export default memo(QuestionContent)