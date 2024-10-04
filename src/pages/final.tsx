import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const Final = () => {
    const [questionsData, setQuestionsData] = useState<Record<string, string>>()
    const answers = useSelector((state: RootState) => state.survey.answers);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/questionnaires/questionary1.json'); // Adjust the path if necessary
                const jsonData = await response.json();

                const result = jsonData.questions.reduce((accumulator: Record<string, string>, current: Record<string, string>) => {
                    accumulator[current.id] = current.question;
                    return accumulator;
                }, {});


                setQuestionsData(result)
            } catch (error) {
                console.error('Error fetching the JSON data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="flex flex-col items-center justify-center w-full h-full" style={{ backgroundColor: '#FFF0F0'}}>
            <h1 className="text-black text-2xl font-bold">Questionary end</h1>
            <div className="w-[400px] xs:w-full px-6">
                {Object.entries(answers).map(([key, value]) => (
                    <p key={key} className="text-black text-lg">
                        <strong>{questionsData?.[key]}: </strong>{value}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Final;