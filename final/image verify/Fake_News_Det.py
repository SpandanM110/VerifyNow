from flask import Flask, render_template, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from PIL import Image
import pytesseract

app = Flask(__name__)

dataset=[]
def add_value():
    value = request.form['value']
    dataset.append(value)
    

tfvect = TfidfVectorizer(stop_words='english', max_df=0.7)
loaded_model = pickle.load(open('model.pkl', 'rb'))
dataframe = pd.read_csv('news.csv')
x = dataframe['text']
y = dataframe['label']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)

def fake_news_det(news):
    tfid_x_train = tfvect.fit_transform(x_train)
    tfid_x_test = tfvect.transform(x_test)
    input_data = [news]
    vectorized_input_data = tfvect.transform(input_data)
    prediction = loaded_model.predict(vectorized_input_data)
    return prediction

@app.route('/')
def home():
    pytesseract.pytesseract.tesseract_cmd = r'C://Program Files//Tesseract-OCR//tesseract.exe'
    a = pytesseract.image_to_string(Image.open('test3.png'))
    return render_template('index.html', a=a, values=dataset)

@app.route('/predict', methods=['POST'])
def predict():
    add_value()
    if request.method == 'POST':
        message = request.form['message']
        pred = fake_news_det(message)
        return render_template('index.html', prediction=pred, values=dataset)
    else:
        return render_template('index.html', prediction="Something went wrong", values=dataset)

if __name__ == '__main__':
    app.run(debug=True)
