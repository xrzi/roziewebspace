import sqlite3

conn = sqlite3.connect('msgboard.db')
print("Opened database successfully")

conn.execute('''CREATE TABLE posts (
    id INTEGET PRIMARY KEY, 
    date TEXT,
    title TEXT,
    content TEXT
);''')
print("Table created successfully")
conn.close()
