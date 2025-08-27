import React, { useState, Fragment } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Send, HelpCircle } from 'lucide-react';
import Layout from '../../components/Layout';
import { Tab } from '@headlessui/react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const faqCategories = {
  General: [
    {
      question: 'How do I generate my referral link?',
      answer: 'Go to the "Referral Link" tab on your dashboard. You\'ll find your personalized affiliate link there. Share it to earn commissions.',
    },
    {
      question: 'Is there a minimum payout threshold?',
      answer: 'Yes, the minimum payout is $50. You must reach this before a withdrawal can be made.',
    },
  ],
  Earnings: [
    {
      question: 'When will I receive my earnings?',
      answer: 'Earnings are processed every 30 days. You can track your progress from the "Earnings" tab.',
    },
  ],
  Account: [
    {
      question: 'How do I change my account information?',
      answer: 'Navigate to the "Account" section and update your personal or bank details.',
    },
  ],
  Technical: [
    {
      question: 'What if my referral doesn\'t show up?',
      answer: 'Make sure they registered using your exact referral link. If the issue persists, contact support.',
    },
  ],
};

const HelpCenter = () => {
  const [search, setSearch] = useState('');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const toggleAnswer = (category, index) => {
    const key = `${category}-${index}`;
    setOpenQuestion((prev) => (prev === key ? null : key));
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    const token = localStorage.getItem("affiliateToken");

    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8088/api/affiliate/send-query", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Query sent successfully!");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        toast.error(` Failed to send query: ${data.error}`);
      }

    } catch (error) {
      console.error("Error sending query:", error);
      toast.error(`Something went wrong: ${data.error}`);
    }
  };


  const getFilteredFAQs = (category) => {
    const lowerSearch = search.toLowerCase();
    const faqs = faqCategories[category] || [];

    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(lowerSearch) ||
      faq.answer.toLowerCase().includes(lowerSearch)
    );
  };

  const tabs = ['General', 'Earnings', 'Account', 'Technical', 'Contact'];

  return (
    <Layout>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-left">Help Center</h1>
        <p className='text-sm sm:text-base text-gray-600 mb-6'>Find answers to frequently asked questions and get help with your affiliate account.</p>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search any question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-md focus:border-[#9086F3]"
          />
          <Search className="absolute right-4 top-3 text-gray-400" />
        </div>

        <Tab.Group>
          <Tab.List className="flex flex-wrap justify-left gap-2 sm:gap-4 border-b mb-6">
            {tabs.map((tab) => (
              <Tab key={tab} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      'outline-none py-2 px-4 text-sm font-medium border-b-2 transition-all',
                      selected
                        ? 'border-[#9086F3] text-[#9086F3]'
                        : 'border-transparent text-gray-500 hover:text-[#9086F3]'
                    )}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4 space-y-6">
            {/* FAQ Panels */}
            {Object.keys(faqCategories).map((category) => (
              <Tab.Panel key={category} className="bg-white rounded-md shadow p-6 border space-y-4">
                <div className="flex items-center gap-2 mb-4 text-[#9086F3]">
                  <HelpCircle className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">{category} Questions</h2>
                </div>

                <div className="space-y-4">
                  {getFilteredFAQs(category).length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No FAQs found for your search.</p>
                  ) : (
                    getFilteredFAQs(category).map((faq, index) => {
                      const key = `${category}-${index}`;
                      return (
                        <div key={key} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleAnswer(category, index)}
                            className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <span className="text-sm sm:text-base">{faq.question}</span>
                            {openQuestion === key ? (
                              <ChevronUp className="w-5 h-5 flex-shrink-0 ml-2" />
                            ) : (
                              <ChevronDown className="w-5 h-5 flex-shrink-0 ml-2" />
                            )}
                          </button>
                          {openQuestion === key && (
                            <div className="px-4 pb-4 text-sm sm:text-base text-gray-600 border-t border-gray-100 pt-3 mt-3">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </Tab.Panel>
            ))}

            {/* Contact Panel */}
            <Tab.Panel className="space-y-6">
              {/* Email Support */}
              <div className="bg-white rounded-md shadow p-6 border">
                <div className="flex items-center gap-2 mb-4 text-[#9086F3]">
                  <Mail className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Email Support</h2>
                </div>
                <p className="text-gray-600 mb-4">Need immediate assistance? Contact our support team directly.</p>
                <a
                  href="mailto:support@ezitech.com"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#9086F3] text-white rounded-md hover:bg-[#7f75dc] transition w-full sm:w-auto justify-center sm:justify-start"
                >
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-md shadow p-6 border">
                <div className="flex items-center gap-2 mb-4 text-green-600">
                  <Send className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Submit Your Queries</h2>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactFormChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      placeholder="Describe your issue..."
                      rows="4"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                      required
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition w-full sm:w-auto justify-center"
                    >
                      <Send className="w-4 h-4" />
                      Submit Query
                    </button>
                  </div>
                </form>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Layout>
  );
};

export default HelpCenter;