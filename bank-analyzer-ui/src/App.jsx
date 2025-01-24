import React, { useState } from "react";
import { analyzeBankStatement } from "./api";
import Layout from "./components/layout/Layout";
import { Upload, ArrowRight, Download } from "lucide-react";
import InsightCard from './components/InsightCard';
import { downloadAnalysis } from './utils/downloadUtils';

const App = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeBankStatement(file);
      setAnalysis(parseAnalysis(result.report));
    } catch (error) {
      console.error("Error Details:", error);
      alert(`An error occurred: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (analysis) {
      downloadAnalysis(analysis);
    }
  };

  const parseAnalysis = (report) => {
    const sections = report.split("\n\n");
    const parsed = {
      recommendation: "",
      deposits: "",
      withdrawals: "",
      regularBills: "",
      loans: "",
    };

    sections.forEach((section) => {
      if (section.startsWith("1. MONTHLY DEPOSITS:"))
        parsed.deposits = cleanText(section);
      else if (section.startsWith("2. MONTHLY WITHDRAWALS:"))
        parsed.withdrawals = cleanText(section);
      else if (section.startsWith("3. REGULAR BILLS:"))
        parsed.regularBills = cleanText(section);
      else if (section.startsWith("4. LOANS AND DEBTS:"))
        parsed.loans = cleanText(section);
      else if (section.startsWith("5. LOAN RECOMMENDATION:"))
        parsed.recommendation = cleanText(section);
    });

    return parsed;
  };

  const cleanText = (text) => {
    const index = text.indexOf(":") + 1;
    return text.slice(index).trim();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-4">Loan Eligibility Analysis</h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload your bank statement to get instant AI-powered loan insights
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-green-500 mb-2">🚀</div>
              <h3 className="font-semibold mb-2">Instant Analysis</h3>
              <p className="text-gray-500 text-sm">Get loan insights in seconds</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-green-500 mb-2">🔒</div>
              <h3 className="font-semibold mb-2">Secure Upload</h3>
              <p className="text-gray-500 text-sm">Your data is encrypted and safe</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-green-500 mb-2">📊</div>
              <h3 className="font-semibold mb-2">Smart Insights</h3>
              <p className="text-gray-500 text-sm">AI-powered loan recommendations</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col items-center gap-6">
              <div className="w-full max-w-xl">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-green-200 border-dashed rounded-xl cursor-pointer bg-white hover:bg-green-50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-green-500" />
                    <p className="mb-2 text-lg text-gray-500">
                      <span className="font-semibold text-green-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PDF (MAX. 10MB)</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {file && (
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
              >
                {loading ? "Analyzing..." : "Analyze Statement"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {analysis && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Analysis
              </button>
            </div>
            
            <InsightCard 
              type="recommendation" 
              content={analysis.recommendation} 
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <InsightCard 
                type="deposits" 
                content={analysis.deposits} 
              />
              <InsightCard 
                type="withdrawals" 
                content={analysis.withdrawals} 
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <InsightCard 
                type="regularBills" 
                content={analysis.regularBills} 
              />
              <InsightCard 
                type="loans" 
                content={analysis.loans} 
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;