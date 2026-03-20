import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12 py-12"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 blue-gradient rounded-2xl flex items-center justify-center mx-auto text-gold shadow-xl">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">Privacy Policy</h1>
        <p className="text-gray-400 font-medium">Last updated: March 20, 2026</p>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-deep-blue">
            <Eye size={24} />
            <h2 className="text-2xl font-bold tracking-tight">Information We Collect</h2>
          </div>
          <p>
            Vision 24 collects information to provide better services to all our users. We collect information in the following ways:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Information you give us (e.g., name, email address when you sign up).</li>
            <li>Information we get from your use of our services (e.g., device information, log information, location information).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-deep-blue">
            <Lock size={24} />
            <h2 className="text-2xl font-bold tracking-tight">How We Use Information</h2>
          </div>
          <p>
            We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect Vision 24 and our users.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-deep-blue">
            <FileText size={24} />
            <h2 className="text-2xl font-bold tracking-tight">Google AdSense & Cookies</h2>
          </div>
          <p>
            Vision 24 uses Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.
          </p>
          <p>
            Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-deep-blue">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <strong>privacy@vision24.com</strong>
          </p>
        </section>
      </div>
    </motion.div>
  );
}
