import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage as changeI18nLanguage } from '../../i18n';
import { 
  TestTube, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Camera,
  X
} from 'lucide-react';

interface RTLTestCase {
  id: string;
  name: string;
  description: string;
  component: string;
  expectedBehavior: string;
  testSteps: string[];
}

export const RTLTestSuite: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, 'pass' | 'fail' | 'pending'>>({});

  // Only show in development
  if (!import.meta.env.DEV) {
    return null;
  }

  if (!isOpen) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          title="Open RTL Test Suite"
        >
          <TestTube className="w-5 h-5" />
          {Object.values(testResults).filter(r => r === 'fail').length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {testResults && Object.values(testResults).filter(r => r === 'fail').length}
            </div>
          )}
        </button>
      </div>
    );
  }

  const testCases: RTLTestCase[] = [
    {
      id: 'profile-layout',
      name: 'Profile Page RTL Layout',
      description: 'Test profile page layout in Arabic RTL mode',
      component: 'ProfileScreen',
      expectedBehavior: 'Menu items align to start, icons flip, text flows right-to-left',
      testSteps: [
        'Switch to Arabic language',
        'Navigate to Profile page',
        'Verify menu items align to right',
        'Check that icons are mirrored appropriately',
        'Confirm text flows naturally in RTL'
      ]
    },
    {
      id: 'plans-cards',
      name: 'Subscription Plans RTL Cards',
      description: 'Test subscription plan cards in Arabic',
      component: 'SubscriptionPlans',
      expectedBehavior: 'Plan cards mirror layout, prices align correctly, buttons flow RTL',
      testSteps: [
        'Switch to Arabic language',
        'Navigate to Plans page',
        'Verify plan cards mirror layout',
        'Check price alignment and currency formatting',
        'Test action buttons layout'
      ]
    },
    {
      id: 'cart-interactions',
      name: 'Shopping Cart RTL Interactions',
      description: 'Test cart interactions and quantity controls in Arabic',
      component: 'CartScreen',
      expectedBehavior: 'Quantity controls mirror, totals align, checkout flows RTL',
      testSteps: [
        'Add items to cart',
        'Switch to Arabic language',
        'Navigate to Cart page',
        'Test quantity increment/decrement controls',
        'Verify price totals and alignment'
      ]
    },
    {
      id: 'marketplace-filters',
      name: 'Marketplace Filters RTL',
      description: 'Test marketplace search and filters in Arabic',
      component: 'ProductCatalog',
      expectedBehavior: 'Search bar, filters, and product cards adapt to RTL',
      testSteps: [
        'Switch to Arabic language',
        'Navigate to Marketplace',
        'Test search functionality',
        'Use category filters',
        'Verify product card layouts'
      ]
    }
  ];

  const runTest = async (testCase: RTLTestCase) => {
    setSelectedTest(testCase.id);
    setTestResults(prev => ({ ...prev, [testCase.id]: 'pending' }));

    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, randomly pass/fail tests
    const result = Math.random() > 0.3 ? 'pass' : 'fail';
    setTestResults(prev => ({ ...prev, [testCase.id]: result }));
    setSelectedTest(null);
  };

  const runAllTests = async () => {
    for (const testCase of testCases) {
      await runTest(testCase);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const getTestIcon = (testId: string) => {
    const result = testResults[testId];
    switch (result) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'fail':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <TestTube className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 w-96 max-h-[80vh] overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            <h3 className="font-semibold">RTL Test Suite</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-blue-700 rounded"
            title="Close RTL Test Suite"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-700 px-2 py-1 rounded">
              Current: {i18n.language.toUpperCase()}
            </span>
            <span className="text-xs bg-blue-700 px-2 py-1 rounded">
              Dir: {document.dir.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto max-h-96">
        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={runAllTests}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-sm"
          >
            <TestTube className="w-4 h-4" />
            Run All Tests
          </button>
          <button
            onClick={() => changeI18nLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1 px-3 py-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Toggle Lang
          </button>
        </div>

        {/* Test Cases */}
        <div className="space-y-3">
          {testCases.map(testCase => (
            <div
              key={testCase.id}
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{testCase.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{testCase.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {getTestIcon(testCase.id)}
                  <button
                    onClick={() => runTest(testCase)}
                    disabled={selectedTest === testCase.id}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors disabled:opacity-50"
                  >
                    Test
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <strong>Component:</strong> {testCase.component}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <strong>Expected:</strong> {testCase.expectedBehavior}
              </div>

              {/* Test Steps */}
              <details className="mt-2">
                <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-700">
                  View Test Steps
                </summary>
                <div className="mt-2 space-y-1">
                  {testCase.testSteps.map((step, index) => (
                    <div key={index} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="text-blue-500 font-mono">{index + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* Test Summary */}
        <div className="bg-gray-50 rounded p-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Test Summary</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-green-100 rounded p-2">
              <div className="text-lg font-bold text-green-600">
                {Object.values(testResults).filter(r => r === 'pass').length}
              </div>
              <div className="text-xs text-green-700">Passed</div>
            </div>
            <div className="bg-red-100 rounded p-2">
              <div className="text-lg font-bold text-red-600">
                {Object.values(testResults).filter(r => r === 'fail').length}
              </div>
              <div className="text-xs text-red-700">Failed</div>
            </div>
            <div className="bg-blue-100 rounded p-2">
              <div className="text-lg font-bold text-blue-600">
                {Object.values(testResults).filter(r => r === 'pending').length}
              </div>
              <div className="text-xs text-blue-700">Running</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};