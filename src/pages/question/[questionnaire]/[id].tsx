// pages/question/[id].tsx
import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '@/store/surveySlice';
import { RootState } from '@/store/store';
import {useCallback} from "react";
import QuestionContent from "@/components/QuestionContent";
import InfoContent from "@/components/InfoContent";
import Header from "@/components/Header";


export interface Question {
    id: string;
    question: string;
    options: string[];
    next: Record<string, string>;
    screenType: string;
    referenceId?: string;
    title?: string;
    description?: string;
}

interface Props {
    question: Question;
}

type ScreenType = 'options' | 'info'

const QuestionPage = ({ question }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { questionnaire } = router.query;
    const answers = useSelector((state: RootState) => state.survey.answers);

    const handleOptionClick = useCallback((option: string) => {
        dispatch(setAnswer({ questionId: question.id, answer: option }));
        const nextQuestionId = question.next.default || question.next[option];

        if (nextQuestionId) {
            router.push(`/question/${questionnaire}/${nextQuestionId}`);
        } else {
            router.push('/final');
        }
    }, [router, question, dispatch, questionnaire]);

    const handleInfoClick = useCallback(() => {
        const referenceAnswer = answers[question.referenceId!];

        const nextQuestionId = question.next[referenceAnswer];

        if (nextQuestionId) {
            router.push(`/question/${questionnaire}/${nextQuestionId}`);
        } else {
            router.push('/final');
        }
    }, [answers, question, router, questionnaire]);


    const replaceDynamicValues = useCallback((text: string) => {
        const replacedText = text.replace(/{([^{}]+)(?:\s\{([^}]+)\["([^}]+)"\])?}/g, (_, key, conditionKey, conditionValue) => {
            if (conditionKey && conditionValue) {
                return answers[conditionKey] === conditionValue ? key : '';
            }

            return answers[key] || `{${key}}`;
        });

        return replacedText;
    }, [answers])

    const renderOptions: Record<ScreenType, JSX.Element> = {
        options: <QuestionContent question={question} onOptionClick={handleOptionClick} replaceDynamicValues={replaceDynamicValues}/>,
        info: <InfoContent question={question} onNext={handleInfoClick} />,
    }

    const colorScheme: Record<string, string> = {
        info: 'linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2 74.96%)',
        options: '#FFF0F0',
    }

    return (
        <div className="flex flex-col items-center p-6 w-full h-full overflow-auto" style={{background: colorScheme[question.screenType]}}>
            <Header onBack={() => router.back()} />
            <div className="w-[330px] xs:w-full">
                {renderOptions[question.screenType as ScreenType]}
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const questionnairesDir = path.join(process.cwd(), 'public/data/questionnaires');
    const files = fs.readdirSync(questionnairesDir);

    const paths = files.flatMap(file => {
        const filePath = path.join(questionnairesDir, file);
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData); 

        return data.questions.map((question: Question) => ({
            params: {
                questionnaire: path.basename(file, '.json'),
                id: question.id,
            },
        }));
    });

    return { paths, fallback: false };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { questionnaire, id } = params as { questionnaire: string; id: string }; // Destructure parameters
    const filePath = path.join(process.cwd(), 'public/data/questionnaires', `${questionnaire}.json`);
    console.log(questionnaire)
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    const question = data.questions.find((q: Question) => q.id === id) || null;

    if (!question) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            question,
        },
    };
};


export default QuestionPage;
