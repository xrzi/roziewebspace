from flask import Flask, render_template, url_for, request
import os
import json
import sqlite3

app = Flask(__name__)

def generate_gallery(path):
    gallery = []
    imagelist = os.listdir(path)
    for image in imagelist:
        gallery.append(f'static/images/mcgallery/{image}')
    return gallery

@app.route('/')
def home():
    return render_template('index.html')

#@app.route('/css/style.css')
#def css():
#    return render_template('style.css')

@app.route('/mc')
def mc():
    # first we need to generate photo gallery
    path = os.path.join(os.getcwd(), "static/images/mcgallery")
    gallery = generate_gallery(path = path)
    return render_template('mc.html', images=gallery)

def get_posts():
    queryformat = "SELECT date, title, content FROM posts ORDER BY date DESC LIMIT 100;"
    conn = sqlite3.connect('msgboard.db')
    cursor = conn.cursor()
    cursor.execute(queryformat)
    result = cursor.fetchall()
    conn.close()
    return result

@app.route('/msgboard')
def msgboard():
    posts = get_posts()
    return render_template('msgboard.html', posts=posts)

@app.route('/submit_post', methods = ["POST"])
def submit_post():
    if len(request.json['title'])>64 or len(request.json['content'])>5000:
        return("Too damn big, make your post smaller!")
    result = addpost(title = request.json['title'], content = request.json['content'])
    return result

def addpost(title: str, content: str):
    queryformat = "INSERT INTO posts (date, title, content) VALUES (datetime('now'), ?, ?)"
    conn = sqlite3.connect('msgboard.db')
    conn.execute(queryformat, (title, content))
    conn.commit()
    conn.close()
    return "posted"


if __name__ == '__main__':
    app.run(debug=True)
