import { getSession } from "next-auth/react";
import { useState } from 'react';
import { getWineRecommendations } from '../../components/ai';

export default function Home() {
    const [selectedPrompt, setSelectedPrompt] = useState('list');
    const [description, setDescription] = useState('');

    const handleDropdownChange = (event: any) => {
        setSelectedPrompt(event.target.value);
    };

    const handleInputChange = (event: any) => {
        setDescription(event.target.value);
    };

    return (
        <div>
            <h1>Home page</h1>
            {/* ugly ass form, can replace with a nice tailwind form but KEEP FN!*/}
            <form>
                <select value={selectedPrompt} onChange={handleDropdownChange}>
                    <option value="list">List of 5 wines</option>
                    <option value="single">Single wine</option>
                    <option value="other">No option</option>
                </select>
                <textarea value={description} onChange={handleInputChange} />
                <button type="submit">Get recommendations</button>
            </form>
        </div>
    )
}

// export const getServerSideProps = async (context: any) => {
//     const session = await getSession(context);
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };
//     }
//     return {
//         props: { session },
//     };
// }
