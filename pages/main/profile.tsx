import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'


export default function Profile() {
    
    const { data: session } = useSession()
    const user = session ? session.user : null;
    if (session) {
        return (
            <div>
                <h1>{!user ? 'No user' : `Hello, ${user.name}`}</h1>
                {user && user.image &&
                    <Image src={user.image} width={100} height={100} alt='User profile image' />
                }
                <a onClick={() => (signOut())}>Sign Out</a>
            </div>
        )
    }
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