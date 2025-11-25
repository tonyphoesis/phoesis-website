// ================================================
// PRIVACY POLICY PAGE
// ================================================

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 prose prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-400">Last Updated: November 24, 2025</p>

      <h2>Overview</h2>
      <p>
        Phoesis Holdings LLC ("Phoesis," "we," "us," or "our") respects your privacy. 
        This Privacy Policy explains how we collect, use, and protect information when 
        you visit our website at phoesis.io.
      </p>

      <h2>Information We Collect</h2>
      
      <h3>Analytics Data</h3>
      <p>
        We use PostHog, a third-party analytics service, to understand how visitors use 
        our website. PostHog automatically collects:
      </p>
      <ul>
        <li>Page views and navigation patterns</li>
        <li>Device type and browser information</li>
        <li>Geographic location (country/city level)</li>
        <li>Referral source (how you found our site)</li>
        <li>Session duration and interaction data</li>
      </ul>
      <p>This data is collected through cookies and similar tracking technologies.</p>

      <h3>Contact Information</h3>
      <p>If you contact us through our website or email, we collect:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Any information you choose to provide in your message</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Analyze website performance and user experience</li>
        <li>Improve our products and services</li>
        <li>Respond to your inquiries</li>
        <li>Send occasional updates about Phoesis (only if you opt in)</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>
        We do not sell your personal information. We share data only with:
      </p>
      <ul>
        <li><strong>PostHog</strong> - for analytics processing (see their privacy policy at posthog.com/privacy)</li>
        <li><strong>Service providers</strong> - who help us operate our website</li>
        <li><strong>Legal authorities</strong> - when required by law</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Our website uses cookies to enable analytics functionality. You can control 
        cookies through your browser settings. Disabling cookies may limit your 
        experience on our site.
      </p>

      <h2>Your Rights</h2>
      <p>Depending on your location, you may have rights to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Request deletion of your data</li>
        <li>Opt out of analytics tracking</li>
        <li>Receive a copy of your data</li>
      </ul>

      <h3>Opt-Out Options</h3>
      <ul>
        <li><strong>Browser settings:</strong> Most browsers allow you to block cookies</li>
        <li><strong>PostHog opt-out:</strong> Contact us to request exclusion from analytics</li>
        <li><strong>Do Not Track:</strong> We honor Do Not Track signals where technically feasible</li>
      </ul>

      <h2>Data Security</h2>
      <p>
        We implement reasonable security measures to protect your information. However, 
        no internet transmission is 100% secure. We cannot guarantee absolute security.
      </p>

      <h2>Data Retention</h2>
      <ul>
        <li><strong>Analytics data:</strong> Retained for 12 months, then automatically deleted</li>
        <li><strong>Contact inquiries:</strong> Retained as long as necessary to respond, then deleted upon request</li>
      </ul>

      <h2>Children's Privacy</h2>
      <p>
        Our website is not intended for children under 13. We do not knowingly collect 
        information from children.
      </p>

      <h2>International Users</h2>
      <p>
        Phoesis is based in the United States. If you access our site from outside the 
        US, your information may be transferred to and processed in the US.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. We will post the updated policy 
        on this page with a new "Last Updated" date.
      </p>

      <h2>Contact Us</h2>
      <p>Questions about this Privacy Policy? Contact us:</p>
      <p>
        <strong>Phoesis Holdings LLC</strong><br />
        Email: privacy@phoesis.io<br />
        Website: phoesis.io
      </p>

      <hr className="my-8" />
      <p className="text-sm text-gray-400">
        This policy was last updated on November 24, 2025. By using our website, you 
        agree to this Privacy Policy.
      </p>
    </div>
  );
}