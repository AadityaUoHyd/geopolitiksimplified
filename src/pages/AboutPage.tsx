// AboutPage.tsx
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import aadiImage from "../assets/aadi.jpg";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Card className="shadow-2xl rounded-3xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="px-8 py-6 border-b border-gray-200/50">
          <div className="flex items-center gap-5">
            <img
              src={aadiImage}
              alt="Aaditya B Chatterjee"
              className="w-14 h-14 object-cover rounded-full border-2 border-white shadow-lg"
            />
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Me
            </h1>
          </div>
        </CardHeader>

        <CardBody className="px-8 py-6 space-y-6 text-gray-700 leading-relaxed text-base font-sans">
          <p className="text-lg text-gray-800">
            👋 Hey there! I'm <strong className="text-blue-600">Aaditya B Chatterjee</strong>, 
            an <strong className="text-purple-600">MCA graduate</strong> from the prestigious{" "}
            <strong className="text-blue-600">University of Hyderabad</strong> (2011-14).
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">🚀 Tech Expertise</h2>
              <p className="text-gray-700">
                Full-stack developer passionate about building with:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">▹</span>
                  Java, Spring Boot, Python, Django
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">▹</span>
                  Angular, React, Next.js, Node/Express
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">▹</span>
                  AWS, Docker, K8s, Terraform, Jenkins, Ansible
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">▹</span>
                  Machine Learning & AI enthusiast
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <h2 className="text-xl font-semibold text-purple-800 mb-3">💼 Professional Journey</h2>
              <p className="text-gray-700">
                Seasoned in corporate IT with experience in:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Enterprise web application development</li>
                <li>Cross-functional team leadership</li>
                <li>Client-focused solution delivery</li>
                <li>Module-level system design</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h2 className="text-xl font-semibold text-green-800 mb-3">🎯 Beyond Code</h2>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <span aria-hidden="true">📖</span> Reading Books
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <span aria-hidden="true">🏏</span> Cricket
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <span aria-hidden="true">🏸</span> Badminton
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <span aria-hidden="true">🎭</span> International Affarirs.
                </span>
              </div>
            </div>
          </div>

          <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-600 italic bg-blue-50 p-4 rounded-lg">
            "For most problems in the world, I prefer - 
            <br />
            <strong className="not-italic text-blue-600">Simplify → Understand → Debug → Refactor → Repeat</strong> 🚀"
          </blockquote>

          <p className="text-center text-gray-600 mt-6">
            Built this platform to share knowledge, streamline workflows, 
            and collaborate on building a better digital world 🌍
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default AboutPage;