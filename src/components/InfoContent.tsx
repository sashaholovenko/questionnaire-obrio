const InfoContent = ({ question, onNext }) => (
    <div className="text-center">
        <h1 className="text-2xl font-bold text-white">{question.title}</h1>
        <p className="text-lg">{question.description}</p>
        <button onClick={onNext} className="mt-4 bg-white px-4 py-2 w-full rounded-xl shadow shadow-white text-purple-900">
            Next
        </button>
    </div>
);

export default InfoContent;