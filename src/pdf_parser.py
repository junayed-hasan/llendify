# src/pdf_parser.py

import pdfplumber

def extract_text_from_pdf(pdf_path: str) -> str:
    text_content = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text_content.append(page.extract_text())
    return "\n".join(text_content)


if __name__ == "__main__":
    """
    This main section is just for quick testing. 
    Replace 'sample.pdf' with the path to one of your actual PDFs.
    """
    pdf_file_path = "../Bank_statement_2.pdf"  # Adjust this path as needed
    text = extract_text_from_pdf(pdf_file_path)
    print(text)
