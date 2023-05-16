import { getSession } from 'next-auth/react';
import Link from 'next/link';
import clientPromise from '../../lib/mongodb';


const teamMembers = [
    { name: "Eric Tatchell", image: "/victor1.jpg", description: "Eric is a passionate developer with a love for music." },
    { name: "Brendan Doyle", image: "/victor2.jpg", description: "Brendan is a passionate developer with a love for golf." },
    { name: "Noor Sangha", image: "/victor1.jpg", description: "Noor is a passionate developer with a love for cars." },
    { name: "Victor Vasconcellos", image: "/victor2.jpg", description: "Victor is a passionate developer with a love for soccer." },
    // add more team members as needed
  ];


export default function aboutUs() {
return (
    <div className="mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">About our project</p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our team Code and Cork, is proudly developing WineWhisperer, an AI-driven platform designed to empower farmers, 
            vintners, and small businesses in the pursuit of sustainable wine making. Our mission is to connect eco-conscious 
            wine enthusiasts with an exquisite selection of environmentally friendly and delectable wines. 
            By harnessing the power of AI, WineWhisperer is changing the way we discover, enjoy, and share sustainable wines.
        </p>
      </div>

      <div className="text-center mt-10">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Meet our amazing team</p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Brendan Doyle, Eric Tatchell, Noor Sangha, and Victor Vasconcellos, Code and Cork is a highly motivated and cohesive 
            group from the British Columbia Institute of Technology. We share a passion for software development and aspire 
            to make a positive impact on society through our knowledge and hard work.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3">
              <img className="h-48 w-full object-cover md:w-48" src={member.image} alt={member.name} />
            </div>
            <div className="mt-4 md:mt-0 md:w-2/3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{member.name}</h3>
              <p className="mt-2 text-base text-gray-500">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Checking session and redirecting if not logged in
export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const userEmail = session && session.user ? session.user.email : null;
    if (userEmail) {
      const client = await clientPromise;
      const db = client.db();
      const userExtra = await db.collection("userExtras").findOne({ email: userEmail });
      if (userExtra) {
        return {
          props: {
            userId: userExtra.id,
          },
        };
      }
    }
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  }