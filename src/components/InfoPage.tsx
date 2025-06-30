import React from 'react';
import { Code, Database, Smartphone, Zap, Shield, Github, ExternalLink, Globe } from 'lucide-react';

const InfoPage = () => {
  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "React 18", description: "Modern UI library with hooks and concurrent features" },
        { name: "TypeScript", description: "Type-safe JavaScript for better development experience" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid styling" },
        { name: "Vite", description: "Fast build tool and development server" }
      ]
    },
    {
      category: "Data Source",
      technologies: [
        { name: "Deutsche Bahn API", description: "Official real-time train data via v6.db.transport.rest" },
        { name: "REST API Integration", description: "Live journey planning and delay information" }
      ]
    },
    {
      category: "Icons & Assets",
      technologies: [
        { name: "Lucide React", description: "Beautiful, customizable SVG icons" }
      ]
    },
    {
      category: "Deployment",
      technologies: [
        { name: "Netlify", description: "Modern web hosting with continuous deployment" }
      ]
    }
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Real-time Data",
      description: "Live train schedules, delays, and cancellations directly from Deutsche Bahn's official API."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-green-500" />,
      title: "Mobile Optimized",
      description: "Fully responsive design that works seamlessly across all devices, from smartphones to desktops."
    },
    {
      icon: <Database className="w-6 h-6 text-purple-500" />,
      title: "Comprehensive Coverage",
      description: "Access to all German railway stations with detailed connection information and transfer options."
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Privacy Focused",
      description: "No personal data collection. All API calls are made directly from your browser for maximum privacy."
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🚄</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          About BahnPulse
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          A modern, real-time journey planner for Deutsche Bahn that provides live delay information and helps you find the best connections across Germany.
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">The Problem We Solve</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">The Challenge</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Train delays are unpredictable and frequent in Germany</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Passengers often miss connections due to unexpected delays</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Complex station names make searching difficult</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Need for real-time, accurate delay information</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-3">Our Solution</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Live data directly from Deutsche Bahn's official API</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Smart station search with autocomplete functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Real-time delay information and cancellation alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Mobile-first design for on-the-go planning</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Technology Stack</h2>
        </div>
        
        <div className="space-y-6">
          {techStack.map((category, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.category}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-1">{tech.name}</h4>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Source Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-time Data Source</h2>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Deutsche Bahn API</h3>
            <p className="text-sm">
              BahnPulse uses the official Deutsche Bahn API (v6.db.transport.rest) to provide real-time train schedules, 
              delay information, and cancellation alerts. This ensures you get the most accurate and up-to-date information 
              available directly from the source.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Live Updates</h3>
            <p className="text-sm">
              All data is fetched in real-time when you search for connections. This means you always get the latest 
              information about delays, platform changes, and cancellations without needing to refresh the page.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Coverage</h3>
            <p className="text-sm">
              The API covers all major Deutsche Bahn stations across Germany, including ICE, IC, RE, RB, and S-Bahn services. 
              You can search for any station by name, and the smart search will help you find the right one.
            </p>
          </div>
        </div>
      </div>

      {/* Transparency & Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Transparency & Disclaimer</h2>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Data Accuracy</h3>
            <p className="text-sm">
              While we use official Deutsche Bahn data, delays and cancellations can change rapidly. Always verify 
              critical travel information with official DB sources before making important travel decisions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Open Source</h3>
            <p className="text-sm">
              This project is built with transparency in mind. The complete source code, including all API integration 
              and data processing methods, is available for review and contribution on GitHub.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Privacy</h3>
            <p className="text-sm">
              No personal data is collected or stored. All API calls are made directly from your browser to the 
              Deutsche Bahn API, ensuring complete privacy of your travel queries and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Links & Resources</h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="https://github.com/piebro/deutsche-bahn-data"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <Github className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">DB Data API</div>
              <div className="text-sm text-gray-600">Data source repository</div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
          </a>
          
          <a
            href="https://www.bahn.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Official DB Website</div>
              <div className="text-sm text-gray-600">For ticket bookings</div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
          </a>
        </div>
      </div>
    </main>
  );
};

export default InfoPage;