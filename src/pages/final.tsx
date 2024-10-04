import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const Final = () => {
    const answers = useSelector((state: RootState) => state.survey.answers);
    console.log(answers)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/questionary.json'); // Adjust the path if necessary
                const jsonData = await response.json();
                console.log(jsonData)
            } catch (error) {
                console.error('Error fetching the JSON data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full" style={{ backgroundColor: '#FFF0F0'}}>
            <h1 className="text-black text-2xl font-bold">Questionary end</h1>
            <p>Thank you for your answers </p>
            {Object.entries(answers).map(([key, value]) => (
                <p key={key} className="text-black text-lg">
                    <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>{value}
                </p>
            ))}
        </div>
    );
};

export default Final;