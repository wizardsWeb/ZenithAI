from flask import Flask,jsonify,request
from flask_cors import CORS, cross_origin
from helper import *

app = Flask(__name__)
CORS(app)

@app.route('/voice')
# @cross_origin()
def voice():
    st = AudioToText()
    # result = bot(st)
    # TextToAudio(result.get('answer'))
    TextToAudio(st)
    # st= "Hello, the code is working"
    return jsonify({'st':st})

@app.route('/predict',methods=['GET', 'POST'])
# @cross_origin()
def predict():
    try:
        chat = request.get_json()
        # result = bot(chat.get('data'))
        # return jsonify({"data":result.get('answer')})
        code = {"data": "Hello, the code is working"}
        return code
        # return chat
    except Exception as e:
        return jsonify({"error":e})
    

@app.route('/analyze', methods=['POST'])
# @cross_origin()
def analyze():
    try:
        data = request.get_json()
        questionsAndAnswers = data.get("questionsAndAnswers")
        questions = [qa.get("question") for qa in questionsAndAnswers]
        answers = [qa.get("answer") for qa in questionsAndAnswers]
        # print(questions, answers)
        summary = analyze_questions(questions, answers)
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)})

# New route for suggestions based on mood and age
@app.route('/suggest', methods=['POST'])
# @cross_origin()
def suggest():
    try:
        data = request.get_json()
        mood = data.get("mood")
        age = data.get("age")

        if not mood or not age:
            return jsonify({"error": "Mood and age are required"}), 400

        # Call the helper function to generate suggestions
        suggestions = generate_suggestions(mood, age)

        return jsonify({"suggestions": suggestions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__=="__main__":
    app.run(debug=True, port=8080)