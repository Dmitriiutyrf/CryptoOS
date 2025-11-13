
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Video Surveillance',
      description: 'High-definition cameras and advanced analytics to keep your property secure.',
    },
    {
      title: 'Access Control',
      description: 'Secure and manage access to your premises with our modern access control systems.',
    },
    {
      title: 'Fire Alarm Systems',
      description: 'Reliable and compliant fire alarm systems for early detection and warning.',
    },
    {
      title: 'Structured Cabling',
      description: 'A robust and organized network foundation for your business communication needs.',
    },
  ];

  return (
    <section className="features">
      <h2>Our Services</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
