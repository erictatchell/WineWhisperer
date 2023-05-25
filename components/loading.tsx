import wineFacts from './facts';

// Randomly select a fact from the array to display on the loading screen
function getFact() {
    const i = Math.floor(Math.random() * wineFacts.length);
    return wineFacts[i];
}

const Loading = () => {
    const fact = getFact();
    return (
        <div className='grid mx-6 text-center'>
            <h1 className='text-3xl text-dijon font-bold'>Browsing our shelves...</h1>
            <div className='mt-40 p-3 rounded-lg bg-dijon/20 backdrop-blur-md'>
                <p className='text-2xl text-lightdijon/50 font-bold'>Did you know?</p>
                <p className='text-lg text-lightdijon font-bold'>{fact}</p>
            </div>
        </div>
    );
};

export default Loading;
