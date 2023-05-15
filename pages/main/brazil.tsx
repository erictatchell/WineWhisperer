import { getSession, useSession } from "next-auth/react";
import clientPromise from '../../lib/mongodb';

export default function Brazil() {
    const { data: session } = useSession()
    const user = session ? session.user : null;

    return (
        <div className="mt-6 mx-8">
          <div className="flex items-start justify-between">
            <img className='rounded-lg' src='/victor1.jpg' alt='Victors beautiful face'></img>
          </div>
          <div className="mt-4">
            <img className='rounded-lg' src='/victor2.jpg' alt='Victors beautiful face'></img>
          </div>
        </div>
    );
}

// //Checking session and redirecting if not logged in
// export async function getServerSideProps(context: any) {
//     const session = await getSession(context);
//     const userEmail = session && session.user ? session.user.email : null;
//     if (userEmail) {
//       const client = await clientPromise;
//       const db = client.db();
//       const userExtra = await db.collection("userExtras").findOne({ email: userEmail });
//       if (userExtra) {
//         return {
//           props: {
//             userId: userExtra.id,
//           },
//         };
//       }
//     }
//     if (!session) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       };
//     }
//     return {
//       props: {},
//     };
//   }