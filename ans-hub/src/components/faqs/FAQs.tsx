import { useState } from "react";
import { HelpCircle, Plus, Minus, Mail, Phone, MessageCircle } from "lucide-react";

export default function FAQs() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I access knowledge resources?",
          answer: "Navigate to the Knowledge Hub section from the sidebar. You can browse resources by category, search for specific topics, or filter by tags. All approved resources are available to registered users."
        },
        {
          question: "How do I register for the platform?",
          answer: "Click on the 'Register' button on the login page. Fill in your details including your National Society affiliation, position, and contact information. After submission, your application will be reviewed by administrators. You'll receive an email once approved."
        },
        {
          question: "What happens after I register?",
          answer: "Your registration will be reviewed by our administrators. Once approved, you'll receive an activation email with a link to set your password. After setting your password, you can log in and access all platform features."
        },
      ]
    },
    {
      category: "User Management",
      questions: [
        {
          question: "How do I approve new users?",
          answer: "Navigate to the Users section in the Management menu. You'll see a list of pending registrations. Review each user's details and click 'Approve' to create their account and send an activation email, or 'Reject' to decline the application."
        },
        {
          question: "What happens when I approve a user?",
          answer: "When you approve a user, the system automatically creates an inactive user account and sends an activation email to the registered email address. The user must click the activation link and set a password to complete their account setup."
        },
        {
          question: "Can I filter users by status?",
          answer: "Yes, use the status filter dropdown to view users by Pending, Approved, or Rejected status. You can also search for users by name, email, or organization using the search bar."
        },
      ]
    },
    {
      category: "Content Management",
      questions: [
        {
          question: "How do I create news articles?",
          answer: "Navigate to Create > News from the sidebar. Fill in the article title, content, featured image, and relevant tags. You can save as draft or publish immediately. Published articles will appear in the News & Stories section."
        },
        {
          question: "How do I upload knowledge resources?",
          answer: "Go to Create > Knowledge in the sidebar. You can upload various file types including PDFs, documents, presentations, and images. Add appropriate metadata, tags, and descriptions to help others find your resources."
        },
        {
          question: "Can I edit or delete content after publishing?",
          answer: "Yes, navigate to the relevant section (News, Knowledge Hub, etc.) and find your published content. Click on the edit icon to make changes or the delete icon to remove it. Note that deletions may require administrator approval."
        },
      ]
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "How do I reset my password?",
          answer: "On the login page, click 'Forgot Password' and enter your registered email address. You'll receive a password reset link via email. Click the link and follow the instructions to set a new password."
        },
        {
          question: "Can I update my profile information?",
          answer: "Yes, click on your avatar in the top right corner and select 'Profile Settings'. You can update your contact information, position, expertise areas, and other profile details. Changes are saved immediately."
        },
        {
          question: "Who can see my information?",
          answer: "Your basic profile information (name, National Society, position) is visible to other registered users. Your email and phone number are only visible to administrators. You can control visibility of additional information in your privacy settings."
        },
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What browsers are supported?",
          answer: "The platform works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for optimal performance and security."
        },
        {
          question: "I'm experiencing technical issues. What should I do?",
          answer: "First, try clearing your browser cache and cookies, then refresh the page. If the issue persists, contact our support team using the contact information below. Include details about the issue, your browser version, and any error messages you see."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take security seriously. All data is encrypted in transit and at rest. We follow industry best practices for data protection and regularly update our security measures. Your personal information is never shared with third parties without your consent."
        },
      ]
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-lg">
          <HelpCircle className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-500">
            Find answers to common questions about the platform
          </p>
        </div>
      </div>

      {/* FAQs by Category */}
      <div className="space-y-6">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <h2 className="font-display text-xl font-bold text-gray-900">
                {category.category}
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {category.questions.map((faq, faqIndex) => {
                const globalIndex = categoryIndex * 100 + faqIndex;
                const isOpen = openFaqIndex === globalIndex;
                return (
                  <div
                    key={faqIndex}
                    className="overflow-hidden rounded-lg bg-white border border-gray-200 transition-all hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleFaq(globalIndex)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                          isOpen
                            ? "bg-orange-100 text-orange-600 rotate-180"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/20">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold mb-2">
              Still need help?
            </h3>
            <p className="text-blue-100 mb-4">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:support@localisationhub.org"
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                <Mail className="h-4 w-4" />
                Email Support
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium border border-white/30"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
