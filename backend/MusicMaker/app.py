from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import random

app = Flask(__name__)
# 解决前后端跨域问题
CORS(app, supports_credentials=True)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/getMusicAdd')
def get_music_add():
    if os.path.exists('/Duing_App/AiMusic/music_send/music/music.mid'):
        os.remove('/Duing_App/AiMusic/music_send/music/music.mid')
    if os.path.exists('/Duing_App/AiMusic/music_send/music/music.wav'):
        os.remove('/Duing_App/AiMusic/music_send/music/music.wav')

    os.system('python MakerSrc/main.py')

    os.system("java -jar midi2wav.jar /Duing_App/AiMusic/music_send/music/music.mid")

    return 'http://duing.site:5004/music/music.wav'


# @app.route("/getChinese", methods=["GET"])
# def get_chinese():
#     url = 'http://duing.site:5004/music/chinese/'
#     music_type = request.args.get('type')
#     root_path = '/Duing_App/AiMusic/music_send/music/chinese'
#     for i in os.walk(root_path):
#         if i[0].__contains__(music_type):
#             k = random.randint(0, len(i[2]) - 1)
#             url = url + music_type + '/' + i[2][k]
#             break
#     return url
    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
