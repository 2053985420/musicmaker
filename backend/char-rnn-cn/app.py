from flask import Flask, request, jsonify
from flask_cors import CORS
from generator import gener


app = Flask(__name__)
# 解决前后端跨域问题
CORS(app, supports_credentials=True)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/getLyrics', methods=['GET'])
def get_lyrics():
    singer = request.args.get('singer')
    start = request.args.get('start')
    return jsonify(gener(1, singer, start))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

