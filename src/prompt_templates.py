from langchain.prompts import PromptTemplate

structured_prompt_template = """
You are a financial data extraction system. 
You will read a chunk of text from a bank statement and return **valid JSON** with the following fields:
- total_deposits: (float) an estimate of total deposits in this chunk
- total_withdrawals: (float) an estimate of total withdrawals in this chunk
- recurring_expenses: (list of strings) names or categories of expenses that seem to repeat
- mentions_of_loans: (boolean) whether the text explicitly references any loans or loan payments
- summary: (string) a concise textual summary of what's happening in this chunk

IMPORTANT:
1. Output must be valid JSON, **and nothing else**.
2. If the data isn't clear, use best-guess estimates or 0, and mention in the summary that it's uncertain.
3. Do not include any keys other than the five listed.

Here is the chunk of the bank statement:
{chunk}

Return your result as valid JSON with the fields:
{{
  "total_deposits": float,
  "total_withdrawals": float,
  "recurring_expenses": [string],
  "mentions_of_loans": bool,
  "summary": string
}}
"""

structured_prompt = PromptTemplate(
    input_variables=["chunk"],
    template=structured_prompt_template,
)
