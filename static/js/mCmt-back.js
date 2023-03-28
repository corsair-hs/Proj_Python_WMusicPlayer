$(document).ready(function () {
    mCmt_select();
});

function mCmt_insert() {
    let ytbId = $('#ytbIdLabel').text();
    let nick = $('#nick').val();
    let comment = $('#comment').val();

    let formData = new FormData();
    formData.append("ytbId_give", ytbId)
    formData.append("nick_give", nick)
    formData.append("comment_give", comment)

    fetch('/mCmt_insert_POST', { method: "POST", body: formData, }).then((response) => response.json()).then((data) => {
        alert(data["msg"]);
        $('#nick').val('');
        $('#comment').val('');
        mCmt_select()
    });
}

function mCmt_select() {
    const ytbIdLabel = $('#ytbIdLabel').text();
    console.log(ytbIdLabel);
    fetch('/mCmt_select_GET').then((res) => res.json()).then((data) => {
        let rows = data['result']
        $("#comment-list").empty()
        rows.forEach((a) => {
            let ytbId = a['ytbId']
            let nick = a['nick']
            let comment = a['comment']
            console.log(ytbId);
            if (ytbId === ytbIdLabel) {
                let temp_html = `<div class="card">
                                            <div class="card-body">
                                                <blockquote class="blockquote mb-0">
                                                    <p>${comment}</p>
                                                    <footer class="blockquote-footer">${nick}</footer>
                                                    <button onclick="mCmt_send(this)" type="button" class="btn btn-dark">수정</button>
                                                    <button onclick="mCmt_delete(this)" type="button" class="btn btn-dark">삭제</button>
                                                </blockquote>
                                            </div>
                                        </div>`
                $("#comment-list").append(temp_html)
            }
        })
    });
}

function mCmt_delete(button) {
    // let ytbId = '';
    let row = $(button).closest('blockquote.blockquote')
    let nick = row.find('footer:eq(0)').text()
    let comment = row.find('p:eq(0)').text()
    // console.log(nick, comment)

    let formData = new FormData();
    // formData.append("ytbId_give", ytbId);
    formData.append("nick_give", nick);
    formData.append("comment_give", comment);

    fetch('/mCmt_delete_POST', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        alert(data["msg"]);
        mCmt_select()
    });
};

function mCmt_send(button) {
    // let ytbId = '';
    let row = $(button).closest('blockquote.blockquote')
    let nickOld = row.find('footer:eq(0)').text()
    let commentOld = row.find('p:eq(0)').text()

    $('#nickOld').text(nickOld)
    $('#commentOld').text(commentOld)
    $('#nick').val(nickOld)
    $('#comment').val(commentOld)

    hide_btn_comment_save()
    show_btn_comment_update()
}

function mCmt_update() {
    // let ytbId = '';
    let _nickOld = $('#nickOld').text();
    let _commentOld = $('#commentOld').text();
    let nickNew = $('#nick').val();
    let commentNew = $('#comment').val();
    // console.log(_nickOld, _commentOld, nickNew, commentNew)

    let formData = new FormData();
    // formData.append("ytbId_give", ytbId);
    formData.append("nickOld_give", _nickOld);
    formData.append("commentOld_give", _commentOld);
    formData.append("nickNew_give", nickNew);
    formData.append("commentNew_give", commentNew);

    fetch('/mCmt_update_POST', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        alert(data["msg"]);
        $('#nick').val('');
        $('#comment').val('');
        mCmt_select()
    });
};