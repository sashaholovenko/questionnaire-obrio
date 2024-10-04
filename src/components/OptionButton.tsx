const OptionButton = ({ option, selected, onClick }) => (
    <div
        className={`w-full rounded-lg p-6 text-center cursor-pointer shadow-xl ${selected ? 'text-white bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-500' : 'text-black bg-blue-50'}`}
        onClick={onClick}
    >
        {option}
    </div>
);

export default OptionButton;