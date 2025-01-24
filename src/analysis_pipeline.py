import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from .pdf_parser import extract_text_from_pdf

load_dotenv()

def truncate_to_max_tokens(text: str, max_tokens: int) -> str:
    """
    Truncate the input text to the last max_tokens tokens (approximate, based on spaces).
    """
    words = text.split()
    if len(words) > max_tokens:
        return " ".join(words[-max_tokens:])
    return text

def summarize_text(pdf_path: str, api_key: str = None) -> str:
    if not api_key:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OpenAI API key not set.")

    # Extract text from the PDF
    text = extract_text_from_pdf(pdf_path)

    # Truncate the text to the last 128,000 tokens
    truncated_text = truncate_to_max_tokens(text, 128000)

    # Prompt template for analyzing the entire text
    full_text_prompt_template = """
    You are an AI assistant helping analyze bank statements.
    Analyze this bank statement and provide structured information about:

    1. Deposits and income
    2. Withdrawals and expenses
    3. Regular bills or recurring payments
    4. Any mentions of loans or debts

    For each transaction, include the amount when available.
    Format your response with clear headers and bullet points. If it is not a bank statement, simply say so.

    Here's the bank statement:
    {text}
    """

    # Define the prompt
    full_text_prompt = PromptTemplate(input_variables=["text"], template=full_text_prompt_template)

    # Initialize the OpenAI LLM
    llm = ChatOpenAI(openai_api_key=api_key, temperature=0.0, max_tokens=5000, model="gpt-4o")
    llm_chain = LLMChain(llm=llm, prompt=full_text_prompt)

    # Generate the summary for the truncated text
    summary = llm_chain.run(text=truncated_text)

    return summary.strip()

def consolidate_summary(summary: str, api_key: str = None) -> str:
    if not api_key:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OpenAI API key not set.")

    consolidation_prompt_template = """
    Based on this bank statement analysis:
    {summary}

    Provide a comprehensive analysis with the following sections clearly separated by newlines and following this exact format. Do not give multiple newlines in between points of the same section:

    1. MONTHLY DEPOSITS:
    - Total monthly deposits
    - Major sources of income
    - Frequency and patterns

    2. MONTHLY WITHDRAWALS:
    - Total monthly withdrawals
    - Major expense categories
    - Spending patterns

    3. REGULAR BILLS:
    - List all recurring expenses
    - Include rent, utilities, salaries if found
    - Note the frequency and amounts

    4. LOANS AND DEBTS:
    - Any existing loans or loan payments
    - Outstanding debts
    - Credit-related transactions

    5. LOAN RECOMMENDATION:
    - Clear recommendation on loan approval: RECOMMENDED or NOT RECOMMENDED (nothing in between)
    - Key factors supporting the decision
    - Any concerns or red flags

    Format each section with clear headers and maintain a professional tone. Give plain text with section header. Use standard punctuations only, do not use any other symbols or tokens. If it is not a bank statement, simply say it under each section header.
    """

    # Define the consolidation prompt
    consolidation_prompt = PromptTemplate(
        input_variables=["summary"],
        template=consolidation_prompt_template
    )

    # Initialize the OpenAI LLM
    llm = ChatOpenAI(openai_api_key=api_key, temperature=0.0, max_tokens=2000, model="gpt-4o")
    consolidation_chain = LLMChain(llm=llm, prompt=consolidation_prompt)

    # Generate the final consolidated report
    final_report = consolidation_chain.run(summary=summary)

    return final_report.strip()

if __name__ == "__main__":
    test_pdf_path = "../Bank_statement_2.pdf"
    summary = summarize_text(test_pdf_path)
    final_report = consolidate_summary(summary)
    print("=== Final Analysis ===")
    print(final_report)
