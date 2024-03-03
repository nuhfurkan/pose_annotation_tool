import os
from flask import Flask, jsonify, send_file, request, Response

app = Flask(__name__)

@app.route('/video', methods=["GET"])
def stream_video():
    video_name = request.args.get("name")
    video_path = "static_data/" + video_name
    
    def generate():
        with open(video_path, 'rb') as f:
            while True:
                chunk = f.read(1024 * 1024)  # Adjust chunk size as needed
                if not chunk:
                    break
                yield chunk

    return Response(generate(), mimetype='video/mp4', direct_passthrough=True)

@app.route("/video", methods=["POST"])
def upload_video():
    if 'file' not in request.files:
        print("No file was found")
    file = request.files['file']

    if file.filename == '':
        print("No file was selected")
    
    file.save('static_data/' + file.filename)
    return Response(status=200, mimetype="application/json")

@app.route("/video-list", methods=["GET"])
def video_list():
    def generate():
        flag = False
        for elem in os.listdir("static_data"):
            if flag:
                elem = "\n" + elem
            yield elem.encode("utf-8")
            flag = True

    return Response(generate(), mimetype="text/plain")

if __name__ == "__main__":
    app.run(debug=True)