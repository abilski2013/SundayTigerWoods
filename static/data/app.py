from flask import Flask, render_template
import pymongo

app = Flask(__name__)

# Sets up the mongo connection: local server for db is created and connected to mongo
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# Assign our database as "db" containing collections
db = water_qualityMN
# Assign a specific collection as "collection" containing the documents we want (we have two: unfiltered and Adam's groupby counties)
collection = db.Adams_MN_watercounties


@app.route("/")
# Create a function called query_mongo that will pull all documents from our collection at once
def query_mongo():
    # Assign the operation that finds all data as a (json?) list as the variable "grab_data"
    grab_data = list(db.collection.find())
    print(grab_data)

    # Render to an index.html template (our page) and pass it the data you retrieved from the database stored in grab_data
    return render_template("index.html", data=grab_data)

#These are extra options that we probably do not need
#Function called "insert()" that can insert data
# def insert():
#     document = collection.insert_one()
#     return document.inserted

# #Function called "query_single_thing()" that can call a single item, in this case the ObjectId (the unique, auto-assigned code from the Mongo database)
# def query_single_thing():
#     data = collection.find_one({'_id': ObjectId("The unique document id")})
#     return data

# #Funtion that can delete data
# def delete_data():
#     document = collection.delete_one("enter key:value you want deleted")
#     return document.confirm_deleted


if __name__ == "__main__":
    app.run(debug=True)
