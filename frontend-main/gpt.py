#chat-gptの値をhtmlに受け渡す仕組み作る
import openai
from flask import *
import requests
import json

openai.api_key = "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"

app = Flask(__name__)



variable = "Hello, World!"
app.secret_key = 'api_key'

with open('src/data.json',encoding="UTF-8") as f:
    data = str(json.load(f))

    

# チャットGPTに質問する関数
def query_chatgpt(prompt,apikey):
    # header = {
    #     "Content-Type" : "application/json",
    #     "Authorization" : f"Bearer {apiKey}",
    # }

    # body = '''
    # {
    #     "model": "gpt-3.5-turbo",
    #     "messages": [
    #         {"role": "user", "content":"''' + prompt + '''"}
    #     ]
    # }
    # '''
    # response = requests.post("https://api.openai.com/v1/chat/completions", headers = header, data = body.encode('utf_8'))
    # rj = response.json()
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "あなたはバイト探しをするプロフェッショナルです"},
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": data},
        ]   
        )
    js = json.loads(str(response))
    return js["choices"][0]["message"]["content"]

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', placeholder="OPENAIのAPIKEYを入れてください", value="登録")

@app.route("/", methods=["POST"])
def api():
    session["apiKey"] = request.form["apiKey"]
    return render_template("index.html",placeholder=session["apiKey"],value="登録済")

@app.route('/get_variable', methods=["POST"])
def get_variable():
    apiKey = session["apiKey"]
    message = request.json.get('message')
    prompt = message
    ans = query_chatgpt(prompt, apiKey)
    return jsonify({'variable': ans})

if __name__ == '__main__':
    app.run(debug=True)