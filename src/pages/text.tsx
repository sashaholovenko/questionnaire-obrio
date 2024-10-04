import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const Text = () => {
    const answers = useSelector((state: RootState) => state.survey.answers);
    console.log(answers)

    return (
        <div>
            Hello world
        </div>
    );
};

export default Text;