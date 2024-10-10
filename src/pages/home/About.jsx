// src/pages/About/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-raleway text-gray-800">
      {/* About Us Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-6">About Us</h1>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Welcome to Sonatank, where we specialize in transforming the beauty
            parlor management experience. Our mission is to empower beauty
            professionals with innovative tools that streamline operations and
            enhance customer engagement. We pride ourselves on our commitment to
            delivering exceptional solutions tailored to the unique needs of our
            clients.
          </p>
          <p className="text-lg max-w-3xl mx-auto">
            From appointment scheduling to inventory management, our
            comprehensive services cover every aspect of beauty parlor
            operations. We strive to help our clients thrive in a competitive
            market by providing customized solutions that drive growth and
            success.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 text-center bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Our Mission</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Our mission at Sonatank is to revolutionize the beauty industry by
            providing cutting-edge management solutions that empower beauty
            parlors to excel. We are dedicated to fostering an environment of
            creativity and collaboration, where ideas flourish and lead to
            successful outcomes. Our goal is to enhance client satisfaction and
            drive measurable results for beauty professionals.
          </p>
          <p className="text-lg max-w-2xl mx-auto mt-4">
            With a strong commitment to excellence and innovation, we aim to
            create memorable experiences that not only captivate but also
            establish long-lasting relationships between beauty experts and
            their clients.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 text-center bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Creativity</h3>
              <p>
                We embrace creativity as a driving force behind our innovative
                solutions. Our team constantly explores new ideas to deliver
                standout management tools tailored for the beauty industry.
              </p>
            </div>
            {/* Value 2 */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Collaboration</h3>
              <p>
                Strong partnerships are at the heart of our approach. We work
                closely with beauty professionals to ensure our solutions meet
                their needs, fostering open communication for aligned goals.
              </p>
            </div>
            {/* Value 3 */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p>
                Innovation is essential in the rapidly evolving beauty sector.
                We stay ahead of trends and leverage the latest technologies to
                provide our clients with advanced management solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Section: Our Team */}
      <section className="py-16 text-center bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Our team consists of dedicated professionals with a passion for the
            beauty industry. Together, we bring diverse expertise to create
            innovative solutions that elevate the beauty parlor experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Jane Doe</h3>
              <p>CEO</p>
              <p className="mt-4">
                Jane leads Sonatank with a vision to empower beauty
                professionals through innovative management solutions that
                streamline their operations.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">John Smith</h3>
              <p>Product Manager</p>
              <p className="mt-4">
                John oversees product development, ensuring that our tools meet
                the evolving needs of beauty parlors while enhancing user
                experience.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Emily Johnson</h3>
              <p>Marketing Specialist</p>
              <p className="mt-4">
                Emily crafts marketing strategies that showcase Sonatank's
                innovative solutions and strengthen our brand presence in the
                beauty industry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
