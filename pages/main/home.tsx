import { getSession } from "next-auth/react";

export default function Home() {
    return (
        <div>
        <h1>Home page</h1>
        </div>
    )
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