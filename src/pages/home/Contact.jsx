const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-raleway">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          For any inquiries, please reach out to us:
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Email</h2>
            <p className="text-blue-600 hover:underline">
              <a href="mailto:contact@goldmarketplace.com">
                contact@goldmarketplace.com
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Phone</h2>
            <p className="text-gray-600">+1 234 567 890</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Address</h2>
            <p className="text-gray-600">
              123 Jewelry Street,<br />
              Gold City, Jewel State, 456789
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
