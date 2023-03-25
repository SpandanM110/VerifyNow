from flask import Flask, render_template
import Fake_News_Det 

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')




if __name__ == "__main__":
    app.run(debug=True)
