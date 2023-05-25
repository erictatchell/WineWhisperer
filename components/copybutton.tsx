import clipboardCopy from 'clipboard-copy';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

const CopyButton = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        clipboardCopy(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    };

    return (
        <button
            onClick={copyToClipboard}
            type="submit"
            className="px-3 uppercase tracking-widest justify-center text-center items-center drop-shadow-xl text-xl text-black bg-dijon/70 hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-xl mb-6 py-2 ml-3 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55">
            {isCopied ? <CheckIcon /> : <IosShareIcon />}
        </button>
    );
};

export default CopyButton;