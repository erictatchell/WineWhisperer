import { getSession } from 'next-auth/react';

export default function aboutUs() {
    return (
        <div className='grid justify-center'>
            <h1>About Us page</h1>
            <div className='grid max-w-sm ml-6 mr-6 mb-6 border-brendan rounded-lg shadow dark:bg-brendan/90 dark:border-gray-700 sm:max-w-full'>
                <p>Our innovative team at BBY29 is proudly developing WineWhisperer, an AI-driven platform designed to empower farmers, vintners, and small businesses in the pursuit of sustainable wine making. Our mission is to connect eco-conscious wine enthusiasts with an exquisite selection of environmentally friendly and delectable wines. By harnessing the power of AI, WineWhisperer is revolutionizing the way we discover, enjoy, and share sustainable wines.</p>
            </div>
            <div className='grid max-w-sm ml-6 mr-6 mb-6 border-brendan rounded-lg shadow dark:bg-brendan/90 dark:border-gray-700 sm:max-w-full'>
                <p>Consisting of four exceptional students - Brendan Doyle, Eric Tatchell, Noor Sangha, and Victor Vasconcellos, BBY-29 is a highly motivated and cohesive group from the British Columbia Institute of Technology. We share a passion for computer programs and aspire to make a positive impact on society through our knowledge and hard work.</p>
            </div>
        </div>
    )
}

// export const getServerSideProps = async (context: any) => {
//     const session = await getSession(context);
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/'
//             }
//         }
//     }
//     return {
//         props: { session }
//     }
// }