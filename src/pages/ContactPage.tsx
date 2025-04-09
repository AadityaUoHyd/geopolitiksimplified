// ContactPage.tsx
import { MapPin, Mail, Linkedin } from "lucide-react";
import { Card, CardHeader, CardBody, Input, Textarea, Button } from "@nextui-org/react";

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col min-h-screen">
      <Card className="shadow-2xl rounded-3xl bg-gradient-to-br from-white to-gray-50 flex-1">
        <CardHeader className="px-8 py-6 border-b border-gray-200/50">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600  to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
        </CardHeader>

        <CardBody className="px-8 py-6 space-y-8 flex flex-col">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Card className="w-full bg-blue-50 hover:shadow-lg transition-shadow">
              <CardBody className="flex flex-row items-center gap-4">
                <Mail className="text-blue-600 w-8 h-8" />
                <div>
                  <p className="text-sm text-gray-500">Email me at</p>
                  <a
                    href="mailto:aadiraj48@gmail.com"
                    className="text-lg font-semibold text-blue-800 hover:underline"
                  >
                    aadiraj48@gmail.com
                  </a>
                </div>
              </CardBody>
            </Card>
            
            <Card className="w-full bg-purple-50 hover:shadow-lg transition-shadow">
              <CardBody className="flex flex-row items-center gap-4">
                <Linkedin className="text-purple-600 w-8 h-8" />
                <div>
                  <p className="text-sm text-gray-500">Connect on</p>
                  <a
                    href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-purple-800 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Mailmeteor Contact Form */}
            <form 
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-6 w-full"
            >
              <input type="hidden" name="access_key" value="031cb32e-4e5b-4310-9cfc-f82dda78ed5b" />

              <Input
                isRequired
                label="Your Name"
                name="name"
                placeholder="type your name here.."
                variant="bordered"
                classNames={{
                  input: "text-lg",
                  label: "text-gray-600"
                }}
              />
              
              <Input
                isRequired
                label="Email Address"
                type="email"
                name="email"
                placeholder="type your email-id here.."
                variant="bordered"
                classNames={{
                  input: "text-lg",
                  label: "text-gray-600"
                }}
              />
              
              <Textarea
                isRequired
                label="Message"
                name="message"
                placeholder="type your message here..."
                minRows={6}
                variant="bordered"
                classNames={{
                  input: "text-lg",
                  label: "text-gray-600"
                }}
              />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg py-6 hover:opacity-90 transition-opacity"
                size="lg"
              >
                Send Message
              </Button>
            </form>

            {/* Location Section */}
            <div className="space-y-6 h-full">
              <div className="flex items-center gap-3 text-lg p-4 bg-gray-50 rounded-xl">
                <MapPin className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    Hyderabad, India
                  </p>
                  <p className="text-gray-500">Tech Capital of India</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-100 h-[300px]">
                <iframe
                  title="Hyderabad Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.0090128120836!2d78.4578852748442!3d17.447400983366566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93981ed49cdb%3A0x1c4c1a47c9f7f94a!2sHitech%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1689070151789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="rounded-lg"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Centered Open For Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="text-center space-y-3">
              <p className="text-gray-600 text-lg font-medium">
                <span className="text-2xl mr-2" aria-hidden="true">🇮🇳</span>
                Open for professional opportunities
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors text-sm font-semibold"
                >
                  Collaborations
                </a>
                <a
                  
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors text-sm font-semibold"
                >
                  Freelance Projects
                </a>
                <a
                  
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors text-sm font-semibold"
                >
                  Full-time Roles
                </a>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactPage;