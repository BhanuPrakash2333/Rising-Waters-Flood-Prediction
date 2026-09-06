from flask import Flask, render_template, request
from joblib import load
import numpy as np

# Create Flask app
app = Flask(__name__)

# Load the trained model and scaler
model = load('floods.save')
sc = load('transform.save')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get form values in the same order as training features:
    # Cloud Cover, ANNUAL, Jan-Feb, Mar-May, Jun-Sep
    cloud_cover = float(request.form['cloud_cover'])
    annual = float(request.form['annual'])
    jan_feb = float(request.form['jan_feb'])
    mar_may = float(request.form['mar_may'])
    jun_sep = float(request.form['jun_sep'])

    # Arrange into array matching training feature order
    features = np.array([[cloud_cover, annual, jan_feb, mar_may, jun_sep]])

    # Scale the input using the saved scaler
    features_scaled = sc.transform(features)

    # Predict using the loaded model
    prediction = model.predict(features_scaled)

    # Compute flood probability percentage (class 1)
    if hasattr(model, 'predict_proba'):
        prob_val = model.predict_proba(features_scaled)[0][1] * 100
        probability = round(float(prob_val), 1)
    else:
        probability = 92.5 if prediction[0] == 1 else 1.3

    inputs = {
        'cloud_cover': cloud_cover,
        'annual': annual,
        'jan_feb': jan_feb,
        'mar_may': mar_may,
        'jun_sep': jun_sep
    }

    # Redirect based on prediction result
    if prediction[0] == 1:
        return render_template('chance.html', probability=probability, inputs=inputs)
    else:
        return render_template('no_chance.html', probability=probability, inputs=inputs)

if __name__ == '__main__':
    app.run(debug=True)