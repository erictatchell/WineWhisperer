import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'


export default function Profile() {

    // changing user to dummy text while there is no sessions.
    // const { data: session } = useSession()
    // const user = session ? session.user : null;
    // if (session) {
    return (
    //         <div>
    //             <h1>{!user ? 'No user' : `Hello, ${user.name}`}</h1>
    //             {user && user.image &&
    //                 <Image src={user.image} width={100} height={100} alt='User profile image' />
    //             }
    //             <a onClick={() => (signOut())}>Sign Out</a>
        <div>
          <div className="px-4 sm:px-0">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <Image src='' width={100} height={100} alt='User profile image' />
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <h3 className="text-base font-medium leading-7 text-gray-900">Full Name</h3>
                <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Brendan Doyle</p>
            </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Brendan@example.com</dd>           
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Account ID</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">12345678</dd>           
              </div>
            </dl>
          </div>
        </div>
       //</div>
        )
    }
//}



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