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

def get_posts(offset: int):
    queryformat = f"SELECT date, title, content FROM posts ORDER BY date DESC LIMIT 25 OFFSET {offset*25};"
    conn = sqlite3.connect(dbname)
    cursor = conn.cursor()
    cursor.execute(queryformat)
    result = cursor.fetchall()
    conn.close()
    return result

@app.route('/msgboard', strict_slashes = False)
@app.route('/msgboard/<int:offset>', strict_slashes = False)
def msgboard(offset = 0):
    posts = get_posts(offset = offset)
    return render_template('msgboard.html', posts=posts)

@app.route('/submit_post', methods = ["POST"])
def submit_post():
    if len(request.json['title'])>64 or len(request.json['content'])>5000:
        return("Too damn big, make your post smaller!")
    result = addpost(title = request.json['title'], content = request.json['content'])
    return result

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

def addpost(title: str, content: str):
    queryformat = "INSERT INTO posts (date, title, content) VALUES (datetime('now'), ?, ?)"
    conn = sqlite3.connect(dbname)
    conn.execute(queryformat, (title, content))
    conn.commit()
    conn.close()
    return "posted"


if __name__ == '__main__':
    workdir = os.path.dirname(os.path.abspath(__file__))
    print(f"Using {workdir} as working directory")
    dbname = "msgboard.db"
    if not dbname in os.listdir(workdir):
        print("No database found, creating new one")
        if not "db.schema" in os.listdir(workdir):
            exit("Can't create new db, no schema file in working directory, exiting")
        conn = sqlite3.connect(dbname)
        conn.execute(open(os.path.join(workdir, "db.schema"), "r").read()) #reading db.schema into sqlite3
        conn.commit()
        conn.close()
    else:
        print(f"found database at {os.path.join(workdir, dbname)}")
    print("launching flask")
            
    app.run(debug=True)
