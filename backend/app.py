import sqlite3
from flask import Flask, render_template
from flask import Flask, render_template

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect("travel.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        country TEXT,
        city TEXT,
        price REAL,
        start_date TEXT,
        end_date TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)