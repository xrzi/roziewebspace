from flask import Flask, render_template, url_for
import os

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

@app.route('/gh')
def gh():
    return render_template('gh.html')

@app.route('/tg')
def tg():
    return render_template('tg.html')

@app.route('/sc')
def sc():
    return render_template('sc.html')

if __name__ == '__main__':
    app.run(debug=True)
