import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12 py-12"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 blue-gradient rounded-2xl flex items-center justify-center mx-auto text-gold shadow-xl">
          <FileText size={32} />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">Terms of Service</h1>
        <p className="text-gray-400 font-medium">Last updated: March 20, 2026</p>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-deep-blue">
            <CheckCircle size={24} />
            <h2 className="text-2xl font-bold tracking-tight">1. Acceptance of Terms</h2>
          </div>
          <p>
            By accessing and using Vision 24, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-deep-blue">
            <AlertCircle size={24} />
            <h2 className="text-2xl font-bold tracking-tight">2. Use License</h2>
          </div>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Vision 24's website for personal, non-commercial transitory viewing only.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-deep-blue">3. Disclaimer</h2>
          <p>
            The materials on Vision 24's website are provided on an 'as is' basis. Vision 24 makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
