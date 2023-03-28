from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

# 김현수 mongoDB atlas address
from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.sd02bon.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

# 김연주 mongoDB atlas address
# from pymongo import MongoClient
# client = MongoClient('mongodb+srv://sparta:test@cluster0.wkoueb2.mongodb.net/?retryWrites=true&w=majority')
# db = client.dbsparta


@app.route('/')
def home():
    return render_template('index.html')

# music insert
@app.route("/mList_insert_POST", methods=["POST"])
def mList_insert():
    weather_receive = request.form['weather_give']
    name_receive = request.form['name_give']
    url_receive = request.form['url_give']
    desc_receive = request.form['desc_give']
    # thumb image url conversion code
    youtube_url_type_a = 'https://www.youtube.com/watch?v='
    youtube_url_type_b = 'https://youtu.be/'
    if youtube_url_type_a in url_receive :
        youtube_id = url_receive[32:]
    elif youtube_url_type_b in url_receive :
        youtube_id = url_receive[17:]
    youtube_thumb = 'https://img.youtube.com/vi/'+youtube_id+'/0.jpg'
    # title crawling code
    youtube_crawler_url = 'https://noembed.com/embed?url='+url_receive
    r = requests.get(youtube_crawler_url)
    rjson = r.json()
    youtube_title = rjson['title']

    doc = {
        'weather' : weather_receive,
        'name' : name_receive,
        'url' : url_receive,
        'title':youtube_title,
        'thumb':youtube_thumb,
        'desc' : desc_receive,
        'ytbId' : youtube_id
    }
    db.musicList.insert_one(doc)

    return jsonify({'msg': '저장 완료!'})

# music delete - POST Request
@app.route("/mList_delete_POST", methods=["POST"])
def mList_delete():
    ytbId_receive = request.form['ytbId_give']
    doc = {
        'ytbId' : ytbId_receive
    }
    # 지우기
    db.musicList.delete_one(doc)
    return jsonify({'msg': '삭제 완료!'})

# music List - GET Request
@app.route("/mList_select_GET", methods=["GET"])
def mList_selete():
    music_data = list(db.musicList.find({},{'_id':False}))
    return jsonify({'result': music_data})

# ----------------------------------------------------------------------
# Commet Area
# ----------------------------------------------------------------------

# music comment insert - POST Request
@app.route("/mCmt_insert_POST", methods=["POST"])
def mCmt_insert():
    # ytdId_receive = request.form['ytbId_give']
    nick_receive = request.form['nick_give']
    comment_receive = request.form['comment_give']
    
    doc = {
        # 'ytdId' : ytdId_receive,
        'nick' : nick_receive,
        'comment' : comment_receive
    }
    db.musicCmt.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})

# music comment Select - GET Request
@app.route("/mCmt_select_GET", methods=["GET"])
def mList_select():
    comment_data = list(db.musicCmt.find({},{'_id':False}))
    return jsonify({'result': comment_data})

# music comment Delete - POST Request
@app.route("/mCmt_delete_POST", methods=["POST"])
def mCmt_delete():
    # ytbId_receive = request.form['ytbId_give']
    nick_receive = request.form['nick_give']
    comment_receive = request.form['comment_give']

    doc = {
        # 'ytbId' : ytbId_receive,
        'nick' : nick_receive,
        'comment' : comment_receive
    }
    # 지우기
    db.musicCmt.delete_one(doc)
    return jsonify({'msg': '삭제 완료!'})

# music comment Update - POST Request
@app.route("/mCmt_update_POST", methods=["POST"])
def mCmt_update():
    # ytbId_receive = request.form['ytbId_give']
    nickOld_receive = request.form['nickOld_give']
    commentOld_receive = request.form['commentOld_give']
    nickNew_receive = request.form['nickNew_give']
    commentNew_receive = request.form['commentNew_give']

    docOld = {
        'nick' : nickOld_receive,
        'comment' : commentOld_receive
    }

    docNew = { '$set' : {
        'nick' : nickNew_receive,
        'comment' : commentNew_receive
        }
    }

    # 수정하기
    db.musicCmt.update_one(docOld, docNew)
    return jsonify({'msg': '수정 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)