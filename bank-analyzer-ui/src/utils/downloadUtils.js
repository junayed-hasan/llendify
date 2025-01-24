export const generateDownloadContent = (analysis) => {
    const content = `
  LLendify Analysis Report
  Generated on: ${new Date().toLocaleString()}
  
  LOAN RECOMMENDATION
  ------------------
  ${analysis.recommendation}
  
  MONTHLY DEPOSITS
  ---------------
  ${analysis.deposits}
  
  MONTHLY WITHDRAWALS
  ------------------
  ${analysis.withdrawals}
  
  REGULAR BILLS
  ------------
  ${analysis.regularBills}
  
  LOANS AND DEBTS
  --------------
  ${analysis.loans}
  `;
  
    return content.trim();
  };
  
  export const downloadAnalysis = (analysis, format = 'txt') => {
    const content = generateDownloadContent(analysis);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `llendify-analysis-${new Date().toISOString().split('T')[0]}.${format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };