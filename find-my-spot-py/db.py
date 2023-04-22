import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

conn = cursor = None


def getDbPool():
    try:
        conn = psycopg2.connect(
            host=f"{os.environ['DB_HOST']}",
            database=f"{os.environ['DB_NAME']}",
            user=f"{os.environ['DB_USERNAME']}",
            password=f"{os.environ['DB_PASSWORD']}",
        )

        cursor = conn.cursor()

        return (conn, cursor)

    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
