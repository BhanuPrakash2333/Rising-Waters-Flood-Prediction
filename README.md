# Rising Waters — Flood Prediction System

A machine learning-powered flood prediction system that analyzes historical weather data to predict flood risk, with a Flask web application for real-time predictions.

## Overview

Floods are among the most devastating natural disasters, claiming thousands of lives and displacing millions every year. This project addresses the lack of timely, accurate flood forecasting by building a classification-based prediction system trained on historical meteorological data — including annual rainfall, cloud cover, and seasonal rainfall patterns.

The best-performing model is integrated into a Flask web application, allowing users to enter current weather conditions and instantly receive a flood risk prediction.

## Features

- Predicts flood risk based on 5 weather parameters: Cloud Cover, Annual Rainfall, Jan–Feb Rainfall, Mar–May Rainfall, Jun–Sep Rainfall
- Compares four machine learning algorithms to select the best performer
- Simple, responsive web interface built with Flask
- Real-time predictions using a pre-trained, saved model

## Dataset

- **Source:** [Kaggle — Rainfall Dataset](https://www.kaggle.com/arbethi/rainfall-dataset?select=flood+dataset.xlsx)
- **Rows:** 115
- **Columns:** Temp, Humidity, Cloud Cover, ANNUAL, Jan-Feb, Mar-May, Jun-Sep, Oct-Dec, avgjune, sub, flood

## Tech Stack

| Category | Tools |
|---|---|
| Language | Python |
| Data Handling | NumPy, Pandas |
| Visualization | Matplotlib, Seaborn |
| Machine Learning | Scikit-learn, XGBoost |
| Model Persistence | Joblib |
| Web Framework | Flask |
| Frontend | HTML, CSS, JavaScript |

## Project Workflow

1. **Data Collection** — Downloaded and loaded the flood dataset into a Jupyter Notebook.
2. **Visualization & Analysis (EDA)** — Explored data structure, ran univariate analysis (distribution plots, box plots) and multivariate analysis (correlation heatmap).
3. **Data Pre-Processing** — Checked for missing values (none found), handled outliers, split data into train/test sets, and applied feature scaling with `StandardScaler`.
4. **Model Building** — Trained and evaluated four classification models:
   - Decision Tree
   - Random Forest
   - K-Nearest Neighbors (KNN)
   - XGBoost
5. **Model Selection** — Compared accuracy scores; **XGBoost** was selected as the final model (96.55% accuracy on test data).
6. **Application Building** — Built a Flask web app with HTML/CSS frontend to serve real-time predictions using the saved model.

## Model Performance

| Model | Accuracy |
|---|---|
| Decision Tree | 96.55% |
| Random Forest | 96.55% |
| KNN | 89.66% |
| **XGBoost (selected)** | **96.55%** |

XGBoost was chosen over the other tied models for its stronger generalization, resistance to overfitting, and stability as a boosting algorithm.

## Project Structure

```
Raising water sample/
├── app.py                  # Flask backend
├── floods.save             # Trained XGBoost model (saved with Joblib)
├── transform.save          # Fitted StandardScaler (saved with Joblib)
├── flood dataset/
│   └── flood dataset.xlsx  # Source dataset
├── templates/
│   ├── home.html           # Landing page
│   ├── index.html          # Weather input form
│   ├── chance.html         # Flood risk result page
│   └── no_chance.html      # Safe result page
└── static/
    ├── main.css             # Styling
    └── main.js              # Form validation
```

## Setup Instructions

### Prerequisites
- [Anaconda](https://www.anaconda.com/download) (recommended, includes Python + Jupyter)
- Python 3.x

### Installation

1. Clone or download this project folder.
2. Install the required libraries:
   ```bash
   pip install numpy pandas matplotlib seaborn scikit-learn xgboost flask joblib openpyxl
   ```

### Running the Application

1. Open Anaconda Prompt (or terminal).
2. Navigate to the project folder:
   ```bash
   cd path/to/Raising water sample
   ```
3. Run the Flask app:
   ```bash
   python app.py
   ```
4. Open a browser and go to:
   ```
   http://127.0.0.1:5000
   ```
5. Click **Predict Floods**, enter weather parameters, and click **Predict** to see the result.

## How It Works

1. The user enters weather data (cloud cover, rainfall figures) into the web form.
2. Flask receives the form data and structures it into the correct input format.
3. The saved `StandardScaler` transforms the input to match the scale used during training.
4. The saved XGBoost model predicts flood risk (0 = no flood, 1 = flood).
5. The user is redirected to either the flood risk page or the safe page based on the prediction.

## Future Improvements

- Deploy the application to a cloud platform (e.g., IBM Cloud) for public access.
- Expand the dataset with more recent and region-specific weather data.
- Add a map-based interface for selecting locations.
- Include probability scores alongside the binary prediction.

## Conclusion

Rising Waters demonstrates how data-driven technologies can be used to tackle real-world environmental challenges. By providing timely and reliable flood risk assessments, the project supports informed decision-making and helps protect lives, property, and ecosystems from the increasing threats posed by flooding in a changing world.
