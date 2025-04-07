import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Mail, Phone } from "lucide-react";
import ContactSection from "./ContactSection";
import aadiImage from "../assets/aadi.jpg";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Card className="shadow-xl rounded-2xl">
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={aadiImage}
              alt="Aaditya B Chatterjee"
              className="w-12 h-12 object-cover rounded-full border border-gray-300 shadow-md"
            />
            <h1 className="text-3xl font-bold text-gray-800">About Me</h1>
          </div>

        </CardHeader>

        <CardBody className="px-6 py-4 space-y-4 text-gray-700 leading-relaxed text-base">
          {/* Bio */}
          <p>
            Hey there! 👋 I’m <strong>Aaditya B Chatterjee</strong>. I completed my{" "}
            <strong>Masters in Computer Science (MCA)</strong> in 2014 from the{" "}
            <strong>University of Hyderabad</strong>.
          </p>
          <p>
            I’m a passionate full-stack developer who loves building applications with
            <strong> Java</strong>, <strong>Spring Boot</strong>, <strong>Python</strong>, <strong>Django</strong> and modern JavaScript frameworks like <strong>Angular</strong>, <strong>React</strong>, <strong>Next.js</strong> and <strong>Node & Express Js</strong>. I also enjoy diving into <strong>DevOps</strong> tools like AWS Cloud, Docker, Render, K8s, Terraform, Jenkins, and Keycloak. Recently, dived into <strong>Machine Learning</strong> as well.
          </p>
          <p>
            I also have solid experience working in the corporate IT sector, where I’ve contributed to building and maintaining robust, enterprise-grade web applications. Over the years, I've collaborated with cross-functional teams, led module-level designs, and worked with clients to deliver high-quality solutions that align with business goals.
          </p>

          <p>
            When I’m not coding, you can catch me playing <strong>cricket</strong>, smashing it at <strong>badminton</strong>, or cheering on my niece's <strong>Singing performances</strong>. 🎭🏸
          </p>
          <p>
            I built this site to share knowledge, simplify my workflows, and build better world, together.
          </p>

          <p className="italic text-sm text-gray-500">"For most of the problem exists in the world, I prefer - Simplify. Understand. Debug. Refactor. Repeat. 🚀"</p>

          {/* 💡 Contact Me + Image Section in Flexbox */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {/* Left: Contact Info */}
              <div className="flex-1 pr-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">📬 Contact Me</h2>
                <ul className="space-y-3 text-base text-gray-700">
                  <li className="flex items-center gap-2">
                    <Mail size={18} />
                    <span>
                      Email:{" "}
                      <a
                        href="mailto:aaditya.dev@gmail.com"
                        className="text-blue-600 hover:underline"
                      >
                        aadityabchatterjee@geopolitiksimplified.com
                      </a>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={18} />
                    <span>Mobile: +91 0000000000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <ContactSection />
        </CardBody>
      </Card>
    </div>
  );
};

export default AboutPage;
