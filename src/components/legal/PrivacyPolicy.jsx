import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-6 font-inter">
      <h1 className="text-center text-5xl font-euclid font-bold mb-4">
        Privacy Policy<span className="text-red-500">.</span>
      </h1>
      <p className="text-center font-afc mb-6">Effective Date: 01/01/25</p>
      <div className="max-h-[70vh] overflow-y-auto border border-gray-300 rounded-lg p-6 bg-white shadow-lg font-dm">
        <p className="mb-4">
          Competiboard is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and handle your information when
          you use our services.
        </p>

        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We collect and store only the following information when you use our
          services:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Email Address:</strong> To identify and communicate with
            you.
          </li>
          <li>
            <strong>Name:</strong> To personalize your experience on our
            platform.
          </li>
        </ul>
        <p className="mb-4">
          We do not collect any other personal information, browsing data, or
          sensitive details.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          How We Use Your Information
        </h2>
        <p className="mb-4">
          The information we collect is used solely for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Providing access to our services.</li>
          <li>Personalizing your user experience.</li>
          <li>Sending service-related notifications and updates.</li>
        </ul>
        <p className="mb-4">
          We do not use your information for advertising, profiling, or sharing
          with third parties.
        </p>

        <h2 className="text-xl font-semibold mb-2">Information Sharing</h2>
        <p className="mb-4">
          We do not sell, rent, or share your information with any third parties
          except as required:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To comply with legal obligations.</li>
          <li>To protect the rights and safety of our users or others.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Data Security</h2>
        <p className="mb-4">
          We take appropriate security measures to protect your information
          against unauthorized access, alteration, disclosure, or destruction.
          These measures include encryption, secure storage, and regular
          security audits.
        </p>

        <h2 className="text-xl font-semibold mb-2">Data Retention</h2>
        <p className="mb-4">
          We retain your email and name as long as your account is active or as
          needed to provide you with our services. If you wish to delete your
          account or request that we no longer use your information, please
          contact our founder at{" "}
          <a
            href="mailto:byjuaditya@gmail.com"
            className="text-blue-500 underline"
          >
            byjuaditya@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mb-2">User Rights</h2>
        <p className="mb-4">
          You have the following rights regarding your information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Access:</strong> Request a copy of the information we hold
            about you.
          </li>
          <li>
            <strong>Correction:</strong> Update or correct your information.
          </li>
          <li>
            <strong>Deletion:</strong> Request the deletion of your information.
          </li>
        </ul>
        <p className="mb-4">
          To exercise these rights, please contact us at{" "}
          <a
            href="mailto:byjuaditya@gmail.com"
            className="text-blue-500 underline"
          >
            byjuaditya@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mb-2">OAuth Compliance</h2>
        <p className="mb-4">We comply with Google OAuth policies by:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Collecting only the minimum information necessary (email and name).
          </li>
          <li>
            Using the information exclusively for purposes that are transparent
            and directly related to our services.
          </li>
          <li>Not misusing or misrepresenting user information.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date. We encourage
          you to review this Privacy Policy periodically.
        </p>

        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us:
          <br />
          Email:{" "}
          <a
            href="mailto:byjuaditya@gmail.com"
            className="text-blue-500 underline"
          >
            byjuaditya@gmail.com
          </a>
          <br />
          Location: Chicago, IL
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
