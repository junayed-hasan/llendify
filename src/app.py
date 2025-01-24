from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from .analysis_pipeline import summarize_chunks, consolidate_summaries

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder
UPLOAD_FOLDER = 'temp_uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/analyze', methods=['POST'])
def analyze_statement():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and file.filename.endswith('.pdf'):
        try:
            # Save the uploaded file
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Process the file
            chunk_summaries = summarize_chunks(filepath)
            final_analysis = consolidate_summaries(chunk_summaries)
            
            # Clean up the temporary file
            os.remove(filepath)
            
            # Parse the analysis into structured data
            # This assumes final_analysis has a consistent format
            sections = final_analysis.split('\n\n')
            analysis_data = {}
            current_section = ""
            
            for section in sections:
                if section.startswith('1. MONTHLY DEPOSITS:'):
                    current_section = "monthly_deposits"
                elif section.startswith('2. MONTHLY WITHDRAWALS:'):
                    current_section = "monthly_withdrawals"
                elif section.startswith('3. REGULAR BILLS:'):
                    current_section = "regular_bills"
                elif section.startswith('4. LOANS AND DEBTS:'):
                    current_section = "loans_and_debts"
                elif section.startswith('5. LOAN RECOMMENDATION:'):
                    current_section = "loan_recommendation"
                
                if current_section:
                    # Remove the section header and clean up the text
                    content = section.split(':', 1)[1].strip() if ':' in section else section
                    analysis_data[current_section] = content
            
            return jsonify({
                'success': True,
                'analysis': analysis_data
            })
            
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)