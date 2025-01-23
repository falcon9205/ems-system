import Link from "next/link";
import React from "react";

import { FaArrowRightLong } from "react-icons/fa6";
const page = () => {
  const salesforceProcess = [
    {
      title: "Step 1 : Understanding Your Business",
      points: [
        "Detailed Process Analysis: Examine your current workflows, systems, and processes to understand how your business operates.",
        "Challenge Identification: Pinpoint pain points, inefficiencies, and areas needing improvement.",
        "Strategic Alignment: Align Salesforce capabilities with your business objectives to ensure a tailored solution that addresses your unique needs.",
      ],
    },
    {
      title: "Step 2 : Creating a Roadmap for Success",
      points: [
        "Salesforce Org Review (For Existing Users): Conduct a comprehensive assessment of your existing Salesforce setup to identify areas for enhancement and cleanup.",
        "High-Level Architecture Design: Develop an architectural blueprint detailing key integrations, data flows, and system configurations to guide the implementation process.",
        "Implementation Planning: Define timelines, milestones, and deliverables to ensure clarity and direction for the project.",
      ],
    },
    {
      title: "Step 3 : Project Kick-Off",
      points: [
        "Smooth Project Initiation: Coordinate with stakeholders to set clear goals and expectations for the project.",
        "Efficient Team Collaboration: Establish roles and responsibilities for everyone involved to ensure a seamless workflow.",
        "Change Management: Provide strategies for smooth transition and user adoption of the Salesforce platform.",
      ],
    },
  ];

  const consultingServices = [
    {
      title: "Salesforce Implementation Consulting",
      description:
        "Seamlessly embrace Salesforce CRM with services ranging from setup and configuration to data migration and user training.",
    },
    {
      title: "Salesforce Integration Consulting",
      description:
        "Define and deploy an integration strategy that aligns with your business needs, ensuring smooth system interoperability.",
    },
    {
      title: "Salesforce Development Consulting",
      description:
        "Whether building custom applications or enhancing existing ones, we deliver tailored Salesforce development solutions.",
    },
    {
      title: "Salesforce Customization Consulting",
      description:
        "Adapt Salesforce CRM to fit your business processes with our strategic customization services.",
    },
    {
      title: "Salesforce AppExchange Consulting",
      description:
        "Transform your ideas into reality with our AppExchange development services, helping you build, list, and monetize your apps.",
    },
  ];

  return (
    <>
      <div className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <section className="bg-slate-800  rounded-t-[60px] mx-2 md:mx-10 md:mt-20 border-2 p-4 md:p-10 border-gray-700">
          <h1 className=" text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-2xl md:text-6xl py-1">
            Salesforce Consulting Services
          </h1>
          <h1 className="text-center text-yellow-500">
            In Partnership with{" "}
            <Link
              className="underline underline-offset-2"
              href="https://www.enzigma.com/"
              target="_blank"
              rel="noopener"
            >
              {" "}
              Enzigma
            </Link>{" "}
          </h1>
          <p className="text-gray-300 text-xs md:text-lg   rounded-lg  text-center mt-5 md:mx-[7%]">
            Enhance your Salesforce experience with our expert CRM consulting
            tailored to meet your unique business needs. We specialize in
            Salesforce implementation&sbquo; customization&sbquo;
            integration&sbquo; and optimization&sbquo; ensuring your CRM aligns
            perfectly with your business goals.
          </p>

          
        </section>

        <section>
          <h1 className="text-xl md:text-7xl text-center mt-20 mb-5 md:mt-32 md:mb-10  text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-1">
            Our Key<a className="text-yellow-400"> Services</a>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-[5%]">
            {consultingServices.map((service, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-3">
                <h1 className="text-white text-lg md:text-xl text-center">
                  {service.title}
                </h1>
                <p className="text-gray-400 text-xs md:text-sm py-2 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <Link href="/Contact"><button className="flex mx-auto my-10  px-6 py-3 text-sm md:text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:from-cyan-600 hover:to-blue-600 ">
          Talk to our Salesforce Expert
        </button></Link>

        <section>
          <h1 className="text-xl md:text-7xl text-center mt-20 mb-5 md:mt-32 md:mb-10  text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-1 md:mx-[10%]">
            Salesforce <a className="text-yellow-400 ">Integration</a>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5  mx-[5%]">
            <div className="text-left md:w-full w-[70%] rounded-xl p-2 mx-auto bg-slate-800 border border-gray-700">
              <h1 className="text-white text-center text-lg">
                Marketing Tools
              </h1>
              <ul className="pt-2 text-center pl-5 md:pl-0 text-cyan-500 text-sm">
                <li>Marketing Cloud</li>
                <li>Pardot</li>
                <li>Gainsight</li>
                <li>High Spot</li>
              </ul>
            </div>
            <div className="text-left md:w-full w-[70%] rounded-xl p-2 mx-auto bg-slate-800 border border-gray-700">
              <h1 className="text-white text-center text-lg">
                Report & Dashboards
              </h1>
              <ul className="pt-2 text-center pl-5 md:pl-0 text-cyan-500 text-sm">
                <li>Einstein Analyst</li>
                <li>Looker</li>
                <li>Tableau</li>
              </ul>
            </div>
            <div className="text-left md:w-full w-[70%] rounded-xl p-2 mx-auto bg-slate-800 border border-gray-700">
              <h1 className="text-white text-center text-lg">
                Payment Gateways
              </h1>
              <ul className="pt-2 text-center pl-5 md:pl-0 text-cyan-500 text-sm">
                <li>Stripe</li>
                <li>Authorize.net</li>
                <li>PayPal</li>
              </ul>
            </div>
            <div className="text-left md:w-full w-[70%] rounded-xl p-2 mx-auto bg-slate-800 border border-gray-700">
              <h1 className="text-white text-center text-lg">
                Computer Telephony Integration (CTI)
              </h1>
              <ul className="pt-2 text-center pl-5 md:pl-0 text-cyan-500 text-sm">
                <li>Fastcall</li>
                <li>Sharpen</li>
                <li>Fuze</li>
              </ul>
            </div>
            <div className="text-left md:w-full w-[70%] rounded-xl p-2 mx-auto bg-slate-800 border border-gray-700">
              <h1 className="text-white text-center text-lg">
                Custom Integration
              </h1>
              <ul className="pt-2 text-center pl-5 md:pl-0 text-cyan-500 text-sm">
                <li>REST APIs</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h1 className="text-xl md:text-7xl text-center mt-20 mb-5 md:mt-32 md:mb-10  text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-1 md:mx-[10%]">
            Our{" "}
            <a className="text-yellow-400 "> Salesforce Consulting Process</a>
          </h1>
          <div className="grid grid-cols-1 gap-5 mx-[5%]">
            {salesforceProcess.map((step, index) => (
              <div
                key={index}
                className="p-4 border border-yellow-500 rounded-lg shadow-sm"
              >
                <h2 className="text-lg md:text-2xl font-bold mb-2 text-cyan-300">
                  {step.title}
                </h2>
                <ul className="list-disc pt-2 list-inside space-y-1 text-xs md:text-lg text-cyan-700">
                  {step.points.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <Link href="/Contact"><button className="flex mx-auto my-10  px-6 py-3 text-sm md:text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:from-cyan-600 hover:to-blue-600 items-center gap-x-2">
          Get Started with Salesforce Consulting <FaArrowRightLong />
        </button></Link>

        <section>
          <h1 className="text-xl md:text-7xl text-center mt-20 mb-5 md:mt-32 md:mb-10  text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-1 md:mx-[10%]">
            <a className="text-yellow-400 underline underline-offset-2">10+</a>{" "}
            App Exchange Listings
          </h1>
          <div className="md:flex justify-between mx-[5%]">
            <div className="space-y-5 md:space-y-16">
              <h1 className="bg-slate-800 text-sm md:text-lg border-2 border-yellow-500 text-white text-center px-3 py-2 rounded-lg ">
                Convert Idea into technical specification
              </h1>
              <h1 className="bg-slate-800 text-sm md:text-lg border-2 border-yellow-500 text-white text-center px-3 py-2 rounded-lg ">
                Architect&sbquo; Keeping future in mind
              </h1>
              <h1 className="bg-slate-800 text-sm md:text-lg border-2 border-yellow-500 text-white text-center px-3 py-2 rounded-lg ">
                Define Roadmap & priorities
              </h1>
              <h1 className="bg-slate-800 text-sm md:text-lg border-2 border-yellow-500 text-white text-center px-3 py-2 rounded-lg ">
                Implementation & Development
              </h1>
            </div>
            <img
              className="h-[25rem] my-5 md:my-0 mx-auto"
              src="/Services/mobile.png"
              alt="images"
            />
            <div className="space-y-5 md:space-y-16">
              <h1 className="bg-slate-800 text-sm md:text-lg border-2 border-yellow-500 text-white text-center px-3 py-2 rounded-lg ">
                Convert Idea into technical specification
              </h1>
              <h1 className="bg-slate-800 text-sm md:text-lg border-2 border-yellow-500 text-white text-center px-3 py-2 rounded-lg ">
                Architect&sbquo; Keeping future in mind
              </h1>
              <h1 className="bg-slate-800 text-sm md:text-lg border-2 border-yellow-500 text-white text-center px-3 py-2 rounded-lg ">
                Define Roadmap & priorities
              </h1>
              <h1 className="bg-slate-800 text-sm md:text-lg border-2 border-yellow-500 text-white text-center px-3 py-2 rounded-lg ">
                Implementation & Development
              </h1>
            </div>
          </div>
        </section>

        <section>
          <h1 className="text-xl md:text-7xl text-center mt-20 mb-5 md:mt-32 md:mb-10  text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-1 md:mx-[10%]">
            Other{" "}
            <a className="text-yellow-400">
              non&ndash;salesforce technology stack
            </a>
          </h1>
          <div className="flex justify-center items-center mx-1">
            <table className="table-auto border-collapse border rounded-md border-gray-500 ">
              <tbody>
                <tr>
                  <td className="border border-gray-500 p-2">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/amazons3.png"
                      alt="platform images"
                    />
                  </td>
                  <td className="border border-gray-500 p-2">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/angluar.png"
                      alt="platform images"
                    />
                  </td>
                  <td className="border border-gray-500 p-2">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/azure.png"
                      alt="platform images"
                    />
                  </td>
                  <td className="border border-gray-500 p-2">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/docker.png"
                      alt="platform images"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/kubernetes.png"
                      alt="platform images"
                    />
                  </td>
                  <td className="border border-gray-500 p-2">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/mongodb.png"
                      alt="platform images"
                    />
                  </td>
                  <td className="border border-gray-500 p-2">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/nodejs.png"
                      alt="platform images"
                    />
                  </td>
                  <td className="border border-gray-500 p-2">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/reactjs.png"
                      alt="platform images"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2" colSpan="4">
                    <img
                      className="h-16  md:h-20 bg-white object-contain rounded-2xl p-2"
                      src="/Services/sql.png"
                      alt="platform images"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <Link href="/Contact"><button className="flex mx-auto my-10  px-6 py-3 text-sm md:text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:from-cyan-600 hover:to-blue-600 items-center gap-x-2">
          Get it now<FaArrowRightLong />
        </button></Link>
      </div>
    </>
  );
};

export default page;
