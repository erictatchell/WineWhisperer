import { getSession, signOut, useSession } from 'next-auth/react';


export default function Profile() {
    const { data: session } = useSession()
    if (session) {
        return (
            <div>
                <h1>Hello, {session.user.name}</h1>
                <a onClick={() => (signOut())}>Sign Out</a>
            </div>
        )
    } else {

    }
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    return {
        props: { session }
    }
}