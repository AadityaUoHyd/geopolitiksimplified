import React from "react";
import { MapPin } from "lucide-react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const ContactSection = () => {
  return (
    <Card className="mt-10 shadow-xl rounded-2xl">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">📍 My Location</h2>
      </CardHeader>

      <CardBody className="px-6 py-4 space-y-4 text-gray-700">
        <div className="flex items-center gap-3 text-lg">
          <MapPin size={20} />
          <span>Hyderabad, Telangana, India</span>
        </div>

        {/* Google Map Embed */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Hyderabad Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.0090128120836!2d78.4578852748442!3d17.447400983366566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93981ed49cdb%3A0x1c4c1a47c9f7f94a!2sHitech%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1689070151789!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="text-sm text-gray-500 italic">
          Based in Hyderabad, India 🇮🇳 — available for collaboration, freelancing, or full-time roles. Let’s build something awesome together!
        </p>
      </CardBody>
    </Card>
  );
};

export default ContactSection;
