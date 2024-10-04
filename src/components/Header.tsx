import Image from "next/image";

const Header = ({ onBack }) => (
    <header className="flex justify-between items-center p-4">
        <Image src='/main-logo.svg' alt='logo' width={15} height={15}/>
        <button onClick={onBack} className="absolute left-10">
            <Image src='/back-icon.svg' alt='back' width={10} height={10}/>
        </button>
    </header>
);

export default Header