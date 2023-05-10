import { getSession } from 'next-auth/react';

export default function aboutUs() {
    return (
        <h1>About Us page</h1>
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